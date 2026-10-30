/* Exercise 22 — employee registration: empty checks + tabular output */
(function () {
  "use strict";

  var form = document.getElementById("empForm");
  if (!form) return;

  var output = document.getElementById("empOutput");
  var fieldOrder = [
    ["fullName", "Full name", "text"],
    ["employeeId", "Employee ID", "text"],
    ["email", "Email", "email"],
    ["phone", "Mobile", "tel"],
    ["dob", "Date of birth", "date"],
    ["joiningDate", "Joining date", "date"],
    ["gender", "Gender", "radio"],
    ["department", "Department", "select"],
    ["designation", "Designation", "text"],
    ["employmentType", "Employment type", "select"],
    ["location", "Work location", "text"],
    ["address", "Address", "textarea"]
  ];

  function errorFor(key) {
    return form.querySelector('[data-error-for="' + key + '"]');
  }

  function mark(input, key, message) {
    if (input) input.classList.toggle("is-invalid", Boolean(message));
    var node = errorFor(key);
    if (node) {
      node.textContent = message || "";
      node.classList.toggle("show", Boolean(message));
    }
  }

  function fieldValue(key, type) {
    if (type === "radio") {
      var checked = form.querySelector('input[name="' + key + '"]:checked');
      return checked ? checked.value : "";
    }
    var field = form.elements[key];
    return field ? String(field.value).trim() : "";
  }

  function validate() {
    var firstInvalid = null;

    fieldOrder.forEach(function (item) {
      var key = item[0];
      var label = item[1];
      var type = item[2];
      var value = fieldValue(key, type);
      var message = "";

      if (!value) {
        message = key === "gender" ? "Please select a gender."
          : "Please " + (type === "select" ? "select" : "enter") + " the " + label.toLowerCase() + ".";
      } else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        message = "Enter a valid email address.";
      } else if (key === "phone" && !/^[6-9][0-9]{9}$/.test(value)) {
        message = "Enter a 10-digit mobile number.";
      }

      if (type === "radio") {
        mark(null, key, message);
      } else {
        var input = form.elements[key];
        mark(input, key, message);
        if (message && !firstInvalid) firstInvalid = input;
      }
      if (message && !firstInvalid && type === "radio") {
        firstInvalid = form.querySelector('input[name="' + key + '"]');
      }
    });

    return firstInvalid;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var firstInvalid = validate();

    if (firstInvalid) {
      output.innerHTML = '<div class="output-panel">Please complete the highlighted fields above. The record cannot be generated yet.</div>';
      firstInvalid.focus();
      return;
    }

    var html = '<div class="table-responsive"><table class="table table-bordered record-table mb-0"><tbody>';
    fieldOrder.forEach(function (item) {
      var value = fieldValue(item[0], item[2]);
      if (!value) return;
      html += "<tr><th scope=\"row\">" + escapeHtml(item[1]) + "</th><td>" + escapeHtml(value) + "</td></tr>";
    });
    html += "</tbody></table></div>";
    html += '<p class="mb-0 mt-3" style="font-size:.8rem;color:var(--brand-strong);"><i class="bi bi-check-circle-fill me-1"></i> All fields checked. Record ready to import.</p>';
    output.innerHTML = html;
    output.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  form.addEventListener("reset", function () {
    window.setTimeout(function () {
      form.querySelectorAll(".is-invalid").forEach(function (el) { el.classList.remove("is-invalid"); });
      form.querySelectorAll("[data-error-for]").forEach(function (el) {
        el.textContent = "";
        el.classList.remove("show");
      });
      output.innerHTML = '<div class="output-panel">Nothing submitted yet. Fill the form and press <strong>Register employee</strong>.</div>';
    }, 0);
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
})();
