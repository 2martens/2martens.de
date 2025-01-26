import { byPrefixAndName } from "@awesome.me/kit-217da5ee1c/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CollectionEntry } from "astro:content";

export default function FooterWithMenu({
  footerMenuItems,
  socialMediaIcons,
}: {
  footerMenuItems: CollectionEntry<"footerMenuItems">[];
  socialMediaIcons: CollectionEntry<"footerSocialMediaIcons">[];
}) {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {footerMenuItems.map((item) => (
            <a
              key={item.data.name}
              href={item.data.link}
              className="text-gray-600 hover:text-gray-900"
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
        <p className="mt-10 text-center text-sm/6 text-gray-600">
          &copy; 2024 Jim Martens. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
