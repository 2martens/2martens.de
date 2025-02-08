import { toDateAndTimeString } from "../utils/dateAndTime";
import { renderRichText } from "../utils/lexicalConverter";
import { type CollectionEntry } from "astro:content";

export default function Post({ post }: { post: CollectionEntry<"posts">|CollectionEntry<"speeches"> }) {
  return (
    <div className="px-6 py-16 lg:px-8">
      <article className="mx-auto max-w-3xl text-base/7 text-white">
        {'category' in post.data && post.data.category && (
          <p className="text-base/7 font-semibold text-white">
            {post.data.category.title}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-yellow sm:text-5xl">
          {post.data.title}
        </h1>
        {renderRichText(post.data.content, "mt-10 text-pretty hyphens-auto text-justify")}
        <p className="mt-6 text-sm">Letztes Update: {toDateAndTimeString(post.data.updatedAt)}</p>
      </article>
    </div>
  );
}
