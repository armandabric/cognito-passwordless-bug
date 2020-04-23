const mockedContext = () => {
  return {
    callbackWaitsForEmptyEventLoop: false,
    functionName: "some-mocked-function-name-1AQJH61GZ64JC",
    functionVersion: "$LATEST",
    invokedFunctionArn:
      "arn:aws:lambda:us-east-1:123456789012:function:some-mocked-function-name-1AQJH61GZ64JC",
    memoryLimitInMB: "128",
    awsRequestId: "c687ed2d-79aa-40e2-a8d3-5ee684865391",
    logGroupName: "/aws/lambda/some-mocked-function-name-1AQJH61GZ64JC",
    logStreamName: "2020/01/01/[$LATEST]372771aa6ed543aea1cd91d96209afd3",
    identity: undefined,
    clientContext: undefined,

    getRemainingTimeInMillis() {
      throw new Error("Not yet mocked. Let's wait a real use case.");
    },
    done() {
      throw new Error('Deprecated method. Do not use "ctx.done(...)"');
    },
    fail() {
      throw new Error('Deprecated method. Do not use "ctx.fail(...)"');
    },
    succees() {
      throw new Error('Deprecated method. Do not use "ctx.success(...)"');
    },
  };
};

const mockedCallback = () => () => {
  throw new Error("Do not use the handler callback. Prefer async/await.");
};

export const executeHander = async (handler: Function, event: {}) => {
  return await handler(event, mockedContext(), mockedCallback());
};
