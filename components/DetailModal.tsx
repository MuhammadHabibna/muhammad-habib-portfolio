"use client"

import { ReactNode } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface DetailModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    children: ReactNode
    className?: string
}

export function DetailModal({
    isOpen,
    onOpenChange,
    title,
    description,
    children,
    className,
}: DetailModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    "max-w-4xl w-full max-h-[90vh] p-0 overflow-hidden",
                    "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl",
                    "border-white/20 shadow-2xl sm:rounded-2xl",
                    className
                )}
            >
                <div className="flex flex-col h-full max-h-[90vh]">
                    <DialogHeader className="p-6 pb-2 shrink-0 space-y-1">
                        <DialogTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                            {title}
                        </DialogTitle>
                        {description && (
                            <DialogDescription className="text-muted-foreground text-base">
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                    <ScrollArea className="flex-1 p-6 pt-2">
                        {children}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}
