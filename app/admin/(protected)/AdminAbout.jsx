"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveAbout } from "../actions";
import {
  uploadSiteImage,
  MAX_SITE_IMAGE_BYTES,
  inputCls,
  btnGhost,
  btnPrimary,
} from "./uploadImage";

const SLOTS = 6;
const TEXT_FIELDS = ["title", "p1", "p2", "p3"];
const LABELS = {
  title: "Cím",
  p1: "1. bekezdés",
  p2: "2. bekezdés",
  p3: "3. bekezdés",
};

const emptySlots = () => Array(SLOTS).fill(null);

// Kép-slot: előnézet + Csere gomb. A kiválasztott fájl csak mentéskor töltődik fel.
// pending: { file, url } vagy null — az url objektum-URL az azonnali előnézethez.
function PhotoSlot({ url, pending, onPick }) {
  const inputRef = useRef(null);
  const src = pending?.url || url;

  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-white/10 bg-white/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src && <img src={src} alt="" className="h-full w-full object-cover" />}
      {pending && (
        <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px]">
          új
        </span>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-[11px] hover:bg-black/80"
      >
        Csere
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          if (f.size > MAX_SITE_IMAGE_BYTES) {
            alert(
              `Túl nagy fájl: ${(f.size / 1024 / 1024).toFixed(1)} MB. Max 1 MB.`
            );
            return;
          }
          onPick(f);
        }}
      />
    </div>
  );
}

function PhotoRow({ label, urls, pending, onPick }) {
  return (
    <div>
      <p className="mb-2 text-xs text-white/50">{label} (max 1 MB / kép)</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {urls.map((url, i) => (
          <PhotoSlot
            key={i}
            url={url}
            pending={pending[i]}
            onPick={(f) => onPick(i, f)}
          />
        ))}
      </div>
    </div>
  );
}

// A komponenst a szülő kulcsozza a szerver-adattal → mentés után reset.
export default function AdminAbout({ about }) {
  const router = useRouter();
  const [draft, setDraft] = useState(about);
  const [top, setTop] = useState(emptySlots);
  const [bottom, setBottom] = useState(emptySlots);
  const [busy, setBusy] = useState(false);

  const dirty =
    JSON.stringify(draft) !== JSON.stringify(about) ||
    top.some(Boolean) ||
    bottom.some(Boolean);

  const setField = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  // Új fájl a sloton: a korábbi objektum-URL-t elengedjük.
  const pick = (setter) => (i, file) =>
    setter((prev) =>
      prev.map((p, j) => {
        if (j !== i) return p;
        if (p?.url) URL.revokeObjectURL(p.url);
        return { file, url: URL.createObjectURL(file) };
      })
    );

  function clearPending() {
    for (const p of [...top, ...bottom]) if (p?.url) URL.revokeObjectURL(p.url);
    setTop(emptySlots());
    setBottom(emptySlots());
  }

  function reset() {
    setDraft(about);
    clearPending();
  }

  async function onSave() {
    setBusy(true);
    try {
      // Előbb a kicserélt képek feltöltése, utána megy a teljes objektum.
      const upload = (pending, urls) =>
        Promise.all(
          pending.map((p, i) =>
            p ? uploadSiteImage("about", p.file) : urls[i]
          )
        );
      const [top_photos, bottom_photos] = await Promise.all([
        upload(top, draft.top_photos),
        upload(bottom, draft.bottom_photos),
      ]);
      await saveAbout({ ...draft, top_photos, bottom_photos });
      clearPending();
      router.refresh();
    } catch (err) {
      alert(err?.message || "Hiba történt.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mb-12 rounded-xl border border-white/10 bg-white/5 p-5">
      <h2 className="mb-4 text-lg font-semibold uppercase tracking-widest">
        Rólunk
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {["hu", "en"].map((lang) => (
          <div key={lang} className="grid gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40">
              {lang === "hu" ? "Magyar" : "English"}
            </p>
            {TEXT_FIELDS.map((f) => {
              const key = `${f}_${lang}`;
              return (
                <label key={key} className="text-xs text-white/50">
                  {LABELS[f]}
                  {f === "title" ? (
                    <input
                      className={inputCls}
                      value={draft[key] ?? ""}
                      onChange={(e) => setField(key, e.target.value)}
                    />
                  ) : (
                    <textarea
                      rows={4}
                      className={inputCls}
                      value={draft[key] ?? ""}
                      onChange={(e) => setField(key, e.target.value)}
                    />
                  )}
                </label>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5">
        <PhotoRow
          label="Felső képsáv"
          urls={draft.top_photos}
          pending={top}
          onPick={pick(setTop)}
        />
        <PhotoRow
          label="Alsó képsáv"
          urls={draft.bottom_photos}
          pending={bottom}
          onPick={pick(setBottom)}
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={onSave} disabled={busy || !dirty} className={btnPrimary}>
          {busy ? "Mentés…" : "Mentés"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={busy || !dirty}
          className={btnGhost}
        >
          Mégsem
        </button>
      </div>
    </section>
  );
}
