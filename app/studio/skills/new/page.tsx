export const dynamic = "force-dynamic";
export const revalidate = 0;

import { SkillForm } from "@/components/admin/SkillForm"

export default function NewSkillPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">New Skill</h2>
            <SkillForm />
        </div>
    )
}
