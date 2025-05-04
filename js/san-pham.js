 // Xử lý sự kiện cho nút "Thêm vào giỏ"
 document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const card = button.closest(".card");
      const title = card.getAttribute("data-title");
      const price = card.getAttribute("data-price");
      const image = card.getAttribute("data-image");
      const description = card.getAttribute("data-description");
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
  document.querySelectorAll(".buy-now-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const card = button.closest(".card");
      const title = card.getAttribute("data-title");
      const price = card.getAttribute("data-price");
      const image = card.getAttribute("data-image");
      const description = card.getAttribute("data-description");

      const checkoutUrl = `thanh-toan.html?title=${encodeURIComponent(
        title
      )}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(
        image
      )}&description=${encodeURIComponent(description)}&quantity=1`;
      window.location.href = checkoutUrl;
    });
  });
  (function () {
    function c() {
      var b = a.contentDocument || a.contentWindow.document;
      if (b) {
        var d = b.createElement("script");
        d.innerHTML =
          "window.__CF$cv$params={r:'93a59562fe3ac009',t:'MTc0NjMzNjM4OS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
        b.getElementsByTagName("head")[0].appendChild(d);
      }
    }
    if (document.body) {
      var a = document.createElement("iframe");
      a.height = 1;
      a.width = 1;
      a.style.position = "absolute";
      a.style.top = 0;
      a.style.left = 0;
      a.style.border = "none";
      a.style.visibility = "hidden";
      document.body.appendChild(a);
      if ("loading" !== document.readyState) c();
      else if (window.addEventListener)
        document.addEventListener("DOMContentLoaded", c);
      else {
        var e = document.onreadystatechange || function () {};
        document.onreadystatechange = function (b) {
          e(b);
          "loading" !== document.readyState &&
            ((document.onreadystatechange = e), c());
        };
      }
    }
  })();
