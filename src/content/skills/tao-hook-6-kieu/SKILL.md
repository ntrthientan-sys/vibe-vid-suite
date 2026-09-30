---
name: tao-hook-6-kieu
description: "Dùng skill này để tạo nhanh 6 kiểu hook mở bài/mở video khác nhau cho 1 chủ đề, không viết full nội dung. Kích hoạt khi được yêu cầu 'cho tôi vài hook', 'gợi ý câu mở đầu', 'hook cho chủ đề...', hoặc khi cần nhiều lựa chọn hook để so sánh trước khi chọn 1 cái viết full."
---

# Tạo Hook 6 Kiểu

## Bước 1 — Lấy chủ đề

Nếu đã có trong tin nhắn, dùng luôn. Không thì hỏi:

> Chủ đề cần hook là gì? (và: track OCB hay DVTC, nếu chưa rõ)

## Bước 2 — Viết 6 hook

Mỗi hook 1-2 câu ngắn, đủ dùng làm câu mở bài Facebook hoặc câu thoại đầu video. Không viết tiếp phần thân.

1. **Dẫn số liệu** — mở bằng 1 con số/tỷ lệ cụ thể (dùng placeholder nếu chưa xác nhận)
2. **Phản trực giác** — nêu điều số đông tin, rồi lật lại
3. **Trước/sau cá nhân hoá** — tình huống "trước khi... / sau khi..." khách hàng thường gặp
4. **Tình huống thực tế** — mô tả 1 tình huống người đọc tự nhận ra mình trong đó
5. **Thừa nhận sai lầm phổ biến** — chỉ ra 1 sai lầm nhiều người mắc khi vay/gửi tiết kiệm/tìm vốn
6. **Cảnh báo xu hướng** — điều sắp thay đổi mà đối tượng nên biết trước

## Bước 3 — Xuất kết quả

```
HOOK cho chủ đề: [chủ đề] — track [OCB/DVTC]

1. Dẫn số liệu
[hook]

2. Phản trực giác
[hook]

3. Trước/sau
[hook]

4. Tình huống thực tế
[hook]

5. Thừa nhận sai lầm
[hook]

6. Cảnh báo xu hướng
[hook]
```

Hỏi:

> Chọn hook nào để viết full bài? Gọi skill viet-bai-dang-theo-giong-van với số hook đã chọn.

## Quy tắc

- Không hỏi lại nếu chủ đề đã rõ — làm ngay, không rào đón dài dòng.
- Không đặt câu hỏi kiểu "Bạn có biết...", "Bạn đã bao giờ..." — quá chung chung.
- Không đưa số liệu bịa — placeholder `[SỐ LIỆU]` nếu chưa xác nhận.
- Nếu có `giong-van-[track].md`, bám nhịp câu/tông trong đó thay vì viết chung chung.
