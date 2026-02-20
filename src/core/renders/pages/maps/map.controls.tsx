"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical, FileText, LocateFixed } from "lucide-react";

type MapControlsProps = {
    onOpenPdf: () => void;
    onLocateUser: () => void;
};

export function MapControls({
    onOpenPdf,
    onLocateUser,
}: MapControlsProps) {
    return (
        <div className="absolute top-4 left-4 z-[1001]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="shadow-md backdrop-blur bg-background/90 hover:bg-background"
                    >
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="start"
                    side="bottom"
                    className="w-52"
                >
                    <DropdownMenuItem
                        onClick={onOpenPdf}
                        className="gap-2 cursor-pointer"
                    >
                        <FileText className="h-4 w-4" />
                        Mapa em PDF
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={onLocateUser}
                        className="gap-2 cursor-pointer"
                    >
                        <LocateFixed className="h-4 w-4" />
                        Minha localização
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}