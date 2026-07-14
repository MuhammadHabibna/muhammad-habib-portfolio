"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, MessageSquare, Send } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"

export function Contact() {
    return (
        <section id="contact" className="py-20 relative">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <SectionHeading
                    title="Get In Touch"
                    subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <MessageSquare className="w-6 h-6 text-indigo-500" /> Send a Message
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
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full md:w-auto inline-block">
                                    <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-indigo-500/20">
                                        <Send className="mr-2 h-4 w-4" /> Send Message
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-12 text-center flex flex-col items-center gap-4"
                >
                    <p className="text-muted-foreground">Or email me directly at</p>
                    <a href="mailto:contact@example.com" className="flex items-center gap-2 text-xl font-bold text-indigo-600 hover:underline">
                        <Mail className="w-5 h-5" /> contact@example.com
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
