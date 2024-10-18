# ClipAI 🎥✨

Welcome to **ClipAI**, your AI-powered assistant for creating amazing short videos effortlessly! With **ClipAI**, you can generate high-quality content by writing your own prompts or choosing from a list of prebuilt prompts—let AI do the rest!

## Built With 💻

- **Next.js**: For a fast and responsive web experience.
- **Remotion**: Makes video creation with React simple.
- **Shadcn/UI**: Customizable UI components for a sleek look.
- **Tailwind CSS**: Modern, responsive designs.
- **Clerk**: Easy and secure user authentication.
- **Neon**: Serverless PostgreSQL database platform.
- **Drizzle**: Type-safe ORM for data management.
- **Gemini API**: External data handling.
- **Replicate.com**: Powers AI model integrations.
- **AssemblyAI**: Converts speech to text in your videos.

## Features 🚀

- **AI-Driven Prompts**: Create videos by writing your own prompts or selecting from prebuilt ones.
- **User-Friendly**: Intuitive design makes video creation a breeze.
- **Secure Auth**: Sign in and sign up securely via Clerk.
- **Fast Performance**: Optimized with Next.js and Tailwind CSS for speed.

## Getting Started 🌟

### Prerequisites

You'll need:

- Node.js (v16+)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/clipai.git
   cd clipai
   ```
2. Install Dependencies

   To install the necessary dependencies, run:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a .env file and adding the following:

   To install the necessary dependencies, run:

   ```bash
   NEXT_PUBLIC_DRIZZLE_DATABASE_URL=your-database-url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_CAPTION_API_KEY=your-caption-api-key
   REPLICATE_API_TOKEN=your-replicate-api-token
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 in your browser to start creating!

## How to Use 🎬

1. **Sign up or log in with Clerk** for a secure experience.
2. **Write your own prompt** or select from a list of prebuilt prompts.
3. **Let the AI generate the video** and make any edits you like.
4. **Export or share your creation** directly from the platform!

# Happy video creating with ClipAI! 🎉

Thank you for checking out ClipAI! If you have any questions or feedback, feel free to reach out via [LinkedIn](https://www.linkedin.com/in/ashwini-paraye/).
