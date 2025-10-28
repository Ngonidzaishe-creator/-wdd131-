// scripts/getdates.js
// Display current year and last modified date in footer
document.addEventListener("DOMContentLoaded", function () {
  // Safely set the year
  var yearEl = document.getElementById("currentyear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Last modified
  var lastEl = document.getElementById("lastModified");
  if (lastEl) {
    // document.lastModified can be empty in some environments; handle gracefully
    var lm = document.lastModified || "Last Modification: Not available";
    if (document.lastModified) {
      lastEl.textContent = "Last Modification: " + document.lastModified;
    } else {
      lastEl.textContent = lm;
    }
  }
});
