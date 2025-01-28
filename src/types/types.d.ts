import { z } from "zod";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "standard";
}

interface IEyelash {
  name: string;
  imageUrl?: string;
}
