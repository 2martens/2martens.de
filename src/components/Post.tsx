import { renderRichText } from "../utils/lexicalConverter";
import { type CollectionEntry } from "astro:content";

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function Post({ post }: { post: CollectionEntry<"posts"> }) {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        {post.data.category && (
          <p className="text-base/7 font-semibold text-indigo-600">
            {capitalizeFirstLetter(post.data.category)}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          {post.data.title}
        </h1>
        <p className="mt-6 text-xl/8">{post.data.description}</p>
        {renderRichText(post.data.content, "mt-10 max-w-2xl")}
      </div>
    </div>
  );
}
