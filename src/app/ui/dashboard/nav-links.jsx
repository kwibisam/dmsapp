"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Admin-only links are marked with `requiresAdmin: true`.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UserGroupIcon,
    requiresAdmin: true,
  },
  {
    name: "Departments",
    href: "/dashboard/departments",
    icon: UserGroupIcon,
    requiresAdmin: true,
  },
  // { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  {
    name: "Roles",
    href: "/dashboard/roles",
    icon: RocketLaunchIcon,
    requiresAdmin: true,
  },
  { name: "WorkSpaces", href: "/dashboard/workspaces", icon: RocketLaunchIcon },
  {
    name: "Doc Types",
    href: "/dashboard/document-types",
    icon: RocketLaunchIcon,
    requiresAdmin: true,
  },
  {
    name: "Tags",
    href: "/dashboard/tags",
    icon: RocketLaunchIcon,
    requiresAdmin: true,
  },
];

export default function NavLinks({ user }) {
  const pathname = usePathname();

  const role = user.isAdmin;
  console.log("role check: ", role);
  if (user.isAdmin === true) {
    console.log("use is admin");
  } else {
    console.log("use is not admin");
  }

  return (
    <>
      {links
        .filter((link) => !link.requiresAdmin || user?.isAdmin) // Show only admin links if user is admin
        .map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
    </>
  );
}
