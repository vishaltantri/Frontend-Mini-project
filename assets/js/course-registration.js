/* Exercise 25 — course registration: regex, multi-select and summary */
(function () {
  "use strict";

  var form = document.getElementById("courseForm");
  if (!form) return;

  var name = document.getElementById("courseName");
  var dept = document.getElementById("courseDept");
  var languages = document.getElementById("courseLanguages");
  var nameError = document.getElementById("courseNameError");
  var deptError = document.getElementById("courseDeptError");
  var langError = document.getElementById("courseLangError");
  var output = document.getElementById("courseOutput");

  function setError(input, node, message) {
    if (input) input.classList.toggle("is-invalid", Boolean(message));
    node.textContent = message || "";
    node.classList.toggle("show", Boolean(message));
  }

  function clearErrors() {
    setError(name, nameError, "");
    setError(dept, deptError, "");
    setError(languages, langError, "");
    output.hidden = true;
    output.innerHTML = "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    var firstInvalid = null;

    var value = name.value.trim();
    if (!value) {
      setError(name, nameError, "Student name is required.");
      firstInvalid = firstInvalid || name;
    } else if (!/^[A-Za-z ]+$/.test(value)) {
      setError(name, nameError, "Name must contain only alphabets and spaces.");
      firstInvalid = firstInvalid || name;
    }

    if (!dept.value) {
      setError(dept, deptError, "Please select a department.");
      firstInvalid = firstInvalid || dept;
    }

    var chosen = Array.prototype.slice.call(languages.selectedOptions).map(function (option) { return option.value; });
    if (!chosen.length) {
      setError(languages, langError, "Select at least one programming language.");
      firstInvalid = firstInvalid || languages;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    output.innerHTML =
      '<h3><i class="bi bi-check-circle-fill me-1"></i> Registration confirmed</h3>' +
      '<div class="table-responsive"><table class="table table-sm mb-0" style="font-size:.86rem;">' +
      '<tbody><tr><th scope="row" style="width:34%;color:var(--muted);">Student name</th><td>' + escapeHtml(value) + "</td></tr>" +
      '<tr><th scope="row" style="color:var(--muted);">Department</th><td>' + escapeHtml(dept.value) + "</td></tr>" +
      '<tr><th scope="row" style="color:var(--muted);">Languages</th><td>' + escapeHtml(chosen.join(", ")) + "</td></tr>" +
      '<tr><th scope="row" style="color:var(--muted);">Languages chosen</th><td>' + chosen.length + " of 4</td></tr></tbody></table></div>";
    output.hidden = false;
    output.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  form.addEventListener("reset", function () {
    window.setTimeout(clearErrors, 0);
  });

  name.addEventListener("input", function () { setError(name, nameError, ""); });
  dept.addEventListener("change", function () { setError(dept, deptError, ""); });
  languages.addEventListener("change", function () { setError(languages, langError, ""); });

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
})();
