"use client";

export default function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--background)" }}
      />

      <div
        className="db-anim-ambient absolute rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(63, 166, 107, 0.14), transparent 70%)",
          filter: "blur(40px)",
          height: "60vw",
          left: "-8%",
          top: "-12%",
          width: "60vw",
        }}
      />

      <div
        className="db-anim-ambient absolute rounded-full"
        style={{
          animationDelay: "6s",
          animationDuration: "22s",
          background:
            "radial-gradient(circle, rgba(91, 197, 138, 0.1), transparent 70%)",
          bottom: "-18%",
          filter: "blur(50px)",
          height: "55vw",
          right: "-10%",
          width: "55vw",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(31, 107, 67, 0.1), transparent 70%)",
          filter: "blur(60px)",
          height: "30vw",
          left: "45%",
          top: "40%",
          width: "30vw",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(80% 70%, black, transparent)",
        }}
      />

      <canvas
        className="absolute inset-0 h-full w-full"
        height={906}
        width={1440}
      />

      <div
        className="db-anim-ambient absolute inset-0 opacity-[0.025]"
        style={{
          animationDuration: "8s",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, transparent, var(--background) 90%)",
        }}
      />
    </div>
  );
}
