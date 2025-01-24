import { renderRichText } from '../utils/lexicalConverter';
import type { CollectionEntry } from 'astro:content';

export default function Post({ post }: { post: CollectionEntry<'posts'> }) {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
        {post.data.title}
      </h1>
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        {renderRichText(post.data.content)}
      </div>
    </div>
  );
}
