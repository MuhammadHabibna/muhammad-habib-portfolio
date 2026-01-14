export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
                Welcome to your portfolio studio. Select a section from the sidebar to manage content.
            </p>

            {/* Metrics placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Projects</h3>
                    <p className="text-2xl font-bold mt-2">--</p>
                </div>
                {/* More metrics */}
            </div>
        </div>
    )
}
