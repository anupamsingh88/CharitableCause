import { 
  User, InsertUser, 
  DonationItem, InsertDonationItem,
  ContactMessage, InsertContactMessage
} from "@shared/schema";

// Storage interface for all data operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Donation operations
  getDonationItem(id: number): Promise<DonationItem | undefined>;
  getDonationItems(limit?: number): Promise<DonationItem[]>;
  getDonationItemsByCategory(category: string): Promise<DonationItem[]>;
  getDonationItemsByUserId(userId: number): Promise<DonationItem[]>;
  createDonationItem(item: InsertDonationItem): Promise<DonationItem>;
  updateDonationItemStatus(id: number, status: string): Promise<DonationItem | undefined>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private donationItems: Map<number, DonationItem>;
  private contactMessages: Map<number, ContactMessage>;
  private userId: number;
  private donationId: number;
  private messageId: number;

  constructor() {
    this.users = new Map();
    this.donationItems = new Map();
    this.contactMessages = new Map();
    this.userId = 1;
    this.donationId = 1;
    this.messageId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Donation methods
  async getDonationItem(id: number): Promise<DonationItem | undefined> {
    return this.donationItems.get(id);
  }

  async getDonationItems(limit?: number): Promise<DonationItem[]> {
    const items = Array.from(this.donationItems.values());
    return limit ? items.slice(0, limit) : items;
  }

  async getDonationItemsByCategory(category: string): Promise<DonationItem[]> {
    return Array.from(this.donationItems.values()).filter(
      (item) => item.category.toLowerCase() === category.toLowerCase(),
    );
  }

  async getDonationItemsByUserId(userId: number): Promise<DonationItem[]> {
    return Array.from(this.donationItems.values()).filter(
      (item) => item.donorId === userId,
    );
  }

  async createDonationItem(insertItem: InsertDonationItem): Promise<DonationItem> {
    const id = this.donationId++;
    const now = new Date();
    const item: DonationItem = { 
      ...insertItem, 
      id, 
      status: "available", 
      createdAt: now 
    };
    this.donationItems.set(id, item);
    return item;
  }

  async updateDonationItemStatus(id: number, status: string): Promise<DonationItem | undefined> {
    const item = this.donationItems.get(id);
    if (!item) return undefined;
    
    const updatedItem: DonationItem = { ...item, status };
    this.donationItems.set(id, updatedItem);
    return updatedItem;
  }

  // Contact methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageId++;
    const now = new Date();
    const message: ContactMessage = { ...insertMessage, id, createdAt: now };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
