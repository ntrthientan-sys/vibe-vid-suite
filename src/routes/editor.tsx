import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, Download, FileUp, Film, Image as ImageIcon, Music, Pause, Play, Plus,
  Redo2, Scissors, SkipBack, Trash2, Undo2, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/editor")({
  head: () => ({
    meta: [
      { title: "Trình chỉnh sửa — Master Studio" },
      { name: "description", content: "Chỉnh sửa video trên timeline: nhập media, cắt, tách, sắp xếp và xem trước." },
      { property: "og:title", content: "Trình chỉnh sửa — Master Studio" },
      { property: "og:description", content: "Chỉnh sửa video trên timeline ngay trong trình duyệt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Editor,
});

type Kind = "video" | "image" | "audio";
type Media = { id: string; name: string; kind: Kind; url: string; duration: number };
type Track = "main" | "audio";
type Clip = { id: string; mediaId: string; track: Track; in: number; out: number };

const uid = () => Math.random().toString(36).slice(2, 10);
const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toFixed(1).padStart(4, "0")}`;
};

function probe(file: File): Promise<Media> {
  const url = URL.createObjectURL(file);
  const kind: Kind = file.type.startsWith("video") ? "video" : file.type.startsWith("audio") ? "audio" : "image";
  const base = { id: uid(), name: file.name, kind, url };
  if (kind === "image") return Promise.resolve({ ...base, duration: 3 });
  return new Promise((res) => {
    const el = document.createElement(kind);
    el.preload = "metadata";
    el.onloadedmetadata = () => res({ ...base, duration: isFinite(el.duration) ? el.duration : 5 });
    el.onerror = () => res({ ...base, duration: 5 });
    el.src = url;
  });
}

function layout(clips: Clip[], track: Track) {
  let t = 0;
  return clips.filter((c) => c.track === track).map((c) => {
    const start = t;
    t += c.out - c.in;
    return { clip: c, start, end: t };
  });
}

function Editor() {
  const [media, setMedia] = useState<Media[]>([]);
  const [clips, setClipsRaw] = useState<Clip[]>([]);
  const [past, setPast] = useState<Clip[][]>([]);
  const [future, setFuture] = useState<Clip[][]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [zoom, setZoom] = useState(40);
  const fileRef = useRef<HTMLInputElement>(null);
  const jsonRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dragId = useRef<string | null>(null);

  const commit = useCallback((next: Clip[] | ((c: Clip[]) => Clip[])) => {
    setClipsRaw((cur) => {
      const n = typeof next === "function" ? next(cur) : next;
      setPast((p) => [...p.slice(-49), cur]);
      setFuture([]);
      return n;
    });
  }, []);
  const undo = () => { if (!past.length) return; setFuture((f) => [clips, ...f]); setClipsRaw(past[past.length - 1]!); setPast((p) => p.slice(0, -1)); };
  const redo = () => { if (!future.length) return; setPast((p) => [...p, clips]); setClipsRaw(future[0]!); setFuture((f) => f.slice(1)); };

  const mainL = useMemo(() => layout(clips, "main"), [clips]);
  const audioL = useMemo(() => layout(clips, "audio"), [clips]);
  const total = Math.max(mainL.at(-1)?.end ?? 0, audioL.at(-1)?.end ?? 0);
  const mById = useMemo(() => Object.fromEntries(media.map((m) => [m.id, m])), [media]);

  const curMain = mainL.find((l) => time >= l.start && time < l.end);
  const curMainMedia = curMain ? mById[curMain.clip.mediaId] : undefined;
  const curAudio = audioL.find((l) => time >= l.start && time < l.end);

  // playback clock
  useEffect(() => {
    if (!playing) return;
    let raf = 0; let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000; last = now;
      setTime((t) => {
        const n = t + dt;
        if (n >= total) { setPlaying(false); return total; }
        return n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total]);

  // sync media elements
  const syncEl = (el: HTMLMediaElement | null, l: typeof curMain, m?: Media) => {
    if (!el) return;
    if (!l || !m || m.kind === "image") { el.pause(); return; }
    if (el.dataset.src !== m.url) { el.src = m.url; el.dataset.src = m.url; }
    const target = l.clip.in + (time - l.start);
    if (Math.abs(el.currentTime - target) > 0.3) el.currentTime = target;
    if (playing && el.paused) void el.play().catch(() => {});
    if (!playing && !el.paused) el.pause();
  };
  useEffect(() => syncEl(videoRef.current, curMain, curMainMedia));
  useEffect(() => syncEl(audioRef.current, curAudio, curAudio ? mById[curAudio.clip.mediaId] : undefined));

  const importFiles = async (files: FileList | null) => {
    if (!files) return;
    const list = await Promise.all(Array.from(files).map(probe));
    setMedia((m) => [...m, ...list]);
  };
  const addToTimeline = (m: Media) =>
    commit((c) => [...c, { id: uid(), mediaId: m.id, track: m.kind === "audio" ? "audio" : "main", in: 0, out: m.duration }]);

  const split = () => {
    const l = [...mainL, ...audioL].find((x) => x.clip.id === selected && time > x.start + 0.05 && time < x.end - 0.05)
      ?? [...mainL, ...audioL].find((x) => time > x.start + 0.05 && time < x.end - 0.05);
    if (!l) return;
    const cut = l.clip.in + (time - l.start);
    commit((c) => c.flatMap((x) => x.id === l.clip.id ? [{ ...x, out: cut }, { ...x, id: uid(), in: cut }] : [x]));
  };
  const remove = () => { if (selected) { commit((c) => c.filter((x) => x.id !== selected)); setSelected(null); } };

  const trim = (e: React.PointerEvent, clip: Clip, edge: "in" | "out") => {
    e.stopPropagation(); e.preventDefault();
    const startX = e.clientX; const orig = { ...clip }; const m = mById[clip.mediaId]!;
    const maxDur = m.kind === "image" ? 60 : m.duration;
    let first = true;
    const move = (ev: PointerEvent) => {
      const d = (ev.clientX - startX) / zoom;
      const upd = (x: Clip) => {
        if (x.id !== clip.id) return x;
        return edge === "in"
          ? { ...x, in: Math.min(Math.max(0, orig.in + d), orig.out - 0.2) }
          : { ...x, out: Math.max(Math.min(maxDur, orig.out + d), orig.in + 0.2) };
      };
      if (first) { commit((c) => c.map(upd)); first = false; } else setClipsRaw((c) => c.map(upd));
    };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
  };

  const dropOn = (targetId: string) => {
    const src = dragId.current; dragId.current = null;
    if (!src || src === targetId) return;
    commit((c) => {
      const a = c.find((x) => x.id === src); const b = c.find((x) => x.id === targetId);
      if (!a || !b || a.track !== b.track) return c;
      const rest = c.filter((x) => x.id !== src);
      const i = rest.findIndex((x) => x.id === targetId);
      rest.splice(i, 0, a);
      return rest;
    });
  };

  const saveJson = () => {
    const data = { version: 1, media: media.map(({ url: _u, ...m }) => m), clips };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    a.download = "master-studio-project.json"; a.click();
  };
  const loadJson = async (f: File | undefined) => {
    if (!f) return;
    const data = JSON.parse(await f.text()) as { media: Omit<Media, "url">[]; clips: Clip[] };
    // relink by filename with already-imported media
    const map: Record<string, string> = {};
    const extra: Media[] = [];
    data.media.forEach((m) => {
      const found = media.find((x) => x.name === m.name);
      if (found) map[m.id] = found.id; else { extra.push({ ...m, url: "" }); map[m.id] = m.id; }
    });
    setMedia((cur) => [...cur, ...extra]);
    commit(data.clips.map((c) => ({ ...c, mediaId: map[c.mediaId] ?? c.mediaId })));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); setPlaying((p) => !p); }
      else if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      else if (e.key === "Delete" || e.key === "Backspace") remove();
      else if (e.key === "s" && !e.ctrlKey) split();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTime(Math.min(total, Math.max(0, (e.clientX - r.left + e.currentTarget.scrollLeft) / zoom)));
  };

  const KindIcon = { video: Film, image: ImageIcon, audio: Music };
  const trackRow = (rows: typeof mainL, label: string) => (
    <div className="flex h-16 items-stretch gap-0 border-b border-border/50">
      <div className="sticky left-0 z-10 flex w-20 shrink-0 items-center bg-surface px-2 text-[10px] text-muted-foreground">{label}</div>
      {rows.map(({ clip }) => {
        const m = mById[clip.mediaId];
        const on = selected === clip.id;
        return (
          <div
            key={clip.id}
            draggable
            onDragStart={() => { dragId.current = clip.id; }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => dropOn(clip.id)}
            onClick={(e) => { e.stopPropagation(); setSelected(clip.id); }}
            style={{ width: (clip.out - clip.in) * zoom }}
            className={`relative my-1 shrink-0 cursor-grab overflow-hidden rounded border text-[10px] ${on ? "border-primary bg-primary/30" : "border-primary/40 bg-primary/10"}`}
          >
            <span className="absolute inset-x-2 top-1 truncate">{m?.name ?? "Thiếu media"}</span>
            <span className="absolute bottom-1 left-2 text-muted-foreground">{fmt(clip.out - clip.in)}</span>
            <span onPointerDown={(e) => trim(e, clip, "in")} className="absolute inset-y-0 left-0 w-1.5 cursor-ew-resize bg-primary/70" />
            <span onPointerDown={(e) => trim(e, clip, "out")} className="absolute inset-y-0 right-0 w-1.5 cursor-ew-resize bg-primary/70" />
          </div>
        );
      })}
    </div>
  );

  return (
    <main className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-primary/30 bg-header/95 px-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm"><Link to="/"><ArrowLeft className="size-3.5" />Trang chủ</Link></Button>
          <span className="brand-mark">Master Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={undo} disabled={!past.length} aria-label="Hoàn tác"><Undo2 className="size-3.5" /></Button>
          <Button variant="outline" size="sm" onClick={redo} disabled={!future.length} aria-label="Làm lại"><Redo2 className="size-3.5" /></Button>
          <Button variant="outline" size="sm" onClick={() => jsonRef.current?.click()}><FileUp className="size-3.5" />Mở dự án</Button>
          <Button size="sm" onClick={saveJson}><Download className="size-3.5" />Lưu dự án</Button>
          <input ref={jsonRef} type="file" accept="application/json" className="hidden" onChange={(e) => loadJson(e.target.files?.[0])} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-64 shrink-0 flex-col border-r border-border/50 bg-surface">
          <div className="flex items-center justify-between p-3">
            <p className="section-label">THƯ VIỆN MEDIA</p>
            <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}><Upload className="size-3.5" />Nhập</Button>
            <input ref={fileRef} type="file" multiple accept="video/*,audio/*,image/*" className="hidden" onChange={(e) => importFiles(e.target.files)} />
          </div>
          <div
            className="flex-1 space-y-2 overflow-y-auto p-3 pt-0"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); void importFiles(e.dataTransfer.files); }}
          >
            {!media.length && <p className="rounded border border-dashed border-border p-4 text-center text-xs text-muted-foreground">Kéo thả video, ảnh, nhạc vào đây</p>}
            {media.map((m) => {
              const I = KindIcon[m.kind];
              return (
                <div key={m.id} className="flex items-center gap-2 rounded border border-border/60 bg-background p-2 text-xs">
                  <I className="size-4 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate">{m.name}</p>
                    <p className="text-[10px] text-muted-foreground">{m.url ? fmt(m.duration) : "Cần nhập lại file"}</p>
                  </div>
                  <Button size="icon" variant="outline" className="size-7" onClick={() => addToTimeline(m)} aria-label="Thêm vào timeline"><Plus className="size-3.5" /></Button>
                </div>
              );
            })}
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3 p-4">
          <div className="relative flex aspect-video w-full max-w-3xl items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-strong">
            <video ref={videoRef} className={`h-full w-full object-contain ${curMainMedia?.kind === "video" ? "" : "hidden"}`} playsInline />
            {curMainMedia?.kind === "image" && <img src={curMainMedia.url} alt={curMainMedia.name} className="h-full w-full object-contain" />}
            {!curMainMedia && <p className="text-xs text-muted-foreground">Thêm clip vào timeline để xem trước</p>}
            <audio ref={audioRef} />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Button size="icon" variant="outline" onClick={() => setTime(0)} aria-label="Về đầu"><SkipBack className="size-4" /></Button>
            <Button size="icon" onClick={() => { if (time >= total) setTime(0); setPlaying((p) => !p); }} disabled={!total} aria-label={playing ? "Tạm dừng" : "Phát"}>
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </Button>
            <span className="w-28 text-center tabular-nums text-muted-foreground">{fmt(time)} / {fmt(total)}</span>
            <Button size="sm" variant="outline" onClick={split}><Scissors className="size-3.5" />Tách (S)</Button>
            <Button size="sm" variant="outline" onClick={remove} disabled={!selected}><Trash2 className="size-3.5" />Xóa</Button>
          </div>
        </section>
      </div>

      <footer className="h-52 shrink-0 border-t border-primary/30 bg-surface">
        <div className="flex items-center justify-between px-3 py-1.5 text-[10px] text-muted-foreground">
          <span>TIMELINE · kéo clip để sắp xếp · kéo mép vàng để cắt · Space phát/dừng</span>
          <label className="flex items-center gap-2">Thu phóng
            <input type="range" min={10} max={150} value={zoom} onChange={(e) => setZoom(+e.target.value)} className="accent-primary" />
          </label>
        </div>
        <div className="relative h-[calc(100%-28px)] overflow-x-auto" onClick={(e) => { setSelected(null); seek(e); }}>
          <div className="relative" style={{ minWidth: 80 + total * zoom + 200 }}>
            <div className="ml-20 h-5 border-b border-border/50 text-[9px] text-muted-foreground">
              {Array.from({ length: Math.ceil(total) + 5 }, (_, i) => i).filter((i) => i % Math.max(1, Math.round(60 / zoom)) === 0).map((i) => (
                <span key={i} className="absolute" style={{ left: 80 + i * zoom }}>{i}s</span>
              ))}
            </div>
            {trackRow(mainL, "Video/Ảnh")}
            {trackRow(audioL, "Âm thanh")}
            <div className="pointer-events-none absolute inset-y-0 w-px bg-primary" style={{ left: 80 + time * zoom }} />
          </div>
        </div>
      </footer>
    </main>
  );
}
