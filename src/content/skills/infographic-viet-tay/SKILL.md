---
name: infographic-viet-tay
description: "Dùng skill này để tạo prompt infographic phong cách viết tay/whiteboard từ 1 nội dung nguồn (bài viết, ghi chú). Kích hoạt khi được yêu cầu 'infographic viết tay', 'ảnh kiểu bảng trắng', 'làm hình tóm tắt kiểu sổ tay'. Khác với thiet-ke-hinh-anh-bai-dang: skill đó quyết định giữa nhiều kiểu hình cho 1 bài; skill này chỉ chuyên sâu kiểu viết tay, có bước duyệt brief riêng trước khi ra prompt."
---

# Infographic Viết Tay

## Bước 1 — Lấy nội dung nguồn

Hỏi:

> Dán nội dung muốn biến thành infographic viết tay — bài viết, ghi chú, hoặc gạch đầu dòng thô đều được.

## Bước 2 — Dựng brief

Từ nội dung, rút ra:

- **Tiêu đề** (tối đa 6 từ, mạnh)
- **Phụ đề** (tuỳ chọn, 1 dòng ngữ cảnh)
- **Cấu trúc chính**: các bước, khung so sánh, số liệu, hay danh sách
- **Điểm chính**: 3-7 gạch đầu dòng, mỗi dòng tối đa 10 từ
- **Gợi ý hình vẽ**: mũi tên, khung, số nổi bật, icon — nêu rõ vị trí và màu
- **Footer CTA**: "[Tên trang] [Tagline] | Theo dõi để xem thêm"

Nói:

> Đây là brief. Nói điều cần đổi, hoặc "duyệt" để tôi ra prompt.

Chờ duyệt — không tự chuyển sang Bước 3.

## Bước 3 — Xuất prompt (sau khi duyệt)

```
Tạo 1 ảnh trông như chụp bảng trắng/sổ tay viết tay thật.

Yêu cầu bắt buộc:
Chất liệu: ảnh chụp bảng trắng hoặc giấy notepad khổ lớn thật.
Kết cấu: chữ/hình vẽ bằng bút marker màu (đen, xanh dương, đỏ, xanh lá) và highlight (vàng/cam). Nét hơi lệch, không hoàn hảo, có kết cấu mực thật.
Không dùng font digital: mọi chữ viết tay/in tay bằng marker.

Bố cục ảnh 1080×1350px:

[Chèn brief đã duyệt: tiêu đề, phụ đề, cấu trúc, điểm chính, gợi ý hình vẽ]

Dùng nhiều màu marker để nhấn. Chữ to, rõ. Trông như ảnh chụp thật 1 trang sổ tay.

Luôn có dòng chữ viết tay "[Footer CTA]" ở cuối ảnh, cùng phong cách marker.
```

Báo:

> Dán vào Gemini (Create Image, chọn Nano Banana), xuất 1080×1350.

## Bước 4 — Mở đường chỉnh sửa

> Nếu ảnh ra không ưng, nói điều cần đổi — tôi viết lại prompt. Hay gặp: giảm số màu, tăng cỡ tiêu đề, đổi hướng bố cục.

## Quy tắc

- Luôn 1080×1350px.
- Footer luôn có CTA + tên trang.
- Gạch đầu dòng dưới 10 từ — dài hơn mất rõ nét ở tỉ lệ whiteboard.
- Luôn chờ duyệt brief trước khi ra prompt cuối — không bỏ qua bước này.
- Nếu có màu thương hiệu trong `ho-so-thuong-hieu-[track].md`, đưa vào gợi ý hình vẽ.
