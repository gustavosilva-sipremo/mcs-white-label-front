import { useState } from "react";
import { ThemeToggle } from "@/core/theme/theme-toggle";
import { MapPin, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // helper padrão shadcn

type LangOption = "pt-BR" | "en-US";

const LANG_FLAGS: Record<LangOption, string> = {
    "pt-BR": "🇧🇷",
    "en-US": "🇺🇸",
};

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
    const [lang, setLang] = useState<LangOption>("pt-BR");

    return (
        <div
            className={cn(
                "flex items-center",
                compactMobile ? "gap-1 sm:gap-3" : "gap-3",
                className
            )}
        >
            {/* Language dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "flex items-center",
                            compactMobile
                                ? "px-2 py-2 gap-1"
                                : "px-3 py-1.5 gap-1"
                        )}
                    >
                        <Globe className="w-4 h-4" />

                        {!compactMobile && (
                            <>
                                <span>{LANG_FLAGS[lang]}</span>
                                {lang.split("-")[0].toUpperCase()}
                                <ChevronDown className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setLang("pt-BR")}>
                        🇧🇷 pt-BR
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setLang("en-US")}>
                        🇺🇸 en-US
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Map button */}
            <div className="relative">
                <a href="/maps">
                    <Button
                        variant="outline"
                        size="sm"
                        className={compactMobile ? "p-2" : "px-3"}
                        aria-label="Abrir mapa"
                    >
                        <MapPin className="w-5 h-5" />
                    </Button>

                    {/* <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-1 ring-background animate-pulse" /> */}
                </a>
            </div>

            {/* Theme toggle */}
            {allowThemeToggle && (
                <div className={compactMobile ? "scale-90" : ""}>
                    <ThemeToggle />
                </div>
            )}
        </div>
    );
}
