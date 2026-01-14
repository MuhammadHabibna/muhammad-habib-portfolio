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
import { Loader2 } from "lucide-react"

const achievementSchema = z.object({
    title: z.string().min(2, "Title is required"),
    event: z.string().optional(),
    award: z.string().optional(),
    level: z.string().optional(),
    year: z.coerce.number().int().min(1900).max(2100),
    date: z.string().optional().or(z.literal("")),
    description: z.string().optional(),
    proof_url: z.string().url().optional().or(z.literal("")),
    status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
    sort_order: z.coerce.number().int().min(0).default(0),
})

type AchievementFormValues = z.infer<typeof achievementSchema>

interface AchievementFormProps {
    initialData?: any
}

export function AchievementForm({ initialData }: AchievementFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    const defaultValues: AchievementFormValues = {
        title: initialData?.title || "",
        event: initialData?.event || "",
        award: initialData?.award || "",
        level: initialData?.level || "",
        year: initialData?.year || new Date().getFullYear(),
        date: initialData?.date || "",
        description: initialData?.description || "",
        proof_url: initialData?.proof_url || "",
        status: (initialData?.status as "DRAFT" | "PUBLISHED") || "PUBLISHED",
        sort_order: initialData?.sort_order || 0,
    }

    const form = useForm<AchievementFormValues>({
        // Cast resolver to any to avoid TS mismatch between z.input (unknown) and z.infer (number) for coerced fields
        resolver: zodResolver(achievementSchema) as any,
        defaultValues,
    })

    const onSubmit = async (values: AchievementFormValues) => {
        setLoading(true)
        try {
            const payload = {
                ...values,
                date: values.date || null,
                proof_url: values.proof_url || null,
            }

            if (initialData) {
                const { error } = await supabase.from('achievements').update(payload).eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase.from('achievements').insert([payload])
                if (error) throw error
            }

            router.push("/studio/achievements")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Error saving achievement")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title / Achievement Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Finalist GEMASTIK 2025 – Data Mining" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="event"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event / Organizer</FormLabel>
                                <FormControl>
                                    <Input placeholder="GEMASTIK / Google" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="award"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Award Label</FormLabel>
                                <FormControl>
                                    <Input placeholder="Finalist, Winner, 1st Place" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Level</FormLabel>
                                <FormControl>
                                    <Input placeholder="National, International" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Exact Date (Optional)</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} value={field.value || ""} />
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
                                <Textarea placeholder="Brief details about the achievement..." {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="proof_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Proof URL (Optional)</FormLabel>
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

                <FormField
                    control={form.control}
                    name="sort_order"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sort Order</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Achievement" : "Create Achievement"}
                </Button>
            </form>
        </Form>
    )
}
