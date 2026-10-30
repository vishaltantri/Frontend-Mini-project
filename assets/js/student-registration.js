/* Exercise 24 — student registration with regular expressions */
(function () {
  "use strict";

  var form = document.getElementById("studentForm");
  if (!form) return;

  var name = document.getElementById("stuName");
  var email = document.getElementById("stuEmail");
  var nameError = document.getElementById("stuNameError");
  var emailError = document.getElementById("stuEmailError");
  var genderError = document.getElementById("stuGenderError");
  var skillError = document.getElementById("stuSkillError");
  var success = document.getElementById("stuSuccess");
  var successText = document.getElementById("stuSuccessText");
  var skills = Array.prototype.slice.call(form.querySelectorAll(".stu-skill"));

  function setError(input, node, message) {
    if (node) {
      node.textContent = message || "";
      node.classList.toggle("show", Boolean(message));
    }
    if (input) input.classList.toggle("is-invalid", Boolean(message));
  }

  function clearErrors() {
    setError(name, nameError, "");
    setError(email, emailError, "");
    genderError.textContent = "";
    genderError.classList.remove("show");
    skillError.textContent = "";
    skillError.classList.remove("show");
    success.classList.remove("show");
    successText.textContent = "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    var firstInvalid = null;

    var nameValue = name.value.trim();
    if (!nameValue) {
      setError(name, nameError, "Student name is required.");
      firstInvalid = firstInvalid || name;
    } else if (!/^[A-Za-z ]+$/.test(nameValue)) {
      setError(name, nameError, "Name should contain only alphabets and spaces.");
      firstInvalid = firstInvalid || name;
    }

    var emailValue = email.value.trim();
    if (!emailValue) {
      setError(email, emailError, "Email ID is required.");
      firstInvalid = firstInvalid || email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue)) {
      setError(email, emailError, "Enter a valid email ID, e.g. name@example.com.");
      firstInvalid = firstInvalid || email;
    }

    var gender = form.querySelector('input[name="gender"]:checked');
    if (!gender) {
      genderError.textContent = "Please select a gender.";
      genderError.classList.add("show");
      if (!firstInvalid) firstInvalid = form.querySelector('input[name="gender"]');
    }

    var chosen = skills.filter(function (box) { return box.checked; }).map(function (box) { return box.value; });
    if (!chosen.length) {
      skillError.textContent = "Select at least one skill.";
      skillError.classList.add("show");
      if (!firstInvalid) firstInvalid = skills[0];
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    success.querySelector("strong").textContent = "Registration Successful";
    successText.textContent = "Welcome, " + nameValue + " (" + emailValue + ") · " +
      gender.value + " · Skills: " + chosen.join(", ") + ".";
    success.classList.add("show");
    success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  form.addEventListener("reset", function () {
    window.setTimeout(clearErrors, 0);
  });

  [name, email].forEach(function (field) {
    field.addEventListener("input", function () {
      if (field === name) setError(name, nameError, "");
      else setError(email, emailError, "");
    });
  });

  form.querySelectorAll('input[name="gender"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
      genderError.textContent = "";
      genderError.classList.remove("show");
    });
  });

  skills.forEach(function (box) {
    box.addEventListener("change", function () {
      skillError.textContent = "";
      skillError.classList.remove("show");
    });
  });
})();
