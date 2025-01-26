// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// Define Post type based on the schema
export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  content: any;
  updatedAt: string;
  createdAt: string;
}

export interface HeaderCard {
    id: string;
    name: string;
    description: string;
    order: number;
    icon: string;
    updatedAt: string;
    createdAt: string;
  }

// Define Lexical RichText schema
const LexicalNodeSchema = z.object({
  type: z.string(),
  version: z.number(),
  children: z.array(z.any()).optional(),
  text: z.string().optional(),
  format: z.enum(['left', 'center', 'right', 'justify', '']),
  style: z.string().optional(),
  mode: z.string().optional(),
});

export const SerializedEditorStateSchema = z.object({
  root: z.object({
    type: z.string(),
    children: z.array(LexicalNodeSchema),
    direction: z.enum(['ltr', 'rtl']).nullable(),
    format: z.enum(['left', 'center', 'right', 'justify', '']),
    indent: z.number(),
    version: z.number(),
  }),
});

// 3. Define your collection(s)
const posts = defineCollection({
  loader: async () => {
    const response = await fetch("http://localhost:3000/api/posts");
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.docs.map((post: Post) => ({
      ...post,
    }));
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string().nullable(),
    content: SerializedEditorStateSchema,
    updatedAt: z.string(),
    createdAt: z.string(),
  }),
});

const headerCards = defineCollection({
    loader: async () => {
      const response = await fetch("http://localhost:3000/api/header-cards");
      const data = await response.json();
      // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
      return data.docs.map((card: HeaderCard) => ({
        ...card,
      }));
    },
    schema: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      order: z.number(),
      icon: z.string(),
      updatedAt: z.string(),
      createdAt: z.string(),
    }),
  });

// 4. Export a single `collections` object to register your collection(s)
export const collections = { posts, headerCards };