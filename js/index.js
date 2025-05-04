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