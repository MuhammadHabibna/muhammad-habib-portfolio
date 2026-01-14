"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, X, Plus } from "lucide-react"

const projectSchema = z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    type: z.enum(["PERSONAL", "TEAM"]),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    role: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    info_url: z.string().url().optional().or(z.literal("")),
    github_url: z.string().url().optional().or(z.literal("")),
})

// Extended schema handling manual array management
interface ProjectFormProps {
    initialData?: any
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [highlights, setHighlights] = useState<string[]>(initialData?.highlights || [])
    const [techStack, setTechStack] = useState<string[]>(initialData?.tech_stack || [])
    const [thumbnail, setThumbnail] = useState<string | null>(initialData?.thumbnail_image || null)

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            title: "",
            slug: "",
            type: "PERSONAL",
            status: "DRAFT",
        },
    })

    // Array helpers
    const [newItem, setNewItem] = useState("")
    const addHighlight = () => { if (newItem) { setHighlights([...highlights, newItem]); setNewItem("") } }

    const [newTech, setNewTech] = useState("")
    const addTech = () => { if (newTech) { setTechStack([...techStack, newTech]); setNewTech("") } }

    const onSubmit = async (values: z.infer<typeof projectSchema>) => {
        setLoading(true)
        try {
            const payload = {
                ...values,
                highlights,
                tech_stack: techStack,
                thumbnail_image: thumbnail,
                // gallery_images: [], // TODO: Gallery implementation
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
        } catch (error) {
            console.error(error)
            alert("Error saving project")
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
                                        // Auto-slug
                                        if (!initialData) {
                                            form.setValue("slug", e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''))
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
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
                    <Label>Thumbnail</Label>
                    <ImageUpload value={thumbnail} onChange={setThumbnail} label="Project Thumbnail" />
                </div>

                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary (Card Description)</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
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
                                <Textarea className="min-h-[200px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Simple Array Inputs for Tech & Highlights */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <FormLabel>Tech Stack</FormLabel>
                            <div className="flex gap-2 my-2">
                                <Input value={newTech} onChange={e => setNewTech(e.target.value)} placeholder="Add technology..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())} />
                                <Button type="button" size="icon" onClick={addTech}><Plus className="h-4 w-4" /></Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {techStack.map((t, i) => (
                                    <div key={i} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1">
                                        {t} <X className="h-3 w-3 cursor-pointer" onClick={() => setTechStack(techStack.filter((_, idx) => idx !== i))} />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <FormLabel>Highlights</FormLabel>
                            <div className="flex gap-2 my-2">
                                <Input value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Add highlight..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())} />
                                <Button type="button" size="icon" onClick={addHighlight}><Plus className="h-4 w-4" /></Button>
                            </div>
                            <ul className="list-disc pl-4 mt-2 space-y-1">
                                {highlights.map((h, i) => (
                                    <li key={i} className="text-sm flex justify-between items-start group">
                                        <span>{h}</span>
                                        <X className="h-3 w-3 cursor-pointer opacity-0 group-hover:opacity-100 ml-2" onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))} />
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Project" : "Create Project"}
                </Button>
            </form>
        </Form>
    )
}
