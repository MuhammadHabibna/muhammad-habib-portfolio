"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, X } from "lucide-react"

const experienceSchema = z.object({
    org_name: z.string().min(2, "Organization name is required"),
    role_title: z.string().min(2, "Role title is required"),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    description: z.string().optional(),
    achievements: z.array(z.string()),
    link_url: z.string().url().optional().or(z.literal("")),
    status: z.enum(["DRAFT", "PUBLISHED"]),
})

interface ExperienceFormProps {
    initialData?: any
}

export function ExperienceForm({ initialData }: ExperienceFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [newAchievement, setNewAchievement] = useState("")

    const defaultValues: Partial<z.infer<typeof experienceSchema>> = {
        org_name: initialData?.org_name || "",
        role_title: initialData?.role_title || "",
        start_date: initialData?.start_date,
        end_date: initialData?.end_date,
        description: initialData?.description,
        achievements: initialData?.achievements || [],
        link_url: initialData?.link_url,
        status: initialData?.status || "DRAFT",
    }

    const form = useForm<z.infer<typeof experienceSchema>>({
        resolver: zodResolver(experienceSchema),
        defaultValues,
    })

    const onSubmit = async (values: z.infer<typeof experienceSchema>) => {
        setLoading(true)
        try {
            if (initialData) {
                const { error } = await supabase.from('organizations').update(values).eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase.from('organizations').insert([values])
                if (error) throw error
            }

            router.push("/studio/experience")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Error saving experience")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="org_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tech Company Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role_title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Senior Developer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date (Leave empty if current)</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Brief description of your role..." {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="achievements"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Achievements / Key Responsibilities</FormLabel>
                            <FormControl>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <Input
                                            value={newAchievement}
                                            onChange={e => setNewAchievement(e.target.value)}
                                            placeholder="Add achievement..."
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (newAchievement.trim()) {
                                                        field.onChange([...(field.value || []), newAchievement.trim()]);
                                                        setNewAchievement("");
                                                    }
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            size="icon"
                                            onClick={() => {
                                                if (newAchievement.trim()) {
                                                    field.onChange([...(field.value || []), newAchievement.trim()]);
                                                    setNewAchievement("");
                                                }
                                            }}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <ul className="list-disc pl-4 space-y-1">
                                        {(field.value || []).map((item, i) => (
                                            <li key={i} className="text-sm flex justify-between items-start group">
                                                <span>{item}</span>
                                                <X
                                                    className="h-3 w-3 cursor-pointer opacity-0 group-hover:opacity-100 ml-2 mt-1"
                                                    onClick={() => field.onChange(field.value?.filter((_, idx) => idx !== i))}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="link_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website or Reference URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="DRAFT">Draft</SelectItem>
                                        <SelectItem value="PUBLISHED">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Experience" : "Create Experience"}
                </Button>
            </form>
        </Form>
    )
}
