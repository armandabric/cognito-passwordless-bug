import { CognitoUserPoolTriggerHandler } from "aws-lambda";

export const handler: CognitoUserPoolTriggerHandler = async (
  event,
  context,
) => {
  console.log(event, context);

  return event;
};
