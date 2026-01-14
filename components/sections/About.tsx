"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Rocket, Zap, Globe } from "lucide-react"

export function About() {
    const features = [
        {
            icon: <Code className="w-8 h-8 text-sky-500" />,
            title: "Clean Code",
            description: "I write clean, maintainable, and scalable code following best practices."
        },
        {
            icon: <Globe className="w-8 h-8 text-indigo-500" />,
            title: "Full Stack",
            description: "From database design to responsive frontend UI, I handle the entire stack."
        },
        {
            icon: <Rocket className="w-8 h-8 text-purple-500" />,
            title: "Modern Tech",
            description: "Specialized in Next.js, React, TypeScript, and cloud-native solutions."
        },
        {
            icon: <Zap className="w-8 h-8 text-yellow-500" />,
            title: "Performance",
            description: "Optimization is key. I ensure applications run fast and smooth on any device."
        }
    ]

    return (
        <section id="about" className="py-20 relative bg-white dark:bg-slate-950">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                            About Me
                        </h2>
                        <div className="w-20 h-1.5 bg-sky-500 rounded-full" />
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I am a passionate Full-Stack Engineer and UI/UX Designer dedicated to building high-quality digital products.
                            With a strong background in both frontend aesthetics and backend logic, I create seamless user experiences that are backed by robust architecture.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            When I'm not coding, you can find me exploring new AI technologies, contributing to open-source, or refining my design skills.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, i) => (
                            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow bg-slate-50 dark:bg-slate-900">
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4 pt-6">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-semibold text-xl">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
