import "server-only";

// Deployment settings, read from the environment at build time.
// See .env.example for the variables.

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(siteUrl)) {
  throw new Error("SITE_INDEXABLE=true requires SITE_URL to be set to the public domain.");
}
