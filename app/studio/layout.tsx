"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderKanban, Award, Building2, Brain, User, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export const dynamic = "force-dynamic";
export const revalidate = 0;


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    if (pathname === "/studio/login") {
        return <>{children}</>
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/studio/login")
        router.refresh()
    }

    const navItems = [
        { name: "Dashboard", href: "/studio", icon: LayoutDashboard },
        { name: "Profile", href: "/studio/profile", icon: User },
        { name: "Projects", href: "/studio/projects", icon: FolderKanban },
        { name: "Certifications", href: "/studio/certifications", icon: Award },
        { name: "Experience", href: "/studio/experience", icon: Building2 },
        { name: "Skills", href: "/studio/skills", icon: Brain },
    ]

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-950 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col hidden md:flex">
                <div className="p-6 h-16 flex items-center border-b border-sidebar-border">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                        Studio
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button variant={isActive ? "secondary" : "ghost"} className={cn("w-full justify-start", isActive && "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400")}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-sidebar-border">
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    )
}
