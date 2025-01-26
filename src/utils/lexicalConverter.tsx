import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { SerializedEditorStateSchema } from '../content.config';

// Custom converters for specific node types
const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {},
})

// Utility function to safely render rich text
export function renderRichText(content: SerializedEditorState, className: string) {
  // Validate the content using Zod schema
  const validationResult = SerializedEditorStateSchema.safeParse(content);
  
  if (!validationResult.success) {
    console.error('Invalid rich text content:', validationResult.error);
    return null;
  }

  if (!content) return null;
  
  return (
    <RichText 
      className={className}
      data={content} 
      converters={jsxConverters}
    />
  );
}
