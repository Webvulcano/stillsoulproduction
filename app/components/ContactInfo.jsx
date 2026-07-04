"use client";

import { FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageProvider";

const contacts = [
  {
    icon: FaPhone,
    label: "+36 30 305 3304",
    href: "tel:+36303053304",
  },
  {
    icon: FaEnvelope,
    label: "stillsoulproduction@gmail.com",
    href: "mailto:stillsoulproduction@gmail.com",
  },
  {
    icon: FaInstagram,
    label: "@stillsoulproduction",
    href: "https://www.instagram.com/stillsoulproduction/",
    external: true,
  },
];

export default function ContactInfo() {
  const { t } = useLanguage();
  return (
    <section className="bg-black text-white py-16">
      <span className="block text-xs uppercase tracking-[0.3em] text-white/40 text-center mb-8">
        {t.contactInfo.label}
      </span>
      <div className="flex flex-wrap justify-center gap-8 md:gap-14 px-6">
        {contacts.map(({ icon: Icon, label, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-3"
          >
            <Icon className="text-white/70 text-xl group-hover:text-white group-hover:scale-110 transition-all duration-300" />
            <span className="text-xs md:text-sm text-white/50 group-hover:text-white transition-colors duration-300">
              {label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
