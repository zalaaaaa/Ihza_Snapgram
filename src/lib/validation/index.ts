import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(5, { message: "Too short" }),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password:z.string().min(8, {message:"Password minimal 8 karakter"})
});
