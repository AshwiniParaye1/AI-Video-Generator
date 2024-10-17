import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="py-4 px-6 flex justify-between items-center">
      {/* Copyright Section */}
      <div className="text-gray-400">
        © {new Date().getFullYear()} Clip AI. All rights reserved.
      </div>

      {/* Made by Section with Contact and Social Media Icons */}
      <div>
        <p className="text-gray-400">
          Made with ❤️ by{" "}
          <span className="font-bold">
            <Link href={"https://www.linkedin.com/in/ashwini-paraye/"}>
              Ashwini Paraye
            </Link>
          </span>
        </p>
      </div>

      {/* Contact and Social Media Icons */}
      <div className="flex gap-4">
        <Link
          href="mailto:ashwiniparaye9309@gmail.com"
          className="text-gray-400 hover:text-gray-500 transition"
        >
          <EnvelopeOpenIcon className="w-5 h-5" />
        </Link>
        <Link
          href={"https://github.com/AshwiniParaye1"}
          className="text-gray-400 hover:text-gray-500 transition"
        >
          <GitHubLogoIcon className="w-5 h-5" />
        </Link>
        <Link
          href={"https://www.linkedin.com/in/ashwini-paraye/"}
          className="text-gray-400 hover:text-gray-500 transition"
        >
          <LinkedInLogoIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
