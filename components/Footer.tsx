export function Footer() {
    return (
        <footer className="py-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Portfolio. Built with Next.js, Tailwind, and Supabase.
                </p>
            </div>
        </footer>
    )
}
