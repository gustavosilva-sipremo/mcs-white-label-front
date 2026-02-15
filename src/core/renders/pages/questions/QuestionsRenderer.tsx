import { BackgroundPattern } from "@/components/others/BackgroundPattern";

export function QuestionsRenderer() {
    return (
        <div className="relative w-full">
            <BackgroundPattern opacity={0.1} size={64} />

            <h1 className="text-3xl font-bold text-center mt-8">
                Questions
            </h1>
        </div>
    );
}
