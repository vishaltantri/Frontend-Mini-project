/* Exercises 26–30 — mouse event handling */
(function () {
  "use strict";

  /* 26 · colour box */
  var box = document.getElementById("colorBox");
  var colorMsg = document.getElementById("colorMsg");
  if (box) {
    var palette = [
      "linear-gradient(135deg, #0d9488, #0f766e)",
      "linear-gradient(135deg, #7c3aed, #4c1d95)",
      "linear-gradient(135deg, #f59e0b, #b45309)",
      "linear-gradient(135deg, #dc2626, #991b1b)",
      "linear-gradient(135deg, #2563eb, #1e3a8a)"
    ];
    var index = 0;
    box.style.background = palette[0];

    function nextColor() {
      index = (index + 1) % palette.length;
      box.style.background = palette[index];
    }

    box.addEventListener("click", nextColor);
    box.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        nextColor();
      }
    });
    box.addEventListener("mouseenter", function () {
      colorMsg.textContent = "Mouse is over the box";
    });
    box.addEventListener("mouseleave", function () {
      colorMsg.textContent = "";
    });
  }

  /* 27 · product card */
  var media = document.getElementById("productMedia");
  var productBtn = document.getElementById("productBtn");
  var productDetails = document.getElementById("productDetails");
  if (media) {
    media.addEventListener("mouseenter", function () { media.classList.add("is-hovered"); });
    media.addEventListener("mouseleave", function () { media.classList.remove("is-hovered"); });
    productBtn.addEventListener("click", function () {
      var open = productDetails.classList.toggle("show");
      productBtn.setAttribute("aria-expanded", String(open));
      productBtn.textContent = open ? "Hide Details" : "View Details";
    });
  }

  /* 28 · traffic signal */
  var trafficMsg = document.getElementById("trafficMsg");
  var lights = Array.prototype.slice.call(document.querySelectorAll(".light"));
  lights.forEach(function (light) {
    light.addEventListener("mouseenter", function () {
      lights.forEach(function (other) { other.classList.remove("is-active"); });
      light.classList.add("is-active");
      trafficMsg.textContent = light.dataset.message;
      trafficMsg.className = "signal-msg is-" + light.dataset.light;
    });
    light.addEventListener("mouseleave", function () {
      light.classList.remove("is-active");
      trafficMsg.textContent = "Hover a signal";
      trafficMsg.className = "signal-msg";
    });
    light.addEventListener("focus", function () {
      light.dispatchEvent(new Event("mouseenter"));
    });
    light.addEventListener("blur", function () {
      light.dispatchEvent(new Event("mouseleave"));
    });
  });

  /* 29 · weather panels */
  var weatherMsg = document.getElementById("weatherMsg");
  document.querySelectorAll(".weather-panel").forEach(function (panel) {
    function activate() {
      panel.classList.add("is-active");
      weatherMsg.textContent = panel.dataset.message;
    }
    function deactivate() {
      panel.classList.remove("is-active");
      weatherMsg.textContent = "Hover a weather panel";
    }
    panel.addEventListener("mouseenter", activate);
    panel.addEventListener("mouseleave", deactivate);
    panel.addEventListener("focus", activate);
    panel.addEventListener("blur", deactivate);
  });

  /* 30 · welcome button */
  var welcomeText = document.getElementById("welcomeText");
  var welcomeBtn = document.getElementById("welcomeBtn");
  var welcomeHint = document.getElementById("welcomeHint");
  var original = welcomeText.textContent;
  if (welcomeBtn) {
    welcomeBtn.addEventListener("mouseenter", function () {
      welcomeText.textContent = "Welcome to VIT!";
      welcomeHint.textContent = "Welcome to VIT! — the original message returns when you move away.";
    });
    welcomeBtn.addEventListener("mouseleave", function () {
      welcomeText.textContent = original;
      welcomeHint.textContent = "Hovering will change the headline.";
    });
    welcomeBtn.addEventListener("focus", function () {
      welcomeText.textContent = "Welcome to VIT!";
    });
    welcomeBtn.addEventListener("blur", function () {
      welcomeText.textContent = original;
    });
  }
})();
