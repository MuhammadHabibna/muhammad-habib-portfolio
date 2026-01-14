"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

const skillSchema = z.object({
    skill_name: z.string().min(2, "Skill name is required"),
    category: z.enum(["AI/ML", "Web", "Tools", "Other"]),
    level: z.coerce.number().min(0).max(100),
    status: z.enum(["DRAFT", "PUBLISHED"]),
})

interface SkillFormProps {
    initialData?: any
}

export function SkillForm({ initialData }: SkillFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    // Ensure level is a number
    const defaultValues: Partial<z.infer<typeof skillSchema>> = {
        skill_name: initialData?.skill_name || "",
        category: initialData?.category || "AI/ML",
        level: initialData?.level ? Number(initialData.level) : 80,
        status: initialData?.status || "PUBLISHED",
    }

    const form = useForm<z.infer<typeof skillSchema>>({
        resolver: zodResolver(skillSchema) as any,
        defaultValues,
    })

    const onSubmit = async (values: z.infer<typeof skillSchema>) => {
        setLoading(true)
        try {
            if (initialData) {
                const { error } = await supabase.from('skills').update(values).eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase.from('skills').insert([values])
                if (error) throw error
            }

            router.push("/studio/skills")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Error saving skill")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="skill_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Skill Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Python" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="AI/ML">AI / Machine Learning</SelectItem>
                                        <SelectItem value="Web">Web Development</SelectItem>
                                        <SelectItem value="Tools">Tools & DevOps</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Proficiency Level ({field.value}%)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    max={100}
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value))}
                                />
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

                <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Skill" : "Create Skill"}
                </Button>
            </form>
        </Form>
    )
}
