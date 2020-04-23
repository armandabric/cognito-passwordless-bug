// SES

export const mockSESsendEmail = jest.fn().mockImplementation(() => {
  return {
    promise: () => {
      return Promise.resolve();
    },
  };
});

export const mockSESsendTemplatedEmail = jest.fn().mockImplementation(() => {
  return {
    promise: () => {
      return Promise.resolve();
    },
  };
});

export const SES = jest.fn().mockImplementation(() => {
  return {
    sendEmail: mockSESsendEmail,
    sendTemplatedEmail: mockSESsendTemplatedEmail,
  };
});

// Cognito

export const mockCognitoAdminUpdateUserAttributes = jest
  .fn()
  .mockImplementation(() => {
    return {
      promise: () => {
        return Promise.resolve();
      },
    };
  });

export const CognitoIdentityServiceProvider = jest
  .fn()
  .mockImplementation(() => {
    return {
      adminUpdateUserAttributes: mockCognitoAdminUpdateUserAttributes,
    };
  });
