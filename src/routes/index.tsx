import { createFileRoute } from "@tanstack/react-router";
import {
  AudioLines,
  Captions,
  ChevronRight,
  CircleDollarSign,
  Clapperboard,
  Clock3,
  CloudUpload,
  FileAudio,
  Film,
  FolderClosed,
  House,
  Languages,
  LogIn,
  Mic2,
  Music2,
  Play,
  Plus,
  Scissors,
  SlidersHorizontal,
  Sparkles,
  Star,
  Subtitles,
  WandSparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import outdoorFitness from "@/assets/sample-outdoor-fitness.jpg";
import pilates from "@/assets/sample-pilates.jpg";
import speaker from "@/assets/sample-speaker.jpg";
import workout from "@/assets/sample-workout.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Master Videos — Video dài thành nhiều Short" },
      { name: "description", content: "Biến video dài thành nội dung ngắn bằng công cụ chỉnh sửa AI." },
      { property: "og:title", content: "Master Videos — Video dài thành nhiều Short" },
      { property: "og:description", content: "Biến video dài thành nội dung ngắn bằng công cụ chỉnh sửa AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const tools = [
  [Subtitles, "Sửa lỗi phụ đề AI"], [Music2, "Đồng bộ nhịp nhạc"],
  [SlidersHorizontal, "Lọc màu điện ảnh"], [WandSparkles, "AI chấm điểm cảnh quay"],
  [Clapperboard, "Video dài → Short"], [FileAudio, "Nhập từ YouTube/Drive"],
  [Sparkles, "Hook mở đầu"], [Captions, "Caption động"],
  [Languages, "Cắt khoảng lặng tự động"], [Film, "Slide tới hậu AI"],
  [AudioLines, "Đồng bộ nhịp nhạc"], [Scissors, "Lọc màu điện ảnh"],
] as const;

const samples = [outdoorFitness, pilates, speaker, workout, speaker, pilates];

function Index() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [activeTab, setActiveTab] = useState("Video dài → Short");
  const [libraryTab, setLibraryTab] = useState("Tất cả các dự án (6)");
  const [linkValue, setLinkValue] = useState("https://www.youtube.com/watch?v=06EMXRNZ5xA");
  const [ytId, setYtId] = useState("");
  const [linkError, setLinkError] = useState("");

  const openPicker = () => inputRef.current?.click();
  const handleFiles = (files: FileList | null) => {
    const file = files?.item(0);
    if (file) setFileName(file.name);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-primary/30 bg-header/95 shadow-gold">
        <div className="flex h-14 items-center justify-between px-4 lg:px-7">
          <div className="flex items-center gap-4">
            <a href="#top" className="brand-mark" aria-label="Master Videos, trang chủ">Master Videos</a>
            <span className="hidden text-xs font-semibold text-foreground sm:inline">Video dài → Nhiều Short</span>
          </div>
          <div className="hidden text-xs font-medium text-muted-foreground lg:block">Thế Giới → Thu Nhập → Tự Do</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><CircleDollarSign className="size-3.5 text-primary" />Giá cả</Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex"><FolderClosed className="size-3.5" />Dự án</Button>
            <Button variant="outline" size="sm" className="hidden md:inline-flex"><AudioLines className="size-3.5" />Âm thanh</Button>
            <Button variant="outline" size="sm"><LogIn className="size-3.5" />Đăng nhập</Button>
          </div>
        </div>
      </header>

      <div id="top" className="flex">
        <aside className="fixed bottom-0 left-0 top-14 z-20 hidden w-44 border-r border-border/50 bg-background px-3 py-4 lg:block">
          <Button variant="outline" className="w-full justify-start border-primary/60 text-primary"><House className="size-4" />Trang chủ</Button>
        </aside>

        <div className="mx-auto w-full max-w-[1120px] px-4 pb-20 pt-10 lg:ml-44 lg:px-8">
          <section className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="watermark" aria-hidden="true">Master Videos</div>
            <p className="relative z-10 text-sm font-medium">Biến video thô thành content viral — tự động, bằng AI.</p>
            <p className="relative z-10 mt-4 text-xs text-muted-foreground">Kéo thả video dài — AI quét và đề xuất đoạn hay nhất</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const m = linkValue.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
                if (m) { setYtId(m[1] ?? ""); setLinkError(""); } else { setYtId(""); setLinkError("Link chưa hợp lệ — hiện chỉ hỗ trợ xem trước YouTube."); }
              }}
              className="relative z-10 mt-5 flex w-full max-w-lg items-center gap-2 rounded-lg border border-border bg-surface p-2 shadow-panel"
            >
              <input value={linkValue} onChange={(e) => setLinkValue(e.target.value)} aria-label="Dán liên kết video" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground" placeholder="Dán link YouTube, Google Drive, hoặc link file vào đây" />
              <Button size="sm" type="submit">Lấy video</Button>
            </form>
            {linkError && <p className="relative z-10 mt-2 text-xs text-destructive">{linkError}</p>}
            {ytId && (
              <div className="relative z-10 mt-4 w-full max-w-lg overflow-hidden rounded-lg border border-primary/40 shadow-panel">
                <iframe
                  className="aspect-video w-full"
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title="Xem trước video YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="relative z-10 my-3 flex w-full max-w-lg items-center gap-3 text-[10px] uppercase text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">hoặc</div>

            <button
              type="button"
              onClick={openPicker}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => { event.preventDefault(); handleFiles(event.dataTransfer.files); }}
              className="upload-zone relative z-10 w-full max-w-lg"
            >
              <CloudUpload className="size-6 text-primary" />
              <span className="text-sm font-semibold">{fileName || "Kéo thả file video dài vào đây"}</span>
              <span className="text-xs text-muted-foreground">hoặc bấm để chọn file từ máy</span>
            </button>
            <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={(event) => handleFiles(event.target.files)} />

            <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span>Chế độ mặc:</span>
              {["Talking-head", "Nhiều clip + Nhạc", "Video dài → Short"].map((tab) => (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={activeTab === tab ? "tab-active" : "tab-idle"}>{tab}</button>
              ))}
            </div>
          </section>

          <section className="mt-11">
            <p className="section-label">ĐƯỢC HỖ TRỢ BỞI AI</p>
            <div className="marquee mt-5" aria-label="Danh sách công cụ AI">
              <div className="marquee-track">
                {[...tools, ...tools].map(([Icon, label], i) => (
                  <button key={i} type="button" aria-hidden={i >= tools.length} tabIndex={i >= tools.length ? -1 : 0} className="group flex w-24 shrink-0 flex-col items-center gap-2 text-center">
                    <span className="tool-icon"><Icon className="size-5" /></span>
                    <span className="line-clamp-2 text-[10px] font-medium leading-4 text-muted-foreground group-hover:text-foreground">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12">
            <p className="section-label">VIDEO MẪU</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {samples.map((image, index) => (
                <button key={index} type="button" onClick={() => setFileName(`Đã chọn Video mẫu ${index + 1}`)} className="sample-card group">
                  <div className="relative aspect-[9/15] overflow-hidden">
                    <img src={image} alt={`Video mẫu ${index + 1}`} loading="lazy" width={768} height={1344} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    <span className="sound-dot"><AudioLines className="size-3" /></span>
                    <span className="play-overlay"><Play className="size-5 fill-current" /></span>
                  </div>
                  <span className="block px-2 py-2 text-left text-[10px] font-medium">Video mẫu {index + 1}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div className="flex gap-5 overflow-x-auto border-b border-border text-xs">
                {["Tất cả các dự án (6)", "Dự án đã lưu (0)", "Nháp"].map((tab) => (
                  <button key={tab} type="button" onClick={() => setLibraryTab(tab)} className={libraryTab === tab ? "library-tab-active" : "library-tab"}>{tab}</button>
                ))}
              </div>
              <div className="flex items-center gap-5 text-xs text-muted-foreground">
                <button type="button" className="hover:text-foreground">Chọn nhiều</button>
                <button type="button" className="flex items-center gap-1 hover:text-foreground">Xem tất cả<ChevronRight className="size-3" /></button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[0, 1, 2, 3, 4].map((item) => (
                <article key={item} className="project-card">
                  <div className="relative h-24 overflow-hidden bg-surface-strong">
                    {item > 1 ? <img src={samples[item]} alt="Ảnh thu nhỏ dự án" loading="lazy" width={768} height={1344} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Play className="size-4 fill-current" /></span></div>}
                    <button type="button" aria-label="Lưu dự án" className="absolute right-2 top-2 text-foreground"><Star className="size-4" /></button>
                  </div>
                  <div className="p-3">
                    <h3 className="truncate text-xs font-semibold">{item < 2 ? "đổi phân tích xong — bấm để xem & chỉnh" : `video-nhiều-định-nhạc-${item + 1}`}</h3>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground"><Clock3 className="size-3" />{item + 1} giờ trước · Mới chỉnh</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Button size="icon" className="fixed bottom-5 left-5 z-40 size-11 rounded-full border border-primary bg-surface text-primary shadow-panel" aria-label="Tạo dự án mới" title="Tạo dự án mới"><Plus className="size-5" /></Button>
    </main>
  );
}