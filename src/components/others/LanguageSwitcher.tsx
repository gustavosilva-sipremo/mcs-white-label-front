import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type LangOption = "pt-BR" | "en-US";

const LANG_FLAGS: Record<LangOption, string> = {
    "pt-BR": "🇧🇷",
    "en-US": "🇺🇸",
};

interface LanguageSwitcherProps {
    compact?: boolean;
    className?: string;
    value?: LangOption;
    onChange?: (lang: LangOption) => void;
}

export function LanguageSwitcher({
    compact = false,
    className,
    value = "pt-BR",
    onChange,
}: LanguageSwitcherProps) {
    const [internalLang, setInternalLang] = useState<LangOption>(value);

    const lang = onChange ? value : internalLang;

    function handleChange(next: LangOption) {
        if (onChange) onChange(next);
        else setInternalLang(next);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        "flex items-center",
                        compact ? "px-2 py-2 gap-1" : "px-3 py-1.5 gap-1",
                        className
                    )}
                >
                    <Globe className="w-4 h-4" />

                    {!compact && (
                        <>
                            <span>{LANG_FLAGS[lang]}</span>
                            {lang.split("-")[0].toUpperCase()}
                            <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleChange("pt-BR")}
                >
                    🇧🇷 pt-BR
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleChange("en-US")}
                >
                    🇺🇸 en-US
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
