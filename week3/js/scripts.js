// script.js — defer loaded

// --- Wind chill calculation (metric, °C and km/h) ---
// One-line function as required by the assignment. Uses the standard Canadian/US metric formula:
// WC = 13.12 + 0.6215*T - 11.37*(V*0.16) + 0.3965*T(V**0.16)
// Where T is °C, V is km/h
function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}

// Example static values (the assignment requests static inputs for now)
const STATIC_TEMP_C = 8;     // matches the static HTML content
const STATIC_WIND_KMH = 20;  // matches the static HTML content

// Utility to round nicely and include unit
function formatWC(value){
  return Math.round(value * 10) / 10 + " °C";
}

// On DOM ready (deferred script ensures DOM present)
document.addEventListener('DOMContentLoaded', () => {
  // Update current year and last modified
  document.getElementById('current-year').textContent = new Date().getFullYear();
  document.getElementById('last-modified').textContent = document.lastModified || 'Unknown';

  // Fill displayed static temp/wind (keeps HTML & JS consistent)
  const tempElem = document.getElementById('temp');
  const windElem = document.getElementById('wind');
  tempElem.textContent = `${STATIC_TEMP_C} °C`;
  windElem.textContent = `${STATIC_WIND_KMH} km/h`;

  // Check viability for wind chill:
  // Metric: Temperature <= 10 °C AND wind speed > 4.8 km/h
  const wcElem = document.getElementById('wind-chill');
  if (STATIC_TEMP_C <= 10 && STATIC_WIND_KMH > 4.8) {
    const wc = calculateWindChill(STATIC_TEMP_C, STATIC_WIND_KMH);
    wcElem.textContent = formatWC(wc);
  } else {
    wcElem.textContent = 'N/A';
  }
});