/* Exercise 21 — checkout: cart totals, payment fields and order placement */
(function () {
  "use strict";

  var form = document.getElementById("checkoutForm");
  if (!form) return;

  var rows = Array.prototype.slice.call(document.querySelectorAll(".cart-item"));
  var subtotalEl = document.getElementById("cartSubtotal");
  var totalEl = document.getElementById("cartTotal");
  var countChip = document.getElementById("cartCountChip");
  var success = document.getElementById("orderSuccess");
  var cardFields = document.getElementById("cardFields");
  var upiFields = document.getElementById("upiFields");
  var netbankingFields = document.getElementById("netbankingFields");
  var codNote = document.getElementById("codNote");
  var money = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

  function format(value) {
    return "\u20B9" + money.format(value);
  }

  function totals() {
    var subtotal = 0;
    var count = 0;
    rows.forEach(function (row) {
      var qty = Number(row.querySelector(".qty-input").value) || 1;
      subtotal += qty * Number(row.dataset.price);
      count += qty;
    });
    subtotalEl.textContent = format(subtotal);
    totalEl.textContent = format(subtotal);
    countChip.textContent = count + (count === 1 ? " item" : " items");
    return subtotal;
  }

  rows.forEach(function (row) {
    var input = row.querySelector(".qty-input");
    row.querySelectorAll(".qty-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = Math.min(9, Math.max(1, (Number(input.value) || 1) + Number(button.dataset.delta)));
        input.value = next;
        totals();
      });
    });
    input.addEventListener("input", totals);
    input.addEventListener("change", function () {
      input.value = Math.min(9, Math.max(1, Number(input.value) || 1));
      totals();
    });
  });

  function setRequired(container, required) {
    container.querySelectorAll("input, select").forEach(function (field) {
      field.disabled = !required;
      if (required) {
        field.setAttribute("required", "");
      } else {
        field.removeAttribute("required");
      }
    });
  }

  function setMethod(method) {
    var isCard = method === "Credit Card" || method === "Debit Card";
    var isUpi = method === "UPI";
    var isNet = method === "Net Banking";

    cardFields.hidden = !isCard;
    upiFields.hidden = !isUpi;
    netbankingFields.hidden = !isNet;
    codNote.hidden = method !== "Cash on Delivery";

    setRequired(cardFields, isCard);
    setRequired(upiFields, isUpi);
    setRequired(netbankingFields, isNet);
  }

  form.querySelectorAll('input[name="method"]').forEach(function (radio) {
    radio.addEventListener("change", function () { setMethod(radio.value); });
  });
  setMethod(form.querySelector('input[name="method"]:checked').value);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var total = totals();
    var name = document.getElementById("coName").value.trim();
    var method = form.querySelector('input[name="method"]:checked').value;
    var orderId = "CS-" + String(Date.now()).slice(-6);

    success.className = "alert alert-success";
    success.innerHTML = "<strong>Order placed (demo).</strong> Thank you, " + name.replace(/[<>&]/g, "") +
      ". Order <strong>" + orderId + "</strong> for <strong>" + format(total) +
      "</strong> via " + method + " would be confirmed by email. No payment was processed.";
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.getElementById("cancelOrder").addEventListener("click", function () {
    form.reset();
    document.querySelectorAll(".qty-input").forEach(function (input) { input.value = 1; });
    setMethod(form.querySelector('input[name="method"]:checked').value);
    totals();
    success.className = "alert alert-success";
    success.innerHTML = "<strong>Order cancelled.</strong> Your cart is still saved for later.";
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  totals();
})();
