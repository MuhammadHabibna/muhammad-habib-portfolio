import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminSidebar>
            {children}
        </AdminSidebar>
    )
}
