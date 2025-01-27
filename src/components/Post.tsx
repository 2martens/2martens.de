import { renderRichText } from "../utils/lexicalConverter";
import { type CollectionEntry } from "astro:content";

export default function Post({ post }: { post: CollectionEntry<"posts"> }) {
  return (
    <div className="bg-white px-6 py-16 lg:px-8">
      <article className="mx-auto max-w-3xl text-base/7 text-gray-700">
        {post.data.category && (
          <p className="text-base/7 font-semibold text-indigo-600">
            {post.data.category.title}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          {post.data.title}
        </h1>
        <p className="mt-6 text-xl/8">{post.data.description}</p>
        {renderRichText(post.data.content, "mt-10 max-w-2xl")}
      </article>
    </div>
  );
}
