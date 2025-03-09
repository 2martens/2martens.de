import { toDateAndTimeString } from "../utils/dateAndTime";
import { renderRichText } from "../utils/lexicalConverter";
import { type CollectionEntry } from "astro:content";

export default function Post({
  post,
}: {
  post: CollectionEntry<"posts"> | CollectionEntry<"speeches">;
}) {
  return (
    <main className="px-6 py-16 lg:px-8">
      <article className="mx-auto max-w-3xl text-base/7">
        <div className="optimal-reading-width mx-auto mb-10">
          {"category" in post.data && post.data.category && (
            <p className="text-base/7 font-semibold">
              {post.data.category.title}
            </p>
          )}
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-yellow">
            {post.data.title}
          </h1>
        </div>
        {renderRichText(
          post.data.content,
          "text-pretty hyphens-auto text-justify optimal-reading-width mx-auto"
        )}
        <div className="optimal-reading-width mx-auto">
          <p className="mt-6 text-sand text-sm">
            Letztes Update: {toDateAndTimeString(post.data.updatedAt)}
          </p>
        </div>
      </article>
    </main>
  );
}
