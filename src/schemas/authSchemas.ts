
import { z } from 'zod';

// Enhanced validation schemas
const emailSchema = z.string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

const phoneSchema = z.string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number');

export const roleSignupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  role: z.enum(['driver', 'rider'] as const),
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  phone: phoneSchema,
  licenseNumber: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.role === 'driver' && (!data.licenseNumber || data.licenseNumber.length < 5)) {
    return false;
  }
  return true;
}, {
  message: "License number is required for drivers (minimum 5 characters)",
  path: ["licenseNumber"],
});

export const roleLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['driver', 'rider'] as const),
});

export const companyAccessSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  department: z.enum(['employee', 'support', 'service', 'chat', 'query', 'tracking', 'technical', 'safety', 'emergency', 'callcenter'] as const),
});

export const companySignupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  employeeId: z.string()
    .min(3, 'Employee ID must be at least 3 characters')
    .max(20, 'Employee ID must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Employee ID can only contain letters, numbers, hyphens, and underscores'),
  department: z.enum(['employee', 'support', 'service', 'chat', 'query', 'tracking', 'technical', 'safety', 'emergency', 'callcenter'] as const),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RoleSignupValues = z.infer<typeof roleSignupSchema>;
export type RoleLoginValues = z.infer<typeof roleLoginSchema>;
export type CompanyAccessValues = z.infer<typeof companyAccessSchema>;
export type CompanySignupValues = z.infer<typeof companySignupSchema>;
