import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .trim()
    .toLowerCase()
    .max(32, "Too long!"),

  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(16, "Too long!"),

  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters.")
    .max(250, "Too long!")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]`~';]/,
      "Password must contain at least one special character."
    ),

  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, "Username must be at least 5 charcaters.")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores."
    )
    .max(16, "Too long!"),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),

  password: z.string().trim().min(8, "Password must be at least 8 characters."),
});

export type RegisterData = z.infer<typeof registerSchema>;

export type LoginData = z.infer<typeof loginSchema>;
