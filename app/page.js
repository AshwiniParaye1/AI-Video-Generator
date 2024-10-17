import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="p-3 px-5 flex items-center justify-between shadow-md">
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

      <main className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <div className="flex flex-row items-center text-5xl font-bold mt-16 mb-4">
          <span className="mr-1">Build Your Short Video with</span>
          <span className="text-primary"> Clip AI</span>
        </div>
        <div>
          <p className="text-gray-500 text-xl mb-8 max-w-xl">
            AI Video Creation Made Simple: Just Imagine, We’ll Do the Rest!
          </p>
        </div>

        <div>
          <Link href="/dashboard/create-new">
            <Button
              size="xl"
              className="mt-4 mb-8 px-4 py-2 mr-4 bg-primary text-white rounded-md hover:bg-primary/90 transition"
            >
              Get Started
            </Button>
          </Link>

          {/* add demo video link */}
          <Link href="/dashboard/create-new">
            <Button
              size="xl"
              variant="outline"
              className="mt-4 mb-8 px-4 py-2 rounded-md  transition"
            >
              Watch a Demo
            </Button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mb-4">
            How to Generate a Video
          </h2>
          <ol className="list-decimal list-inside">
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
            <li className="mb-2">
              <strong>Generate Video:</strong> Click the generate button and
              watch the magic happen!
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}
