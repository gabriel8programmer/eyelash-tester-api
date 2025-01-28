import { z } from "zod";

const UserBaseSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["standard", "admin"]).default("standard"),
});

const UserCreateSchema = UserBaseSchema;

const UserUpdateSchema = UserBaseSchema.partial();

const LoginSchema = UserBaseSchema.pick({ email: true, password: true });

export { UserCreateSchema, UserUpdateSchema, LoginSchema };
