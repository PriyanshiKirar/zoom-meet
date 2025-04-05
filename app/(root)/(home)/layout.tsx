import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";
import { Metadata} from 'next';

export const metadata: Metadata = {
  title: "ZOOM",
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};
const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative bg-[#161925]">
    <Navbar/>
      <div className="flex">
      <Sidebar/>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-4">
          <div className="w-full"></div>
          {children}
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
