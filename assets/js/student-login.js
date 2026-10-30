/* Exercise 18 + 23 — student login validation */
(function () {
  "use strict";

  var form = document.getElementById("loginForm");
  if (!form) return;

  var email = document.getElementById("loginEmail");
  var password = document.getElementById("loginPassword");
  var emailError = document.getElementById("emailError");
  var passwordError = document.getElementById("passwordError");
  var roleError = document.getElementById("roleError");
  var output = document.getElementById("loginOutput");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(input, node, message) {
    node.textContent = message;
    node.classList.toggle("show", Boolean(message));
    input.classList.toggle("is-invalid", Boolean(message));
  }

  function clearErrors() {
    setError(email, emailError, "");
    setError(password, passwordError, "");
    roleError.textContent = "";
    roleError.classList.remove("show");
    output.innerHTML = "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    var firstInvalid = null;

    if (!email.value.trim()) {
      setError(email, emailError, "Please enter your email address.");
      firstInvalid = firstInvalid || email;
    } else if (!emailPattern.test(email.value.trim())) {
      setError(email, emailError, "Enter a valid email address, e.g. name@vitstudent.ac.in.");
      firstInvalid = firstInvalid || email;
    }

    if (!password.value) {
      setError(password, passwordError, "Please enter your password.");
      firstInvalid = firstInvalid || password;
    } else if (password.value.length < 6) {
      setError(password, passwordError, "Password must contain at least 6 characters.");
      firstInvalid = firstInvalid || password;
    }

    var role = form.querySelector('input[name="role"]:checked');
    if (!role) {
      roleError.textContent = "Please select Student or Faculty.";
      roleError.classList.add("show");
      if (!firstInvalid) firstInvalid = form.querySelector('input[name="role"]');
    }

    if (firstInvalid) {
      output.innerHTML = "";
      firstInvalid.focus();
      return;
    }

    var emailValue = email.value.trim();
    output.innerHTML =
      '<h3><i class="bi bi-check-circle-fill me-1"></i> Login details validated</h3>' +
      "<p class=\"mb-1\">Signed in as <strong>" + escapeHtml(emailValue) + "</strong> with the <strong>" + role.value + "</strong> role.</p>" +
      "<p class=\"mb-0\"><small>Remember me: " + (document.getElementById("rememberMe").checked ? "yes" : "no") +
      " · This is a frontend demo, so no session was created.</small></p>";
  });

  form.addEventListener("reset", function () {
    window.setTimeout(clearErrors, 0);
  });

  [email, password].forEach(function (input) {
    input.addEventListener("input", function () {
      if (input === email) setError(email, emailError, "");
      else setError(password, passwordError, "");
    });
  });

  form.querySelectorAll('input[name="role"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      roleError.textContent = "";
      roleError.classList.remove("show");
    });
  });

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
})();
