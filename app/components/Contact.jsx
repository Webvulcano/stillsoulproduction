"use client";
import Image from "next/image";

export default function Contact() {
  return (
    <section id="kapcsolat" className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="flex flex-col justify-center items-center px-8 md:px-16 py-24">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              — Kapcsolat —
            </span>
          </div>
          <form className="space-y-8 w-full max-w-lg">
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                Email cím
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="pelda@email.com"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                Tárgy
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="Email tárgya"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                Szöveg
              </label>
              <textarea
                id="message"
                name="message"
                rows={1}
                required
                placeholder="Írd le röviden, mit szeretnél..."
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors resize-none overflow-hidden"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 text-xs uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
            >
              Küldés
            </button>
          </form>
        </div>
        <div className="relative w-full h-full min-h-[400px] overflow-hidden">
          <Image
            src="/contact.jpg"
            alt="Kapcsolat"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>
      </div>
    </section>
  );
}
