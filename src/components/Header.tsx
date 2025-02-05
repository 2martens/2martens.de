"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { byPrefixAndName } from "@awesome.me/kit-217da5ee1c/icons";
import type { CollectionEntry } from "astro:content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const base = import.meta.env.BASE_URL == "/" ? "" : import.meta.env.BASE_URL;

export default function Header({
  logoTitle,
  menuItems,
}: {
  logoTitle: string;
  menuItems: CollectionEntry<"headerMenuItems">[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href={base} className="-m-1.5 p-1.5">
            <span className="text-sm/6 font-semibold text-gray-900">
              {logoTitle}
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon
              icon={byPrefixAndName.fas["bars"]}
              aria-hidden="true"
              className="size-6"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {menuItems.map((item) => (
            <a
              key={item.data.name}
              href={base + item.data.link}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.data.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href={base} className="-m-1.5 p-1.5">
              <span className="text-sm/6 font-semibold text-gray-900">{logoTitle}</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <FontAwesomeIcon
                icon={byPrefixAndName.fas["xmark"]}
                aria-hidden="true"
                className="size-6"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menuItems.map((item) => (
                  <a
                    key={item.data.name}
                    href={base + item.data.link}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.data.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
