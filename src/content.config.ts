// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// Define Post type based on the schema
export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  author: string;
  content: any;
  updatedAt: Date;
  createdAt: Date;
  publishedAt: Date;
}

export interface HeaderCard {
  id: string;
  name: string;
  description: string;
  order: number;
  icon: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface HeaderMenuItem {
  id: string;
  name: string;
  link: string;
  order: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface FooterSocialMediaIcon {
  id: string;
  name: string;
  icon: string;
  link: string;
  order: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface FooterMenuItem {
  id: string;
  name: string;
  link: string;
  order: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  href: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  href: string;
  role: string;
  imageUrl: string;
  updatedAt: Date;
  createdAt: Date;
}

const BaseNodeSchema = z.object({
  version: z.number(),
  type: z.string(),
})

const HorizontalRuleNodeSchema = BaseNodeSchema.extend({
  type: z.literal("horizontalrule"),
})

const LineBreakNodeSchema = BaseNodeSchema.extend({
  type: z.literal("linebreak"),
})

const TextNodeSchema = BaseNodeSchema.extend({
  detail: z.number(),
  format: z.number(),
  mode: z.string(),
  style: z.string(),
  text: z.string(),
  type: z.literal("text"),
})

const ListItemSchema = BaseNodeSchema.extend({
  type: z.literal("listitem"),
  children: z.array(TextNodeSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  checked: z.boolean().optional(),
  value: z.number().optional(),
})

const ParagraphNodeSchema = BaseNodeSchema.extend({
  type: z.literal("paragraph"),
  children: z.array(z.union([TextNodeSchema, LineBreakNodeSchema])).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  textStyle: z.string().optional(),
  textFormat: z.number().optional(),
  indent: z.number().optional(),
})

const QuoteNodeSchema = BaseNodeSchema.extend({
  type: z.literal("quote"),
  children: z.array(TextNodeSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
})

const HeadingNodeSchema = BaseNodeSchema.extend({
  type: z.literal("heading"),
  children: z.array(TextNodeSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  tag: z.string().optional(),
})

const ListNodeSchema = BaseNodeSchema.extend({
  type: z.literal("list"),
  children: z.array(ListItemSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  listType: z.enum(["number", "check", "bullet"]).optional(),
  start: z.number().optional(),
  tag: z.string().optional(),
})

const MediaSchema = z.object({
  id: z.string(),
  alt: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  url: z.string().nullable(),
  thumbnailURL: z.string().nullable(),
  filename: z.string().nullable(),
  mimeType: z.string().nullable(),
  filesize: z.number().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  focalX: z.number().nullable(),
  focalY: z.number().nullable(),
})

const UploadNodeSchema = BaseNodeSchema.extend({
  type: z.literal("upload"),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  version: z.number(),
  id: z.string(),
  fields: z.any().nullable(),
  relationTo: z.string().nullable(),
  value: MediaSchema,
})

const LexicalNodeSchema = z.discriminatedUnion("type", [
  HorizontalRuleNodeSchema,
  ParagraphNodeSchema,
  QuoteNodeSchema,
  ListNodeSchema,
  HeadingNodeSchema,
  UploadNodeSchema,
]);

export const SerializedEditorStateSchema = z.object({
  root: z.object({
    type: z.string(),
    children: z.array(LexicalNodeSchema),
    direction: z.enum(["ltr", "rtl"]).nullable(),
    format: z.enum(["left", "center", "right", "justify", ""]),
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
    const response = await fetch("http://localhost:3000/api/speeches");
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
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  }),
});

const headerMenuItems = defineCollection({
  loader: async () => {
    const response = await fetch("http://localhost:3000/api/header-menu-items");
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
    const response = await fetch("http://localhost:3000/api/footer-social-media-icons");
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
    const response = await fetch("http://localhost:3000/api/footer-menu-items");
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
    const response = await fetch("http://localhost:3000/api/categories");
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
    const response = await fetch("http://localhost:3000/api/authors");
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
