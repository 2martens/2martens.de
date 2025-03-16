import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type {
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedParagraphNode,
} from "@payloadcms/richtext-lexical/lexical";
import { SerializedEditorStateSchema } from "../types/schemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-217da5ee1c/icons";
import { buildImageSrc } from "./imageUrl";
import type {
  SerializedHeadingNode,
  SerializedListItemNode,
  SerializedListNode,
  SerializedQuoteNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";

const headingCounts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };

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
  list: listConverter,
  paragraph: paragraphConverter(),
});

function paragraphConverter() {
  return ({ node }: { node: SerializedParagraphNode }) => (
    <p className="text-base/[2] mb-4 text-pretty">
      {node.children.map((child: SerializedLexicalNode) => child.text)}
    </p>
  );
}

function horizontalRuleConverter() {
  return () => <hr className="mt-6 border-t border-gray-200" />;
}

function quoteConverter() {
  return ({ node }: { node: SerializedQuoteNode }) => (
    <figure className="border-l border-indigo-600 pl-8">
      <blockquote className="text-xl/8 font-semibold tracking-tight">
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
      className="aspect-video rounded-xl bg-gray-50 object-cover"
    />
  );
}

function headingConverter() {
  return ({ node }: { node: SerializedHeadingNode }) => {
    const headingType = node.tag;
    headingCounts[headingType] += 1; // Increment the counter for the heading type
    const uniqueId = `${node.children[0].text.toLowerCase().replace(/\s+/g, "-")}-${headingCounts[headingType]}`;

    return (
      (node.tag === "h1" && (
        <h1 className="text-2xl font-bold text-pretty mt-10 mb-1">
          {node.children.map((child: SerializedLexicalNode) => (
            <span id={uniqueId}>{child.text}</span>
          ))}
        </h1>
      )) ||
      (node.tag === "h2" && (
        <h2 className="text-xl font-bold text-pretty mt-8 mb-1">
          {node.children.map((child: SerializedLexicalNode) => (
            <span id={uniqueId}>{child.text}</span>
          ))}
        </h2>
      )) ||
      (node.tag === "h3" && (
        <h3 className="text-xl font-semibold text-pretty mt-6 mb-1">
          {node.children.map((child: SerializedLexicalNode) => (
            <span id={uniqueId}>{child.text}</span>
          ))}
        </h3>
      )) ||
      (node.tag === "h4" && (
        <h4 className="text-lg font-semibold text-pretty mt-4 mb-1">
          {node.children.map((child: SerializedLexicalNode) => (
            <span id={uniqueId}>{child.text}</span>
          ))}
        </h4>
      )) ||
      (node.tag === "h5" && (
        <h5 className="text-lg font-medium text-pretty mt-4 mb-1">
          {node.children.map((child: SerializedLexicalNode) => (
            <span id={uniqueId}>{child.text}</span>
          ))}
        </h5>
      )) ||
      (node.tag === "h6" && (
        <h6 className="text-base font-mediumtext-pretty mt-4 mb-1">
          {node.children.map((child: SerializedLexicalNode) => (
            <span id={uniqueId}>{child.text}</span>
          ))}
        </h6>
      ))
    );
  };
}

const listConverter = ({ node }: { node: SerializedListNode }) => {
  return (
    (node.tag === "ul" &&
      node.listType === "check" &&
      checkListConverter(node, false)) ||
    (node.tag === "ul" &&
      node.listType === "bullet" &&
      bulletListConverter(node, false)) ||
    (node.tag === "ol" &&
      node.listType === "number" &&
      numberedListConverter(node, false))
  );
};

const listConverterNested = ({ node }: { node: SerializedListNode }) => {
  return (
    (node.tag === "ul" &&
      node.listType === "check" &&
      checkListConverter(node, true)) ||
    (node.tag === "ul" &&
      node.listType === "bullet" &&
      bulletListConverter(node, true)) ||
    (node.tag === "ol" &&
      node.listType === "number" &&
      numberedListConverter(node, true))
  );
};

const checkListConverter = (node: SerializedListNode, isNested: boolean) => {
  return (
    <ul
      className={`${!isNested ? "mt-4 mb-8" : ""} space-y-4 list-none`}
      role="list"
    >
      {node.children
        .filter(
          (child): child is SerializedListItemNode => child.type === "listitem"
        )
        .map((child, index) => (
          <li
            key={index}
            className="items-center flex flex-row"
            role="listitem"
          >
            {(child.checked && (
              <FontAwesomeIcon
                icon={byPrefixAndName.far["square-check"]}
                aria-hidden="true"
                className="size-5 text-primary dark:text-primary-dark flex-none pr-1"
              />
            )) || (
              <FontAwesomeIcon
                icon={byPrefixAndName.far["square"]}
                aria-hidden="true"
                className="size-5 text-primary dark:text-primary-dark flex-none pr-1"
              />
            )}
            {child.children.map(
              (textNode: SerializedLexicalNode, textIndex: number) =>
                child.checked ? (
                  <span className="grow line-through" key={textIndex}>
                    {textNode.text}
                  </span>
                ) : (
                  <span className="grow" key={textIndex}>
                    {textNode.text}
                  </span>
                )
            )}
            {child.children
              .filter(
                (child): child is SerializedListNode => child.type === "list"
              )
              .map((listNode: SerializedListNode, listIndex: number) => (
                <div className="ps-5" key={listIndex}>
                  {listConverterNested({ node: listNode })}
                </div>
              ))}
          </li>
        ))}
    </ul>
  );
};

const bulletListConverter = (node: SerializedListNode, isNested: boolean) => {
  return (
    <ul
      className={`${!isNested ? "mt-4 mb-8" : ""} space-y-4 list-none`}
      role="list"
    >
      {node.children
        .filter(
          (child): child is SerializedListItemNode => child.type === "listitem"
        )
        .map((child, index) => (
          <li
            key={index}
            className={`items-center flex flex-row ${!isNested ? "" : ""}`}
            role="listitem"
          >
            {child.children.filter(
              (child): child is SerializedListNode => child.type === "list"
            ).length == 0 && (
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["circle-check"]}
                aria-hidden="true"
                className="size-5 text-primary dark:text-primary-dark flex-none pr-1"
              />
            )}
            {child.children
              .filter(
                (child): child is SerializedLexicalNode =>
                  child.type === "text"
              ).length > 0 && (
              <span className="grow">
                {child.children
                  .filter(
                    (child): child is SerializedLexicalNode =>
                      child.type === "text"
                )
                .map((textNode: SerializedLexicalNode, textIndex: number) => (
                  <span className={textNode.format == 1 ? "font-semibold" : ""} key={textIndex}>
                    {textNode.text}
                  </span>
                ))}
              </span>
            )}
            {child.children
              .filter(
                (child): child is SerializedListNode => child.type === "list"
              )
              .map((listNode: SerializedListNode, listIndex: number) => (
                <div className="ps-5" key={listIndex}>
                  {listConverterNested({ node: listNode })}
                </div>
              ))}
          </li>
        ))}
    </ul>
  );
};

const numberedListConverter = (node: SerializedListNode, isNested: boolean) => {
  return (
    <ol
      className={`${!isNested ? "mt-4 mb-8" : ""} space-y-4 list-none`}
      role="list"
    >
      {node.children
        .filter(
          (child): child is SerializedListItemNode => child.type === "listitem"
        )
        .map((child, index) => (
          <li
            key={index}
            className="items-center flex flex-row"
            role="listitem"
          >
            <span className="size-5 text-primary dark:text-primary-dark flex-none">
              {(index + 1).toString() + "."}
            </span>
            {child.children
              .filter(
                (child): child is SerializedLexicalNode => child.type === "text"
              )
              .map((textNode, textIndex) => (
                <span className="grow" key={textIndex}>
                  {textNode.text}
                </span>
              ))}
            {child.children
              .filter(
                (child): child is SerializedListNode => child.type === "list"
              )
              .map((listNode: SerializedListNode, listIndex: number) => (
                <div className="ps-5" key={listIndex}>
                  {listConverterNested({ node: listNode })}
                </div>
              ))}
          </li>
        ))}
    </ol>
  );
};
