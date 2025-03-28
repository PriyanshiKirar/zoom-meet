"use client";

import { SidebarLinks } from "@/constants";
import Link from "next/link"; // ✅ Correct import
import { usePathname } from "next/navigation";
// import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section
      className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1C1F2E]
    p-6 pt-28 text-white  max--sm:hidden lg-w-[264px]"
    >
      <div className="flex flex-col gap-6">
        {SidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-[#0E78F9]": isActive,
                }
              )}
            >
              {/* {link.label} */}
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
                // className="w-6 h-6" // Ensures visibility
              />

              <p className="text-lg  font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
