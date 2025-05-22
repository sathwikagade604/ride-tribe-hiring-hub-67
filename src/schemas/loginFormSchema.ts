
import { z } from 'zod';
import { RoleKey } from '../constants/roleAccessLevels';

// Login form schema
export const loginFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.enum(['employee', 'support', 'service', 'chat'] as const),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
