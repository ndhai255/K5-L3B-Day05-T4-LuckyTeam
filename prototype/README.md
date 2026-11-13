# Prototype — T4 Thương mại điện tử · Nhóm LuckyTeam

Trợ lý AI xử lý khiếu nại "hàng không đúng mô tả", ca khó: **mô tả đã bị sửa sau khi bán (K4)** và **người bán đúng, người mua doạ bóc phốt (K5)**. Lập luận đầy đủ ở `../spec.md` §5.

## Cách mở

Tải repo về, mở thẳng file HTML bằng trình duyệt. Không cần server, không đăng nhập, không backend.

| File | Màn hình | Ca bấm được |
|---|---|---|
| [`index.html`](index.html) | **Người mua** (chat với trợ lý) | K4 · K5 |
| [`seller.html`](seller.html) | **Người bán** và **nhân viên xử lý khiếu nại / kiểm định** | K1 · K4 · K5 |

Hai màn có link qua lại. Bấm **[Hiện số chú thích]** để bật các số trên màn hình.

**Cách bấm qua ca khó:**
1. `index.html` → chọn **K4** → **[Gửi khiếu nại]** → xem thẻ hai phiên bản mô tả, hồ sơ được chuyển nhân viên.
2. `index.html` → chọn **K5** → **[Gửi khiếu nại]** → AI nói "chưa đủ căn cứ" → bấm **[Tôi nghi hàng giả]** → thử **[Hoàn tác]**.
3. `seller.html` → **K4** hoặc **K5** → hai nút quyết của nhân viên đang khoá → bấm nút gửi giải trình/chứng từ của shop → hai nút mở → bấm một nút → hộp xác nhận.
4. `seller.html` → **K1** → shop bấm **[Đồng ý trả hàng / hoàn tiền]** → hộp xác nhận → xong mà không cần nhân viên.

## Công cụ và phần mock

- HTML, CSS, JS thuần. Dữ liệu dựng: `data.js`. Giao diện và hàm dùng chung: `style.css`, `chung.js`.
- **Toàn bộ là mock**: đơn hàng, ảnh (ô xám ghi nội dung ảnh), câu AI trả lời và tin gửi shop đều viết sẵn, chép nguyên văn từ `spec.md` §2–§3.
- **Không có lời gọi AI thật**, không có API key. Dữ liệu đều là dữ liệu giả, không có SĐT hay địa chỉ của ai.

## Ảnh có đánh số

| Ảnh | Màn hình · ca | Số |
|---|---|---|
| [`anh-1a-K4.png`](anh-1a-K4.png) | Người mua · K4 | ① thẻ hai phiên bản mô tả (G11, PAIR Explainability) |
| [`anh-1b-K5.png`](anh-1b-K5.png) | Người mua · K5 | ③ nhãn giới hạn (G2) · ④ "chưa đủ căn cứ" (G10) · ⑤ hai đường đi tiếp + gặp nhân viên (PAIR Errors) |
| [`anh-1c-K5-hoan-tac.png`](anh-1c-K5-hoan-tac.png) | Người mua · K5 sau khi chọn nghi hàng giả | ② chuyển kiểm định có [Hoàn tác] (tự làm, có hoàn tác) |
| [`anh-2a-K4.png`](anh-2a-K4.png) | Người bán & nhân viên · K4 | ⑥ tin xin bằng chứng + hạn 48h · ⑦ nút của shop · ⑧ hồ sơ hai phiên bản, ẩn đề xuất AI · ⑩ hai nút quyết khoá đối xứng + ô phạt shop không có nút |
| [`anh-2b-K5.png`](anh-2b-K5.png) | Người bán & nhân viên · K5 | ⑥ · ⑦ · ⑨ lời doạ tách khỏi căn cứ · ⑩ |
| [`anh-2c-xac-nhan.png`](anh-2c-xac-nhan.png) | Người bán · K1 | Hộp xác nhận trước khi hoàn tiền (cần người duyệt) |

Giải thích từng số (thể hiện gì · nguyên tắc HAX/PAIR · mức tự chủ): `../spec.md` §5a (①–⑤) và §5b (⑥–⑩).
