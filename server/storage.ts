import { 
  User, InsertUser, 
  DonationItem, InsertDonationItem,
  ItemRequest, InsertItemRequest,
  ContactMessage, InsertContactMessage,
  users, donationItems, itemRequests, contactMessages
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

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
  
  // Request operations
  createItemRequest(request: InsertItemRequest): Promise<ItemRequest>;
  getItemRequestsByUserId(userId: number): Promise<ItemRequest[]>;
  getItemRequestsByDonationItemId(itemId: number): Promise<ItemRequest[]>;
  updateItemRequestStatus(id: number, status: string): Promise<ItemRequest | undefined>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Donation methods
  async getDonationItem(id: number): Promise<DonationItem | undefined> {
    const [item] = await db.select().from(donationItems).where(eq(donationItems.id, id));
    return item;
  }

  async getDonationItems(limit?: number): Promise<DonationItem[]> {
    let query = db.select().from(donationItems).orderBy(desc(donationItems.createdAt));
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return await query;
  }

  async getDonationItemsByCategory(category: string): Promise<DonationItem[]> {
    return await db
      .select()
      .from(donationItems)
      .where(eq(donationItems.category, category))
      .orderBy(desc(donationItems.createdAt));
  }

  async getDonationItemsByUserId(userId: number): Promise<DonationItem[]> {
    return await db
      .select()
      .from(donationItems)
      .where(eq(donationItems.donorId, userId))
      .orderBy(desc(donationItems.createdAt));
  }

  async createDonationItem(insertItem: InsertDonationItem): Promise<DonationItem> {
    const [item] = await db
      .insert(donationItems)
      .values({
        ...insertItem,
        status: "available",
      })
      .returning();
    
    return item;
  }

  async updateDonationItemStatus(id: number, status: string): Promise<DonationItem | undefined> {
    const [updatedItem] = await db
      .update(donationItems)
      .set({ status })
      .where(eq(donationItems.id, id))
      .returning();
    
    return updatedItem;
  }

  // Item Request methods
  async createItemRequest(insertRequest: InsertItemRequest): Promise<ItemRequest> {
    const [request] = await db
      .insert(itemRequests)
      .values(insertRequest)
      .returning();
    
    // Update the donation item status to 'requested'
    await this.updateDonationItemStatus(insertRequest.donationItemId, 'requested');
    
    return request;
  }

  async getItemRequestsByUserId(userId: number): Promise<ItemRequest[]> {
    return await db
      .select()
      .from(itemRequests)
      .where(eq(itemRequests.userId, userId))
      .orderBy(desc(itemRequests.createdAt));
  }

  async getItemRequestsByDonationItemId(itemId: number): Promise<ItemRequest[]> {
    return await db
      .select()
      .from(itemRequests)
      .where(eq(itemRequests.donationItemId, itemId))
      .orderBy(desc(itemRequests.createdAt));
  }

  async updateItemRequestStatus(id: number, status: string): Promise<ItemRequest | undefined> {
    const [updatedRequest] = await db
      .update(itemRequests)
      .set({ status })
      .where(eq(itemRequests.id, id))
      .returning();
    
    return updatedRequest;
  }

  // Contact methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    
    return message;
  }
}

export const storage = new DatabaseStorage();
