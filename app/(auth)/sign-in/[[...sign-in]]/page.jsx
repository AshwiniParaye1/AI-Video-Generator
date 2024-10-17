"use client";

import { SignIn } from "@clerk/nextjs";
import { useRef } from "react";

export default function Page() {
  const videoRef = useRef(null); // Create a ref for the video element

  const handleClick = () => {
    if (videoRef.current) {
      // Toggle mute on click
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onClick={handleClick} // Click anywhere to toggle mute
    >
      {/* Background video */}
      <video
        ref={videoRef} // Attach the ref to the video element
        src="./Gen3Promo.mp4"
        autoPlay
        loop
        muted // Start muted to prevent autoplay sound
        className="absolute top-0 left-0 w-full h-full object-cover filter"
      />

      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {/* Centered sign-in form */}
      <div className="flex justify-center items-center min-h-screen relative z-10 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Welcome Back
          </h1>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
