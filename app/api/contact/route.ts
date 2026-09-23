import { createContactHandler } from "../../../lib/contact-handler";
export const runtime = "nodejs";
export const maxDuration = 15;
export const POST = createContactHandler({
  env: () => ({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
  }),
  fetch: (...args) => fetch(...args),
});
