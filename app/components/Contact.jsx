"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");

  function handleMessageChange(e) {
    setMessage(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  }

  return (
    <section id="arajanlat" className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center items-center px-8 md:px-16 py-16 md:py-24 min-h-[auto] md:min-h-screen">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              {t.contact.label}
            </span>
          </div>
          <form className="space-y-8 w-full max-w-lg">
            <div>
              <label htmlFor="category" className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                {t.contact.categoryLabel}
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className="w-full appearance-none bg-black text-white border-b border-white/20 py-3 text-sm focus:border-white focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" disabled>{t.contact.categoryPlaceholder}</option>
                  {t.contact.categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-black text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/40 text-xs">▾</span>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                {t.contact.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder={t.contact.emailPlaceholder}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                {t.contact.messageLabel}
              </label>
              <textarea
                ref={textareaRef}
                id="message"
                name="message"
                rows={2}
                required
                value={message}
                onChange={handleMessageChange}
                placeholder={t.contact.messagePlaceholder}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-white focus:outline-none transition-[border-color] resize-none overflow-hidden min-h-[3.75rem]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 text-xs uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
            >
              {t.contact.submit}
            </button>
          </form>
        </div>
        <div className="relative w-full min-h-[400px] overflow-hidden">
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
