import { handler as preSignUpHandler } from "./pre-sign-up";
import { executeHander } from "../test-helper";
import { fakeAwsCognitoPreSignUpEvent } from "../test-fake-events";

jest.mock("aws-sdk");
jest.mock("aws-lambda");

describe("pre-sign-up", () => {
  test("automaticly confirm an user registration", async () => {
    const { response } = await executeHander(
      preSignUpHandler,
      fakeAwsCognitoPreSignUpEvent(),
    );

    expect(response).toStrictEqual({ autoConfirmUser: true });
  });
});
