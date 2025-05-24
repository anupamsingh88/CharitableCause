import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
});

// Donation item schema
export const donationItems = pgTable("donation_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  condition: text("condition").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  selfPickup: boolean("self_pickup").default(false),
  canDeliver: boolean("can_deliver").default(false),
  status: text("status").default("available"),
  createdAt: timestamp("created_at").defaultNow(),
  donorId: integer("donor_id").notNull().references(() => users.id),
});

export const insertDonationItemSchema = createInsertSchema(donationItems).pick({
  name: true,
  category: true,
  condition: true,
  description: true,
  location: true,
  imageUrl: true,
  selfPickup: true,
  canDeliver: true,
  donorId: true,
});

// Item Request schema
export const itemRequests = pgTable("item_requests", {
  id: serial("id").primaryKey(),
  message: text("message"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userId: integer("user_id").notNull().references(() => users.id),
  donationItemId: integer("donation_item_id").notNull().references(() => donationItems.id),
});

export const insertItemRequestSchema = createInsertSchema(itemRequests).pick({
  message: true,
  userId: true,
  donationItemId: true,
});

// Contact message schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type DonationItem = typeof donationItems.$inferSelect;
export type InsertDonationItem = z.infer<typeof insertDonationItemSchema>;

export type ItemRequest = typeof itemRequests.$inferSelect;
export type InsertItemRequest = z.infer<typeof insertItemRequestSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// Category options
export const CATEGORIES = [
  "Furniture",
  "Clothing",
  "Electronics",
  "Household",
  "Toys",
  "Books",
  "Other"
] as const;

// Condition options
export const CONDITIONS = [
  "New",
  "Like New",
  "Good",
  "Fair",
  "Needs Repair"
] as const;

// Status options
export const STATUSES = [
  "available",
  "requested",
  "reserved",
  "completed"
] as const;

// Contact subject options
export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Donation Question",
  "Technical Support",
  "Feedback",
  "Partnerships"
] as const;
