/* Frontend Lab — shared site behaviour */
(function () {
  "use strict";

  // Highlight the navigation item that matches the current page.
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav .nav-link[href]").forEach(function (link) {
    var href = link.getAttribute("href").split("#")[0];
    if (!href) return;
    if (href === path) link.classList.add("active");
  });

  // Keep the current year in the footer fresh.
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
