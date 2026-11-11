# Da Xinh Beauty Spa — Website demo (Phiếu Dev 62)

Landing page tiếng Việt cho chuỗi spa chăm sóc da. Mục tiêu duy nhất: **khách đặt lịch / nhận tư vấn**.

**Bắt buộc đọc và tuân thủ trước mọi thay đổi:**

@AGENTS.md
@docs/REQUIREMENTS.md

Tóm tắt các quy tắc không được vi phạm:
1. Không bịa nội dung (giá, số liệu, review, chi tiết 15 bước). Thiếu dữ liệu → placeholder + `TODO(content)`.
2. Dữ liệu doanh nghiệp chỉ nằm ở `lib/site-data.ts`, khớp nguyên văn Phần A của `docs/REQUIREMENTS.md`.
3. Màu trắng – hồng – be qua design token; font hỗ trợ tiếng Việt; chỉ chế độ sáng.
4. Server Component mặc định; đọc `node_modules/next/dist/docs/` trước khi dùng API Next 16.
5. Yêu cầu mới không có trong REQUIREMENTS (Phần A) → hỏi lại, rồi cập nhật REQUIREMENTS cùng lúc với code.
6. Xong việc: `npm run lint` + `npm run build` sạch.
