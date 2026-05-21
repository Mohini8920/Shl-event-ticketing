/* ============================================
   SHL STANDALONE TICKET JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Get ticket ID parameter
  const ticketId = Utils.getUrlParam('id');
  
  let currentTicket = null;
  let currentUser = JSON.parse(localStorage.getItem('shl_current_user') || JSON.stringify(SHL_DATA.currentUser));

  if (ticketId) {
    currentTicket = currentUser.tickets.find(t => t.id === ticketId);
  } else {
    // If no parameter, pull the first confirmed ticket
    currentTicket = currentUser.tickets.find(t => t.status === 'confirmed');
  }

  if (!currentTicket) {
    Toast.show('No Ticket Found', 'Redirecting to your dashboard...', 'warning');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 2000);
    return;
  }

  // 2. Populate UI elements
  document.getElementById('ticketEventName').textContent = currentTicket.eventName;
  document.getElementById('ticketEventDate').textContent = Utils.formatDateLong(currentTicket.date);
  document.getElementById('ticketCode').textContent = currentTicket.id;
  document.getElementById('ticketAttendee').textContent = currentUser.name;
  document.getElementById('ticketTier').textContent = currentTicket.type;
  document.getElementById('ticketVenue').textContent = currentTicket.venue.split(',')[0];
  
  const statusBadge = document.getElementById('ticketStatusBadge');
  if (currentTicket.checkedIn) {
    statusBadge.textContent = 'Checked In';
    statusBadge.className = 'badge badge-primary';
  } else {
    statusBadge.textContent = 'Confirmed';
    statusBadge.className = 'badge badge-success';
  }

  const allocation = currentTicket.committee 
    ? `${currentTicket.committee} — ${currentTicket.country}`
    : 'Allocation Pending';
  document.getElementById('ticketAllocation').textContent = allocation;

  // 3. Generate QR Canvas URL
  const qrImage = document.getElementById('ticketQrImage');
  if (qrImage) {
    qrImage.src = QRGenerator.generate(currentTicket.qrCode, 220);
  }
});
