type ExpectedUserAttributes = {
  email: string;
};

export const fakeAwsCognitoCreateAuthChallengeEvent = (
  expectedUserAttributes: ExpectedUserAttributes | null,
  previousTries: boolean[],
  previouslyGeneratedSecretCode: string | null = null,
) => {
  const defaultUserAttributes = {
    sub: "4e387e90-d803-4d81-8065-290cd24b0712",
    email_verified: "true",
    "cognito:user_status": "CONFIRMED",
    "cognito:email_alias": "john@fixture.test",
    name: "John Do",
    phone_number_verified: "false",
    phone_number: "+33123456789",
    given_name: "John",
    locale: "fr_FR",
    family_name: "Do",
    email: "john@fixture.test",
  };

  return {
    version: 1,
    region: "us-east-1",
    userPoolId: "us-east-1_fakePoolId",
    userName: "4e387e90-d803-4d81-8065-290cd24b0712",
    callerContext: {
      awsSdkVersion: "aws-sdk-unknown-unknown",
      clientId: "4b3lu6s20j3g1vb7338srt4d6v",
    },
    triggerSource: "CreateAuthChallenge_Authentication",
    request: {
      userAttributes:
        expectedUserAttributes !== null
          ? { ...defaultUserAttributes, ...expectedUserAttributes }
          : null,
      challengeName: "CUSTOM_CHALLENGE",
      session: previousTries.map((oneTry) => ({
        challengeName: "CUSTOM_CHALLENGE",
        challengeResult: oneTry,
        challengeMetadata: previouslyGeneratedSecretCode
          ? `CODE-${previouslyGeneratedSecretCode}`
          : null,
      })),
    },
    response: {
      publicChallengeParameters: null,
      privateChallengeParameters: null,
      challengeMetadata: null,
    },
  };
};

export const fakeAwsCognitoDefineAuthChallengeEvent = (
  expectedUserAttributes: ExpectedUserAttributes,
  previousTries: boolean[],
) => ({
  version: "1",
  region: "us-east-1",
  userPoolId: "us-east-1_fakePoolId",
  userName: "fa2e3774-f7d8-48ad-a1ef-bfb34792024c",
  callerContext: {
    awsSdkVersion: "aws-sdk-unknown-unknown",
    clientId: "4b3lu6s20j3g1vb7338srt4d6v",
  },
  triggerSource: "DefineAuthChallenge_Authentication",
  request: {
    userAttributes: {
      sub: "fa2e3774-f7d8-48ad-a1ef-bfb34792024c",
      email_verified: "false",
      "cognito:user_status": "CONFIRMED",
      "cognito:email_alias": expectedUserAttributes.email,
      name: "John Do",
      phone_number_verified: "false",
      phone_number: "+33123456789",
      given_name: "John",
      locale: "fr_FR",
      family_name: "Do",
      email: expectedUserAttributes.email,
    },
    session: previousTries.map((oneTry) => ({
      challengeName: "CUSTOM_CHALLENGE",
      challengeResult: oneTry,
      challengeMetadata: "SOMETHING",
    })),
  },
  response: {
    challengeName: null,
    issueTokens: null,
    failAuthentication: null,
  },
});

export const fakeAwsCognitoPreSignUpEvent = () => ({
  request: {
    userAttributes: {},
    validationData: {},
    clientMetadata: {},
  },

  response: {},
});

export const fakeAwsCognitoPostAuthentificationEvent = (
  expectedUserAttributes: ExpectedUserAttributes,
) => ({
  version: "1",
  region: "us-east-1",
  userPoolId: "us-east-1_fakePoolId",
  userName: "e94ff904-f8b8-4a6b-b7d6-1b5422ff24cd",
  callerContext: {
    awsSdkVersion: "aws-sdk-unknown-unknown",
    clientId: "4b3lu6s20j3g1vb7338srt4d6v",
  },
  triggerSource: "PostAuthentication_Authentication",
  request: {
    userAttributes: {
      sub: "e94ff904-f8b8-4a6b-b7d6-1b5422ff24cd",
      email_verified: "false",
      "cognito:user_status": "CONFIRMED",
      "cognito:email_alias": expectedUserAttributes.email,
      name: "John Do",
      phone_number_verified: "false",
      phone_number: "+33123456789",
      given_name: "John",
      locale: "fr_FR",
      family_name: "Do",
      email: expectedUserAttributes.email,
    },
    newDeviceUsed: false,
  },
  response: {},
});

export const fakeAwsCognitoVerifyAuthChallengeResponse = (
  expectedUserAttributes: ExpectedUserAttributes,
  secretLoginCode: string,
  challengeAnswer: string,
) => ({
  version: "1",
  region: "us-east-1",
  userPoolId: "us-east-1_fakePoolId",
  userName: "4e387e90-d803-4d81-8065-290cd24b0712",
  callerContext: {
    awsSdkVersion: "aws-sdk-unknown-unknown",
    clientId: "4b3lu6s20j3g1vb7338srt4d6v",
  },
  triggerSource: "VerifyAuthChallengeResponse_Authentication",
  request: {
    userAttributes: {
      sub: "4e387e90-d803-4d81-8065-290cd24b0712",
      email_verified: "true",
      "cognito:user_status": "CONFIRMED",
      "cognito:email_alias": expectedUserAttributes.email,
      name: "John Do",
      phone_number_verified: "false",
      phone_number: "+33123456789",
      given_name: "John",
      locale: "fr_FR",
      family_name: "Do",
      email: expectedUserAttributes.email,
    },
    privateChallengeParameters: { secretLoginCode },
    challengeAnswer,
  },
  response: { answerCorrect: null },
});
