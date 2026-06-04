import Link from "next/link";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Rólunk", href: "#rolunk" },
  { label: "Szolgáltatások", href: "#szolgaltatasok" },
  { label: "Kapcsolat", href: "#kapcsolat" },
];

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        src="/hero/stillsoul2.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-10">
        <span className="text-white text-lg font-semibold uppercase tracking-widest">
          Stillsoul Production
        </span>

        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-sm uppercase tracking-wider hover:opacity-70 transition-opacity duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
