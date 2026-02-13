import sipremoLogo from "/favicons/sipremo.svg";

export function Watermark() {
  return (
    <div className="hidden md:flex absolute left-0 top-0 h-full w-full items-center justify-center invert overflow-hidden pointer-events-none select-none">
      <img
        src={sipremoLogo}
        alt="Sipremo Logo"
        className="absolute -left-[50%] w-[200%] top-1/2 transform -translate-y-1/2 opacity-20"
      />
    </div>
  );
}
