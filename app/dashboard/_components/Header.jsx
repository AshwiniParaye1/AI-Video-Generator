import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function Header() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <Link href={"/"}>
        <div className="flex gap-3 items-center">
          <Image src={"/logo.png"} alt="logo" width={30} height={30} />
          <h2 className="font-bold text-xl">Clip AI</h2>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        <div className="flex gap-2 items-center">
          <Image src={"/credits.png"} alt="credits" width={30} height={30} />
          <h2>{userDetails?.credits}</h2>
        </div>
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
        <UserButton className="bg-red-500" />
      </div>
    </div>
  );
}

export default Header;
