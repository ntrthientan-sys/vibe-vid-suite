---
name: nghien-cuu-xu-huong-nganh
description: "Dùng skill này để tìm 10-15 tin/xu hướng đáng chú ý nhất trong ngành ngân hàng bán lẻ/tín dụng SME tại Việt Nam trong 7 ngày gần nhất, có ngày tháng xác thực, làm nguyên liệu content. Kích hoạt khi được yêu cầu 'nghiên cứu xu hướng ngành', 'tuần này có gì mới', 'tìm tin làm content', hoặc 'ngành tín dụng dạo này thế nào'. Dùng web search — không phụ thuộc Claude for Chrome/Apify."
---

# Nghiên Cứu Xu Hướng Ngành

## Bước 1 — Xác định phạm vi

Hỏi (bỏ nếu đã rõ):

> Tập trung vào mảng nào: chính sách lãi suất/room tín dụng chung, tín dụng SME/vay không thế chấp, hay cả hai?

## Bước 2 — Tìm kiếm có kiểm chứng ngày tháng

Chạy tìm kiếm theo các hướng sau, ưu tiên nguồn gốc (SBV, báo tài chính uy tín, thông cáo ngân hàng) hơn tổng hợp lại:

- `[chủ đề] lãi suất tháng [tháng/năm hiện tại]`
- `[chủ đề] room tín dụng`
- `chính sách vay SME Việt Nam mới nhất`
- `[chủ đề] Ngân hàng Nhà nước thông báo`
- `xu hướng vay vốn doanh nghiệp nhỏ 2026`

Với mỗi kết quả tiềm năng: mở nguồn, xác định ngày đăng rõ ràng, loại nếu quá 7 ngày hoặc không xác định được ngày.

## Bước 3 — Tổng hợp theo chủ đề

Gom các tin liên quan thành chủ đề lớn. Ưu tiên chủ đề có:

- Tác động trực tiếp đến khách hàng vay/gửi tiết kiệm SME tại địa bàn
- Có thể chuyển thành góc content cho track OCB hoặc DVTC
- Có tranh luận/khác biệt quan điểm đáng nêu

Mục tiêu 10-15 chủ đề. Ít hơn thì nói rõ, không nhồi tin yếu vào cho đủ số.

## Bước 4 — Xuất bảng

Dòng đầu tiên: `Tính đến ngày [DD/MM/YYYY]`

Bảng:

| Chủ đề | Nguồn | Ngày đăng | Tóm tắt | Vì sao liên quan OCB/DVTC | Góc content gợi ý |
|---|---|---|---|---|---|

Không viết văn xuôi ngoài bảng.

## Bước 5 — Đề xuất bước tiếp

> Chủ đề nào muốn triển khai thành bài? Gọi skill viet-bai-dang-theo-giong-van hoặc dinh-dang-bai-dang-theo-khung với tên chủ đề.

## Quy tắc

- Không bịa link, số liệu, ngày tháng.
- Loại mọi tin không xác định được ngày đăng rõ ràng hoặc quá 7 ngày.
- Nếu không tìm đủ 10 chủ đề đạt chuẩn, nói rõ số lượng thật, không nhồi tin yếu.
- Chỉ có bảng ở cuối, không có đoạn tóm tắt dài dòng thêm.
