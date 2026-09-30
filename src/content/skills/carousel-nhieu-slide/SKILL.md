---
name: carousel-nhieu-slide
description: "Dùng skill này để tạo carousel Facebook nhiều slide theo thương hiệu, từ 1 nội dung nguồn. Kích hoạt khi được yêu cầu 'làm carousel', 'bài đăng nhiều ảnh', 'chia thành các slide'. Luôn có bước duyệt brief trước khi ra prompt từng slide."
---

# Carousel Nhiều Slide

## Bước 1 — Lấy nội dung nguồn

Hỏi:

> Dán nội dung muốn dựng thành carousel — bài viết, ghi chú, hoặc 1 khung/quy trình.

Sau đó hỏi:

1. Màu thương hiệu: lấy từ `ho-so-thuong-hieu-[track].md` nếu có, hoặc Tân cung cấp mã màu, hoặc để tôi đề xuất
2. Số slide: 6 (gọn), 8 (chuẩn), hay 10 (chi tiết)?

## Bước 2 — Dựng brief từng slide

- **Slide 1 (Bìa)**: hook, chữ lớn đậm, hướng hình
- **Slide 2 đến N-1 (Thân)**: 1 ý mỗi slide, tối đa 15 từ, kèm gợi ý hình
- **Slide N (CTA)**: kêu gọi hành động + tên trang/liên hệ

Mỗi slide ghi: số thứ tự, tiêu đề (tối đa 8 từ), nội dung (tối đa 15 từ), gợi ý hình.

Nói:

> Đây là brief từng slide. Nói điều cần đổi, hoặc "duyệt" để ra prompt.

Chờ duyệt rõ ràng trước khi sang Bước 3.

## Bước 3 — Prompt từng slide (sau khi duyệt)

Mỗi slide 1 prompt riêng, đánh số rõ:

```
Đóng vai chuyên gia thiết kế đồ hoạ. Tạo 1 slide carousel Facebook kích thước 1080×1350px (tỉ lệ 4:5).

Phong cách thương hiệu:
- Màu chính: [mã màu]
- Màu phụ: [mã màu]
- Màu nhấn: [mã màu]
- Typography: [font tiêu đề đậm, font nội dung sạch]
- Thẩm mỹ: hiện đại, đáng tin, tương phản cao

Slide [N/M]: [mục đích slide]

Nội dung:
- Tiêu đề: "[tiêu đề]"
- Nội dung: "[nội dung]"
- Yếu tố hình ảnh: [gợi ý cụ thể]

Bố cục:
- [Vị trí, cỡ tiêu đề]
- [Vị trí, cỡ nội dung]
- [Vị trí yếu tố hình ảnh]
- [Xử lý nền]

Ràng buộc:
- Tỉ lệ dọc 4:5, đúng 1080×1350px
- Không watermark, không logo trừ khi nêu rõ ở trên
- Giữ nhất quán hình ảnh với các slide khác trong bộ
```

Báo:

> Dán từng prompt vào Gemini (Create Image, Nano Banana), tạo từng slide 1 để giữ nhất quán tối đa.

## Bước 4 — Đề xuất gộp 1 lần

> Muốn 1 prompt gộp tạo cả bộ trong 1 lần không? Nhanh hơn nhưng khó đồng nhất hình ảnh giữa các slide. Nói "gộp" nếu muốn.

## Quy tắc

- Luôn chờ duyệt brief trước khi ra prompt cuối.
- 1080×1350px mỗi slide, không đổi tỉ lệ khác.
- Tối đa 15 từ nội dung mỗi slide.
- Slide bìa và slide CTA phải khác biệt rõ so với slide thân về mặt hình ảnh.
- Giữ đúng màu thương hiệu xuyên suốt mọi slide trong bộ.
