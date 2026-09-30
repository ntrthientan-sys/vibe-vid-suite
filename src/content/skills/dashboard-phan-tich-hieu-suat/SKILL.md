---
name: dashboard-phan-tich-hieu-suat
description: "Dùng skill này để biến file xuất từ Meta Business Suite (Facebook Page Insights) hoặc Zalo OA Dashboard thành 1 dashboard trực quan (artifact React) kèm phân tích chiến lược và đề xuất content. Kích hoạt khi được yêu cầu 'phân tích hiệu suất trang', 'dựng dashboard từ Insights', 'review hiệu quả content tháng qua', hoặc khi tải lên file xuất từ Meta Business Suite/Zalo OA. Cần file xlsx/csv xuất từ nền tảng làm input."
---

# Dashboard Phân Tích Hiệu Suất

## Bước 1 — Lấy file input

Hỏi:

> Tải lên file xuất Insights — Meta Business Suite (Xuất dữ liệu > chọn khoảng thời gian > .xlsx/.csv) hoặc báo cáo Zalo OA (Dashboard OA > Xuất báo cáo). Cần cả 2 nếu muốn so sánh 2 kênh.

## Bước 2 — Đọc và làm sạch dữ liệu

Trước khi xử lý file, xem `/mnt/skills/public/xlsx/SKILL.md` nếu file là xlsx/csv để đọc đúng cách.

Dữ liệu cần trích từ file Meta Business Suite (tên cột có thể khác nhau tuỳ bản xuất — đối chiếu linh hoạt):

- Reach/Impressions theo ngày
- Tương tác (reaction, comment, share) theo bài
- Lượt theo dõi trang mới theo ngày
- Nhân khẩu học follower nếu có (giới tính, độ tuổi, khu vực)

Dữ liệu Zalo OA (nếu có):

- Lượt gửi/lượt mở broadcast, ZNS
- Số quan tâm mới (follow OA)
- Tỷ lệ click CTA nếu Zalo OA có track link

Gộp bảng top bài (theo reach và theo tương tác), khử trùng lặp.

## Bước 3 — Dựng dashboard (artifact React)

Xem `/mnt/skills/public/frontend-design/SKILL.md` trước khi dựng để đảm bảo thẩm mỹ đúng chuẩn.

Nền tối, dùng Recharts. Các khối theo thứ tự:

**Chỉ số tổng quan (hàng thẻ đầu)**: tổng reach, tổng tương tác, follower mới, reach TB/ngày, tỷ lệ tương tác (tương tác/reach), số bài đã đăng trong kỳ.

**Xu hướng tương tác (line chart)**: reach và tương tác theo ngày, đánh dấu 3 ngày đỉnh.

**Tăng trưởng follower (area chart)**: follower mới theo ngày + đường trung bình động 7 ngày.

**Phân tán hiệu suất bài đăng (scatter)**: trục X reach, trục Y tương tác. Chia 4 vùng: Ngôi sao (reach cao + tương tác cao), Viral nhưng nông (reach cao + tương tác thấp), Ngách chất lượng (reach thấp + tương tác cao), Yếu (cả hai thấp).

**Nhiệt đồ theo ngày trong tuần**: reach/tương tác trung bình theo thứ, làm nổi ngày mạnh nhất.

**Nếu có dữ liệu Zalo OA**: bảng riêng tỷ lệ mở broadcast/ZNS theo thời điểm gửi.

Định dạng số: `67K` thay vì `67000`.

## Bước 4 — Phân tích chiến lược viết kèm

Dưới dashboard, viết:

### Tóm tắt hiệu suất
Xu hướng: tăng/chững/giảm. Tỷ lệ tương tác hiện tại so với mặt bằng chung fanpage cùng quy mô (nếu biết, không chắc thì nói rõ).

### Pattern bài top
Ngày đăng, loại nội dung, có hình/video hay không của top 10 bài theo reach và theo tương tác. Bài reach cao/tương tác thấp nói lên điều gì? Bài reach thấp/tương tác cao nói lên điều gì?

### Khớp đối tượng — nội dung
Đối tượng cốt lõi dựa trên nhân khẩu học (nếu có). Chủ đề/định dạng nên đẩy mạnh hoặc giảm.

### Tốc độ tăng trưởng
Tốc độ follower TB/ngày, dự phóng 30/60/90 ngày theo tốc độ hiện tại.

### Lịch đăng đề xuất
Ngày/khung giờ tốt nhất cho reach, cho tương tác, dựa trên dữ liệu thật.

### 5 đề xuất content cụ thể
Mỗi đề xuất: góc content, vì sao dữ liệu ủng hộ, đối tượng nhắm tới, kỳ vọng dựa trên pattern đã thấy.

## Bước 5 — Đề xuất bước tiếp

> Muốn tôi viết full 1 trong 5 đề xuất trên thành bài? Gọi skill viet-bai-dang-theo-giong-van hoặc dinh-dang-bai-dang-theo-khung với số đề xuất.

## Quy tắc

- Dùng số liệu thật, không suy đoán cảm tính ("tương tác tốt" → phải kèm con số).
- Không bịa chỉ số không có trong file xuất.
- Báo rõ nếu file thiếu cột/khoảng thời gian bất thường thay vì tự chế bù vào.
- Nên chạy định kỳ hàng tháng — pattern chỉ rõ ràng khi nhìn theo thời gian.
