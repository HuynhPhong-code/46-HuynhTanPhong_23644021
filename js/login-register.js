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

    let hasErrors = false;

    // Validation for Last Name (Họ)
    const nameRegex = /^[A-Za-zÀ-Ỹà-ỹ][A-Za-zÀ-Ỹà-ỹ\s]*$/;
    if (!lastName) {
      showError("last-name", "Họ không được để trống.");
      hasErrors = true;
    } else if (!nameRegex.test(lastName)) {
      showError("last-name", "Họ không được bắt đầu bằng số hoặc chứa ký tự đặc biệt.");
      hasErrors = true;
    }

    // Validation for First Name (Tên)
    if (!firstName) {
      showError("first-name", "Tên không được để trống.");
      hasErrors = true;
    } else if (!nameRegex.test(firstName)) {
      showError("first-name", "Tên không được bắt đầu bằng số hoặc chứa ký tự đặc biệt.");
      hasErrors = true;
    }

    // Validation for Phone Number (Số điện thoại)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      showError("phone", "Số điện thoại phải là 10 chữ số.");
      hasErrors = true;
    }

    // Validation for Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError("email", "Email không hợp lệ.");
      hasErrors = true;
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((user) => user.email === email)) {
        showError("email", "Email này đã được đăng ký.");
        hasErrors = true;
      }
    }

    // Validation for Password
    if (!password || password.length < 6) {
      showError("password", "Mật khẩu phải có ít nhất 6 ký tự.");
      hasErrors = true;
    }

    // Validation for Confirm Password
    if (password !== confirmPassword) {
      showError("confirm-password", "Mật khẩu xác nhận không khớp.");
      hasErrors = true;
    }

    if (!hasErrors) {
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

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginButtonContainer = document.querySelector("a[href='login-register.html']");
  
  function showLogoutButton() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      const logoutBtn = document.createElement("button");
      logoutBtn.textContent = "Đăng xuất";
      logoutBtn.classList.add("button", "btn-outline-danger", "rounded-pill", "px-3", "py-1", "ms-2");
      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
      });
      loginButtonContainer.replaceWith(logoutBtn);
    }
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "true");
      alert("Đăng nhập thành công!");
      window.location.reload();
    });
  }

  showLogoutButton();
});