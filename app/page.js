"use client"; // Ensure this is a client component

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Footer from "./dashboard/_components/Footer";
import { useRef } from "react"; // Import useRef for video reference

export default function Home() {
  const videoRef = useRef(null); // Create a reference for the video element

  const handleClick = () => {
    if (videoRef.current) {
      // Toggle mute on click
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen" onClick={handleClick}>
      {/* Background video */}
      <video
        ref={videoRef} // Attach the ref to the video element
        src="./Gen3Promo.mp4" // Path to your video
        autoPlay
        loop
        muted // Start muted to prevent autoplay sound
        className="absolute top-0 left-0 w-full h-full object-cover filter"
      />

      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Header */}
      <div className="relative z-10 p-3 px-5 flex items-center justify-between bg-white bg-opacity-80 shadow-md">
        <Link href={"/"}>
          <div className="flex gap-3 items-center">
            <Image src={"/logo.png"} alt="logo" width={30} height={30} />
            <h2 className="font-bold text-xl text-gray-800">Clip AI</h2>
          </div>
        </Link>
        <div className="flex gap-3 items-center">
          <UserButton />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center flex-grow p-4 relative z-10">
        <div className="flex flex-col items-center text-4xl md:text-5xl font-bold mt-8 mb-4 text-center text-white">
          <span>Build Your Short Video with</span>
          <span className="text-primary"> Clip AI</span>
        </div>
        <div>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl text-center">
            AI Video Creation Made Simple: Just Imagine, We’ll Do the Rest!
          </p>
        </div>

        {/* buttons */}
        <div className="flex flex-col md:flex-row items-center mt-1 mb-6">
          <Link href="/dashboard/create-new">
            <Button
              size="xl"
              className="mt-4 mb-4 md:mb-0 md:mr-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
            >
              Get Started
            </Button>
          </Link>

          {/* Add demo video link */}
          <Link href="#">
            <Button
              size="xl"
              variant="outline"
              className="mt-4 px-4 py-2 rounded-md transition"
            >
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full mt-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
            How it Works?
          </h2>
          <p className="text-gray-500 mb-4 text-center">
            Build your video in 4 simple steps:
          </p>
          <ul className="list-decimal list-inside text-sm md:text-base">
            <li className="mb-2">
              <strong>Input Your Idea:</strong> Describe the concept of your
              video.
            </li>
            <li className="mb-2">
              <strong>Choose a Style:</strong> Select from various styles and
              themes.
            </li>
            <li className="mb-2">
              <strong>Select Duration:</strong> Select the duration of the
              video.
            </li>
            <li>
              <strong>Generate Video:</strong> Click the generate button and
              watch the magic happen!
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10 bg-white bg-opacity-80 shadow-md">
        <Footer />
      </div>
    </div>
  );
}
