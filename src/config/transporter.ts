require("dotenv").config();
import nodemailer from "nodemailer";
import { z } from "zod";

const emailTransporterSchema = z.object({
  host: z.string(),
  port: z.string().transform((value) => {
    if (value !== "NaN") {
      return Number(value);
    }
  }),
  secure: z.boolean().default(true),
  auth: z.object({
    user: z.string(),
    pass: z.string(),
  }),
});

const envFields = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const transporterParsed = emailTransporterSchema.parse(envFields);

export const transporter = nodemailer.createTransport(transporterParsed);
