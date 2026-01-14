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
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Loader2 } from "lucide-react"

const certificationSchema = z.object({
    name: z.string().min(2, "Name is required"),
    issuer: z.string().min(2, "Issuer is required"),
    issue_date: z.string().optional(),
    expiry_date: z.string().optional(),
    credential_id: z.string().optional(),
    verify_url: z.string().url().optional().or(z.literal("")),
    certificate_image: z.string().optional().nullable(),
    status: z.enum(["DRAFT", "PUBLISHED"]),
})

interface CertificationFormProps {
    initialData?: any
}

export function CertificationForm({ initialData }: CertificationFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    const defaultValues: Partial<z.infer<typeof certificationSchema>> = {
        name: initialData?.name || "",
        issuer: initialData?.issuer || "",
        issue_date: initialData?.issue_date,
        expiry_date: initialData?.expiry_date,
        credential_id: initialData?.credential_id,
        verify_url: initialData?.verify_url,
        certificate_image: initialData?.certificate_image,
        status: initialData?.status || "DRAFT",
    }

    const form = useForm<z.infer<typeof certificationSchema>>({
        resolver: zodResolver(certificationSchema),
        defaultValues,
    })

    const onSubmit = async (values: z.infer<typeof certificationSchema>) => {
        setLoading(true)
        try {
            if (initialData) {
                const { error } = await supabase.from('certifications').update(values).eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase.from('certifications').insert([values])
                if (error) throw error
            }

            router.push("/studio/certifications")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Error saving certification")
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Certification Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="AWS Certified Solutions Architect" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="issuer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Issuer</FormLabel>
                                <FormControl>
                                    <Input placeholder="Amazon Web Services" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="issue_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Issue Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="expiry_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expiry Date (Optional)</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="credential_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Credential ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="ABC-123-XYZ" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="verify_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Verification URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

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

                <FormField
                    control={form.control}
                    name="certificate_image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Certificate Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value || null}
                                    onChange={field.onChange}
                                    bucket="portfolio"
                                    label="Upload Certificate"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Certification" : "Create Certification"}
                </Button>
            </form>
        </Form>
    )
}
