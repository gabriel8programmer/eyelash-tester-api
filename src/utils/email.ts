import { transporter } from "../config/transporter";

export const setEmailTemplateWithVerificationCode = (verificationCode: number) => {
  return `
     <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f4f4">
    <tr>
    <td align="center">
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center;">
    <tr>
    <td align="center">
    <h2 style="font-family: Arial, sans-serif;">Seu Código de Verificação</h2>
    <p style="font-family: Arial, sans-serif;">Use o código abaixo para verificar seu e-mail:</p>
    <p style="font-size: 24px; font-weight: bold; color: #333; background: #e0e0e0; padding: 10px; border-radius: 5px; display: inline-block; margin: 20px 0;">${verificationCode}</p>
    <p style="font-family: Arial, sans-serif;">Se você não solicitou este código, ignore este e-mail.</p>
    </td>
    </tr>
    <tr>
    <td align="center" style="font-size: 12px; color: #777; margin-top: 20px; font-family: Arial, sans-serif;">&copy; 2024 SeuApp. Todos os direitos reservados.</td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    `;
};

export const sendVerificationCode = async (email: string): Promise<number> => {
  const verificationCode = Math.floor(1000 + Math.random() * 9000);

  const emailConfig = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verificação de email",
    html: setEmailTemplateWithVerificationCode(verificationCode),
  };

  await transporter.sendMail(emailConfig);

  return verificationCode;
};
