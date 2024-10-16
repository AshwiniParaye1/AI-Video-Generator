"use client";

import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext.jsx";
import { UserDetailsContext } from "../_context/UserDetailsContext.jsx";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

function DashboardLayout({ children }) {
  const [videoData, setVideoData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && getUserDetails();
  }, [user]);

  const getUserDetails = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    setUserDetails(result[0]);
  };

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <VideoDataContext.Provider value={{ videoData, setVideoData }}>
        <div>
          <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
            <SideNav />
          </div>
          <div>
            <Header />
            <div className="md:ml-64 p-10">{children}</div>
          </div>
        </div>
      </VideoDataContext.Provider>
    </UserDetailsContext.Provider>
  );
}

export default DashboardLayout;
