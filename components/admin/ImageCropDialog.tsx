"use client"

import { useState, useCallback } from "react"
import Cropper, { Area } from "react-easy-crop"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Loader2, RotateCw } from "lucide-react"
import getCroppedImg from "@/lib/image/cropImage"

interface ImageCropDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    imageSrc: string | null
    aspectRatio?: number
    onCropComplete: (croppedBlob: Blob) => void
    outputWidth?: number
    outputFormat?: "image/jpeg" | "image/webp" | "image/png"
}

export function ImageCropDialog({
    open,
    onOpenChange,
    imageSrc,
    aspectRatio = 1,
    onCropComplete,
    outputWidth,
    outputFormat = "image/webp"
}: ImageCropDialogProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [processing, setProcessing] = useState(false)

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop)
    }

    const onCropCompleteHandler = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return

        try {
            setProcessing(true)
            const croppedBlob = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation,
                { horizontal: false, vertical: false },
                outputWidth,
                outputFormat
            )

            if (croppedBlob) {
                onCropComplete(croppedBlob)
                onOpenChange(false)
                // Reset states
                setZoom(1)
                setRotation(0)
            }
        } catch (e) {
            console.error(e)
            alert("Something went wrong cropping the image")
        } finally {
            setProcessing(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Adjust Image</DialogTitle>
                    <DialogDescription>
                        Drag to position, use slider to zoom.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative w-full h-80 bg-black/5 rounded-md overflow-hidden my-4">
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={aspectRatio}
                            onCropChange={onCropChange}
                            onCropComplete={onCropCompleteHandler}
                            onZoomChange={setZoom}
                            objectFit="contain" // Ensures image fits within the container
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium w-12">Zoom</span>
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(vals) => setZoom(vals[0])}
                            className="flex-1"
                        />
                    </div>

                    {/* Optional Rotation */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium w-12">Rotate</span>
                        <Slider
                            value={[rotation]}
                            min={0}
                            max={360}
                            step={1}
                            onValueChange={(vals) => setRotation(vals[0])}
                            className="flex-1"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setRotation((r) => (r + 90) % 360)}
                            title="Rotate 90deg"
                        >
                            <RotateCw className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={processing}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={processing}>
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Use Image
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
