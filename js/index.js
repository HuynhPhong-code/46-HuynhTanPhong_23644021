function checkLogin(callback) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để tiếp tục.");
      window.location.href = "dang-nhap.html"; // hoặc login.html nếu bạn đặt tên vậy
      return;
  }
  callback();
}


document.querySelectorAll(".call-button, .chat-button").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#3A78C2";
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = button.classList.contains("call-button")
      ? "#4A90E2"
      : "#00AEEF";
  });
});

document.querySelectorAll(".btn-success").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const title = button.getAttribute("data-title");
    const price = button.getAttribute("data-price");
    const image = button.getAttribute("data-image");
    const description = button.getAttribute("data-description");

    if (!title || !price || !image || !description) {
      console.error("Missing product data attributes");
      alert("Lỗi: Thiếu thông tin sản phẩm!");
      return;
    }

    const url = `thanh-toan.html?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&quantity=1`;

    if (!isLoggedIn) {
      localStorage.setItem("redirectUrl", url);
      window.location.href = "login-register.html";
    } else {
      window.location.href = url;
    }
  });
});

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const title = button.getAttribute("data-title");
    const price = button.getAttribute("data-price");
    const image = button.getAttribute("data-image");
    const description = button.getAttribute("data-description");
    const quantity = 1;

    if (!title || !price || !image || !description) {
      console.error("Missing product data attributes");
      alert("Lỗi: Thiếu thông tin sản phẩm!");
      return;
    }

    const cartItem = {
      title,
      price,
      image,
      description,
      quantity
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.title === cartItem.title);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuList = document.getElementById("menu-list");
  const monAnList = JSON.parse(localStorage.getItem("monAnList")) || [];

  function isLoggedIn() {
      return localStorage.getItem("isLoggedIn") === "true";
  }

  function showLoginWarning() {
      alert("Vui lòng đăng nhập để tiếp tục.");
  }

  function themVaoGio(index) {
      const monAn = monAnList[index];
      let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
      gioHang.push(monAn);
      localStorage.setItem("gioHang", JSON.stringify(gioHang));
      alert("Đã thêm vào giỏ hàng!");
  }

  monAnList.forEach((monAn, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <img src="${monAn.hinhAnh}" alt="${monAn.ten}">
          <h3>${monAn.ten}</h3>
          <p>${monAn.moTa}</p>
          <p><strong>Giá:</strong> ${monAn.gia} VNĐ</p>
          <button class="them-gio" data-index="${index}">Thêm vào giỏ</button>
      `;
      menuList.appendChild(li);
  });

  menuList.addEventListener("click", function (e) {
      if (e.target.classList.contains("them-gio")) {
          const index = e.target.getAttribute("data-index");
          if (!isLoggedIn()) {
              showLoginWarning();
              return;
          }
          themVaoGio(index);
      }
  });

  const btnDatMon = document.getElementById("btnDatMon");
  if (btnDatMon) {
      btnDatMon.addEventListener("click", () => {
          if (!isLoggedIn()) {
              showLoginWarning();
              return;
          }
          window.location.href = "thanh-toan.html";
      });
  }
});
