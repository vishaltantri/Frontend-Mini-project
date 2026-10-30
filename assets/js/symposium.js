/* Exercise 19 — TechNova registration summary */
(function () {
  "use strict";

  var form = document.getElementById("symForm");
  if (!form) return;

  var output = document.getElementById("symOutput");
  var skillError = document.getElementById("skillError");
  var skillChecks = Array.prototype.slice.call(form.querySelectorAll(".skill-check"));

  function clearSkillsError() {
    skillError.classList.remove("show");
    skillChecks.forEach(function (box) { box.classList.remove("is-invalid"); });
  }

  skillChecks.forEach(function (box) {
    box.addEventListener("change", clearSkillsError);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearSkillsError();

    var selected = skillChecks.filter(function (box) { return box.checked; }).map(function (box) { return box.value; });
    if (!selected.length) {
      skillError.classList.add("show");
      skillChecks[0].focus();
      return;
    }

    var data = new FormData(form);
    var file = data.get("studentId");
    var rows = [
      ["Participant", data.get("name")],
      ["Register number", data.get("registerNumber")],
      ["College", data.get("college")],
      ["Email", data.get("email")],
      ["Mobile", data.get("mobile")],
      ["Date of birth", data.get("dob")],
      ["Gender", data.get("gender")],
      ["Department", data.get("department")],
      ["Technical skills", selected.join(", ")],
      ["Event date", data.get("eventDate")],
      ["Student ID", file && file.name ? file.name : "Not provided"]
    ];

    var html = '<h3><i class="bi bi-check-circle-fill me-1"></i> Registration validated</h3>' +
      '<p class="mb-3">Here is what the portal received. This is a frontend demo, so nothing was uploaded or sent.</p>' +
      '<div class="table-responsive"><table class="table table-sm summary-table mb-0"><tbody>';
    rows.forEach(function (row) {
      html += "<tr><th scope=\"row\">" + label(row[0]) + "</th><td>" + label(row[1] || "—") + "</td></tr>";
    });
    html += "</tbody></table></div>";
    output.innerHTML = html;
    output.hidden = false;
    output.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  form.addEventListener("reset", function () {
    window.setTimeout(function () {
      output.hidden = true;
      output.innerHTML = "";
      clearSkillsError();
    }, 0);
  });

  function label(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
})();
