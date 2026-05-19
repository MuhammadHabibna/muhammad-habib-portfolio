import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    try {
        return await updateSession(request);
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        /*
         * Only match studio routes where auth is needed.
         * This prevents unnecessary Supabase auth calls on public pages
         * which can cause MIDDLEWARE_INVOCATION_TIMEOUT on Vercel.
         */
        "/studio/:path*",
    ],
};
