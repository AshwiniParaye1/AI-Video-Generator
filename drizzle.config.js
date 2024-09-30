import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL, //if the env variable does not work, need to add the actual url
  },
  verbose: true,
  strict: true,
});
