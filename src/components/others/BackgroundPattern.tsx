interface BackgroundPatternProps {
  opacity?: number;
  size?: number;
  className?: string;
}

export function BackgroundPattern({
  opacity = 0.1,
  size = 64,
  className = "",
}: BackgroundPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(
            to right,
            hsl(var(--foreground) / 0.2) 2px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            hsl(var(--foreground) / 0.2) 2px,
            transparent 1px
          )
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
