export const dynamic = "force-dynamic";
export const revalidate = 0;

import { ExperienceForm } from "@/components/admin/ExperienceForm"

export default function NewExperiencePage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">New Experience</h2>
            <ExperienceForm />
        </div>
    )
}
