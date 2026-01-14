"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, MessageSquare, Send } from "lucide-react"

export function Contact() {
    return (
        <section id="contact" className="py-20 relative">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                        Get In Touch
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                    <div className="w-20 h-1.5 bg-sky-500 rounded-full mt-2" />
                </div>

                <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <MessageSquare className="w-6 h-6 text-sky-500" /> Send a Message
                        </CardTitle>
                        <CardDescription>
                            Fill out the form below and I'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input id="name" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <Textarea id="message" placeholder="Tell me about your project..." className="min-h-[150px]" />
                            </div>
                            <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-sky-500/20">
                                <Send className="mr-2 h-4 w-4" /> Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-12 text-center flex flex-col items-center gap-4">
                    <p className="text-muted-foreground">Or email me directly at</p>
                    <a href="mailto:contact@example.com" className="flex items-center gap-2 text-xl font-bold text-sky-600 hover:underline">
                        <Mail className="w-5 h-5" /> contact@example.com
                    </a>
                </div>
            </div>
        </section>
    )
}
