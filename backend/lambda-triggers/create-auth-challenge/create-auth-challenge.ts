import { CognitoUserPoolTriggerHandler } from "aws-lambda";
import { randomDigits } from "crypto-secure-random-digit";
import { sendSecretCodeEmail } from "./send-email";

export const handler: CognitoUserPoolTriggerHandler = async (event) => {
  const fromEmailAddress = process.env.SES_FROM_ADDRESS;
  if (!fromEmailAddress) {
    throw new Error("Missing SES_FROM_ADDRESS environment variable ");
  }

  let userEmail = null;
  if (event.request.userAttributes && event.request.userAttributes.email) {
    userEmail = event.request.userAttributes.email;
  }

  let secretLoginCode: string;
  if (!event.request.session || !event.request.session.length) {
    // This is a new auth session
    // Generate a new secret login code and mail it to the user
    secretLoginCode = randomDigits(6).join("");

    if (userEmail) {
      await sendSecretCodeEmail(fromEmailAddress, userEmail, {
        secretLoginCode,
      });
    }
  } else {
    // There's an existing session. Don't generate new digits but
    // re-use the code from the current session. This allows the user to
    // make a mistake when keying in the code and to then retry, rather
    // then needing to e-mail the user an all new code again.
    const previousChallenge = event.request.session.slice(-1)[0];
    secretLoginCode = previousChallenge.challengeMetadata!.match(
      /CODE-(\d*)/,
    )![1];
  }

  // This is sent back to the client app
  event.response.publicChallengeParameters = {};

  // Add the secret login code to the private challenge parameters
  // so it can be verified by the "Verify Auth Challenge Response" trigger
  event.response.privateChallengeParameters = { secretLoginCode };

  // Add the secret login code to the session so it is available
  // in a next invocation of the "Create Auth Challenge" trigger
  event.response.challengeMetadata = `CODE-${secretLoginCode}`;

  return event;
};
