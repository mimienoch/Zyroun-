function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Add it to .env.local. Use the project URL and publishable key from the Supabase dashboard — never the secret or service_role key.`,
    );
  }

  return value;
}

/** Public (browser-safe) Supabase credentials. Never include the secret/service-role key. */
export function getSupabasePublicEnv() {
  return {
    url: requireEnv(
      "NEXT_PUBLIC_SUPABASE_URL",
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ),
    publishableKey: requireEnv(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    ),
  };
}
