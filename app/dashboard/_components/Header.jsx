import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function Header() {
  const { userDetails } = useContext(UserDetailsContext);

  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md flex-wrap">
      <Link href={"/"} className="flex items-center gap-3">
        <Image src={"/logo.png"} alt="logo" width={30} height={30} />
        <h2 className="font-bold text-xl">Clip AI</h2>
      </Link>
      <div className="flex items-center gap-3 mt-2 md:mt-0">
        <div className="flex gap-2 items-centerrounded-lg p-2">
          <Image src={"/credits.png"} alt="credits" width={30} height={30} />
          <h2>{userDetails?.credits}</h2>
        </div>
        <Link href={"/dashboard"}>
          <Button className="hidden md:block">Dashboard</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
