import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";

interface MapPdfViewerModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pdfUrl: string;
}

export function MapPdfViewerModal({
    open,
    onOpenChange,
    pdfUrl,
}: MapPdfViewerModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    p-4 sm:p-6
                    w-full
                    max-w-full
                    sm:max-w-5xl
                    h-[100dvh]
                    sm:h-[90vh]
                    flex flex-col
                    gap-4
                    rounded-none
                    sm:rounded-xl
                "
            >
                {/* Header */}
                <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg font-bold text-center">
                        Mapa especializado
                    </DialogTitle>

                    {/* Necessário para acessibilidade (remove o warning) */}
                    <DialogDescription className="sr-only">
                        Visualização do mapa em PDF com opções de tela cheia e download.
                    </DialogDescription>
                </DialogHeader>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                        variant="outline"
                        className="gap-2 w-full sm:w-auto"
                        onClick={() => window.open(pdfUrl, "_blank")}
                    >
                        <ExternalLink className="h-4 w-4" />
                        Tela cheia
                    </Button>

                    <Button
                        variant="outline"
                        className="gap-2 w-full sm:w-auto"
                        asChild
                    >
                        <a href={pdfUrl} download>
                            <Download className="h-4 w-4" />
                            Baixar PDF
                        </a>
                    </Button>
                </div>

                {/* Preview */}
                <div className="flex-1 rounded-lg overflow-hidden border bg-muted">
                    <iframe
                        src={pdfUrl}
                        title="Mapa em PDF"
                        className="w-full h-full"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
