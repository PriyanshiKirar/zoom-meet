"use client"


import React from "react";
import Link from "next/link";
import Image from "next/image";
import MoblieNav from "./MoblieNav";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const Navbar = () => {
  return (
    <nav className="flex-between flex fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Zoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          ZOOM
        </p>
      </Link>
      <div className="flex-between gap-5">
        {/* clear user management  */}
        <SignedIn>
          <UserButton />
        </SignedIn>
       
        <MoblieNav />
      </div>
    </nav>
  );
};

export default Navbar;
