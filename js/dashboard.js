/* ============================================
   SHL USER DASHBOARD JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Manage Session Data ---
  // If user profile is not saved in local storage, load defaults
  let currentUser = localStorage.getItem('shl_current_user');
  if (!currentUser) {
    localStorage.setItem('shl_current_user', JSON.stringify(SHL_DATA.currentUser));
    currentUser = SHL_DATA.currentUser;
  } else {
    currentUser = JSON.parse(currentUser);
  }

  // --- Populate Profile Header Details ---
  const updateProfileHeaders = () => {
    document.getElementById('userSidebarName').textContent = currentUser.name;
    document.getElementById('userSidebarAvatar').textContent = currentUser.name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase();
    
    const welcomeTitle = document.getElementById('welcomeTitle');
    if (welcomeTitle) welcomeTitle.textContent = `Welcome Back, ${currentUser.name.split(' ')[0]}!`;
  };
  updateProfileHeaders();

  // --- Dashboard Tab Switching ---
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const tabId = link.dataset.dashboardTab;
      document.querySelectorAll('.tab-content').forEach(tab => {
        if (tab.dataset.tabContent === tabId) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    });
  });

  // --- Render Overview Tab Details ---
  const renderOverview = () => {
    // 1. Stats Counter
    const activeTickets = currentUser.tickets.filter(t => t.status === 'confirmed').length;
    const attendedCount = currentUser.tickets.filter(t => t.status === 'attended').length;
    const allocatedCount = currentUser.tickets.filter(t => t.committee).length;

    document.getElementById('statsTicketsCount').textContent = activeTickets;
    document.getElementById('statsEventsCount').textContent = attendedCount;
    document.getElementById('statsCommitteesCount').textContent = allocatedCount;

    // 2. Notifications List
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = currentUser.notifications.map(notif => `
      <div class="notification-item ${notif.read ? '' : 'unread'}">
        ${notif.read ? '' : '<span class="notification-dot"></span>'}
        <div class="notification-content">
          <p class="notification-text">${notif.text}</p>
          <span class="notification-time">⏰ ${notif.time}</span>
        </div>
      </div>
    `).join('');

    // 3. Highlight Next Event Card
    const nextEventHighlight = document.getElementById('nextEventHighlight');
    const upcomingTicket = currentUser.tickets.find(t => t.status === 'confirmed');

    if (upcomingTicket) {
      nextEventHighlight.innerHTML = `
        <h3 style="font-size: var(--text-lg); font-weight: 800; color: var(--primary); margin-bottom: 4px;">${upcomingTicket.eventName}</h3>
        <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: 12px;">📍 ${upcomingTicket.venue}</p>
        <div style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 16px;">
          📅 Event Date: ${Utils.formatDateLong(upcomingTicket.date)}
        </div>
        <div class="flex gap-2">
          <button class="btn btn-primary btn-sm view-qr-btn" data-id="${upcomingTicket.id}">🎫 Get Entry Pass</button>
          <a href="committee.html" class="btn btn-secondary btn-sm">⚖️ Allocation Options</a>
        </div>
      `;
    } else {
      nextEventHighlight.innerHTML = `
        <p style="font-size: var(--text-sm); text-align: center; color: var(--text-tertiary); padding: var(--space-6) 0;">
          No upcoming events registered.
        </p>
        <div class="text-center">
          <a href="events.html" class="btn btn-primary btn-sm">Browse Events</a>
        </div>
      `;
    }
  };
  renderOverview();

  // --- Render My Tickets Tab ---
  const renderTicketsList = () => {
    const grid = document.getElementById('dashboardTicketsGrid');
    grid.innerHTML = currentUser.tickets.map(ticket => {
      const isConfirmed = ticket.status === 'confirmed';
      const statusBadge = isConfirmed 
        ? `<span class="badge badge-success">Confirmed</span>`
        : `<span class="badge badge-neutral">Attended</span>`;
        
      const allocationText = ticket.committee 
        ? `🟢 Allocated: ${ticket.committee} (${ticket.country})`
        : `🟡 Committee Allocation Pending`;

      return `
        <div class="ticket-card-dashboard ${ticket.status}">
          <div>
            <div class="flex justify-between items-start" style="margin-bottom: var(--space-2);">
              ${statusBadge}
              <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-tertiary);">${ticket.id}</span>
            </div>
            <h3 style="font-size: var(--text-base); font-weight: 700; margin-bottom: 2px;">${ticket.eventName}</h3>
            <p style="font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: var(--space-3);">📍 ${ticket.venue}</p>
            <p style="font-size: var(--text-xs); font-weight: 600;">${allocationText}</p>
          </div>
          <div class="flex items-center justify-between" style="border-top: 1px solid var(--border-light); padding-top: var(--space-3); margin-top: var(--space-4);">
            <span style="font-size: var(--text-xs); color: var(--text-tertiary);">📅 ${Utils.formatDate(ticket.date)}</span>
            <button class="btn btn-outline btn-sm view-qr-btn" data-id="${ticket.id}">🔍 View QR Pass</button>
          </div>
        </div>
      `;
    }).join('');
  };
  renderTicketsList();

  // --- Render Committee Allocation Tab ---
  const renderCommitteeAllocations = () => {
    const list = document.getElementById('dashboardCommitteeList');
    const allocatedTickets = currentUser.tickets.filter(t => t.committee);

    if (allocatedTickets.length === 0) {
      list.innerHTML = `
        <div class="card empty-state">
          <div class="empty-icon">⚖️</div>
          <h3>No Committees Allocated</h3>
          <p>Register for MUN conferences and request portfolio options to see details.</p>
          <a href="committee.html" class="btn btn-primary">Allocate Portfolios</a>
        </div>
      `;
      return;
    }

    list.innerHTML = allocatedTickets.map(ticket => {
      // Find full committee details
      const details = SHL_DATA.committees.find(c => c.shortName === ticket.committee) || {};

      return `
        <div class="card card-gradient">
          <div class="flex justify-between items-start" style="margin-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); padding-bottom: var(--space-3);">
            <div>
              <span class="badge badge-primary">${ticket.committee}</span>
              <h2 style="font-size: var(--text-lg); font-weight: 800; margin-top: var(--space-2);">${details.name || 'Model United Nations Committee'}</h2>
            </div>
            <div style="text-align: right;">
              <div style="font-size: var(--text-xs); color: var(--text-tertiary);">REPRESENTING</div>
              <div style="font-size: var(--text-base); font-weight: 800; color: var(--primary);">${ticket.country}</div>
            </div>
          </div>

          <div class="grid grid-3 gap-6" style="margin-bottom: var(--space-6); font-size: var(--text-sm);">
            <div>
              <strong>📌 Topic Agenda:</strong>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 4px;">${details.topic || 'Agenda Topic simulated.'}</p>
            </div>
            <div>
              <strong>👤 Chairperson:</strong>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 4px;">${details.chairperson || 'TBD'}</p>
            </div>
            <div>
              <strong>📄 Study Materials:</strong>
              <div style="margin-top: 4px;">
                <button class="btn btn-outline btn-sm" onclick="Toast.show('Download Started', 'Study guide PDF download initiated.', 'success')">📥 Download Guide</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };
  renderCommitteeAllocations();

  // --- Render Payments History Table ---
  const renderPaymentsTable = () => {
    const tableBody = document.getElementById('paymentsTableBody');
    tableBody.innerHTML = currentUser.payments.map(payment => {
      let statusBadge = '';
      if (payment.status === 'completed') {
        statusBadge = `<span class="badge badge-success">Success</span>`;
      } else if (payment.status === 'refunded') {
        statusBadge = `<span class="badge badge-warning">Refunded</span>`;
      } else if (payment.status === 'failed') {
        statusBadge = `<span class="badge badge-danger">Failed</span>`;
      }

      return `
        <tr>
          <td style="font-family: var(--font-mono); font-size: var(--text-xs);">${payment.id}</td>
          <td>${Utils.formatDate(payment.date)}</td>
          <td><strong>${payment.event}</strong></td>
          <td><strong>${Utils.formatCurrency(payment.amount)}</strong></td>
          <td>${payment.method}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-ghost btn-sm" style="padding: 4px;" onclick="Toast.show('Invoice Download', 'Invoice download started successfully.', 'success')">📄 PDF</button>
          </td>
        </tr>
      `;
    }).join('');
  };
  renderPaymentsTable();

  // --- Populate Profile Settings Form ---
  const populateSettingsForm = () => {
    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profileEmail').value = currentUser.email;
    document.getElementById('profilePhone').value = currentUser.phone;
    document.getElementById('profileInstitution').value = currentUser.institution;
  };
  populateSettingsForm();

  // Save Settings Changes
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  saveProfileBtn.addEventListener('click', () => {
    currentUser.name = document.getElementById('profileName').value.trim();
    currentUser.phone = document.getElementById('profilePhone').value.trim();
    currentUser.institution = document.getElementById('profileInstitution').value.trim();

    if (!currentUser.name || !currentUser.phone || !currentUser.institution) {
      Toast.show('Incomplete Details', 'Please fill in all details before saving.', 'warning');
      return;
    }

    localStorage.setItem('shl_current_user', JSON.stringify(currentUser));
    updateProfileHeaders();
    Toast.show('Settings Updated', 'Profile modifications saved successfully.', 'success');
  });

  // --- QR modal logic ---
  const bindQrModalButtons = () => {
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.view-qr-btn');
      if (btn) {
        const ticketId = btn.dataset.id;
        const ticket = currentUser.tickets.find(t => t.id === ticketId);
        
        if (ticket) {
          // Open Modal
          document.getElementById('qrModalEventTitle').textContent = ticket.eventName;
          document.getElementById('qrModalTicketId').textContent = ticket.id;
          document.getElementById('qrModalDelegateName').textContent = currentUser.name;
          
          const allocationText = ticket.committee 
            ? `${ticket.committee} — ${ticket.country}`
            : 'Allocation Pending / General Access';
          document.getElementById('qrModalAllocations').textContent = allocationText;

          // Generate simulated QR Code on image using canvas generator
          const qrDataURL = QRGenerator.generate(ticket.qrCode, 200);
          document.getElementById('qrModalImage').src = qrDataURL;

          Modal.open('qrTicketModal');
        }
      }
    });
  };
  bindQrModalButtons();

  // --- Logout Session ---
  document.getElementById('logoutBtn').addEventListener('click', () => {
    Toast.show('Logged Out', 'Redirecting to login...', 'info');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });
});
