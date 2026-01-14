"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/admin/ImageUpload"

import { Loader2, Save } from "lucide-react"
import { type Profile } from "@/types"

export default function ProfilePage() {
    const [profile, setProfile] = useState<Partial<Profile>>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            setLoading(true)
            // We assume user_id is the primary key link in schema, but schema says id uuid PK references auth.users
            // So fetch where id = current user id
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error && error.code !== 'PGRST116') { // 116 is no rows
                console.error(error)
            }

            if (data) {
                setProfile(data)
            } else {
                // Init empty profile associated with user
                setProfile({ id: user.id })
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("No user")

            const updates = {
                ...profile,
                id: user.id,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase
                .from('profiles')
                .upsert(updates)

            if (error) throw error
            alert("Profile saved successfully")
        } catch (error) {
            console.error(error)
            alert("Error saving profile")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Edit Profile</h2>
            </div>

            <form onSubmit={handleSave}>
                <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                        <CardDescription>Personal information displayed on the hero section.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input
                                    id="full_name"
                                    value={profile.full_name || ""}
                                    onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="headline">Headline</Label>
                                <Input
                                    id="headline"
                                    value={profile.headline || ""}
                                    onChange={e => setProfile({ ...profile, headline: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={profile.location || ""}
                                    onChange={e => setProfile({ ...profile, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input
                                    id="email"
                                    value={profile.contact_email || ""}
                                    onChange={e => setProfile({ ...profile, contact_email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio_short">Short Bio</Label>
                            <Textarea
                                id="bio_short"
                                className="min-h-[100px]"
                                value={profile.bio_short || ""}
                                onChange={e => setProfile({ ...profile, bio_short: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Profile Photo</Label>
                            <ImageUpload
                                value={profile.profile_photo || null}
                                onChange={(url) => setProfile({ ...profile, profile_photo: url })}
                                label="Photo"
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit" disabled={saving}>
                                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
