import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // refreshing the auth token
    const { data: { user } } = await supabase.auth.getUser();

    if (request.nextUrl.pathname.startsWith("/studio")) {
        // Allow access to login page
        if (request.nextUrl.pathname === "/studio/login") {
            if (user) {
                return NextResponse.redirect(new URL("/studio", request.url));
            }
            return response;
        }

        // Protect other studio routes
        if (!user) {
            return NextResponse.redirect(new URL("/studio/login", request.url));
        }

        // Optional: Check if user is admin (requires admins table check)
        // Since middleware shouldn't do DB calls ideally, we can trust RLS or check auth metadata if set.
        // For now, strict login check is enough, RLS will block data access.
    }

    return response;
}
