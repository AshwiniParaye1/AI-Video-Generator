import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://AI-Video-Generator-DB_owner:k8lsGHwTVOC9@ep-falling-frost-a5dk0u9d.us-east-2.aws.neon.tech/AI-Video-Generator-DB?sslmode=require",
  },
  verbose: true,
  strict: true,
});
