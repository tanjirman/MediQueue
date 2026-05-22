// lib/auth-client.js
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // This MUST be the URL of your Express backend (e.g., https://your-backend.onrender.com)
  // NOT your Next.js URL.
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, 
  plugins: [
    jwtClient() 
  ],
});

export const { signIn, signUp, useSession, token } = authClient;