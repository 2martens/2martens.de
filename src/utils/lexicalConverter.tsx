import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import { SerializedEditorStateSchema } from "../types/schemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-217da5ee1c/icons";
import { buildImageSrc } from "./imageUrl";
import type { SerializedHeadingNode, SerializedListItemNode, SerializedListNode, SerializedQuoteNode, SerializedUploadNode } from "@payloadcms/richtext-lexical";

// Utility function to safely render rich text
export function renderRichText(
  content: SerializedEditorState<SerializedLexicalNode>,
  className: string
) {
  // Validate the content using Zod schema
  const validationResult = SerializedEditorStateSchema.safeParse(content);

  if (!validationResult.success) {
    console.error("Invalid rich text content:", validationResult.error);
    return null;
  }

  if (!content) return null;

  return (
    <RichText className={className} data={content} converters={jsxConverters} />
  );
}

// Custom converters for specific node types
const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  horizontalrule: horizontalRuleConverter(),
  quote: quoteConverter(),
  upload: uploadConverter(),
  heading: headingConverter(),
  list: listConverter(),
});



function horizontalRuleConverter() {
  return () => <hr className="mt-6 border-t border-gray-200" />;
}

function quoteConverter() {
  return ({ node }: { node: SerializedQuoteNode }) => (
    <figure className="border-l border-indigo-600 pl-8">
      <blockquote className="text-xl/8 font-semibold tracking-tight text-sand">
        {node.children.map((child: SerializedLexicalNode) => (
          <p>"{child.text}"</p>
        ))}
      </blockquote>
    </figure>
  );
}

function uploadConverter() {
  return ({ node }: { node: SerializedUploadNode }) => (
    <img
      width={node.value.width}
      height={node.value.height}
      src={buildImageSrc(node.value.url)}
      alt={node.value.alt}
      className="aspect-video rounded-xl bg-gray-50 object-cover" />
  );
}

function headingConverter() {
  return ({ node }: { node: SerializedHeadingNode }) => (
    (node.tag === "h1" && (
      <h1 className="text-4xl font-semibold tracking-tight text-pretty text-sand sm:text-5xl">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h1>
    )) ||
    (node.tag === "h2" && (
      <h2 className="text-3xl font-semibold tracking-tight text-sand">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h2>
    )) ||
    (node.tag === "h3" && (
      <h3 className="text-2xl font-semibold tracking-tight text-sand">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h3>
    )) ||
    (node.tag === "h4" && (
      <h4 className="text-xl font-semibold tracking-tight text-sand">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h4>
    )) ||
    (node.tag === "h5" && (
      <h5 className="text-lg font-semibold tracking-tight text-sand">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h5>
    )) ||
    (node.tag === "h6" && (
      <h6 className="text-base font-semibold tracking-tight text-sand">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h6>
    )));
}

function listConverter() {
  return ({ node }: { node: SerializedListNode }) => (node.tag === "ul" && node.listType === "check" && (
    checkListConverter(node)
  )) ||
    (node.tag === "ul" && node.listType === "bullet" && (
      bulletListConverter(node)
    )) ||
    (node.tag === "ol" && node.listType === "number" && (
      numberedListConverter(node)
    ));
}


function checkListConverter(node: SerializedListNode) {
  return <ul className="mt-8 max-w-xl space-y-4 text-sand" role="list">
    {node.children.filter((child): child is SerializedListItemNode => child.type === 'listitem').map((child, index) => (
      <li key={index} className="flex gap-x-3" role="listitem">
        {(child.checked && (
          <FontAwesomeIcon
            icon={byPrefixAndName.far["square-check"]}
            aria-hidden="true"
            className="size-5 flex-none text-yellow" />
        )) || (
            <FontAwesomeIcon
              icon={byPrefixAndName.far["square"]}
              aria-hidden="true"
              className="size-5 flex-none text-yellow" />
          )}
        {child.children.map((textNode: SerializedLexicalNode) => child.checked ? (
          <span className="line-through">{textNode.text}</span>
        ) : (
          <span>{textNode.text}</span>
        )
        )}
      </li>
    ))}
  </ul>;
}

function bulletListConverter(node: SerializedListNode) {
  return <ul className="mt-8 max-w-xl space-y-4 text-sand" role="list">
    {node.children.filter((child): child is SerializedListItemNode => child.type === 'listitem').map((child, index) => (
      <li key={index} className="flex gap-x-3" role="listitem">
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["circle-check"]}
          aria-hidden="true"
          className="size-5 flex-none text-yellow" />
        {child.children.map((textNode: SerializedLexicalNode, textIndex: number) => (
          <span key={textIndex}>{textNode.text}</span>
        ))}
      </li>
    ))}
  </ul>;
}

function numberedListConverter(node: SerializedListNode) {
  return <ol className="mt-8 max-w-xl space-y-4 text-sand" role="list">
    {node.children.filter((child): child is SerializedListItemNode => child.type === 'listitem').map((child, index) => (
      <li key={index} className="flex gap-x-3" role="listitem">
        <span className="size-5 flex-none text-indigo-600">
          {(index + 1).toString() + "."}
        </span>
        {child.children.map((textNode, textIndex) => (
          <span key={textIndex}>{textNode.text}</span>
        ))}
      </li>
    ))}
  </ol>;
}
