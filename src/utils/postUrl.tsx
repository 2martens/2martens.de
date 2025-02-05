import type { CollectionEntry } from "astro:content";

export function buildPostUrl(post: CollectionEntry<"posts">|CollectionEntry<"speeches">) {
    return `${post.data.publishedAt.toISOString().split('T')[0] + '-' + post.data.slug + '.html'}`;
}