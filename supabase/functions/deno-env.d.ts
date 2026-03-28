/** Ambient types for Supabase Edge Functions (Deno runtime). */
declare namespace Deno {
  namespace env {
    function get(key: string): string | undefined;
  }
}

declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export function serve(
    handler: (request: Request) => Response | Promise<Response>
  ): void;
}

declare module "https://esm.sh/@supabase/supabase-js@2" {
  // Narrow enough for setup-admin; runtime is the real client.
  export function createClient(
    supabaseUrl: string,
    supabaseKey: string
  ): import("@supabase/supabase-js").SupabaseClient;
}
