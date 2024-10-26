import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Upgrade() {
  return (
    <div className="flex flex-col items-center justify-center p-5 overflow-auto">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Upgrade Your Plan
      </h1>
      <p className="text-lg text-center mb-6 text-gray-600">
        Unlock powerful features to enhance your video creation experience with
        Clip AI. Choose a plan that suits your creative needs!
      </p>

      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
        {/* Basic Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs w-full">
          <h2 className="text-2xl font-semibold mb-4">Basic Plan</h2>
          <p className="text-xl font-bold mb-4">$9.99/month</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access to standard AI video templates</li>
            <li>720p video exports</li>
            <li>5GB storage for your projects</li>
            <li>Email support</li>
          </ul>
          <Link href="#">
            <Button className="w-full">Select Basic</Button>
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs w-full">
          <h2 className="text-2xl font-semibold mb-4">Pro Plan</h2>
          <p className="text-xl font-bold mb-4">$19.99/month</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access to premium AI video templates</li>
            <li>1080p video exports</li>
            <li>20GB storage for your projects</li>
            <li>Priority email support</li>
          </ul>
          <Link href="#">
            <Button className="w-full">Select Pro</Button>
          </Link>
        </div>

        {/* Elite Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs w-full">
          <h2 className="text-2xl font-semibold mb-4">Elite Plan</h2>
          <p className="text-xl font-bold mb-4">$29.99/month</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access to all AI video templates</li>
            <li>4K video exports</li>
            <li>50GB storage for your projects</li>
            <li>Dedicated support</li>
          </ul>
          <Link href="#">
            <Button className="w-full">Select Elite</Button>
          </Link>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Choose a plan that aligns with your goals and elevate your video
        production quality.
      </p>
    </div>
  );
}

export default Upgrade;
