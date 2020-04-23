import { handler as verifyAuthChallengeReponseHandler } from "./verify-auth-challenge-response";
import { executeHander } from "../test-helper";
import { fakeAwsCognitoVerifyAuthChallengeResponse } from "../test-fake-events";

jest.mock("aws-sdk");
jest.mock("aws-lambda");

describe("verify-auth-challenge-response", () => {
  test("accept the challenge answer when equals to the secret login code", async () => {
    const secretLoginCode = "111111";
    const challengeAnswer = "111111";

    const { response } = await executeHander(
      verifyAuthChallengeReponseHandler,
      fakeAwsCognitoVerifyAuthChallengeResponse(
        { email: "john@do.fr" },
        secretLoginCode,
        challengeAnswer,
      ),
    );

    expect(response).toStrictEqual({ answerCorrect: true });
  });

  test("reject the challenge answer when different to the secret login code", async () => {
    const secretLoginCode = "111111";
    const challengeAnswer = "222222";

    const { response } = await executeHander(
      verifyAuthChallengeReponseHandler,
      fakeAwsCognitoVerifyAuthChallengeResponse(
        { email: "john@do.fr" },
        secretLoginCode,
        challengeAnswer,
      ),
    );

    expect(response).toStrictEqual({ answerCorrect: false });
  });
});
