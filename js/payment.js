/* ============================================
   SHL PAYMENT FLOW JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Read Booking details from storage ---
  const bookingDataStr = localStorage.getItem('shl_current_booking');
  if (!bookingDataStr) {
    Toast.show('No Booking Found', 'Redirecting to events catalog...', 'error');
    setTimeout(() => window.location.href = 'events.html', 2000);
    return;
  }
  const bookingData = JSON.parse(bookingDataStr);

  const eventDetails = SHL_DATA.events.find(e => e.id === bookingData.eventId);
  const ticketDetails = SHL_DATA.ticketTypes.find(t => t.id === bookingData.ticketTypeId);
  
  if (!eventDetails || !ticketDetails) return;

  // --- DOM Elements ---
  const methodButtons = document.querySelectorAll('.payment-method-btn');
  const submitBtn = document.getElementById('submitPaymentBtn');
  const processingOverlay = document.getElementById('processingOverlay');
  const checkoutLayout = document.getElementById('checkoutLayout');
  const responseContainer = document.getElementById('responseContainer');

  // --- Populate Summary Cards ---
  document.getElementById('paymentSummaryEventTitle').textContent = eventDetails.title;
  document.getElementById('paymentSummaryEventLocation').textContent = `📍 ${eventDetails.venue}, ${eventDetails.city}`;
  
  const basePrice = eventDetails.price * ticketDetails.priceMultiplier;
  const ticketTotal = basePrice * bookingData.quantity;
  
  document.getElementById('paymentSummaryTicketType').textContent = `${ticketDetails.name} Ticket`;
  document.getElementById('paymentSummaryTicketPrice').textContent = Utils.formatCurrency(basePrice, eventDetails.currency);
  document.getElementById('paymentSummaryTicketQty').textContent = bookingData.quantity;

  let addonsTotal = 0;
  const summaryAddonsList = document.getElementById('paymentSummaryAddonsList');
  
  if (bookingData.addons.length > 0) {
    summaryAddonsList.innerHTML = bookingData.addons.map(id => {
      const addon = SHL_DATA.addOns.find(a => a.id === id);
      addonsTotal += addon.price * bookingData.quantity;
      return `
        <div class="summary-row" style="font-size: var(--text-xs); margin-top: 4px;">
          <span>➕ ${addon.name} (x${bookingData.quantity})</span>
          <span>${Utils.formatCurrency(addon.price * bookingData.quantity, eventDetails.currency)}</span>
        </div>
      `;
    }).join('');
  } else {
    summaryAddonsList.innerHTML = '';
  }

  const finalTotal = ticketTotal + addonsTotal;
  document.getElementById('paymentSummaryTotalPrice').textContent = Utils.formatCurrency(finalTotal, eventDetails.currency);

  // Set Pay Button text with amount
  submitBtn.textContent = `Pay ${Utils.formatCurrency(finalTotal, eventDetails.currency)}`;

  // --- Initialize UPI QR Simulator code ---
  const upiSimulatedQr = document.getElementById('upiSimulatedQr');
  if (upiSimulatedQr) {
    const upiUri = `upi://pay?pa=info.socialhouselearning@okaxis&pn=SocialHouseLearning&am=${finalTotal}&cu=INR`;
    upiSimulatedQr.src = QRGenerator.generate(upiUri, 140);
  }

  // --- Tab Switching Logic ---
  methodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      methodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.method;
      document.querySelectorAll('#paymentForm .tab-content').forEach(tab => {
        if (tab.dataset.tabContent === target) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    });
  });

  // --- Format Input Helpers ---
  // Card Number space padding
  const cardNumber = document.getElementById('cardNumber');
  cardNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = value;
  });

  // Expiry date slash padding
  const cardExpiry = document.getElementById('cardExpiry');
  cardExpiry.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
  });

  // --- Checkout form submit ---
  const paymentForm = document.getElementById('paymentForm');
  paymentForm.addEventListener('submit', () => {
    // 1. Show processing loader overlay
    processingOverlay.classList.add('active');

    // 2. Simulate wait period (3 seconds)
    setTimeout(() => {
      processingOverlay.classList.remove('active');
      
      // Read selected Sandbox outcome check
      const forceStatus = document.querySelector('input[name="sandboxStatus"]:checked').value;
      
      if (forceStatus === 'success') {
        handlePaymentSuccess();
      } else {
        handlePaymentFailed();
      }
    }, 3000);
  });

  // --- Process Payment Success ---
  const handlePaymentSuccess = () => {
    checkoutLayout.classList.add('hidden');
    responseContainer.classList.remove('hidden');

    // Create New Ticket Object to push into User state
    const tktId = `TKT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newTicket = {
      id: tktId,
      eventId: bookingData.eventId,
      eventName: eventDetails.title,
      type: ticketDetails.name,
      date: eventDetails.date,
      venue: `${eventDetails.venue}, ${eventDetails.city}`,
      status: 'confirmed',
      price: finalTotal,
      qrCode: `${tktId}-${bookingData.delegate.name.replace(/\s+/g, '-').toUpperCase()}`,
      checkedIn: false
    };

    // Push payment item
    const paymentId = `PAY-${Math.floor(100 + Math.random() * 900)}`;
    const newPayment = {
      id: paymentId,
      date: new Date().toISOString().split('T')[0],
      event: eventDetails.title,
      amount: finalTotal,
      method: document.querySelector('.payment-method-btn.active').textContent.trim().split('\n')[1].trim(),
      status: 'completed'
    };

    // Load active profile, inject details, and save
    const currentUser = JSON.parse(localStorage.getItem('shl_current_user') || JSON.stringify(SHL_DATA.currentUser));
    currentUser.tickets.unshift(newTicket);
    currentUser.payments.unshift(newPayment);
    
    // Add check confirmation notification
    currentUser.notifications.unshift({
      id: Date.now(),
      text: `Your ticket verification code for ${eventDetails.title} was confirmed successfully!`,
      time: 'Just now',
      read: false,
      type: 'success'
    });

    localStorage.setItem('shl_current_user', JSON.stringify(currentUser));

    // Clear active booking data cache
    localStorage.removeItem('shl_current_booking');

    // Load Success Screen view Card
    responseContainer.innerHTML = `
      <div class="status-card-payment reveal animate-scale-in">
        <div class="status-icon-payment success">✓</div>
        <h1 style="font-size: var(--text-3xl); margin-bottom: var(--space-2);">Payment Successful!</h1>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-6);">Thank you for registering. Your confirmation ID is <strong>${paymentId}</strong>.</p>
        
        <div class="card card-gradient" style="text-align: left; padding: var(--space-6); margin-bottom: var(--space-6); font-size: var(--text-sm);">
          <div style="font-weight: 700; font-family: var(--font-heading); margin-bottom: var(--space-2);">${eventDetails.title}</div>
          <div style="margin-bottom: 2px;">👤 Attendee: <strong>${bookingData.delegate.name}</strong></div>
          <div style="margin-bottom: 2px;">🎫 Ticket Tier: <strong>${ticketDetails.name} (x${bookingData.quantity})</strong></div>
          <div>📄 Entry Passcode: <strong>${tktId}</strong></div>
        </div>

        <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-bottom: var(--space-8);">An email and SMS confirmation containing your QR ticket has been sent to ${bookingData.delegate.email}.</p>
        
        <div class="flex gap-4">
          <a href="dashboard.html" class="btn btn-primary" style="flex: 1;">Go to Dashboard</a>
          <button class="btn btn-outline" style="flex: 1;" onclick="window.print()">Print Receipt</button>
        </div>
      </div>
    `;
  };

  // --- Process Payment Failed ---
  const handlePaymentFailed = () => {
    checkoutLayout.classList.add('hidden');
    responseContainer.classList.remove('hidden');

    responseContainer.innerHTML = `
      <div class="status-card-payment reveal animate-scale-in">
        <div class="status-icon-payment failed">✕</div>
        <h1 style="font-size: var(--text-3xl); margin-bottom: var(--space-2); color: var(--danger);">Transaction Failed</h1>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-6);">The payment request was declined by your bank card issuer. No funds were debited.</p>
        
        <div class="card" style="background: var(--danger-light); border-color: rgba(239, 68, 68, 0.15); color: var(--danger); text-align: left; padding: var(--space-4); margin-bottom: var(--space-6); font-size: var(--text-xs);">
          <strong>Possible reasons:</strong>
          <ul style="margin-top: 4px; padding-left: 16px; list-style-type: disc;">
            <li>Insufficient balance in bank account.</li>
            <li>Incorrect card numbers or expirations entered.</li>
            <li>UPI session limit exceeded or timed out.</li>
          </ul>
        </div>

        <div class="flex gap-4">
          <button class="btn btn-danger" style="flex: 1;" id="retryPaymentBtn">Retry Checkout</button>
          <a href="events.html" class="btn btn-secondary" style="flex: 1;">Cancel Registration</a>
        </div>
      </div>
    `;

    // Handle checkout retry trigger
    document.getElementById('retryPaymentBtn').addEventListener('click', () => {
      responseContainer.classList.add('hidden');
      checkoutLayout.classList.remove('hidden');
    });
  };
});
