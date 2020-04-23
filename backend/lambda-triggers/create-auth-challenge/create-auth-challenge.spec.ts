import mockedEnv from "mocked-env";
import { randomDigits } from "crypto-secure-random-digit";
import { handler as createAuthChanllengeHandler } from "./create-auth-challenge";
import { sendSecretCodeEmail } from "./send-email";
import { executeHander } from "../test-helper";
import { fakeAwsCognitoCreateAuthChallengeEvent } from "../test-fake-events";

jest.mock("aws-sdk");
jest.mock("aws-lambda");
jest.mock("crypto-secure-random-digit");
jest.mock("./send-email");

describe("create-auth-challenge", () => {
  beforeAll(() => {
    // @ts-ignore As crypto-secure-random-digit is mocked we have access to jest mock special method
    randomDigits.mockReturnValue([1, 1, 1, 1, 1, 1]);
  });

  let restoreEnv: () => void;
  const expectedFromEmailAddress = "fake@inexperiment.test";
  beforeEach(() => {
    restoreEnv = mockedEnv({
      SES_FROM_ADDRESS: expectedFromEmailAddress,
    });
  });
  afterEach(() => {
    restoreEnv && restoreEnv();
  });

  test("generate a secret code when the user sign in for the first time", async () => {
    const { response } = await executeHander(
      createAuthChanllengeHandler,
      fakeAwsCognitoCreateAuthChallengeEvent({ email: "john@do.com" }, []),
    );

    expect(response).toStrictEqual({
      publicChallengeParameters: {},
      privateChallengeParameters: {
        secretLoginCode: "111111",
      },
      challengeMetadata: "CODE-111111",
    });

    expect(randomDigits).toHaveBeenCalledTimes(1);
  });

  test("re-use the same secret when try multiple unfinished authentication in a row", async () => {
    const previouslyGeneratedSecretCode = "222222";

    const { response } = await executeHander(
      createAuthChanllengeHandler,
      fakeAwsCognitoCreateAuthChallengeEvent(
        { email: "john@do.com" },
        [false], // One previous failure
        previouslyGeneratedSecretCode,
      ),
    );

    expect(response).toStrictEqual({
      publicChallengeParameters: {},
      privateChallengeParameters: {
        secretLoginCode: "222222",
      },
      challengeMetadata: "CODE-222222",
    });

    expect(randomDigits).toHaveBeenCalledTimes(0);
  });

  test("send by email the secret code to the user", async () => {
    await executeHander(
      createAuthChanllengeHandler,
      fakeAwsCognitoCreateAuthChallengeEvent({ email: "john@do.com" }, []),
    );

    expect(sendSecretCodeEmail).toHaveBeenCalledTimes(1);
    expect(sendSecretCodeEmail).toHaveBeenLastCalledWith(
      expectedFromEmailAddress,
      "john@do.com",
      {
        secretLoginCode: "111111",
      },
    );
  });

  test("do not send a mail to unknow user", async () => {
    const { response } = await executeHander(
      createAuthChanllengeHandler,
      fakeAwsCognitoCreateAuthChallengeEvent(null, []),
    );

    expect(sendSecretCodeEmail).not.toHaveBeenCalled();

    expect(response).toStrictEqual({
      publicChallengeParameters: {},
      privateChallengeParameters: {
        secretLoginCode: "111111",
      },
      challengeMetadata: "CODE-111111",
    });
  });
});
