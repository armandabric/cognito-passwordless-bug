import { SES } from "aws-sdk";

const ses = new SES();

export async function sendSecretCodeEmail(
  fromEmailAddress: string,
  toEmailAddress: string,
  variables: { secretLoginCode: string }
) {
  const params: SES.SendEmailRequest = {
    Destination: { ToAddresses: [toEmailAddress] },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <body>
                <p>This is your secret login code:</p>
                <h3>${variables.secretLoginCode}</h3>
              </body>
            </html>
`,
        },
        Text: {
          Charset: "UTF-8",
          Data: `Your secret login code: ${variables.secretLoginCode}`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Your secret login code",
      },
    },
    Source: process.env.SES_FROM_ADDRESS!,
  };

  await ses.sendEmail(params).promise();
}
