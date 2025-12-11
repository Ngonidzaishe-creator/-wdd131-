// ---------- DATA ----------
const destinations = [
  {
    name: "Nyanga Mutarazi Falls",
    description: "One of the highest waterfalls in Zimbabwe, located in Nyanga National Park.",
    image: "images/mutarazi.jpg"
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

// ---------- DESTINATIONS RENDER (uses template literals exclusively) ----------
function buildDestinationCard(place) {
  return `
    <article class="destination-card" tabindex="0">
      <img src="${place.image}" alt="${place.name}" loading="lazy">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
    </article>
  `;
}

function renderDestinations() {
  const container = document.getElementById('destinationList');
  if (!container) return;
  // Use array methods and template literals
  container.innerHTML = destinations.map(d => buildDestinationCard(d)).join('');
}

// ---------- FORM HANDLING & LOCAL STORAGE ----------
function getCheckedValues(form, name) {
  const nodes = form.querySelectorAll(`input[name="${name}"]`);
  return Array.from(nodes).filter(n => n.checked).map(n => n.value);
}

function validateFormData(form) {
  // conditional branching example
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const travelDate = form.travelDate.value;
  const topic = form.querySelector('input[name="topic"]:checked');
  const interests = getCheckedValues(form, 'interests');
  if (!name || !email) {
    return { valid: false, message: 'Please provide name and email.' };
  }
  if (!topic) {
    return { valid: false, message: 'Please choose a main topic of interest.' };
  }
  if (!interests.length) {
    return { valid: false, message: 'Please select at least one additional interest.' };
  }
  if (!travelDate) {
    return { valid: false, message: 'Please select a travel date.' };
  }
  return { valid: true };
}

function saveFormToLocal(form) {
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    travelDate: form.travelDate.value,
    topic: form.querySelector('input[name="topic"]:checked').value,
    interests: getCheckedValues(form, 'interests'),
    message: form.message.value.trim(),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('contactFormData', JSON.stringify(data));
  return data;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const result = validateFormData(form);
  const savedMessage = document.getElementById('savedMessage');
  if (!result.valid) {
    alert(result.message);
    return;
  }
  const saved = saveFormToLocal(form);
  if (savedMessage) savedMessage.textContent = 'Form saved locally. Redirecting...';
  // simple delay so user sees message, then redirect
  setTimeout(() => {
    window.location.href = form.action;
  }, 600);
}

// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
  renderDestinations();
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
    // Prefill from localStorage if present
    const stored = localStorage.getItem('contactFormData');
    if (stored) {
      try {
        const obj = JSON.parse(stored);
        if (obj && obj.name) {
          // simple prefill example
          form.name.value = obj.name || '';
          form.email.value = obj.email || '';
          if (obj.travelDate) form.travelDate.value = obj.travelDate;
          if (obj.topic) {
            const topicNode = form.querySelector(`input[name="topic"][value="${obj.topic}"]`);
            if (topicNode) topicNode.checked = true;
          }
          if (Array.isArray(obj.interests)) {
            obj.interests.forEach(val => {
              const cb = form.querySelector(`input[name="interests"][value="${val}"]`);
              if (cb) cb.checked = true;
            });
          }
        }
      } catch (err) {
        console.warn('Could not parse stored contact data', err);
      }
    }
  }
});
