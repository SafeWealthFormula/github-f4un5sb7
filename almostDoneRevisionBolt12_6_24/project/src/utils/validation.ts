import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const phoneSchema = z.string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number must not exceed 15 digits')
  .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format');

export const quizAnswerSchema = z.object({
  questionId: z.string(),
  answerId: z.array(z.string())
});

export const userInfoSchema = z.object({
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  quizType: z.enum(['quick', 'standard'])
});

export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePhone = (phone: string) => {
  try {
    phoneSchema.parse(phone);
    return true;
  } catch {
    return false;
  }
};