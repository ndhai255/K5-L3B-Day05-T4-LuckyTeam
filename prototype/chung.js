// Hàm dùng chung cho index.html (A) và seller.html (B). Nạp SAU data.js.
// Chủ file: A. Đã chốt — muốn thêm hàm thì báo A.

const $ = (id) => document.getElementById(id);
const tienVND = (n) => n.toLocaleString("vi-VN") + "đ";

// Vẽ thanh trạng thái 4 mốc (MOC_TRANG_THAI trong data.js).
//   ol       : thẻ <ol class="trang-thai">
//   buoc     : số mốc đã xong (0..4)
//   tuyChon.dang    : true (mặc định) thì mốc ngay sau được tô "đang làm"
//   tuyChon.chiTiet : { soMoc: "chữ nhỏ" } ghi thêm dưới tên mốc, soMoc tính từ 1
function veTrangThai(ol, buoc, tuyChon = {}) {
  const { dang = true, chiTiet = {} } = tuyChon;
  ol.innerHTML = "";
  MOC_TRANG_THAI.forEach((ten, i) => {
    const li = document.createElement("li");
    if (i < buoc) li.className = "xong";
    else if (i === buoc && buoc > 0 && dang) li.className = "dang";
    const cham = document.createElement("span");
    cham.className = "cham";
    cham.textContent = i < buoc ? "✓" : String(i + 1);
    const chu = document.createElement("span");
    chu.textContent = ten;
    if (chiTiet[i + 1]) {
      const nho = document.createElement("small");
      nho.textContent = " · " + chiTiet[i + 1];
      chu.appendChild(nho);
    }
    li.append(cham, chu);
    ol.appendChild(li);
  });
}

// Tạo chip kết quả cho một việc AI đã tự làm.
//   loai: "ok" | "cho"   ·   phu: dòng chữ nhỏ (tuỳ chọn)
//   hoanTac: hàm chạy khi bấm [Hoàn tác] — chỉ truyền khi việc đó đảo lại được
function taoChip(chu, { loai = "ok", phu = "", hoanTac = null } = {}) {
  const div = document.createElement("div");
  div.className = "chip chip-" + loai;
  const trai = document.createElement("span");
  trai.textContent = chu;
  if (phu) {
    const s = document.createElement("small");
    s.textContent = phu;
    trai.appendChild(s);
  }
  div.appendChild(trai);
  if (hoanTac) {
    const nut = document.createElement("button");
    nut.className = "lien-ket";
    nut.textContent = "Hoàn tác";
    nut.addEventListener("click", hoanTac);
    div.appendChild(nut);
  }
  return div;
}

// Mở <dialog class="hop-xac-nhan">, trả về Promise<boolean>: true khi bấm nút value="ok".
function moHopXacNhan(dialog) {
  return new Promise((xong) => {
    const nuts = dialog.querySelectorAll("button[value]");
    const khiBam = (e) => {
      nuts.forEach((n) => n.removeEventListener("click", khiBam));
      dialog.close();
      xong(e.currentTarget.value === "ok");
    };
    nuts.forEach((n) => n.addEventListener("click", khiBam));
    dialog.addEventListener("cancel", () => xong(false), { once: true });
    dialog.showModal();
  });
}

// Bật/tắt số chú thích ①–⑩ (class hien-so trên body).
function batNutHienSo(nut) {
  nut.addEventListener("click", () => {
    const bat = document.body.classList.toggle("hien-so");
    nut.setAttribute("aria-pressed", bat);
  });
}
