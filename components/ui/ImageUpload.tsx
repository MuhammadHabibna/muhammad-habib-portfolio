"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ImageCropper } from './ImageCropper'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
    value?: string | null
    onChange: (url: string) => void
    disabled?: boolean
    bucketName?: string
    folderPath?: string
    aspectRatio?: number
}

export function ImageUpload({
    value,
    onChange,
    disabled,
    bucketName = 'portfolio', // default bucket
    folderPath = 'uploads',
    aspectRatio = 16 / 9
}: ImageUploadProps) {
    const [isCropping, setIsCropping] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const supabase = createClient()

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setSelectedImage(reader.result?.toString() || null)
                setIsCropping(true)
            })
            reader.readAsDataURL(file)
        }
    }

    const handleCropComplete = async (blob: Blob) => {
        setIsCropping(false)
        setIsUploading(true)

        try {
            const filename = `${folderPath}/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(filename, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) throw error

            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filename)

            onChange(publicUrl)
            alert("Image uploaded successfully")
        } catch (error: any) {
            console.error('Upload error:', error)
            alert("Failed to upload image. Please try again.")
        } finally {
            setIsUploading(false)
            setSelectedImage(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleRemove = () => {
        onChange('')
    }

    return (
        <div className="space-y-4">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
                disabled={disabled || isUploading}
            />

            {value ? (
                <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border bg-muted group">
                    <img src={value} alt="Upload" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleRemove}
                            disabled={disabled}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    disabled={disabled || isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full max-w-sm h-32 border-dashed flex flex-col gap-2"
                >
                    {isUploading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Upload className="h-8 w-8" />
                            <span>Click to upload image</span>
                        </div>
                    )}
                </Button>
            )}

            <ImageCropper
                open={isCropping}
                imageSrc={selectedImage}
                onClose={() => setIsCropping(false)}
                onCropComplete={handleCropComplete}
                aspect={aspectRatio}
            />
        </div>
    )
}
