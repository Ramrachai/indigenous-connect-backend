export const welcomeEmail = (name: string) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Indigenous Connect</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; border: 0; border-spacing: 0; background-color: #ffffff;">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 40px 0 30px 0; background-color: #3B82F6;">
                            <h1 style="font-size: 24px; margin: 0 0 20px 0; color: #ffffff;">Welcome to Indigenous Connect</h1>
                            <img src="https://via.placeholder.com/150" alt="Indigenous Connect Logo" width="150" style="height: auto; display: block;" />
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 36px 30px 42px 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                                <tr>
                                    <td style="padding: 0 0 36px 0; color: #153643;">
                                        <h2 style="font-size: 20px; margin: 0 0 20px 0; color: #3B82F6;">Dear ${name},</h2>
                                        <p style="margin: 0 0 12px 0; line-height: 24px;">Welcome to Indigenous Connect! We're thrilled to have you join our community dedicated to uniting and empowering the indigenous people of Bangladesh.</p>
                                        <p style="margin: 0 0 12px 0; line-height: 24px;">Here's what you can do now:</p>
                                        <ul style="margin: 0 0 12px 0; padding-left: 20px; line-height: 24px;">
                                            <li>Complete your profile</li>
                                            <li>Connect with other community members</li>
                                            <li>Share your stories and experiences</li>
                                            <li>Explore community posts and events</li>
                                        </ul>
                                        <p style="margin: 0 0 12px 0; line-height: 24px;">If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
                                        <p style="margin: 0; line-height: 24px;">We're excited to have you on board!</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                                            <tr>
                                                <td style="width: 260px; padding: 0; vertical-align: top; color: #153643;">
                                                    <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 24px;">
                                                        <img src="https://via.placeholder.com/260x200" alt="Community Image" width="260" style="height: auto; display: block;" />
                                                    </p>
                                                    <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px;">Connect with your community and share your heritage.</p>
                                                </td>
                                                <td style="width: 20px; padding: 0; font-size: 0; line-height: 0;">&nbsp;</td>
                                                <td style="width: 260px; padding: 0; vertical-align: top; color: #153643;">
                                                    <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 24px;">
                                                        <img src="https://via.placeholder.com/260x200" alt="Cultural Event Image" width="260" style="height: auto; display: block;" />
                                                    </p>
                                                    <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 24px;">Discover and participate in cultural events and activities.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Call to Action -->
                    <tr>
                        <td align="center" style="padding: 30px 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                                <tr>
                                    <td align="center" style="padding: 0;">
                                        <a href="https://iconnect.ramrachai.com/admin/dashboard" style="background-color: #3B82F6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;">Visit Your Dashboard</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #3B82F6;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0; font-size: 9px; color: #ffffff;">
                                <tr>
                                    <td style="padding: 0; width: 50%;" align="left">
                                        <p style="margin: 0; font-size: 14px; line-height: 16px;">&copy; 2024 Indigenous Connect. All rights reserved.</p>
                                    </td>
                                    <td style="padding: 0; width: 50%;" align="right">
                                        <table role="presentation" style="border-collapse: collapse; border: 0; border-spacing: 0;">
                                            <tr>
                                                <td style="padding: 0 0 0 10px; width: 38px;">
                                                    <a href="http://www.twitter.com/" style="color: #ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height: auto; display: block; border: 0;" /></a>
                                                </td>
                                                <td style="padding: 0 0 0 10px; width: 38px;">
                                                    <a href="http://www.facebook.com/" style="color: #ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height: auto; display: block; border: 0;" /></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
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