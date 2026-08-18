"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveServiceTile } from "../actions";
import {
  uploadSiteImage,
  MAX_SITE_IMAGE_BYTES,
  inputCls,
  btnGhost,
  btnPrimary,
} from "./uploadImage";

function Tile({ tile, num }) {
  const router = useRouter();
  const [draft, setDraft] = useState(tile);
  // pending: { file, url } vagy null — az url objektum-URL az azonnali előnézethez.
  const [pending, setPending] = useState(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  const dirty = JSON.stringify(draft) !== JSON.stringify(tile) || !!pending;
  const setField = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  function clearPending() {
    setPending((p) => {
      if (p?.url) URL.revokeObjectURL(p.url);
      return null;
    });
  }

  function reset() {
    setDraft(tile);
    clearPending();
  }

  async function onSave() {
    setBusy(true);
    try {
      const image_url = pending
        ? await uploadSiteImage("services", pending.file)
        : draft.image_url;
      await saveServiceTile({ ...draft, image_url });
      clearPending();
      router.refresh();
    } catch (err) {
      alert(err?.message || "Hiba történt.");
    } finally {
      setBusy(false);
    }
  }

  const src = pending?.url || draft.image_url;

  return (
    <div className="grid gap-4 rounded-lg border border-white/10 bg-white/5 p-4 md:grid-cols-[220px_1fr]">
      <div>
        <div className="relative aspect-video overflow-hidden rounded border border-white/10 bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {src && <img src={src} alt="" className="h-full w-full object-cover" />}
          <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px]">
            {num}
          </span>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`${btnGhost} mt-2 w-full`}
        >
          Kép cseréje (max 1 MB)
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
            setPending((p) => {
              if (p?.url) URL.revokeObjectURL(p.url);
              return { file: f, url: URL.createObjectURL(f) };
            });
          }}
        />
      </div>

      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-white/50">
            Cím (HU)
            <input
              className={inputCls}
              value={draft.title_hu ?? ""}
              onChange={(e) => setField("title_hu", e.target.value)}
            />
          </label>
          <label className="text-xs text-white/50">
            Cím (EN)
            <input
              className={inputCls}
              value={draft.title_en ?? ""}
              onChange={(e) => setField("title_en", e.target.value)}
            />
          </label>
          <label className="text-xs text-white/50">
            Leírás (HU)
            <textarea
              rows={3}
              className={inputCls}
              value={draft.details_hu ?? ""}
              onChange={(e) => setField("details_hu", e.target.value)}
            />
          </label>
          <label className="text-xs text-white/50">
            Leírás (EN)
            <textarea
              rows={3}
              className={inputCls}
              value={draft.details_en ?? ""}
              onChange={(e) => setField("details_en", e.target.value)}
            />
          </label>
        </div>
        <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
}

export default function AdminServices({ services }) {
  return (
    <section className="mb-12 rounded-xl border border-white/10 bg-white/5 p-5">
      <h2 className="mb-4 text-lg font-semibold uppercase tracking-widest">
        Munkáink
      </h2>
      <div className="grid gap-4">
        {services.map((tile, i) => (
          <Tile
            key={`${tile.slug}:${JSON.stringify(tile)}`}
            tile={tile}
            num={String(i + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </section>
  );
}
