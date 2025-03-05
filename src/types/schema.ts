import { z } from "zod";

const UserBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters"),
  role: z.string().default("admin"),
});

export const EyelashSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string(),
});

export const envSchema = z.object({
  PORT: z.string(),
  API_JWT_SECRET_KEY: z.string(),
  MONGODB_URL_CON: z.string(),
});

export const EyelashUpdateSchema = EyelashSchema.partial();

export const UserCreateSchema = UserBaseSchema;

export const UserUpdateSchema = UserBaseSchema.partial();

export const LoginSchema = UserBaseSchema.pick({ email: true, password: true });
