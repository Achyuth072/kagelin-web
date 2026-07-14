import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Privileged Supabase client for server-only route handlers.
 *
 * Mirrors the app's src/lib/supabase/admin.ts. Bypasses RLS — used ONLY in the
 * trusted /api/waitlist route to insert into `waitlist_signups`, which has RLS
 * enabled and no client-facing policies (no anon INSERT). Never import into a
 * client component.
 *
 * Accepts the new Supabase secret key (sb_secret_…) or the legacy service_role
 * key — both bypass RLS.
 */
export function createAdminClient() {
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secretKey) {
    throw new Error(
      "SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY) is not set",
    );
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secretKey,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
