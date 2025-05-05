function showLoginPopup() {
  document.getElementById("login-popup").style.display = "flex";
}

function hideLoginPopup() {
  document.getElementById("login-popup").style.display = "none";
}

function redirectToLogin() {
  hideLoginPopup();
  window.location.href = "login-register.html";
}

function checkLogin(callback) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    showLoginPopup();
    return;
  }
  callback();
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    checkLogin(() => {
      const card = button.closest(".card");
      const title = card.getAttribute("data-title");
      const price = card.getAttribute("data-price");
      const image = card.getAttribute("data-image");
      const description = card.getAttribute("data-description");

      if (!title || !price || !image || !description) {
        console.error("Missing product data attributes");
        alert("Lỗi: Thiếu thông tin sản phẩm!");
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.title === title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ title, price, image, description, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    });
  });
});

document.querySelectorAll(".buy-now-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    checkLogin(() => {
      const card = button.closest(".card");
      const title = card.getAttribute("data-title");
      const price = card.getAttribute("data-price");
      const image = card.getAttribute("data-image");
      const description = card.getAttribute("data-description");

      if (!title || !price || !image || !description) {
        console.error("Missing product data attributes");
        alert("Lỗi: Thiếu thông tin sản phẩm!");
        return;
      }

      const checkoutUrl = `thanh-toan.html?title=${encodeURIComponent(
        title
      )}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(
        image
      )}&description=${encodeURIComponent(description)}&quantity=1`;
      window.location.href = checkoutUrl;
    });
  });
});