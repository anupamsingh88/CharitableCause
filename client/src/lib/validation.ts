import { z } from 'zod';

// User schemas
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Confirm password is required" }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Donation schemas
export const insertDonationItemSchema = z.object({
  name: z.string().min(1, { message: "Item name is required" }),
  category: z.string().min(1, { message: "Please select a category" }),
  condition: z.string().min(1, { message: "Please select a condition" }),
  description: z.string().min(10, { message: "Description should be at least 10 characters" }),
  location: z.string().min(1, { message: "Location is required" }),
  selfPickup: z.boolean().default(false),
  canDeliver: z.boolean().default(false),
});

// Contact message schema
export const insertContactMessageSchema = z.object({
  name: z.string().min(1, { message: "Your name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message should be at least 10 characters" }),
});
