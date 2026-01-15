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
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, X, Plus } from "lucide-react"
import { Project } from "@/types"

// Defines the categories strictly to match the ProjectCategory type
const CATEGORIES = [
    "Klasifikasi Citra",
    "Object Detection",
    "Segmentasi Citra",
    "Object Character Recognition",
    "Clustering (Tabular)",
    "Klasifikasi (Tabular)",
    "Regresi (Tabular)",
    "Forecasting (Tabular)",
    "Analisis Sentiment",
    "Analisis Sentiment",
    "Klasifikasi Teks",
    "Experimental Projects"
] as const

const projectSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    type: z.enum(["PERSONAL", "TEAM"]),
    project_category: z.enum(CATEGORIES), // Renamed from project_type
    status: z.enum(["DRAFT", "PUBLISHED"]),
    start_date: z.string().optional().or(z.literal("")),
    end_date: z.string().optional().or(z.literal("")),
    role: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    demo_url: z.string().url("Invalid URL").optional().or(z.literal("")),
    github_url: z.string().url("Invalid URL").optional().or(z.literal("")),
    thumbnail_image: z.string().optional().nullable(),
    tech_stack: z.array(z.string()),
    highlights: z.array(z.string()),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
    initialData?: Project | null
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    // Local state for array inputs
    const [newTech, setNewTech] = useState("")
    const [newItem, setNewItem] = useState("")

    // Robust default values handling
    const defaultValues: Partial<ProjectFormValues> = {
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        type: initialData?.type || "PERSONAL",
        project_category: initialData?.project_category || "Klasifikasi Citra", // Renamed from project_type
        status: initialData?.status || "DRAFT",
        start_date: initialData?.start_date || "",
        end_date: initialData?.end_date || "",
        role: initialData?.role || "",
        summary: initialData?.summary || "",
        description: initialData?.description || "",
        demo_url: initialData?.demo_url || (initialData as any)?.info_url || "",
        github_url: initialData?.github_url || "",
        thumbnail_image: initialData?.thumbnail_image,
        tech_stack: initialData?.tech_stack || [],
        highlights: initialData?.highlights || [],
    }

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues,
    })

    const onSubmit = async (values: ProjectFormValues) => {
        setLoading(true)
        try {
            // Transform empty strings to null for optional fields when sending to Supabase
            // Also explicitly map project_category
            const payload = {
                title: values.title,
                slug: values.slug,
                type: values.type,
                project_category: values.project_category,
                status: values.status,
                role: values.role || null,
                summary: values.summary || null,
                description: values.description || null,
                thumbnail_image: values.thumbnail_image || null,
                tech_stack: values.tech_stack,
                highlights: values.highlights,

                // Date & URL Normalization (Empty string -> null)
                start_date: values.start_date || null,
                end_date: values.end_date || null,
                demo_url: values.demo_url || null,
                github_url: values.github_url || null,
            }

            if (initialData) {
                const { error } = await supabase.from('projects').update(payload).eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase.from('projects').insert([payload])
                if (error) throw error
            }

            router.push("/studio/projects")
            router.refresh()
        } catch (error: any) {
            console.error("Error saving project:", error)
            alert(`Error saving project: ${error.message || error.toString()}`)
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
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project Name" {...field} onChange={e => {
                                        field.onChange(e);
                                        // Auto-slug generation
                                        if (!initialData) {
                                            const slug = e.target.value
                                                .toLowerCase()
                                                .replace(/ /g, '-')
                                                .replace(/[^\w-]+/g, '')
                                            form.setValue("slug", slug)
                                        }
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="project-slug" {...field} />
                                </FormControl>
                                <p className="text-[0.8rem] text-muted-foreground">Used in URL. Auto-generated. Must be unique.</p>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Scope (Type)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="PERSONAL">Personal</SelectItem>
                                        <SelectItem value="TEAM">Team</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="project_category"
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
                                        {CATEGORIES.map(category => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {field.value === "Experimental Projects" && (
                                    <p className="text-[0.8rem] text-muted-foreground mt-2">
                                        For side projects, tools, experiments, and proof-of-concepts.
                                    </p>
                                )}
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
                                    <Input type="date" {...field} value={field.value || ""} />
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
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} value={field.value || ""} />
                                </FormControl>
                                <p className="text-[0.8rem] text-muted-foreground">Leave empty if present/ongoing.</p>
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

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Links</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="github_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GitHub Repo URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://github.com/..." {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="demo_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Live Demo URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="thumbnail_image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ?? null}
                                        onChange={field.onChange}
                                        label="Project Thumbnail"
                                        aspectRatio={16 / 9}
                                        outputWidth={1280}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary (Card Description)</FormLabel>
                            <FormControl>
                                <Textarea {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Description (Markdown)</FormLabel>
                            <FormControl>
                                <Textarea className="min-h-[200px]" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="tech_stack"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tech Stack</FormLabel>
                                <FormControl>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex gap-2 my-2">
                                                <Input
                                                    value={newTech}
                                                    onChange={e => setNewTech(e.target.value)}
                                                    placeholder="Add..."
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            if (newTech.trim()) {
                                                                field.onChange([...(field.value || []), newTech.trim()]);
                                                                setNewTech("");
                                                            }
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    onClick={() => {
                                                        if (newTech.trim()) {
                                                            field.onChange([...(field.value || []), newTech.trim()]);
                                                            setNewTech("");
                                                        }
                                                    }}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {(field.value || []).map((t, i) => (
                                                    <div key={i} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1">
                                                        {t}
                                                        <X
                                                            className="h-3 w-3 cursor-pointer"
                                                            onClick={() => field.onChange(field.value?.filter((_, idx) => idx !== i))}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="highlights"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Highlights</FormLabel>
                                <FormControl>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex gap-2 my-2">
                                                <Input
                                                    value={newItem}
                                                    onChange={e => setNewItem(e.target.value)}
                                                    placeholder="Add..."
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            if (newItem.trim()) {
                                                                field.onChange([...(field.value || []), newItem.trim()]);
                                                                setNewItem("");
                                                            }
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    onClick={() => {
                                                        if (newItem.trim()) {
                                                            field.onChange([...(field.value || []), newItem.trim()]);
                                                            setNewItem("");
                                                        }
                                                    }}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <ul className="list-disc pl-4 mt-2 space-y-1">
                                                {(field.value || []).map((h, i) => (
                                                    <li key={i} className="text-sm flex justify-between items-start group">
                                                        <span>{h}</span>
                                                        <X
                                                            className="h-3 w-3 cursor-pointer opacity-0 group-hover:opacity-100 ml-2"
                                                            onClick={() => field.onChange(field.value?.filter((_, idx) => idx !== i))}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </FormControl>
                                <p className="text-[0.8rem] text-muted-foreground mt-2">Bullet points for key results/impact. Short, punchy, 3–8 items recommended.</p>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Project" : "Create Project"}
                </Button>
            </form>
        </Form>
    )
}
