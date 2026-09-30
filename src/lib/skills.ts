import {
  BarChart3, Clapperboard, FileText, Gauge, Image, Images, LayoutGrid, Lightbulb,
  MessageSquare, Mic2, NotebookPen, PenLine, Pin, Quote, Search, Sparkles, UserCog, Youtube,
  type LucideIcon,
} from "lucide-react";

const files = import.meta.glob("../content/skills/*/SKILL.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

const meta: Record<string, [LucideIcon, string]> = {
  "xay-dung-giong-van": [Mic2, "Xây dựng giọng văn"],
  "viet-bai-dang-theo-giong-van": [PenLine, "Viết bài theo giọng văn"],
  "dinh-dang-bai-dang-theo-khung": [FileText, "Bài đăng theo khung PAS/AIDA"],
  "tao-hook-6-kieu": [Sparkles, "Tạo hook 6 kiểu"],
  "kich-ban-video-tu-video-tham-khao": [Clapperboard, "Kịch bản từ video mẫu"],
  "cham-diem-bai-dang": [Gauge, "Chấm điểm bài đăng"],
  "ma-tran-y-tuong-noi-dung": [LayoutGrid, "Ma trận ý tưởng"],
  "nghien-cuu-xu-huong-nganh": [Search, "Nghiên cứu xu hướng"],
  "carousel-nhieu-slide": [Images, "Carousel nhiều slide"],
  "thiet-ke-hinh-anh-bai-dang": [Image, "Thiết kế hình bài đăng"],
  "infographic-viet-tay": [NotebookPen, "Infographic viết tay"],
  "thumbnail-video": [Youtube, "Thumbnail video"],
  "bai-dang-trich-dan": [Quote, "Bài đăng trích dẫn"],
  "binh-luan-ghim": [Pin, "Bình luận ghim"],
  "giong-van-broadcast-zalo": [MessageSquare, "Broadcast Zalo OA"],
  "toi-uu-trang-fanpage-zalo": [UserCog, "Tối ưu Fanpage/Zalo"],
  "dashboard-phan-tich-hieu-suat": [BarChart3, "Dashboard hiệu suất"],
};

export type Skill = { slug: string; label: string; icon: LucideIcon; description: string; body: string };

export const skills: Skill[] = Object.keys(meta).map((slug) => {
  const raw = files[`../content/skills/${slug}/SKILL.md`] ?? "";
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const desc = m?.[1]?.match(/description:\s*"?([\s\S]*?)"?\s*$/m)?.[1] ?? "";
  const [icon, label] = meta[slug]!;
  return { slug, label, icon: icon ?? Lightbulb, description: desc, body: (m?.[2] ?? raw).trim() };
});
