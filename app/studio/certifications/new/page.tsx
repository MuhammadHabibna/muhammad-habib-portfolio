export const dynamic = "force-dynamic";
export const revalidate = 0;

import { CertificationForm } from "@/components/admin/CertificationForm"

export default function NewCertificationPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">New Certification</h2>
            <CertificationForm />
        </div>
    )
}
