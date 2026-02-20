import { BackgroundPattern } from "@/components/others/BackgroundPattern";

export function MapPlaceholder() {
    return (
        <>
            <BackgroundPattern opacity={0.1} size={64} />
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100 text-gray-500 animate-pulse">
                Carregando mapa...
            </div>
        </>
    );
}