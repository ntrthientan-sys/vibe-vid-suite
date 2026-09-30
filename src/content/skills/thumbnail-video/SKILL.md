---
name: thumbnail-video
description: "Dùng skill này để tạo brief và prompt ảnh AI cho thumbnail video YouTube/YouTube Shorts, từ tiêu đề video. Kích hoạt khi được yêu cầu 'làm thumbnail', 'thumbnail cho video', 'ảnh bìa video YouTube'. Dùng cho kênh DVTC hoặc kênh satire hoạt hình."
---

# Thumbnail Video

## Bước 1 — Input

Hỏi (bỏ câu đã rõ):

1. Tiêu đề video là gì? (hoặc: đề xuất 3 tiêu đề giật gân dựa trên chủ đề)
2. Kênh nào: DVTC (có mặt Tân) hay kênh satire hoạt hình (không cần ảnh người thật)?
3. Nếu có mặt người: tông cảm xúc nào — ngạc nhiên, tự tin/nghiêm túc, tò mò?

## Bước 2 — Nguyên tắc thumbnail hiệu quả

- Mặt người (nếu có) chiếm 30-50% khung hình, rõ ở kích thước nhỏ
- Chữ lớn tối đa 5 từ, lý tưởng 3-4 từ — là câu hook, không phải câu đầy đủ
- 2 màu chủ đạo tương phản cao
- 1 điểm nhấn thị giác ngoài mặt người (icon, con số to, mũi tên)
- Không để chữ/logo góc dưới phải (bị đồng hồ thời lượng YouTube che)

## Bước 3 — Brief thumbnail

```
BRIEF THUMBNAIL: [tiêu đề video]

Bố cục: [vị trí mặt/nhân vật, % khung hình, hướng nhìn]
Chữ: "[3-5 từ]"
Vị trí chữ: [trái/phải/trên]
Bảng màu: [mã màu chính], [mã màu nhấn], [mã màu nền]
Điểm nhấn phụ: [icon/con số/mũi tên]
Tông cảm xúc: [từ Bước 1]
```

Hỏi xác nhận trước khi ra prompt cuối:

> Brief vậy được chưa, hay cần chỉnh gì?

## Bước 4 — Prompt ảnh AI

```
Dùng ảnh tham khảo đính kèm, tạo thumbnail YouTube kích thước 1280×720px (16:9).

Bố cục:
- Đặt nhân vật/người ở [trái/phải/giữa], chiếm [30-50]% khung hình
- Biểu cảm: [chi tiết từ Bước 3]
- Hướng nhìn: [chi tiết]

Chữ:
- Hiển thị "[chữ hook]" bằng font sans-serif đậm, cỡ lớn
- Màu chữ: [mã màu]
- Viền chữ: [màu, độ dày để dễ đọc]
- Vị trí: [khu vực cụ thể]

Bảng màu:
- Chính: [mã màu]
- Nhấn: [mã màu]
- Nền: [mã màu] — [mô tả xử lý: phẳng/gradient/mờ]

Điểm nhấn phụ: [mô tả cụ thể]

Ràng buộc:
- Mặt/nhân vật rõ nét, sắc
- Chữ đọc được ở kích thước 320px (thumbnail trên điện thoại)
- Không watermark, không phần tử giao diện YouTube, không chữ góc dưới phải
```

Báo:

> Dán prompt vào Gemini, đính kèm ảnh tham khảo nếu có, bật Create Image, xuất 1280×720.

## Quy tắc

- Không quá 6 từ chữ trên thumbnail, 3-4 từ là lý tưởng.
- Luôn có mặt/nhân vật làm điểm nhìn chính nếu kênh DVTC (kênh satire hoạt hình thì không bắt buộc).
- Nếu đã có bộ màu thương hiệu trong `ho-so-thuong-hieu-[track].md`, dùng đúng màu đó thay vì tự đề xuất.
