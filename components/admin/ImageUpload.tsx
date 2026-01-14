"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react"

interface ImageUploadProps {
    value: string | null
    onChange: (url: string | null) => void
    bucket?: string
    label?: string
}

export function ImageUpload({ value, onChange, bucket = "portfolio", label = "Image" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const supabase = createClient()

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            const file = e.target.files?.[0]
            if (!file) return

            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

            onChange(data.publicUrl)
        } catch (error) {
            alert('Error uploading image')
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative w-40 h-40 rounded-lg overflow-hidden border">
                        <img src={value} alt="Preview" className="object-cover w-full h-full" />
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ) : (
                    <div className="w-40 h-40 rounded-lg border border-dashed flex items-center justify-center bg-muted text-muted-foreground">
                        <ImageIcon className="w-8 h-8 opacity-50" />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <div className="relative">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            className="hidden"
                            id={`upload-${label}`}
                            disabled={uploading}
                        />
                        <Button asChild variant="secondary" disabled={uploading}>
                            <label htmlFor={`upload-${label}`} className="cursor-pointer">
                                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                                Upload Image
                            </label>
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Max 5MB. JPG, PNG, WEBP.
                    </p>
                </div>
            </div>
        </div>
    )
}
