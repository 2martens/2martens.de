import { byPrefixAndName } from "@awesome.me/kit-217da5ee1c/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CollectionEntry } from "astro:content";

const base = import.meta.env.BASE_URL == "/" ? "" : import.meta.env.BASE_URL;

export default function FooterWithMenu({
  footerMenuItems,
  socialMediaIcons,
}: {
  footerMenuItems: CollectionEntry<"footerMenuItems">[];
  socialMediaIcons: CollectionEntry<"footerSocialMediaIcons">[];
}) {
  return (
    <footer className="bg-background-secondary bottom-0 left-0 right-0">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-14 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {footerMenuItems.map((item) => (
            <a
              key={item.data.name}
              href={base + item.data.link}
              className="text-body hover:text-subtle"
            >
              {item.data.name}
            </a>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {socialMediaIcons.map((item) => (
            <a
              key={item.data.name}
              href={item.data.link}
              className="text-body hover:text-subtle"
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
        <p className="mt-10 text-center text-sm/6 text-subtle">
          &copy; 2025 Jim Martens. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
