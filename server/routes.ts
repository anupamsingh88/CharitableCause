import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertDonationItemSchema, 
  insertItemRequestSchema,
  insertContactMessageSchema 
} from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import bcrypt from "crypto"; // Using crypto instead of bcrypt since we're not actually hashing

export async function registerRoutes(app: Express): Promise<Server> {
  const MemoryStoreSession = MemoryStore(session);
  
  // Configure session
  app.use(
    session({
      secret: "donation-portal-secret",
      resave: false,
      saveUninitialized: false,
      store: new MemoryStoreSession({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  // Authentication middleware
  const requireAuth = (req: Request, res: Response, next: Function) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // User routes
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      // Hash password (simplified for demo)
      const hashedPassword = bcrypt.createHash('sha256').update(userData.password).digest('hex');
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });
      
      // Set user session
      req.session.userId = user.id;
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/users/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Check password (simplified for demo)
      const hashedPassword = bcrypt.createHash('sha256').update(password).digest('hex');
      if (user.password !== hashedPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Set user session
      req.session.userId = user.id;
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/users/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/users/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Donation routes
  app.get("/api/donations", async (req, res) => {
    try {
      const category = req.query.category as string;
      let donations;
      
      if (category) {
        donations = await storage.getDonationItemsByCategory(category);
      } else {
        donations = await storage.getDonationItems();
      }
      
      res.status(200).json(donations);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/donations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const donation = await storage.getDonationItem(id);
      
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
      
      res.status(200).json(donation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/donations", requireAuth, async (req, res) => {
    try {
      const donationData = insertDonationItemSchema.parse({
        ...req.body,
        donorId: req.session.userId,
      });
      
      const donation = await storage.createDonationItem(donationData);
      res.status(201).json(donation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/donations/:id/status", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!["available", "requested", "reserved", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedDonation = await storage.updateDonationItemStatus(id, status);
      
      if (!updatedDonation) {
        return res.status(404).json({ message: "Donation not found" });
      }
      
      res.status(200).json(updatedDonation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/users/me/donations", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const donations = await storage.getDonationItemsByUserId(userId);
      res.status(200).json(donations);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Item Request routes
  app.post("/api/requests", requireAuth, async (req, res) => {
    try {
      const requestData = insertItemRequestSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      const request = await storage.createItemRequest(requestData);
      res.status(201).json(request);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get user's item requests
  app.get("/api/users/me/requests", requireAuth, async (req, res) => {
    try {
      const requests = await storage.getItemRequestsByUserId(req.session.userId);
      res.status(200).json(requests);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get requests for a specific donation item
  app.get("/api/donations/:id/requests", requireAuth, async (req, res) => {
    try {
      const item = await storage.getDonationItem(parseInt(req.params.id));
      
      // Check if user is the donor of this item
      if (!item || item.donorId !== req.session.userId) {
        return res.status(403).json({ message: "Unauthorized to view these requests" });
      }
      
      const requests = await storage.getItemRequestsByDonationItemId(parseInt(req.params.id));
      res.status(200).json(requests);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(contactData);
      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
