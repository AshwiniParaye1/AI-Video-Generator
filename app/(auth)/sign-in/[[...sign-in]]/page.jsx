import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video */}
      <video
        src="./Gen3Promo.mp4"
        autoPlay
        loop
        className="absolute top-0 left-0 w-full h-full object-cover filter"
      />

      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {/* Centered sign-in form */}
      <div className="flex justify-center items-center min-h-screen relative z-10">
        <div className="flex justify-center items-center h-screen">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
