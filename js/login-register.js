document
  .getElementById("link-to-login")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".register-container").style.display = "none";
    document.querySelector(".login-container").style.display = "block";
    clearErrors();
  });

document
  .getElementById("link-to-register")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".login-container").style.display = "none";
    document.querySelector(".register-container").style.display = "block";
    clearErrors();
  });

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = "";
    error.style.display = "none";
  });
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const lastName = document.getElementById("last-name").value.trim();
    const firstName = document.getElementById("first-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    let isValid = true;

    if (!lastName) {
      showError("last-name", "Họ không được để trống.");
      isValid = false;
    }

    if (!firstName) {
      showError("first-name", "Tên không được để trống.");
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      showError("phone", "Số điện thoại phải là 10 chữ số.");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("email", "Email không hợp lệ.");
      isValid = false;
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((user) => user.email === email)) {
        showError("email", "Email này đã được đăng ký.");
        isValid = false;
      }
    }

    if (password.length < 6) {
      showError("password", "Mật khẩu phải có ít nhất 6 ký tự.");
      isValid = false;
    }

    if (password !== confirmPassword) {
      showError("confirm-password", "Mật khẩu xác nhận không khớp.");
      isValid = false;
    }

    if (isValid) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({
        lastName,
        firstName,
        phone,
        email,
        password,
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      document.querySelector(".register-container").style.display = "none";
      document.querySelector(".login-container").style.display = "block";
      document.getElementById("register-form").reset();
    }
  });

document
  .getElementById("login-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      alert("Đăng nhập thành công!");

      const redirectUrl = localStorage.getItem("redirectUrl");
      if (redirectUrl) {
        localStorage.removeItem("redirectUrl");
        window.location.href = redirectUrl;
      } else {
        window.location.href = "index.html";
      }
    } else {
      showError("login-password", "Email hoặc mật khẩu không đúng.");
    }
  });