// @ts-ignore
import { mockCognitoAdminUpdateUserAttributes } from "aws-sdk";
import { handler as postAuthentificationHandler } from "./post-authentication";
import { executeHander } from "../test-helper";
import { fakeAwsCognitoPostAuthentificationEvent } from "../test-fake-events";

jest.mock("aws-sdk");
jest.mock("aws-lambda");

describe("post-authentication", () => {
  test("mark the user email as verified after a succefull authentication", async () => {
    const { response } = await executeHander(
      postAuthentificationHandler,
      fakeAwsCognitoPostAuthentificationEvent({ email: "john@do.com" }),
    );

    expect(response).toStrictEqual({});

    expect(mockCognitoAdminUpdateUserAttributes).toHaveBeenCalledTimes(1);
    expect(mockCognitoAdminUpdateUserAttributes).toHaveBeenLastCalledWith({
      UserPoolId: "us-east-1_fakePoolId",
      UserAttributes: [
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
      Username: expect.anything(),
    });
  });
});
