import { cache } from "react";
import { dict } from "@/app/i18n/dict";
import { getCms } from "@/lib/cms";
import { SECTIONS, cmsKey, getPath, setPath } from "@/lib/cms-schema";

// The i18n dictionary with every CMS-editable text replaced by its CMS value.
// The language stays client-side (LanguageProvider), so both languages are sent down.
function buildDict(locale, cms) {
  const out = structuredClone(dict[locale]);
  for (const section of SECTIONS) {
    for (const field of section.fields) {
      const key = cmsKey(section, field);
      if (field.type === "list") {
        const base = getPath(out, field.path) ?? [];
        setPath(out, field.path, cms.list(key).map((item, i) => ({ ...base[i], ...item })));
      } else if (field.lines) {
        setPath(out, field.path, cms.lines(key));
      } else {
        setPath(out, field.path, cms.text(key));
      }
    }
  }
  return out;
}

export const getCmsDicts = cache(async () => {
  const [hu, en] = await Promise.all([getCms("hu"), getCms("en")]);
  return { hu: buildDict("hu", hu), en: buildDict("en", en) };
});

// Image slots of a section, in manifest order: [{ key, src, width, height, alt }]
export async function getSectionImages(sectionKey) {
  const cms = await getCms("hu");
  const section = SECTIONS.find((s) => s.key === sectionKey);
  return (section?.images ?? []).map((img) => {
    const key = `${section.page}.${section.key}.${img.key}`;
    return { key, ...cms.image(key) };
  });
}

