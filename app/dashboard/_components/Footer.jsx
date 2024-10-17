import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="py-4 px-6 flex flex-col md:flex-row justify-between items-center">
      {/* Copyright Section */}
      <div className="text-gray-500 text-center md:text-left mb-2 md:mb-0">
        © {new Date().getFullYear()} Clip AI
      </div>

      {/* Made by Section with Contact and Social Media Icons */}
      <div className="text-center mb-2 md:mb-0">
        <p className="text-gray-500">
          Made with ❤️ by{" "}
          <span className="font-bold hover:text-gray-700 transition">
            <Link href={"https://www.linkedin.com/in/ashwini-paraye/"}>
              Ashwini Paraye
            </Link>
          </span>
        </p>
      </div>

      {/* Contact and Social Media Icons */}
      <div className="flex gap-4 justify-center md:justify-end">
        <Link
          href="mailto:ashwiniparaye9309@gmail.com"
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <EnvelopeOpenIcon className="w-5 h-5" />
        </Link>
        <Link
          href={"https://github.com/AshwiniParaye1"}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <GitHubLogoIcon className="w-5 h-5" />
        </Link>
        <Link
          href={"https://www.linkedin.com/in/ashwini-paraye/"}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <LinkedInLogoIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
