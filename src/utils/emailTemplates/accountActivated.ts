export const accountActivatedEmail = (loginUrl: string, avatar: string | undefined) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Account Has Been Activated</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                            <img src=${avatar} alt="Indigenous Connect Logo" style="max-width: 150px; height: auto;">
                            <h1 style="color: #333333; font-size: 24px; margin-top: 20px;">Your Account Has Been Activated!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">Dear User,</p>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">We're excited to inform you that your account has been successfully activated. You can now enjoy full access to all features of our platform.</p>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">Click the button below to log in and start exploring:</p>
                            <table role="presentation" style="margin: 30px auto;">
                                <tr>
                                    <td style="border-radius: 4px; background-color: #4CAF50;">
                                        <a href=${loginUrl} target="_blank" style="border: none; color: #ffffff; padding: 12px 30px; text-decoration: none; font-size: 16px; font-weight: bold; display: inline-block;">Login Now</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">Thank you for joining us!</p>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">Best regards,<br>The Indigenous Connect Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f8f8; padding: 20px 30px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                            <p style="color: #999999; font-size: 14px; margin: 0;">© 2024 Indigenous Connect. All rights reserved.</p>
                            <p style="color: #999999; font-size: 14px; margin: 10px 0 0;">
                                <a href="https://your-website.com/privacy" style="color: #999999; text-decoration: underline;">Privacy Policy</a> | 
                                <a href="https://your-website.com/terms" style="color: #999999; text-decoration: underline;">Terms of Service</a>
                            </p>
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