import { ThemeToggle } from "@/core/theme/theme-toggle";
import { cn } from "@/lib/utils";

// import { LanguageSwitcher } from "@/components/others/LanguageSwitcher";
import { MapButton } from "@/components/others/MapButton";

interface ToolbarProps {
    allowThemeToggle?: boolean;
    compactMobile?: boolean;
    className?: string;
}

export function Toolbar({
    allowThemeToggle = true,
    compactMobile = false,
    className,
}: ToolbarProps) {
    return (
        <div
            className={cn(
                "flex items-center",
                compactMobile ? "gap-1 sm:gap-3" : "gap-3",
                className
            )}
        >
            {/* <LanguageSwitcher compact={compactMobile} /> */}

            <MapButton compact={compactMobile} />

            {allowThemeToggle && (
                <div className={compactMobile ? "scale-90" : ""}>
                    <ThemeToggle />
                </div>
            )}
        </div>
    );
}
