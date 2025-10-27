// Display the current year dynamically
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Display the last modified date
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
