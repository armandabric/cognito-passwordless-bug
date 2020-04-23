import { handler as defineAuthChallengeHandler } from "./define-auth-challenge";
import { executeHander } from "../test-helper";
import { fakeAwsCognitoDefineAuthChallengeEvent } from "../test-fake-events";

jest.mock("aws-sdk");
jest.mock("aws-lambda");

describe("create-auth-challenge", () => {
  test("activate a custom challenge authentification on first call", async () => {
    const { response } = await executeHander(
      defineAuthChallengeHandler,
      fakeAwsCognitoDefineAuthChallengeEvent({ email: "john@do.com" }, []),
    );

    expect(response).toStrictEqual({
      challengeName: "CUSTOM_CHALLENGE",
      issueTokens: false,
      failAuthentication: false,
    });
  });

  test("validate the user authentication on accepted challenge", async () => {
    const { response } = await executeHander(
      defineAuthChallengeHandler,
      fakeAwsCognitoDefineAuthChallengeEvent({ email: "john@do.com" }, [true]),
    );

    expect(response).toStrictEqual({
      challengeName: null,
      issueTokens: true,
      failAuthentication: false,
    });
  });

  test("cancel the authentification after three errored challenge", async () => {
    const { response } = await executeHander(
      defineAuthChallengeHandler,
      fakeAwsCognitoDefineAuthChallengeEvent({ email: "john@do.com" }, [
        false,
        false,
        false,
      ]),
    );

    expect(response).toStrictEqual({
      challengeName: null,
      issueTokens: false,
      failAuthentication: true,
    });
  });
});
