import { CognitoUserPoolTriggerHandler } from "aws-lambda";

export const handler: CognitoUserPoolTriggerHandler = async (event) => {
  event.response.autoConfirmUser = true;

  return event;
};
