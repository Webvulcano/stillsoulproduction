"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiFolder, FiPlus, FiArrowLeft, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";
import { toWebp, uploadBlob, checkInputFile, SIZES } from "./uploadImage";
import {
  createItems,
  updateItemFields,
  deleteItem,
  deleteItems,
  moveItems,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  reorderItems,
} from "../actions";

// Feltöltés előtt a böngésző WebP-re méretez (nyers kamera-JPG is mehet).
// photo → full (lightbox) + thumb (rács); video → csak thumb (borítókép).
// Vissza: [{ image_url, thumb_url }] a fájlok sorrendjében.
async function uploadFiles(category, files, kind = "photo") {
  files.forEach(checkInputFile);
  const out = [];
  for (const f of files) {
    const base = `${category}/${crypto.randomUUID()}`;
    const thumb_url = await uploadBlob(`${base}-thumb`, await toWebp(f, SIZES.thumb));
    const image_url =
      kind === "photo"
        ? await uploadBlob(`${base}-full`, await toWebp(f, SIZES.full))
        : thumb_url;
    out.push({ image_url, thumb_url });
  }
  return out;
}

// A főoldali szolgáltatás-csempék (fixek) — a mappa ezekhez köthető.
const SERVICES = [
  { key: "foto", label: "Digitális és analóg fotózás" },
  { key: "brand", label: "Videóklippek & reklámanyagok" },
  { key: "kreativ", label: "Kreatív tartalomgyártás" },
  { key: "esemenyek", label: "Események és rendezvények" },
  { key: "filmes", label: "Filmes besegítés" },
  { key: "film", label: "Dokumentum- és játékfilm" },
];
const SERVICE_LABEL = Object.fromEntries(SERVICES.map((s) => [s.key, s.label]));

const inputCls =
  "w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30";
const btnGhost =
  "rounded border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10 transition-colors";
const btnPrimary =
  "rounded bg-white px-5 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50";

function previewUrl(it) {
  if (it.thumb_url || it.image_url) return it.thumb_url || it.image_url;
  if (it.youtube_id) return `https://img.youtube.com/vi/${it.youtube_id}/hqdefault.jpg`;
  return null;
}

export default function AdminDrive({ categories, items }) {
  const router = useRouter();
  const [cats, setCats] = useState(categories);
  const [openSlug, setOpenSlug] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [folderDialog, setFolderDialog] = useState(null); // {mode, cat?}
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState(() => new Set());

  const anchorRef = useRef(null); // shift-tartomány horgony (index)
  const idsRef = useRef([]); // aktuális mappa elem-id-k sorrendben

  useEffect(() => setCats(categories), [categories]);
  // Kijelölés + horgony törlése mappaváltáskor.
  useEffect(() => {
    setSelected(new Set());
    anchorRef.current = null;
  }, [openSlug]);

  // Kattintásos kijelölés: shift → tartomány a horgonytól; egyébként toggle + új horgony.
  const selectClick = (idx, shift) =>
    setSelected((prev) => {
      const ids = idsRef.current;
      const next = new Set(prev);
      if (shift && anchorRef.current != null) {
        const a = Math.min(anchorRef.current, idx);
        const b = Math.max(anchorRef.current, idx);
        for (let i = a; i <= b; i++) next.add(ids[i]);
      } else {
        const id = ids[idx];
        next.has(id) ? next.delete(id) : next.add(id);
        anchorRef.current = idx;
      }
      return next;
    });

  const openCat = cats.find((c) => c.slug === openSlug) || null;
  const countByCat = (slug) => items.filter((i) => i.category === slug).length;
  const folderItems = openSlug
    ? items.filter((i) => i.category === openSlug)
    : [];

  // Tetszőleges async munka futtatása busy/refresh/hibakezeléssel.
  async function perform(job, onDone) {
    setBusy(true);
    try {
      await job();
      onDone?.();
      router.refresh();
    } catch (err) {
      alert(err?.message || "Hiba történt.");
    } finally {
      setBusy(false);
    }
  }

  // — Drag & drop (mappák) —
  const dragCat = useRef(null);
  const onCatDrop = async (targetId) => {
    const from = dragCat.current;
    dragCat.current = null;
    if (!from || from === targetId) return;
    const ids = cats.map((c) => c.id);
    const next = [...ids];
    next.splice(next.indexOf(from), 1);
    next.splice(next.indexOf(targetId), 0, from);
    setCats(next.map((id) => cats.find((c) => c.id === id)));
    await reorderCategories(next);
    router.refresh();
  };

  // — Drag & drop (elemek a mappában) —
  const dragItem = useRef(null);
  const [orderIds, setOrderIds] = useState(null); // helyi elem-sorrend a mappában
  useEffect(() => {
    setOrderIds(openSlug ? folderItems.map((i) => i.id) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSlug, items]);
  const orderedFolderItems =
    orderIds
      ? orderIds.map((id) => folderItems.find((i) => i.id === id)).filter(Boolean)
      : folderItems;
  idsRef.current = orderedFolderItems.map((i) => i.id);

  // Cmd/Ctrl+A → az aktuális mappa összes elemének kijelölése.
  useEffect(() => {
    if (!openSlug) return;
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "a" || e.key === "A")) {
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        setSelected(new Set(idsRef.current));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSlug]);

  const onItemDrop = async (targetId) => {
    const from = dragItem.current;
    dragItem.current = null;
    if (!from || from === targetId || !orderIds) return;
    const next = [...orderIds];
    next.splice(next.indexOf(from), 1);
    next.splice(next.indexOf(targetId), 0, from);
    setOrderIds(next);
    await reorderItems(next);
    router.refresh();
  };

  return (
    <section className="mb-12 rounded-xl border border-white/10 bg-white/5 p-5">
      {/* Szekció-fejléc — mappán belül vissza-gomb + mappanév */}
      <header className="mb-4 flex items-center gap-3">
        {openSlug && (
          <button onClick={() => setOpenSlug(null)} className={btnGhost}>
            <FiArrowLeft />
          </button>
        )}
        <div>
          <h2 className="text-lg font-semibold uppercase tracking-widest">
            {openCat ? openCat.title_hu : "Portfólió"}
          </h2>
          {openCat && (
            <p className="text-xs text-white/40">{countByCat(openSlug)} elem</p>
          )}
        </div>
      </header>

      {/* GYÖKÉR: mappák */}
      {!openSlug && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {cats.map((c) => (
            <div
              key={c.id}
              draggable
              onDragStart={() => (dragCat.current = c.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onCatDrop(c.id)}
              className="group relative flex cursor-pointer flex-col rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              onClick={() => setOpenSlug(c.slug)}
            >
              <FiFolder className="mb-3 text-3xl text-white/70" />
              <div className="truncate text-sm font-medium">{c.title_hu}</div>
              <div className="text-xs text-white/40">
                {countByCat(c.slug)} elem
                {c.service_key ? ` · 🔗 ${SERVICE_LABEL[c.service_key] ?? c.service_key}` : ""}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFolderDialog({ mode: "edit", cat: c });
                }}
                className="absolute right-2 top-2 rounded p-1 text-white/40 opacity-0 hover:bg-white/10 hover:text-white group-hover:opacity-100"
                aria-label="Mappa szerkesztése"
              >
                <FiEdit2 />
              </button>
            </div>
          ))}

          {/* Új mappa */}
          <button
            onClick={() => setFolderDialog({ mode: "new" })}
            className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 p-4 text-white/50 hover:border-white/40 hover:text-white"
          >
            <FiPlus className="mb-2 text-2xl" />
            <span className="text-xs">Új mappa</span>
          </button>
        </div>
      )}

      {/* MAPPA NÉZET: elemek */}
      {openSlug && (
        <>
          {orderedFolderItems.length === 0 && (
            <p className="text-sm text-white/40">Üres mappa. Adj hozzá elemet a + gombbal.</p>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {orderedFolderItems.map((it, idx) => {
              const src = previewUrl(it);
              return (
                <div
                  key={it.id}
                  draggable
                  onDragStart={() => (dragItem.current = it.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onItemDrop(it.id)}
                  onClick={() => setEditItem(it)}
                  className={`group relative aspect-video cursor-pointer overflow-hidden rounded-lg border bg-white/5 ${
                    selected.has(it.id)
                      ? "border-white ring-2 ring-white"
                      : "border-white/10"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.has(it.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectClick(idx, e.shiftKey);
                    }}
                    onChange={() => {}}
                    className="absolute left-1.5 top-1.5 z-10 h-4 w-4 cursor-pointer accent-white"
                    aria-label="Kijelölés"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {src && (
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  )}
                  {it.kind === "video" && (
                    <span className="absolute right-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px]">
                      ▶ videó
                    </span>
                  )}
                  {(it.title_hu || it.title_en) && (
                    <span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-2 py-1 text-[11px]">
                      {it.title_hu || it.title_en}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tömeges műveleti sáv — kijelölt elemekre */}
          {selected.size > 0 && (
            <div className="fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-neutral-900 px-4 py-2 shadow-xl">
              <span className="text-sm">{selected.size} kijelölve</span>
              <select
                value=""
                onChange={(e) => {
                  const target = e.target.value;
                  if (!target) return;
                  perform(
                    () => moveItems([...selected], target),
                    () => setSelected(new Set())
                  );
                }}
                className="rounded border border-white/15 bg-white/5 px-2 py-1 text-xs text-white"
              >
                <option value="">Áthelyezés…</option>
                {cats
                  .filter((c) => c.slug !== openSlug)
                  .map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.title_hu}
                    </option>
                  ))}
              </select>
              <button
                onClick={() => {
                  if (!confirm(`${selected.size} elem törlése?`)) return;
                  perform(
                    () => deleteItems([...selected]),
                    () => setSelected(new Set())
                  );
                }}
                className="flex items-center gap-1 rounded border border-red-500/40 px-3 py-1 text-xs text-red-300 hover:bg-red-500/10"
              >
                <FiTrash2 /> Törlés
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="text-xs text-white/50 hover:text-white"
              >
                Kijelölés törlése
              </button>
            </div>
          )}

          {/* FAB — csak mappán belül, jobb alsó sarok */}
          <button
            onClick={() => setUploadOpen(true)}
            className="fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-black shadow-xl transition-transform hover:scale-105"
            aria-label="Új elem"
          >
            <FiPlus />
          </button>
        </>
      )}

      {/* DIALOG: feltöltés */}
      {uploadOpen && (
        <UploadDialog
          cats={cats}
          presetSlug={openSlug}
          busy={busy}
          onClose={() => setUploadOpen(false)}
          onSubmit={(d) =>
            perform(async () => {
              const images = d.files.length
                ? await uploadFiles(d.category, d.files, d.kind)
                : [];
              await createItems({
                kind: d.kind,
                category: d.category,
                youtube: d.youtube,
                title_hu: d.title_hu,
                title_en: d.title_en,
                year: d.year,
                images,
              });
            }, () => setUploadOpen(false))
          }
        />
      )}

      {/* DIALOG: elem szerkesztése */}
      {editItem && (
        <EditItemDialog
          item={editItem}
          cats={cats}
          busy={busy}
          onClose={() => setEditItem(null)}
          onSave={(d) =>
            perform(async () => {
              let img = {};
              if (d.file) [img] = await uploadFiles(d.category, [d.file], editItem.kind);
              await updateItemFields({
                id: d.id,
                category: d.category,
                youtube: d.youtube,
                title_hu: d.title_hu,
                title_en: d.title_en,
                year: d.year,
                image_url: img.image_url,
                thumb_url: img.thumb_url,
              });
            }, () => setEditItem(null))
          }
          onDelete={(fd) => perform(() => deleteItem(fd), () => setEditItem(null))}
        />
      )}

      {/* DIALOG: mappa (új / szerkesztés) */}
      {folderDialog && (
        <FolderDialog
          mode={folderDialog.mode}
          cat={folderDialog.cat}
          busy={busy}
          onClose={() => setFolderDialog(null)}
          onCreate={(fd) => perform(() => createCategory(fd), () => setFolderDialog(null))}
          onUpdate={(fd) => perform(() => updateCategory(fd), () => setFolderDialog(null))}
          onDelete={(fd) => perform(() => deleteCategory(fd), () => setFolderDialog(null))}
        />
      )}
    </section>
  );
}

// ————— Dialogok —————

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-white/10 p-5 shadow-2xl ring-1 ring-black/50"
        style={{ backgroundColor: "#0a0a0a" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/80">
            {title}
          </h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <FiX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function UploadDialog({ cats, presetSlug, busy, onClose, onSubmit }) {
  const [kind, setKind] = useState("photo");
  return (
    <Modal title="Új elem feltöltése" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          onSubmit({
            kind: fd.get("kind"),
            category: fd.get("category"),
            youtube: fd.get("youtube"),
            title_hu: fd.get("title_hu"),
            title_en: fd.get("title_en"),
            year: fd.get("year"),
            files: fd
              .getAll("image")
              .filter((f) => f && typeof f === "object" && f.size > 0),
          });
        }}
        className="grid gap-3"
      >
        <label className="text-xs text-white/50">
          Típus
          <select
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className={inputCls}
          >
            <option value="photo">Fotó (több fájl)</option>
            <option value="video">Videó (YouTube link)</option>
          </select>
        </label>
        <label className="text-xs text-white/50">
          Mappa
          <select
            name="category"
            className={inputCls}
            defaultValue={presetSlug || cats[0]?.slug}
          >
            {cats.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.title_hu}
              </option>
            ))}
          </select>
        </label>
        {kind === "video" && (
          <label className="text-xs text-white/50">
            YouTube link vagy ID
            <input name="youtube" className={inputCls} placeholder="https://youtu.be/…" />
          </label>
        )}
        <label className="text-xs text-white/50">
          Kép (max 3 MB/fájl){" "}
          {kind === "photo" ? "— több is kijelölhető" : "— opcionális egyedi thumbnail"}
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple={kind === "photo"}
            className={inputCls}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-white/50">
            Felirat (HU)
            <input name="title_hu" className={inputCls} />
          </label>
          <label className="text-xs text-white/50">
            Felirat (EN)
            <input name="title_en" className={inputCls} />
          </label>
        </div>
        <label className="text-xs text-white/50">
          Év (opcionális)
          <input name="year" type="number" className={inputCls} />
        </label>
        <button className={btnPrimary} disabled={busy}>
          {busy ? "Feltöltés…" : "Hozzáadás"}
        </button>
      </form>
    </Modal>
  );
}

function EditItemDialog({ item, cats, busy, onClose, onSave, onDelete }) {
  const src = previewUrl(item);
  return (
    <Modal title="Elem szerkesztése" onClose={onClose}>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="mb-4 max-h-[40vh] w-full rounded-lg object-contain"
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const f = fd.get("image");
          const hasFile = f && typeof f === "object" && f.size > 0;
          onSave({
            id: item.id,
            category: fd.get("category"),
            youtube: fd.get("youtube"),
            title_hu: fd.get("title_hu"),
            title_en: fd.get("title_en"),
            year: fd.get("year"),
            file: hasFile ? f : null,
          });
        }}
        className="grid gap-3"
      >
        <input type="hidden" name="id" value={item.id} />
        <label className="text-xs text-white/50">
          Mappa
          <select name="category" className={inputCls} defaultValue={item.category}>
            {cats.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.title_hu}
              </option>
            ))}
          </select>
        </label>
        {item.kind === "video" && (
          <label className="text-xs text-white/50">
            YouTube link/ID (csere)
            <input name="youtube" className={inputCls} placeholder={item.youtube_id} />
          </label>
        )}
        <label className="text-xs text-white/50">
          Kép csere (opcionális)
          <input type="file" name="image" accept="image/*" className={inputCls} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-white/50">
            Felirat (HU)
            <input name="title_hu" className={inputCls} defaultValue={item.title_hu ?? ""} />
          </label>
          <label className="text-xs text-white/50">
            Felirat (EN)
            <input name="title_en" className={inputCls} defaultValue={item.title_en ?? ""} />
          </label>
        </div>
        <label className="text-xs text-white/50">
          Év
          <input name="year" type="number" className={inputCls} defaultValue={item.year ?? ""} />
        </label>
        <div className="flex items-center justify-between">
          <button className={btnPrimary} disabled={busy}>
            {busy ? "Mentés…" : "Mentés"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              if (!confirm("Biztosan törlöd?")) return;
              const fd = new FormData();
              fd.set("id", item.id);
              onDelete(fd);
            }}
            className="flex items-center gap-1 rounded border border-red-500/40 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/10"
          >
            <FiTrash2 /> Törlés
          </button>
        </div>
      </form>
    </Modal>
  );
}

function FolderDialog({ mode, cat, busy, onClose, onCreate, onUpdate, onDelete }) {
  const isEdit = mode === "edit";
  return (
    <Modal title={isEdit ? "Mappa szerkesztése" : "Új mappa"} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          isEdit ? onUpdate(fd) : onCreate(fd);
        }}
        className="grid gap-3"
      >
        {isEdit && <input type="hidden" name="id" value={cat.id} />}
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-white/50">
            Név (HU)
            <input name="title_hu" className={inputCls} defaultValue={cat?.title_hu ?? ""} required />
          </label>
          <label className="text-xs text-white/50">
            Név (EN)
            <input name="title_en" className={inputCls} defaultValue={cat?.title_en ?? ""} required />
          </label>
        </div>
        <label className="text-xs text-white/50">
          Kapcsolt szolgáltatás-csempe (opcionális)
          <select name="service_key" className={inputCls} defaultValue={cat?.service_key ?? ""}>
            <option value="">— nincs —</option>
            {SERVICES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center justify-between">
          <button className={btnPrimary} disabled={busy}>
            {busy ? "Mentés…" : isEdit ? "Mentés" : "Létrehozás"}
          </button>
          {isEdit && (
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                if (!confirm("Mappa törlése (csak ha üres)?")) return;
                const fd = new FormData();
                fd.set("id", cat.id);
                fd.set("slug", cat.slug);
                onDelete(fd);
              }}
              className="flex items-center gap-1 rounded border border-red-500/40 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/10"
            >
              <FiTrash2 /> Törlés
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
