import { useState } from "react";
import { ThemeToggle } from "@/core/theme/theme-toggle";
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type LangOption = "pt-BR" | "en-US";

const LANG_FLAGS: Record<LangOption, string> = {
    "pt-BR": "🇧🇷",
    "en-US": "🇺🇸",
};

interface ToolbarProps {
    allowThemeToggle?: boolean;
}

export function Toolbar({ allowThemeToggle = true }: ToolbarProps) {
    const [lang, setLang] = useState<LangOption>("pt-BR");

    return (
        <div className="flex items-center gap-3">
            {/* Language dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 px-3 py-1.5 flex items-center"
                    >
                        <span>{LANG_FLAGS[lang]}</span> {lang.split("-")[0].toUpperCase()}
                        <ChevronDown className="w-4 h-4" />
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

            {/* Map button com badge */}
            <div className="relative">
                <a href="/maps">
                    <Button variant="outline" size="sm" className="p-2">
                        <MapPin className="w-5 h-5" />
                    </Button>
                    <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-500 ring-1 ring-background animate-pulse" />
                </a>
            </div>

            {/* Theme toggle */}
            {allowThemeToggle && <ThemeToggle />}
        </div>
    );
}
