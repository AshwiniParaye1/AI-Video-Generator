import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="p-3 w-full px-5 flex items-center justify-between shadow-md">
      <Link href={"/"}>
        <div className="flex gap-3 items-center">
          <Image src={"/logo.png"} alt="logo" width={30} height={30} />
          <h2 className="font-bold text-xl">Clip AI</h2>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        <UserButton />
      </div>
    </div>
  );
}

export default Footer;
