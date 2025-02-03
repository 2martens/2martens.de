import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import { SerializedEditorStateSchema } from "../content.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-217da5ee1c/icons";
import { buildImageSrc } from "./imageUrl";

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
  return ({ node }) => (
    <figure className="border-l border-indigo-600 pl-8">
      <blockquote className="text-xl/8 font-semibold tracking-tight text-gray-900">
        {node.children.map((child: SerializedLexicalNode) => (
          <p>"{child.text}"</p>
        ))}
      </blockquote>
    </figure>
  );
}

function uploadConverter() {
  return ({ node }) => (
    <img
      width={node.value.width}
      height={node.value.height}
      src={buildImageSrc(node.value.url)}
      alt={node.value.alt}
      className="aspect-video rounded-xl bg-gray-50 object-cover" />
  );
}

function headingConverter() {
  return ({ node }) => (
    (node.tag === "h1" && (
      <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h1>
    )) ||
    (node.tag === "h2" && (
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h2>
    )) ||
    (node.tag === "h3" && (
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h3>
    )) ||
    (node.tag === "h4" && (
      <h4 className="text-xl font-semibold tracking-tight text-gray-900">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h4>
    )) ||
    (node.tag === "h5" && (
      <h5 className="text-lg font-semibold tracking-tight text-gray-900">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h5>
    )) ||
    (node.tag === "h6" && (
      <h6 className="text-base font-semibold tracking-tight text-gray-900">
        {node.children.map((child: SerializedLexicalNode) => child.text)}
      </h6>
    ));
}

function listConverter() {
  return ({ node }) => (node.tag === "ul" && node.listType === "check" && (
    checkListConverter(node)
  )) ||
    (node.tag === "ul" && node.listType === "bullet" && (
      bulletListConverter(node)
    )) ||
    (node.tag === "ol" && node.listType === "number" && (
      numberedListConverter(node)
    ));
}


function checkListConverter(node) {
  return <ul className="mt-8 max-w-xl space-y-4 text-gray-600" role="list">
    {node.children.map((child: SerializedLexicalNode) => (
      <li className="flex gap-x-3" role="listitem">
        {(child.checked && (
          <FontAwesomeIcon
            icon={byPrefixAndName.far["square-check"]}
            aria-hidden="true"
            className="size-5 flex-none text-indigo-600" />
        )) || (
            <FontAwesomeIcon
              icon={byPrefixAndName.far["square"]}
              aria-hidden="true"
              className="size-5 flex-none text-indigo-600" />
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

function bulletListConverter(node) {
  return <ul className="mt-8 max-w-xl space-y-4 text-gray-600" role="list">
    {node.children.map((child: SerializedLexicalNode) => (
      <li className="flex gap-x-3" role="listitem">
        <FontAwesomeIcon
          icon={byPrefixAndName.fas["circle-check"]}
          aria-hidden="true"
          className="size-5 flex-none text-indigo-600" />
        {child.children.map((textNode: SerializedLexicalNode) => (
          <span>{textNode.text}</span>
        ))}
      </li>
    ))}
  </ul>;
}

function numberedListConverter(node) {
  return <ol className="mt-8 max-w-xl space-y-4 text-gray-600" role="list">
    {node.children.map((child: SerializedLexicalNode) => (
      <li className="flex gap-x-3" role="listitem">
        <span className="size-5 flex-none text-indigo-600">
          {child.value}.
        </span>
        {child.children.map((textNode: SerializedLexicalNode) => (
          <span>{textNode.text}</span>
        ))}
      </li>
    ))}
  </ol>;
}

