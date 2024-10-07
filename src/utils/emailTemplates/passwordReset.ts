export const passwordReset = (resetUrl: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
        <style>
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333333; background-color: #f4f4f4;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
          <tr>
            <td style="padding: 20px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center" class="container" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 30px; text-align: center;">
                    Indigenous Connect
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px; text-align: center;">Password Reset Request</h1>
                    <p style="margin-bottom: 20px;">Hello,</p>
                    <p style="margin-bottom: 20px;">We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
                    <p style="margin-bottom: 20px;">To reset your password, click the button below:</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center; padding: 20px 0;">
                          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin-bottom: 20px;">This link will expire in 10 minutes for security reasons.</p>
                    <p style="margin-bottom: 20px;">If you're having trouble clicking the button, you can copy and paste the following URL into your web browser:</p>
                    <p style="margin-bottom: 20px; word-break: break-all;"><a href="${resetUrl}" style="color: #007bbb;">${resetUrl}</a></p>
                    <p style="margin-bottom: 20px;">If you didn't request a password reset, please contact our support team immediately.</p>
                    <p>Best regards,<br>Your Company Team</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 14px; color: #6c757d; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
                    <p style="margin: 10px 0 0;">© 2024 Indigenous Connect. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
}