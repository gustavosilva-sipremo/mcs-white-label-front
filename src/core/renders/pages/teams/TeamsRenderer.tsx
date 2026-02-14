import { BackgroundPattern } from "@/components/others/BackgroundPattern";

export function TeamsRenderer() {
    return (
        <div className="relative w-full flex flex-col items-center justify-center px-4 py-6">
            <BackgroundPattern opacity={0.1} size={64} />
            <p>TEAMS</p>
        </div>
    );
}
