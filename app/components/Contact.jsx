"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

// TESZT MÓD: ne küldjön valódi emailt, csak az animációt mutassa.
// Élesítéskor állítsd false-ra (vagy töröld a teszt-ágat a handleSubmit-ben).
const TEST_MODE = false;

export default function Contact() {
  const { t } = useLanguage();
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");
  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");

  function handleMessageChange(e) {
    setMessage(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // honeypot: if filled, treat as bot and silently succeed
    if (data.botcheck) return;

    setStatus("sending");

    // TESZT MÓD: POST kihagyva, csak az animáció fut le.
    if (TEST_MODE) {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      form.reset();
      setMessage("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `StillSoul árajánlat — ${data.category || ""}`,
          from_name: "StillSoul weboldal",
          category: data.category,
          email: data.email,
          message: data.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
        setMessage("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="arajanlat" className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center items-center px-8 md:px-16 py-16 md:py-24 min-h-[auto] md:min-h-screen">
          {status !== "success" && (
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                {t.contact.label}
              </span>
            </div>
          )}
          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="animate-fade-in-up w-full max-w-lg flex flex-col items-center text-center py-8"
            >
              <svg
                className="w-16 h-16 mb-8"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="contact-check-circle"
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className="contact-check-mark"
                  d="M21 33.5 L28.5 41 L44 24"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-base md:text-lg tracking-wide text-white/90">
                {t.contact.success}
              </p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-lg">
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
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
                rows={1}
                required
                value={message}
                onChange={handleMessageChange}
                placeholder={t.contact.messagePlaceholder}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm focus:border-white focus:outline-none transition-[border-color] resize-none overflow-hidden min-h-[3.75rem]"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 text-xs uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white"
            >
              {status === "sending" ? t.contact.sending : t.contact.submit}
            </button>
            <div aria-live="polite" className="min-h-[1.25rem]">
              {status === "error" && (
                <p className="text-xs tracking-wide text-red-400">{t.contact.error}</p>
              )}
            </div>
          </form>
          )}
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
