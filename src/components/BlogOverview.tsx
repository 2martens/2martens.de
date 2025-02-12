import type { CollectionEntry } from "astro:content";
import { buildPostUrl } from "../utils/postUrl";
import { buildImageSrc } from "../utils/imageUrl";

const base = import.meta.env.BASE_URL == "/" ? "" : import.meta.env.BASE_URL;

export default function BlogOverview({
  title,
  description,
  posts,
  basehref,
}: {
  title: string;
  description: string;
  posts: CollectionEntry<"posts">[] | CollectionEntry<"speeches">[];
  basehref: string;
}): any {
  return (
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-semibold tracking-tight text-pretty text-yellow sm:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-lg/8">{description}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col max-w-xl items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time
                  dateTime={post.data.publishedAt.toString()}
                >
                  {new Date(post.data.publishedAt).toLocaleDateString("de-DE")}
                </time>
                {"category" in post.data && post.data.category && (
                  <a
                    href={base + post.data.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.data.category.title}
                  </a>
                )}
              </div>
              <div className="relative group">
                <h3 className="mt-3 text-lg/6 font-semibold text-yellow group-hover:text-yellow-300">
                  {("category" in post.data && post.data.category && (
                    <a
                      href={`${base}${basehref}/${post.data.category.slug}/${buildPostUrl(post)}`}
                      data-astro-prefetch
                    >
                      <span className="absolute inset-0" />
                      {post.data.title}
                    </a>
                  )) || (
                    <a
                      href={`${base}${basehref}/${buildPostUrl(post)}`}
                      data-astro-prefetch
                    >
                      <span className="absolute inset-0" />
                      {post.data.title}
                    </a>
                  )}
                </h3>
                <p className="h-auto mt-5 line-clamp-3 text-sm/6">
                  {post.data.description}
                </p>
              </div>
              <div className="flex relative mt-8 items-center gap-x-4">
                <img
                  alt={post.data.author.image.alt}
                  src={buildImageSrc(post.data.author.image.url)}
                  width={post.data.author.image.width || 72}
                  height={post.data.author.image.height || 72}
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold">
                    <span className="absolute inset-0" />
                      {post.data.author.name}
                  </p>
                  <p>{post.data.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
