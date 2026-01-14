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
import { Loader2, Trash } from "lucide-react"

const certificationSchema = z.object({
    name: z.string().min(2, "Name is required"),
    issuer: z.string().min(2, "Issuer is required"),
    issue_date: z.string().optional(),
    expiry_date: z.string().optional(),
    credential_id: z.string().optional(),
    credential_url: z.string().url().optional().or(z.literal("")),
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
        credential_url: initialData?.credential_url || initialData?.verify_url || initialData?.linkedin_url,
        status: initialData?.status || "DRAFT",
    }

    const form = useForm<z.infer<typeof certificationSchema>>({
        resolver: zodResolver(certificationSchema),
        defaultValues,
    })

    const onSubmit = async (values: z.infer<typeof certificationSchema>) => {
        setLoading(true)
        try {
            const payload = {
                ...values,
                issue_date: values.issue_date || null,
                expiry_date: values.expiry_date || null,
                credential_id: values.credential_id || null,
                credential_url: values.credential_url || null,
            }

            if (initialData) {
                const { error } = await supabase.from('certifications').update(payload).eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase.from('certifications').insert([payload])
                if (error) throw error
            }

            router.push("/studio/certifications")
            router.refresh()
        } catch (error: any) {
            console.error(error)
            alert(error.message || "Error saving certification")
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
                        name="credential_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Credential URL (Verification / LinkedIn)</FormLabel>
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

                <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Certification" : "Create Certification"}
                </Button>

                {initialData && (
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={loading}
                        className="w-full mt-2"
                        onClick={async () => {
                            if (confirm("Are you sure you want to delete this certification?")) {
                                setLoading(true)
                                try {
                                    const { error } = await supabase.from('certifications').delete().eq('id', initialData.id)
                                    if (error) throw error
                                    router.push("/studio/certifications")
                                    router.refresh()
                                } catch (error: any) {
                                    console.error(error)
                                    alert(error.message || "Error deleting certification")
                                    setLoading(false)
                                }
                            }
                        }}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Certification
                    </Button>
                )}
            </form>
        </Form>
    )
}
