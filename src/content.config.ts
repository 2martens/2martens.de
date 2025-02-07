// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
import type { Post, HeaderCard, HeaderMenuItem, FooterSocialMediaIcon, FooterMenuItem, Category, Author } from "./types/collections";
import { MediaSchema, SerializedEditorStateSchema } from "./types/schemas";

export const CMS_BASE_URL = import.meta.env.CMS_BASE_URL || "http://localhost:3000";
const CMS_API_KEY = import.meta.env.CMS_API_KEY || "";

// 3. Define your collection(s)
const posts = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_BASE_URL + "/api/posts", {
      headers: {
        Authorization: `clients API-Key ${CMS_API_KEY}`,
      },
    });
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
    visible: z.boolean(),
    description: z.string(),
    category: z.object({
      id: z.string(),
      title: z.string(),
      slug: z.string(),
      href: z.string(),
      updatedAt: z.coerce.date(),
      createdAt: z.coerce.date(),
    }),
    author: z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      href: z.string(),
      role: z.string(),
      image: MediaSchema,
      updatedAt: z.coerce.date(),
      createdAt: z.coerce.date(),
    }),
    content: SerializedEditorStateSchema,
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    publishedAt: z.coerce.date(),
  }),
});

const speeches = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_BASE_URL + "/api/speeches", {
      headers: {
        Authorization: `clients API-Key ${CMS_API_KEY}`,
      },
    });
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
    author: z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      href: z.string(),
      role: z.string(),
      image: MediaSchema,
      updatedAt: z.coerce.date(),
      createdAt: z.coerce.date(),
    }),
    content: SerializedEditorStateSchema,
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    publishedAt: z.coerce.date(),
  }),
});

const headerCards = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_BASE_URL + "/api/header-cards", {
      headers: {
        Authorization: `clients API-Key ${CMS_API_KEY}`,
      },
    });
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
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  }),
});

const headerMenuItems = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_BASE_URL + "/api/header-menu-items", {
      headers: {
        Authorization: `clients API-Key ${CMS_API_KEY}`,
      },
    });
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.docs.map((item: HeaderMenuItem) => ({
      ...item,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    link: z.string(),
    order: z.number(),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  }),
});

const footerSocialMediaIcons = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_BASE_URL + "/api/footer-social-media-icons", {
      headers: {
        Authorization: `clients API-Key ${CMS_API_KEY}`,
      },
    });
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.docs.map((item: FooterSocialMediaIcon) => ({
      ...item,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    link: z.string(),
    order: z.number(),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  }),
});

const footerMenuItems = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_BASE_URL + "/api/footer-menu-items", {
      headers: {
        Authorization: `clients API-Key ${CMS_API_KEY}`,
      },
    });
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.docs.map((item: FooterMenuItem) => ({
      ...item,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    link: z.string(),
    order: z.number(),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  }),
});

const categories = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_BASE_URL + "/api/categories", {
      headers: {
        Authorization: `clients API-Key ${CMS_API_KEY}`,
      },
    });
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.docs.map((item: Category) => ({
      ...item,
    }));
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  }),
});

const authors = defineCollection({
  loader: async () => {
    const response = await fetch(CMS_BASE_URL + "/api/authors", {
      headers: {
        Authorization: `clients API-Key ${CMS_API_KEY}`,
      },
    });
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.docs.map((item: Author) => ({
      ...item,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    href: z.string(),
    role: z.string(),
    imageUrl: z.string(),
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { posts, speeches, headerCards, headerMenuItems, footerSocialMediaIcons, footerMenuItems, categories, authors };
