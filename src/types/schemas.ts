import { z } from "astro:content";

export const BaseNodeSchema = z.object({
  version: z.number(),
  type: z.string(),
});

export const HorizontalRuleNodeSchema = BaseNodeSchema.extend({
  type: z.literal("horizontalrule"),
});

export const LineBreakNodeSchema = BaseNodeSchema.extend({
  type: z.literal("linebreak"),
});

export const TextNodeSchema = BaseNodeSchema.extend({
  detail: z.number(),
  format: z.number(),
  mode: z.string(),
  style: z.string(),
  text: z.string(),
  type: z.literal("text"),
});

export const AutoLinkNodeSchema = BaseNodeSchema.extend({
  children: z.array(TextNodeSchema).optional(),
  fields: z
    .object({
      linkType: z.string(),
      url: z.string(),
      newTab: z.boolean().optional(),
    })
    .nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  type: z.enum(["autolink", "link"]),
});

export const DeepListItemSchema = BaseNodeSchema.extend({
  type: z.literal("listitem"),
  children: z.array(TextNodeSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  checked: z.boolean().optional(),
  value: z.number().optional(),
});

export const DeepListSchema = BaseNodeSchema.extend({
  type: z.literal("list"),
  children: z.array(DeepListItemSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  listType: z.enum(["number", "check", "bullet"]).optional(),
  start: z.number().optional(),
  tag: z.string().optional(),
});

export const ListItemSchema = BaseNodeSchema.extend({
  type: z.literal("listitem"),
  children: z.array(z.union([TextNodeSchema, DeepListSchema])).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  checked: z.boolean().optional(),
  value: z.number().optional(),
});

export const ParagraphNodeSchema = BaseNodeSchema.extend({
  type: z.literal("paragraph"),
  children: z
    .array(z.union([TextNodeSchema, LineBreakNodeSchema, AutoLinkNodeSchema]))
    .optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  textStyle: z.string().optional(),
  textFormat: z.number().optional(),
  indent: z.number().optional(),
});

export const QuoteNodeSchema = BaseNodeSchema.extend({
  type: z.literal("quote"),
  children: z.array(TextNodeSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
});

export const HeadingNodeSchema = BaseNodeSchema.extend({
  type: z.literal("heading"),
  children: z.array(TextNodeSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  tag: z.string().optional(),
});

export const ListNodeSchema = BaseNodeSchema.extend({
  type: z.literal("list"),
  children: z.array(ListItemSchema).optional(),
  direction: z.enum(["ltr", "rtl"]).nullable(),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  indent: z.number().optional(),
  listType: z.enum(["number", "check", "bullet"]).optional(),
  start: z.number().optional(),
  tag: z.string().optional(),
});

export const MediaSchema = z.object({
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
});

export const UploadNodeSchema = BaseNodeSchema.extend({
  type: z.literal("upload"),
  format: z.enum(["left", "center", "right", "justify", ""]).optional(),
  version: z.number(),
  id: z.string(),
  fields: z.any().nullable(),
  relationTo: z.string().nullable(),
  value: MediaSchema,
});

export const LexicalNodeSchema = z.discriminatedUnion("type", [
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
