import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Video Generator</title>
        <meta
          name="description"
          content="Generate videos effortlessly using AI."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          AI Video Generator
        </h1>
        <p className="text-lg text-center mb-8 max-w-xl">
          Create stunning videos in minutes with our advanced AI video
          generator. Just input your ideas, and let our AI do the magic!
        </p>

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

        <Link href="/dashboard/create-new">
          <button className="mt-8 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
            Get Started
          </button>
        </Link>
      </main>
    </div>
  );
}
