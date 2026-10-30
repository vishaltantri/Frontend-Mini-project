/* Exercises 31–36 — keyboard event handling */
(function () {
  "use strict";

  function isTyping(target) {
    if (!target) return false;
    var tag = target.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
  }

  /* 31 · student search */
  var studentInput = document.getElementById("studentSearch");
  var keyPressed = document.getElementById("keyPressed");
  var studentMsg = document.getElementById("studentSearchMsg");
  if (studentInput) {
    studentInput.addEventListener("keydown", function (event) {
      var key = event.key === " " ? "Space" : event.key;
      keyPressed.textContent = key;
      if (event.key === "Enter") {
        event.preventDefault();
        var query = studentInput.value.trim();
        studentMsg.textContent = query ? "Searching for student\u2026 \u201C" + query + "\u201D" : "Searching for student\u2026";
      } else if (event.key === "Escape") {
        studentInput.value = "";
        studentMsg.textContent = "";
        keyPressed.textContent = "\u2014";
      }
    });
  }

  /* 32 · ATM PIN */
  var pin = document.getElementById("atmPin");
  var atmStatus = document.getElementById("atmStatus");
  if (pin) {
    pin.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (!pin.value) {
          atmStatus.textContent = "Please enter your PIN first.";
          atmStatus.className = "atm-status warn";
        } else if (pin.value.length < 4) {
          atmStatus.textContent = "PIN must be exactly 4 digits.";
          atmStatus.className = "atm-status warn";
        } else {
          atmStatus.textContent = "PIN Submitted Successfully";
          atmStatus.className = "atm-status ok";
        }
        return;
      }

      if (event.key.length === 1 && !/[0-9]/.test(event.key)) {
        event.preventDefault();
        atmStatus.textContent = "Warning: only numbers are allowed.";
        atmStatus.className = "atm-status warn";
        return;
      }

      if (/[0-9]/.test(event.key)) {
        if (!pin.value.length) {
          atmStatus.textContent = "PIN Entry Started";
          atmStatus.className = "atm-status";
        } else if (pin.value.length >= 4) {
          atmStatus.textContent = "Maximum 4 digits. Press Enter to submit.";
          atmStatus.className = "atm-status warn";
        }
      }
    });

    pin.addEventListener("input", function () {
      pin.value = pin.value.replace(/[^0-9]/g, "").slice(0, 4);
      if (pin.value.length === 4) {
        atmStatus.textContent = "4 digits entered. Press Enter to submit.";
        atmStatus.className = "atm-status";
      } else if (!pin.value.length) {
        atmStatus.textContent = "Enter 4 digits and press Enter.";
        atmStatus.className = "atm-status";
      }
    });
  }

  /* 33 · product search */
  var kbInput = document.getElementById("kbProductSearch");
  var kbTyped = document.getElementById("kbTyped");
  var kbMsg = document.getElementById("kbProductMsg");
  if (kbInput) {
    kbInput.addEventListener("input", function () {
      var value = kbInput.value.trim();
      kbTyped.textContent = value || "\u2014";
      kbInput.classList.toggle("is-typing", value.length > 0);
      if (!value) kbMsg.textContent = "";
    });
    kbInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        var value = kbInput.value.trim();
        kbMsg.textContent = value ? "Searching for: " + value : "Type a product name first.";
      }
    });
  }

  /* 34 · online exam */
  var exam = document.getElementById("exam");
  if (exam) {
    var options = Array.prototype.slice.call(exam.querySelectorAll(".exam-option"));
    var examMsg = document.getElementById("examMsg");
    var selected = null;

    options.forEach(function (option) {
      option.addEventListener("click", function () {
        options.forEach(function (other) {
          other.classList.remove("is-selected");
          other.setAttribute("aria-checked", "false");
        });
        option.classList.add("is-selected");
        option.setAttribute("aria-checked", "true");
        selected = option;
        examMsg.textContent = "Option " + option.textContent.trim().charAt(0) + " selected. Press Enter to submit.";
      });
    });

    function submitExam() {
      if (!selected) {
        examMsg.textContent = "Choose an answer first, then press Enter.";
        return;
      }
      var correct = selected.dataset.correct === "true";
      examMsg.textContent = "Answer Submitted Successfully \u2014 " +
        (correct ? "correct, <h1> is the largest heading." : "not quite; the largest heading is <h1>.");
    }

    exam.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitExam();
      }
    });

    var examSubmit = document.getElementById("examSubmit");
    examSubmit.addEventListener("click", submitExam);
    examSubmit.addEventListener("mouseenter", function () { examSubmit.classList.add("is-hover"); });
    examSubmit.addEventListener("mouseleave", function () { examSubmit.classList.remove("is-hover"); });
    examSubmit.addEventListener("focus", function () { examSubmit.classList.add("is-hover"); });
    examSubmit.addEventListener("blur", function () { examSubmit.classList.remove("is-hover"); });
  }

  /* 35 · campus gallery */
  var campusImages = [
    { src: "assets/img/campus-1.jpg", alt: "Students celebrating graduation on campus", caption: "Convocation day on the main lawn." },
    { src: "assets/img/campus-2.jpg", alt: "Students attending a talk in an auditorium", caption: "A guest lecture in the Anna Auditorium." },
    { src: "assets/img/campus-3.jpg", alt: "University building and lawn at VIT Vellore", caption: "The main academic block and its lawn." },
    { src: "assets/img/campus-4.jpg", alt: "Long aisle between library bookshelves", caption: "The central library stacks." }
  ];
  var campusIndex = 0;
  var campusImg = document.getElementById("campusImg");
  var campusCaption = document.getElementById("campusCaption");
  var campusCounter = document.getElementById("campusCounter");
  var campusStatus = document.getElementById("campusStatus");
  var campusCard = document.getElementById("campus");

  function updateCampus() {
    var item = campusImages[campusIndex];
    campusImg.src = item.src;
    campusImg.alt = item.alt;
    campusCaption.textContent = item.caption;
    campusCounter.textContent = (campusIndex + 1) + " / " + campusImages.length;
    campusStatus.textContent = "";
  }
  function stepCampus(delta) {
    campusIndex = (campusIndex + delta + campusImages.length) % campusImages.length;
    updateCampus();
  }
  function selectCampus() {
    if (!campusStatus) return;
    campusStatus.textContent = "Image Selected \u2014 " + campusCaption.textContent;
  }
  if (campusImg) {
    document.getElementById("campusPrev").addEventListener("click", function () { stepCampus(-1); });
    document.getElementById("campusNext").addEventListener("click", function () { stepCampus(1); });
    document.getElementById("campusSelect").addEventListener("click", selectCampus);
    campusCard.addEventListener("click", function (event) {
      if (!event.target.closest("button")) campusCard.focus();
    });
    campusCard.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        selectCampus();
      }
    });
  }

  /* 36 · travel gallery */
  var travelPlaces = [
    { name: "Japan", src: "assets/img/japan.jpg", alt: "Kyoto street with a pagoda at dusk", caption: "Kyoto\u2019s old town at dusk." },
    { name: "Switzerland", src: "assets/img/switzerland.jpg", alt: "Swiss alpine village beside a river", caption: "A village in the Bernese Oberland." },
    { name: "Canada", src: "assets/img/canada.jpg", alt: "Turquoise lake and Rocky Mountains", caption: "Moraine Lake, Banff National Park." },
    { name: "India", src: "assets/img/india.jpg", alt: "Taj Mahal reflected in water", caption: "The Taj Mahal, Agra." }
  ];
  var travelIndex = 0;
  var travelImg = document.getElementById("travelImg");
  var travelCaption = document.getElementById("travelCaption");
  var travelCounter = document.getElementById("travelCounter");
  var travelStatus = document.getElementById("travelStatus");

  function updateTravel() {
    var place = travelPlaces[travelIndex];
    travelImg.src = place.src;
    travelImg.alt = place.alt;
    travelCaption.textContent = place.name + " \u00B7 " + place.caption;
    travelCounter.textContent = (travelIndex + 1) + " / " + travelPlaces.length;
    travelStatus.textContent = "Press Space to reveal the destination.";
  }
  function stepTravel(delta) {
    travelIndex = (travelIndex + delta + travelPlaces.length) % travelPlaces.length;
    updateTravel();
  }
  function revealTravel() {
    travelStatus.textContent = travelPlaces[travelIndex].name;
  }
  if (travelImg) {
    document.getElementById("travelPrev").addEventListener("click", function () { stepTravel(-1); });
    document.getElementById("travelNext").addEventListener("click", function () { stepTravel(1); });
    document.getElementById("travelReveal").addEventListener("click", revealTravel);
  }

  /* Global keys — arrows for campus, N/P/Space for travel */
  document.addEventListener("keydown", function (event) {
    if (isTyping(event.target)) return;
    var tag = event.target.tagName;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepCampus(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepCampus(-1);
    } else if (event.key.toLowerCase() === "n" && tag !== "BUTTON") {
      stepTravel(1);
    } else if (event.key.toLowerCase() === "p" && tag !== "BUTTON") {
      stepTravel(-1);
    } else if (event.key === " " || event.key === "Spacebar") {
      if (tag === "BUTTON" || tag === "A") return;
      event.preventDefault();
      revealTravel();
    } else if (event.key === "Enter" && event.target === document.body) {
      selectCampus();
    }
  });
})();
