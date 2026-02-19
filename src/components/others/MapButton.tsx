import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MapButtonProps {
    href?: string;
    compact?: boolean;
    className?: string;
}

export function MapButton({
    href = "/maps",
    compact = false,
    className,
}: MapButtonProps) {
    return (
        <a href={href} className="relative">
            <Button
                variant="outline"
                size="sm"
                className={cn(compact ? "p-2" : "px-3", className)}
                aria-label="Abrir mapa"
            >
                <MapPin className="w-5 h-5" />
            </Button>
        </a>
    );
}
