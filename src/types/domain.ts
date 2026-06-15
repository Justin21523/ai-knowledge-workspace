import { z } from "zod";

// ==========================================
// 1. Document Model (文件模型)
// ==========================================

// Define the schema for a Document using Zod
export const documentSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  content: z.string(), // The raw text content of the document
  summary: z.string().optional(), // AI-generated summary
  status: z.enum(["processing", "ready", "error"]), // Upload and parsing status
  tags: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Infer the TypeScript type from the Zod schema
export type Document = z.infer<typeof documentSchema>;

// ==========================================
// 2. Citation Model (引用來源模型)
// ==========================================
// This links an AI response back to a specific part of a document

export const citationSchema = z.object({
  id: z.string().uuid(),
  documentId: z.string().uuid(),
  documentTitle: z.string(), // Denormalized for easier display without joining
  text: z.string(), // The exact chunk of text referenced
  pageNumber: z.number().optional(), // Optional: if it's a PDF
  chunkIndex: z.number(), // Which chunk of the document this is
});

export type Citation = z.infer<typeof citationSchema>;

// ==========================================
// 3. Chat Message Model (聊天訊息模型)
// ==========================================

export const chatMessageSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  citations: z.array(citationSchema).default([]), // Assistant messages may have citations
  createdAt: z.string().datetime(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

// ==========================================
// 4. Workspace / Knowledge Base Model (工作區模型)
// ==========================================
// A collection of documents grouped by a research topic

export const workspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Workspace name is required"),
  description: z.string().optional(),
  documentIds: z.array(z.string().uuid()), // References to Document IDs
  createdAt: z.string().datetime(),
});

export type Workspace = z.infer<typeof workspaceSchema>;

// ==========================================
// 5. API Response Wrappers (API 回應包裝)
// ==========================================
// Standardize how our mock API (and later FastAPI) returns data

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.object({
      message: z.string(),
      code: z.string().optional(),
    }).optional(),
  });

export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<z.ZodTypeAny>>> & {
  data?: T;
};