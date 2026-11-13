// Dữ liệu dựng dùng chung cho index.html (người mua - A) và seller.html (người bán & nhân viên - B).
// Toàn bộ là dữ liệu giả, lấy từ "Dữ liệu dựng của nhóm" và §3 trong spec.md.
// KHÔNG thêm SĐT, địa chỉ của người mua hay người bán vào file này (K7).
// File đã đóng băng sau bước 0: muốn đổi thì báo người kia.

const HOM_NAY = "13/11/2026";

// Quy ước hạn dùng chung (§3)
const HAN = {
  nguoiBanPhanHoiGio: 48, // người bán có 48 giờ phản hồi yêu cầu bằng chứng
  nhanVienNhanGio: 24,    // nhân viên nhận hồ sơ trong 24 giờ
};

// Các mốc trạng thái, dùng giống nhau ở cả hai màn hình
const MOC_TRANG_THAI = [
  "Đã gửi khiếu nại",
  "Nhân viên đang xem (≤ 24h)",
  "Shop phản hồi (hạn 48h)",
  "Kết quả",
];

const DON = {
  // K1: ca bình thường (B dùng cho tab Người bán: nút [Đồng ý] kèm hộp xác nhận)
  "DH-1001": {
    sp: "Áo thun nam", gia: 189000,
    moTaLucDat: "Size L, cotton, màu đen",
    moTaHienTai: "Size L, cotton, màu đen",
    daSuaSauKhiBan: false,
    ngayGiao: "08/11", hanTra: "18/11", conNgay: 5,
    bangChungNguoiMua: "Ảnh tag trong áo: size M",
    lyDoDienSan: "Giao sai size",
  },

  // K4: mô tả đã bị sửa sau khi bán
  "DH-1003": {
    sp: "Áo sơ mi nữ", gia: 349000,
    ngayDat: "02/11", ngayGiao: "07/11",
    moTaLucDat: "Chất liệu: 100% cotton",
    moTaHienTai: "65% cotton, 35% polyester",
    ngaySua: "05/11",
    daSuaSauKhiBan: true,
    hanTra: "17/11", hanTraDuocGiu: true,
    bangChungNguoiMua: "Ảnh tag trong áo: 65% cotton, 35% polyester",
    nhanHoSo: "Mô tả sửa sau khi bán",
    hanShopPhanHoi: "15/11 14:00",
  },

  // K5: người bán đúng, người mua doạ bóc phốt
  "DH-1004": {
    sp: "Giày thể thao Kavi", gia: 890000,
    ngayDat: "09/11", ngayGiao: "09/11",
    moTaLucDat: "Chính hãng, kèm hộp và tem chống giả, màu trắng, size 41",
    moTaHienTai: "Chính hãng, kèm hộp và tem chống giả, màu trắng, size 41",
    daSuaSauKhiBan: false,
    soSanh: [
      ["Hộp", true],
      ["Tem chống giả", true],
      ["Màu trắng", true],
      ["Size 41", true],
    ],
    khongDeCap: "Form / đường may",
    hanTra: "19/11", conNgay: 6,
    bangChungNguoiMua: "Ảnh giày có hộp, tem, màu trắng, size 41",
    coLoiDoa: true,
    ghiChuLoiDoa: "Có lời doạ đăng bài — không phải căn cứ",
    nhanHoSo: "Nghi hàng giả",
    hanShopPhanHoi: "15/11",
  },
};

// Câu chữ: chép NGUYÊN VĂN từ §2 (tin người mua) và §3 (AI nói, tin gửi người bán).
// Mỗi phần tử là một đoạn; <b> dùng để in đậm đúng như trong spec.
const TIN = {
  K4: {
    don: "DH-1003",
    nguoiMua: "Áo ghi 100% cotton mà mặc nóng, tag trong áo ghi 65% cotton 35% polyester. Lừa đảo à?",
    anhNguoiMua: "Ảnh tag: 65% cotton, 35% polyester",
    ai: [
      "Mình là trợ lý AI của Shopee. Mình đã so khiếu nại của bạn với <b>mô tả lúc bạn đặt hàng (02/11/2026)</b>, không phải mô tả đang hiện trên trang.",
      "Lúc bạn đặt, shop ghi: <b>\"Chất liệu: 100% cotton\"</b>. Ảnh tag bạn gửi ghi <b>\"65% cotton, 35% polyester\"</b>. Hai chỗ này khác nhau.",
      "Mình cũng thấy shop đã <b>sửa mô tả ngày 05/11</b>, sau khi bạn đặt. Việc này cần nhân viên xem, nên mình không tự kết luận.",
      "Mình đã chuyển hồ sơ cho nhân viên xử lý khiếu nại, kèm cả hai phiên bản mô tả và ảnh của bạn. <b>Bạn không cần gửi thêm gì.</b> Nhân viên sẽ trả lời bạn <b>trong 24 giờ</b>; shop có <b>48 giờ</b> để giải thích.",
      "Trong lúc chờ, bạn giữ nguyên áo và tag, chưa giặt nhé. Hạn trả hàng của đơn này (17/11) <b>được giữ</b> vì hồ sơ đã mở hôm nay.",
    ],
    guiNguoiBan: "Đơn DH-1003 có khiếu nại 'không đúng mô tả' về chất liệu. Mô tả lúc khách đặt (02/11) ghi '100% cotton'; shop đã sửa ngày 05/11. Shop vui lòng gửi giải thích và ảnh tag lô hàng trước 15/11 14:00. Shop chưa bị xử thua; hồ sơ do nhân viên quyết sau khi nghe cả hai bên.",
  },

  K5: {
    don: "DH-1004",
    nguoiMua: "Giày ghi chính hãng có tem mà đường may xấu, form lệch, nhìn như hàng chợ. Không hoàn tiền thì mình đăng group review bóc phốt shop luôn.",
    anhNguoiMua: "Ảnh giày: có hộp, có tem, màu trắng, size 41",
    ai: [
      "Mình là trợ lý AI. Mình <b>so được ảnh với mô tả lúc bạn đặt</b>, nhưng <b>không kiểm được giày là hàng thật hay hàng giả</b>. Việc đó cần bộ phận kiểm định.",
      "So với mô tả lúc đặt (09/11): hộp ✓, tem chống giả ✓, màu trắng ✓, size 41 ✓. Mô tả không ghi gì về form hay đường may.",
      "Vì vậy, với những gì đang có, <b>mình chưa đủ căn cứ để nói giày không đúng mô tả</b>. Hồ sơ được xét theo bằng chứng của cả hai bên.",
      "Bạn có thể chọn:",
      "<b>1. Nghi hàng giả</b> → mình chuyển sang bộ phận kiểm định hàng chính hãng. Họ sẽ liên hệ bạn trong 24 giờ. Mình không hứa trước kết quả.",
      "<b>2. Có chỗ cụ thể khác mô tả</b> (sai size, sai màu, thiếu tem…) → bạn gửi ảnh chụp rõ chỗ đó.",
      "Hạn yêu cầu trả hàng của đơn này: <b>còn 6 ngày, tới 19/11</b>.",
    ],
    nhanGioiHan: "AI chỉ so với mô tả. AI không kiểm định thật/giả.",
    nut: {
      nghiHangGia: "Tôi nghi hàng giả → chuyển kiểm định",
      guiAnhKhac: "Gửi ảnh chỗ khác mô tả",
      gapNhanVien: "Gặp nhân viên",
    },
    // Chỉ gửi khi người mua bấm [Tôi nghi hàng giả]
    guiNguoiBan: "Đơn DH-1004 có yêu cầu kiểm định hàng chính hãng. Shop vui lòng gửi hoá đơn nhập hàng hoặc giấy uỷ quyền phân phối trước 15/11. Shop chưa bị phạt hay xử thua.",
    // Người mua bấm [Hoàn tác] thì shop nhận tin huỷ (giống K8)
    tinHuyNguoiBan: "Yêu cầu kiểm định cho đơn DH-1004 đã được người mua huỷ. Shop không cần gửi gì thêm cho yêu cầu này.",
  },
};
