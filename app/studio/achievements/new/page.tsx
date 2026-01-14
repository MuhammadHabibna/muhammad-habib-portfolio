"use client";

import dynamic from 'next/dynamic'

const AchievementForm = dynamic(() => import('@/components/admin/AchievementForm').then(mod => mod.AchievementForm), {
    ssr: false,
    loading: () => <p>Loading Form...</p>
})

export default function NewAchievementPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">New Achievement</h2>
            <AchievementForm />
        </div>
    )
}
