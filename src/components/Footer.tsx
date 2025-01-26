import { byPrefixAndName } from "@awesome.me/kit-217da5ee1c/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CollectionEntry } from "astro:content";

export default function Footer({
  socialMediaIcons,
}: {
  socialMediaIcons: CollectionEntry<"footerSocialMediaIcons">[];
}) {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-x-6 md:order-2">
          {socialMediaIcons.map((item) => (
            <a
              key={item.data.name}
              href={item.data.link}
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="sr-only">{item.data.name}</span>
              <FontAwesomeIcon
                icon={byPrefixAndName.fab[item.data.icon]}
                aria-hidden="true"
                className="size-6"
              />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0">
          &copy; 2024 Jim Martens All rights reserved.
        </p>
      </div>
    </footer>
  );
}
