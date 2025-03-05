import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { transporter } from "../config/transporter";
import { SentMessageInfo } from "nodemailer";

const emailTemplateVerifyCode = (verificationCode: number) => {
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

declare module "express" {
  export interface Request {
    verificationCode?: number;
    info?: SentMessageInfo;
  }
}

const emailSchema = z.object({ email: z.string().email() });

export const sendVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = emailSchema.parse(req.body);

  try {
    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    const emailConfig = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verificação de email",
      html: emailTemplateVerifyCode(verificationCode),
    };

    const info = await transporter.sendMail(emailConfig);

    req.verificationCode = verificationCode;
    req.info = info;

    next();
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
};

const verificationCodeSchema = z.object({
  verificationCode: z.number().optional(),
});

export const ensureEmailVerified = async (req: Request, res: Response, next: NextFunction) => {
  const { verificationCode } = verificationCodeSchema.parse(req.body);

  if (!verificationCode) throw new Error("Error: It's necessary a verification code!");

  if (verificationCode !== req.verificationCode) {
    throw new Error("Error: Invalid Verification Code for this email");
  }

  next();
};
