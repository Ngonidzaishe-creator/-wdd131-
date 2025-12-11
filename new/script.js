
// ---------- DESTINATIONS PAGE DYNAMIC CONTENT ----------
const destinations = [
  {
    name: "Victoria Falls",
    description: "One of the Seven Natural Wonders of the World.",
    image: "images/victoriafalls.jpg"
  },
  {
    name: "Great Zimbabwe",
    description: "Ancient stone city and UNESCO World Heritage Site.",
    image: "images/greatzimbabwe.jpg"
  },
  {
    name: "Matobo Hills",
    description: "Granite rock formations and spiritual shrines.",
    image: "images/matobo.jpg"
  }
];

const destinationContainer = document.getElementById("destinationList");

if (destinationContainer) {
  destinations.forEach(place => {
    destinationContainer.innerHTML += `
      <div class="destination-card">
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
      </div>
    `;
  });
}

// ---------- CONTACT FORM HANDLING ----------
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const savedMessage = document.getElementById('savedMessage');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default submission

      // Validate topic selection
      const topic = form.topic.value;
      if (!topic) {
        alert("Please select an interest topic.");
        return;
      }

      // Validate at least one checkbox
      const checkboxes = form.querySelectorAll('input[type="checkbox"]');
      const isChecked = Array.from(checkboxes).some(cb => cb.checked);
      if (!isChecked) {
        alert("Please select at least one additional interest.");
        return;
      }

      // Validate travel date
      const travelDate = form.travelDate.value;
      if (!travelDate) {
        alert("Please select a travel date.");
        return;
      }

      // Save form data to localStorage
      const formData = {
        name: form.name.value,
        email: form.email.value,
        travelDate: travelDate,
        topic: topic,
        interests: Array.from(checkboxes)
                       .filter(cb => cb.checked)
                       .map(cb => cb.value),
        message: form.message.value
      };
      localStorage.setItem('contactFormData', JSON.stringify(formData));

      // Redirect to thankyou page
      window.location.href = form.action;
    });
  }
});
