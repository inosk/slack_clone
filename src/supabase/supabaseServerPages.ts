import { NextApiRequest, NextApiResponse } from 'next';
import { createServerClient, serializeCookieHeader } from '@supabase/ssr';
import { Database } from '@/types/supabase';

export default function supabaseServerClientPages(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies)
            .filter((key) => req.cookies[key])
            .map((key) => ({
              name: key,
              value: req.cookies[key]!,
            }));
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              res.appendHeader(
                'Set-Cookie',
                serializeCookieHeader(name, value, options),
              ),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
