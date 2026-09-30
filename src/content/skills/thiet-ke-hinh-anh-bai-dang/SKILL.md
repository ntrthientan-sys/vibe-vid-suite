---
name: thiet-ke-hinh-anh-bai-dang
description: "Dùng skill này để tạo hình ảnh đi kèm bài đăng Facebook hoặc Zalo OA — tự quyết định giữa đồ hoạ HTML/CSS (số liệu, khung, so sánh) hoặc prompt ảnh AI (minh hoạ, tóm tắt trực quan). Kích hoạt khi được yêu cầu 'thiết kế hình cho bài', 'làm ảnh minh hoạ', 'tạo graphic', hoặc ngay sau khi một bài đăng vừa viết xong và cần hình đi kèm."
---

# Thiết Kế Hình Ảnh Bài Đăng

## Bước 1 — Đọc bài đăng

Nếu bài vừa viết ở lượt trước, dùng luôn. Nếu chưa có, hỏi:

> Dán bài đăng cần làm hình đi kèm.

## Bước 2 — Chọn kiểu

Hỏi:

> Kiểu hình nào hợp bài này?
> 1. HTML/CSS có cấu trúc — khung, số liệu, so sánh, các bước (chỉnh sửa được, chụp màn hình để dùng)
> 2. Infographic AI phong cách viết tay/whiteboard — tóm tắt trực quan cả bài
> 3. Infographic AI phong cách thương hiệu — chuyên nghiệp, dùng màu OCB/DVTC
> 4. Để tôi tự chọn theo nội dung bài

Nếu "để tôi tự chọn": bài có số bước/so sánh/số liệu rõ ràng → Hướng A. Bài dạng kể chuyện/tổng hợp mẹo → Hướng B hoặc C.

## Hướng A — HTML/CSS

Kích thước theo nền tảng:
- Facebook: 1200×630px (ảnh đơn) hoặc 1080×1080px (vuông, dễ dùng chéo Zalo)
- Nền tối hoặc màu thương hiệu OCB/DVTC, chữ tương phản cao, font sans-serif rõ
- Tối thiểu 40px padding mọi cạnh, chữ đủ lớn đọc được trên điện thoại

Trích nội dung cốt lõi từ bài (không copy nguyên văn): tiêu đề ngắn 5-8 từ, các điểm chính dạng khối, tên/logo ở footer nếu có.

Tạo 1 file HTML độc lập, CSS inline. Báo:

> Mở file HTML trong trình duyệt và chụp màn hình để dùng.

## Hướng B/C — Prompt ảnh AI

Trích từ bài: tiêu đề ngắn, 3-6 điểm chính (mỗi điểm 1 dòng ngắn), số liệu nổi bật nếu có, dòng footer (tên trang + CTA).

### Whiteboard (viết tay)

```
Tạo 1 ảnh trông như chụp bảng trắng/sổ tay viết tay thật.

Yêu cầu bắt buộc:
Chất liệu: trông như ảnh chụp bảng trắng hoặc giấy notepad khổ lớn thật.
Kết cấu: mọi chữ/hình vẽ bằng bút marker màu (đen, xanh dương, đỏ, xanh lá) và bút highlight (vàng/cam). Nét hơi lệch, không hoàn hảo, có kết cấu mực trên bề mặt.
Không dùng font digital: mọi chữ phải trông như viết tay/in tay bằng marker.

Bố cục ảnh 1080×1350px:

TIÊU ĐỀ (marker to, đậm, đầu trang):
[tiêu đề ngắn]

NỘI DUNG (viết tay từng dòng):
[3-6 điểm chính, mỗi điểm 1 dòng ngắn kèm số/gạch đầu dòng/icon nhỏ vẽ tay]

[Nếu có số liệu, vẽ to kèm khoanh tròn/khung nhấn mạnh]

Dùng nhiều màu marker để nhấn. Chữ to, rõ. Toàn bộ trông như ảnh chụp thật 1 trang sổ tay.

Luôn có dòng chữ viết tay "[Tên trang] | [CTA ngắn]" ở cuối ảnh, cùng phong cách marker.
```

### Thương hiệu (chuyên nghiệp)

```
Tạo 1 infographic chuyên nghiệp, 1080×1350px.

Phong cách: sạch, hiện đại, flat design, không hiệu ứng 3D, không gradient, không ảnh stock.

Bảng màu:
- Nền: [màu chính OCB/DVTC hoặc trung tính tối]
- Chữ: [trắng hoặc màu tương phản cao]
- Nhấn: [màu phụ]

Bố cục:
TIÊU ĐỀ (trên cùng, chữ lớn đậm):
[tiêu đề ngắn]

NỘI DUNG (khối có cấu trúc, mỗi khối kèm số/icon):
[3-6 điểm chính, mỗi điểm 1 dòng ngắn với ký hiệu trực quan: số thứ tự, dấu tick, icon đơn giản]

[Nếu có số liệu, hiển thị to kèm nhãn phía dưới]

FOOTER:
[Tên trang] | [CTA/tagline]

Chữ to, dễ quét mắt. Tối đa 40 từ toàn ảnh. Không viền trang trí, không watermark.
```

Xuất prompt trong khối riêng. Báo:

> Dán prompt này vào Gemini (Create Image bật, chọn Nano Banana), xuất ảnh 1080×1350.

## Quy tắc

- Hình phải tóm tắt nội dung thật của bài, không phải minh hoạ trừu tượng không liên quan.
- Đọc `ho-so-thuong-hieu-[track].md` để lấy đúng màu/tên thương hiệu nếu đã định nghĩa.
- Không tự đưa số liệu không có trong bài gốc lên hình.
