"use client"

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Slider } from "@/components/ui/slider"
import { getCroppedImg } from '@/lib/utils'

interface ImageCropperProps {
    imageSrc: string | null
    open: boolean
    onClose: () => void
    onCropComplete: (croppedImageBlob: Blob) => void
    aspect?: number
}

export function ImageCropper({ imageSrc, open, onClose, onCropComplete, aspect = 16 / 9 }: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop)
    }

    const onZoomChange = (zoom: number) => {
        setZoom(zoom)
    }

    const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleSave = async () => {
        if (imageSrc && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
            if (croppedImage) {
                onCropComplete(croppedImage)
            }
        }
    }

    if (!imageSrc) return null

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Crop Image</DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-80 bg-black/80 rounded-md overflow-hidden">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteHandler}
                        onZoomChange={onZoomChange}
                    />
                </div>
                <div className="py-4 space-y-2">
                    <span className="text-sm font-medium">Zoom</span>
                    <Slider
                        defaultValue={[1]}
                        min={1}
                        max={3}
                        step={0.1}
                        value={[zoom]}
                        onValueChange={(val) => setZoom(val[0])}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Apply Crop</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
