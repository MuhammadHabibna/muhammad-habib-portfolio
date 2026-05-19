interface SectionDividerProps {
    variant?: "wave" | "curve" | "angled"
    flip?: boolean
    className?: string
}

export function SectionDivider({ variant = "wave", flip = false, className = "" }: SectionDividerProps) {
    const paths = {
        wave: "M0,64 C160,120 320,0 480,64 C640,128 800,0 960,64 C1120,128 1280,0 1440,64 L1440,120 L0,120 Z",
        curve: "M0,96 C360,0 720,192 1080,48 C1260,-24 1380,72 1440,96 L1440,120 L0,120 Z",
        angled: "M0,80 L480,20 L960,80 L1440,20 L1440,120 L0,120 Z",
    }

    return (
        <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}>
            <svg
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                className="w-full h-12 md:h-16"
            >
                <path
                    d={paths[variant]}
                    className="fill-slate-50/50 dark:fill-slate-900/50"
                />
            </svg>
        </div>
    )
}
