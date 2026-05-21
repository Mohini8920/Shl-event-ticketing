/* ============================================
   SHL TICKET BOOKING FLOW JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Check URL Parameters for Event ID ---
  const eventId = Utils.getUrlParam('event') || SHL_DATA.events[0].id;
  const currentEvent = SHL_DATA.events.find(evt => evt.id === eventId);
  
  if (!currentEvent) {
    Toast.show('Error', 'Invalid event selected. Redirecting...', 'error');
    setTimeout(() => window.location.href = 'events.html', 2000);
    return;
  }

  // --- Initialize Event Header UI ---
  document.getElementById('eventHeaderCategory').textContent = currentEvent.category;
  document.getElementById('eventHeaderTitle').textContent = currentEvent.title;
  document.getElementById('eventHeaderDate').textContent = `📅 ${Utils.formatDate(currentEvent.date)}`;
  document.getElementById('eventHeaderLocation').textContent = `📍 ${currentEvent.venue}, ${currentEvent.city}`;

  // --- State Variables ---
  let selectedTicketId = 'standard';
  let selectedQty = 1;
  let selectedAddons = new Set();
  let currentStep = 1;

  // --- DOM Elements ---
  const ticketContainer = document.getElementById('ticketOptionsContainer');
  const addonsContainer = document.getElementById('addonsContainer');
  const summaryEmptyState = document.getElementById('summaryEmptyState');
  const summaryDetails = document.getElementById('summaryDetails');
  const summaryTicketType = document.getElementById('summaryTicketType');
  const summaryTicketPrice = document.getElementById('summaryTicketPrice');
  const summaryTicketQty = document.getElementById('summaryTicketQty');
  const summaryAddonsList = document.getElementById('summaryAddonsList');
  const summaryTotalPrice = document.getElementById('summaryTotalPrice');
  
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const termsCheckbox = document.getElementById('termsCheckbox');

  // --- Render Steps Logic ---
  const showStep = (step) => {
    currentStep = step;
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach((tab, index) => {
      if (index + 1 === step) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update Progress Bar
    for (let i = 1; i <= 4; i++) {
      const indicator = document.getElementById(`stepIndicator${i}`);
      if (i < step) {
        indicator.classList.add('completed');
        indicator.classList.remove('active');
      } else if (i === step) {
        indicator.classList.add('active');
        indicator.classList.remove('completed');
      } else {
        indicator.classList.remove('active', 'completed');
      }
    }

    // Toggle Back button visibility
    prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
    
    // Update Next/Pay button text
    if (step === 4) {
      nextBtn.textContent = 'Proceed to Payment';
      populateReviewData();
    } else {
      nextBtn.textContent = 'Continue';
    }
  };

  // --- Populate Step 1: Ticket Options ---
  const populateTickets = () => {
    ticketContainer.innerHTML = SHL_DATA.ticketTypes.map(ticket => {
      const basePrice = currentEvent.price * ticket.priceMultiplier;
      const formattedPrice = Utils.formatCurrency(basePrice, currentEvent.currency);
      const isSelected = ticket.id === selectedTicketId;
      const minQty = ticket.minQty || 1;
      
      let qtySelectorHTML = '';
      if (isSelected) {
        qtySelectorHTML = `
          <div class="qty-selector" onclick="event.stopPropagation();">
            <button class="qty-btn" id="qtyMinusBtn">-</button>
            <input type="text" class="qty-value" id="qtyInput" value="${selectedQty}" readonly>
            <button class="qty-btn" id="qtyPlusBtn">+</button>
          </div>
        `;
      }

      return `
        <div class="ticket-select-card ${isSelected ? 'selected' : ''}" data-id="${ticket.id}" data-min="${minQty}">
          <div class="ticket-select-info">
            <h3 class="ticket-select-title">${ticket.name}</h3>
            <p style="font-size: var(--text-sm); color: var(--text-secondary);">${ticket.description}</p>
            <div class="ticket-select-features">
              ✨ Includes: ${ticket.features.slice(0, 3).join(', ')}...
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="ticket-select-price">${formattedPrice}</div>
            ${qtySelectorHTML}
          </div>
        </div>
      `;
    }).join('');

    // Add click listeners to select cards
    ticketContainer.querySelectorAll('.ticket-select-card').forEach(card => {
      card.addEventListener('click', () => {
        selectedTicketId = card.dataset.id;
        const minQty = parseInt(card.dataset.min);
        selectedQty = Math.max(selectedQty, minQty);
        populateTickets();
        updateSummary();
      });
    });

    // Quantity selectors click handlers
    const plusBtn = document.getElementById('qtyPlusBtn');
    const minusBtn = document.getElementById('qtyMinusBtn');
    const ticketDetails = SHL_DATA.ticketTypes.find(t => t.id === selectedTicketId);
    const minQty = ticketDetails?.minQty || 1;

    if (plusBtn && minusBtn) {
      plusBtn.addEventListener('click', () => {
        selectedQty++;
        document.getElementById('qtyInput').value = selectedQty;
        updateSummary();
      });
      minusBtn.addEventListener('click', () => {
        if (selectedQty > minQty) {
          selectedQty--;
          document.getElementById('qtyInput').value = selectedQty;
          updateSummary();
        }
      });
    }
  };

  // --- Populate Step 3: Add-ons ---
  const populateAddons = () => {
    addonsContainer.innerHTML = SHL_DATA.addOns.map(addon => {
      const isSelected = selectedAddons.has(addon.id);
      return `
        <div class="addon-card ${isSelected ? 'selected' : ''}" data-id="${addon.id}">
          <div class="addon-icon-box">${addon.icon}</div>
          <div class="addon-info">
            <h3>${addon.name}</h3>
            <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 4px;">${addon.description}</p>
            <div class="addon-price">${Utils.formatCurrency(addon.price, currentEvent.currency)}</div>
          </div>
        </div>
      `;
    }).join('');

    addonsContainer.querySelectorAll('.addon-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        if (selectedAddons.has(id)) {
          selectedAddons.delete(id);
        } else {
          selectedAddons.add(id);
        }
        populateAddons();
        updateSummary();
      });
    });
  };

  // --- Update Order Summary ---
  const updateSummary = () => {
    const selectedTicket = SHL_DATA.ticketTypes.find(t => t.id === selectedTicketId);
    if (!selectedTicket) return;

    summaryEmptyState.classList.add('hidden');
    summaryDetails.classList.remove('hidden');

    const basePrice = currentEvent.price * selectedTicket.priceMultiplier;
    const ticketTotal = basePrice * selectedQty;
    
    // Format Display
    summaryTicketType.textContent = selectedTicket.name;
    summaryTicketPrice.textContent = Utils.formatCurrency(basePrice, currentEvent.currency);
    summaryTicketQty.textContent = selectedQty;

    // Render Add-ons List in Sidebar
    let addonsTotal = 0;
    if (selectedAddons.size > 0) {
      summaryAddonsList.innerHTML = Array.from(selectedAddons).map(id => {
        const addon = SHL_DATA.addOns.find(a => a.id === id);
        addonsTotal += addon.price * selectedQty; // Add-ons scale with quantity
        return `
          <div class="summary-row" style="font-size: var(--text-xs); margin-bottom: 4px;">
            <span>➕ ${addon.name} (x${selectedQty})</span>
            <span>${Utils.formatCurrency(addon.price * selectedQty, currentEvent.currency)}</span>
          </div>
        `;
      }).join('');
      summaryAddonsList.style.display = 'block';
    } else {
      summaryAddonsList.style.display = 'none';
    }

    const finalTotal = ticketTotal + addonsTotal;
    summaryTotalPrice.textContent = Utils.formatCurrency(finalTotal, currentEvent.currency);
  };

  // --- Populate Step 4 Review Page ---
  const populateReviewData = () => {
    const name = document.getElementById('delegateName').value;
    const email = document.getElementById('delegateEmail').value;
    const phone = document.getElementById('delegatePhone').value;
    const institution = document.getElementById('delegateInstitution').value;
    const experience = document.getElementById('delegateExperience').value;
    const diet = document.getElementById('delegateDiet').value;

    document.getElementById('reviewName').textContent = name;
    document.getElementById('reviewEmail').textContent = email;
    document.getElementById('reviewPhone').textContent = phone;
    document.getElementById('reviewInstitution').textContent = institution;
    document.getElementById('reviewExperience').textContent = experience.charAt(0).toUpperCase() + experience.slice(1);
    document.getElementById('reviewDiet').textContent = diet.toUpperCase();

    // Order Selections Table
    const ticket = SHL_DATA.ticketTypes.find(t => t.id === selectedTicketId);
    const basePrice = currentEvent.price * ticket.priceMultiplier;
    
    let itemsHTML = `
      <div class="flex justify-between" style="padding: var(--space-2) 0;">
        <span><strong>${ticket.name} Ticket</strong> (x${selectedQty})</span>
        <span>${Utils.formatCurrency(basePrice * selectedQty, currentEvent.currency)}</span>
      </div>
    `;

    selectedAddons.forEach(id => {
      const addon = SHL_DATA.addOns.find(a => a.id === id);
      itemsHTML += `
        <div class="flex justify-between" style="padding: var(--space-2) 0; border-top: 1px solid var(--border-light);">
          <span>${addon.name} (x${selectedQty})</span>
          <span>${Utils.formatCurrency(addon.price * selectedQty, currentEvent.currency)}</span>
        </div>
      `;
    });

    document.getElementById('reviewOrderDetails').innerHTML = itemsHTML;
  };

  // --- Step Navigation Validation ---
  const validateStep = (step) => {
    if (step === 1) {
      if (!selectedTicketId) {
        Toast.show('Missing selection', 'Please select a ticket category to continue.', 'warning');
        return false;
      }
    }
    if (step === 2) {
      const form = document.getElementById('bookingForm');
      if (!FormValidator.validate(form)) {
        Toast.show('Form incomplete', 'Please fill in all required fields.', 'warning');
        return false;
      }
    }
    return true;
  };

  // --- Navigation Controls ---
  nextBtn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < 4) {
      showStep(currentStep + 1);
    } else {
      // Proceed to checkout/payment
      if (!termsCheckbox.checked) {
        Toast.show('Terms & Conditions', 'Please accept the Terms and Conditions to proceed.', 'warning');
        return;
      }

      // Save Booking details in LocalStorage for simulate-payment processing
      const bookingData = {
        eventId,
        ticketTypeId: selectedTicketId,
        quantity: selectedQty,
        addons: Array.from(selectedAddons),
        delegate: {
          name: document.getElementById('delegateName').value,
          email: document.getElementById('delegateEmail').value,
          phone: document.getElementById('delegatePhone').value,
          institution: document.getElementById('delegateInstitution').value,
          experience: document.getElementById('delegateExperience').value,
          diet: document.getElementById('delegateDiet').value,
          specialRequests: document.getElementById('delegateSpecialRequests').value
        }
      };

      localStorage.setItem('shl_current_booking', JSON.stringify(bookingData));
      window.location.href = 'payment.html';
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  });

  // --- Initial setup ---
  populateTickets();
  populateAddons();
  updateSummary();
  showStep(1);
});
