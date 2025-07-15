import { z } from "zod";

const phoneRegex = /^[0-9]{10}$/;

export const authSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number"),
  password: z
    .string()
    .min(1, "Password is required")
});

export const validatePasswordConditions = (password: string) => {
  const upperLowerRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
  const minLengthRegex = /^.{8,}$/;
  const numberRegex = /^(?=.*\d)/;

  return {
    hasUpperLower: upperLowerRegex.test(password),
    hasMinLength: minLengthRegex.test(password),
    hasNumber: numberRegex.test(password)
  };
};

export const isValidPassword = (password: string) => {
  const conditions = validatePasswordConditions(password);
  return conditions.hasUpperLower && conditions.hasMinLength && conditions.hasNumber;
};

export type AuthFormData = z.infer<typeof authSchema>;