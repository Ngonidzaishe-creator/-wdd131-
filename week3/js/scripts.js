// ---------- Wind Chill Calculation ----------
// Formula (metric): 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}

// Static demo values matching HTML
const STATIC_TEMP_C = 8;
const STATIC_WIND_KMH = 20;

function formatWC(value) {
  return `${Math.round(value * 10) / 10} °C`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Footer info
  document.getElementById("current-year").textContent = new Date().getFullYear();
  document.getElementById("last-modified").textContent = document.lastModified;

  // Sync displayed static values
  const tempElem = document.getElementById("temp");
  const windElem = document.getElementById("wind");
  tempElem.textContent = `${STATIC_TEMP_C} °C`;
  windElem.textContent = `${STATIC_WIND_KMH} km/h`;

  // Wind Chill Calculation
  const wcElem = document.getElementById("wind-chill");
  if (STATIC_TEMP_C <= 10 && STATIC_WIND_KMH > 4.8) {
    const wc = calculateWindChill(STATIC_TEMP_C, STATIC_WIND_KMH);
    wcElem.textContent = formatWC(wc);
  } else {
    wcElem.textContent = "N/A";
  }
});