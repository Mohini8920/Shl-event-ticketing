/* ============================================
   SHL ADMIN DASHBOARD JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Admin Tab Switching ---
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const tabId = link.dataset.adminTab;
      document.querySelectorAll('.tab-content').forEach(tab => {
        if (tab.dataset.tabContent === tabId) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    });
  });

  // --- Initialize Analytics & Charts ---
  const initAnalytics = () => {
    // 1. Static Numbers
    document.getElementById('metricTotalTickets').textContent = SHL_DATA.adminStats.totalTickets.toLocaleString();
    document.getElementById('metricTotalRevenue').textContent = Utils.formatCurrency(SHL_DATA.adminStats.totalRevenue);
    document.getElementById('metricPendingApprovals').textContent = SHL_DATA.adminStats.pendingApprovals;
    document.getElementById('metricTodayCheckins').textContent = SHL_DATA.adminStats.todayCheckIns;

    // Update pending approvals sidebar badge
    document.getElementById('badgePendingApprovals').textContent = SHL_DATA.adminStats.pendingApprovals;

    // 2. Bar Chart (Sales Volume)
    const salesChartContainer = document.getElementById('salesBarChartContainer');
    if (salesChartContainer) {
      MiniChart.bar(salesChartContainer, SHL_DATA.adminStats.recentSales, '#8B5CF6');
    }

    // 3. Donut Chart (Breakdown)
    const categoryChartContainer = document.getElementById('categoryDonutChartContainer');
    if (categoryChartContainer) {
      MiniChart.donut(categoryChartContainer, SHL_DATA.adminStats.categoryBreakdown, 160);
    }
  };
  initAnalytics();

  // --- Render Events Admin Panel ---
  const renderEventsAdmin = () => {
    const tableBody = document.getElementById('adminEventsTableBody');
    tableBody.innerHTML = SHL_DATA.events.map(evt => {
      const isClosed = evt.status === 'closed';
      const statusBadge = isClosed 
        ? `<span class="badge badge-danger">Closed</span>`
        : `<span class="badge badge-success">Open</span>`;

      return `
        <tr data-event-id="${evt.id}">
          <td>
            <div style="font-weight: 700; font-family: var(--font-heading);">${evt.title}</div>
            <span style="font-size: var(--text-xs); color: var(--text-tertiary);">${evt.id}</span>
          </td>
          <td><span class="badge badge-neutral">${evt.category}</span></td>
          <td>${evt.city}, ${evt.country}</td>
          <td><strong>${Utils.formatCurrency(evt.price, evt.currency)}</strong></td>
          <td>${evt.spotsLeft} / ${evt.spots} left</td>
          <td>${statusBadge}</td>
          <td>
            <div class="flex gap-2">
              <button class="btn btn-secondary btn-sm edit-evt-btn" onclick="Toast.show('Edit Event', 'Modifying existing configurations simulated.', 'info')">✏️</button>
              <button class="btn btn-danger btn-sm cancel-evt-btn" onclick="confirmCancelEvent('${evt.id}')">✕</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  };
  renderEventsAdmin();

  // Cancel Event Confirmation
  window.confirmCancelEvent = (id) => {
    const evt = SHL_DATA.events.find(e => e.id === id);
    if (confirm(`Are you sure you want to cancel the event "${evt.title}"?`)) {
      evt.status = 'closed';
      Toast.show('Event Cancelled', `${evt.title} has been closed for registrations.`, 'warning');
      renderEventsAdmin();
    }
  };

  // --- Open Create Event Modal ---
  document.getElementById('createNewEventBtn').addEventListener('click', () => {
    Modal.open('createEventModal');
  });

  // Save Event Details
  const saveNewEventBtn = document.getElementById('saveNewEventBtn');
  saveNewEventBtn.addEventListener('click', () => {
    const title = document.getElementById('adminEventTitle').value.trim();
    const category = document.getElementById('adminEventCategory').value;
    const price = parseInt(document.getElementById('adminEventPrice').value);
    const city = document.getElementById('adminEventCity').value.trim();
    const date = document.getElementById('adminEventDate').value;

    if (!title || !price || !city || !date) {
      Toast.show('Missing Input', 'Please fill in all event details.', 'warning');
      return;
    }

    const newEvt = {
      id: `evt-00${SHL_DATA.events.length + 1}`,
      title,
      category,
      price,
      currency: '₹',
      city,
      country: 'India',
      date,
      spots: 500,
      spotsLeft: 500,
      status: 'open',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop'
    };

    SHL_DATA.events.unshift(newEvt);
    Modal.close('createEventModal');
    Toast.show('Published Successfully', `Event "${title}" has been listed.`, 'success');
    
    // Clear forms & re-render
    document.getElementById('createEventForm').reset();
    renderEventsAdmin();
  });

  // --- Render Delegate Approvals Panel ---
  const renderApprovals = () => {
    const tableBody = document.getElementById('adminApprovalsTableBody');
    tableBody.innerHTML = SHL_DATA.adminStats.pendingDelegates.map(del => `
      <tr data-delegate-id="${del.id}">
        <td><input type="checkbox" class="approval-select" value="${del.id}"></td>
        <td>
          <div style="font-weight: 700;">${del.name}</div>
          <span style="font-size: var(--text-xs); color: var(--text-tertiary);">${del.email}</span>
        </td>
        <td><strong>${del.event}</strong></td>
        <td>${Utils.formatDate(del.date)}</td>
        <td><span class="badge badge-warning">Pending Review</span></td>
        <td>
          <div class="flex gap-2">
            <button class="btn btn-success btn-sm approve-btn" onclick="approveDelegate('${del.id}', true)">Approve</button>
            <button class="btn btn-danger btn-sm reject-btn" onclick="approveDelegate('${del.id}', false)">Reject</button>
          </div>
        </td>
      </tr>
    `).join('');
  };
  renderApprovals();

  // Approve/Reject Action
  window.approveDelegate = (id, isApproved) => {
    SHL_DATA.adminStats.pendingDelegates = SHL_DATA.adminStats.pendingDelegates.filter(del => del.id !== id);
    
    // Update dashboard counts
    SHL_DATA.adminStats.pendingApprovals--;
    document.getElementById('metricPendingApprovals').textContent = SHL_DATA.adminStats.pendingApprovals;
    document.getElementById('badgePendingApprovals').textContent = SHL_DATA.adminStats.pendingApprovals;

    Toast.show(
      isApproved ? 'Approved Delegate' : 'Rejected Registration',
      isApproved ? `Delegate registration credentials validated.` : 'Applicant registration request rejected.',
      isApproved ? 'success' : 'error'
    );

    renderApprovals();
  };

  // Bulk Approvals
  document.getElementById('bulkApproveBtn').addEventListener('click', () => {
    const selectedCheckboxes = Array.from(document.querySelectorAll('.approval-select:checked'));
    if (selectedCheckboxes.length === 0) {
      Toast.show('No Rows Selected', 'Please check at least one delegate row.', 'warning');
      return;
    }

    selectedCheckboxes.forEach(cb => {
      const id = cb.value;
      SHL_DATA.adminStats.pendingDelegates = SHL_DATA.adminStats.pendingDelegates.filter(del => del.id !== id);
      SHL_DATA.adminStats.pendingApprovals--;
    });

    document.getElementById('metricPendingApprovals').textContent = SHL_DATA.adminStats.pendingApprovals;
    document.getElementById('badgePendingApprovals').textContent = SHL_DATA.adminStats.pendingApprovals;

    Toast.show('Bulk Action Applied', `${selectedCheckboxes.length} delegates approved.`, 'success');
    renderApprovals();
  });

  // Select all checkbox functionality
  const selectAllApprovals = document.getElementById('selectAllApprovals');
  if (selectAllApprovals) {
    selectAllApprovals.addEventListener('change', (e) => {
      document.querySelectorAll('.approval-select').forEach(cb => {
        cb.checked = e.target.checked;
      });
    });
  }

  // --- Render Committees Allocation Levels ---
  const renderCommitteesAdmin = () => {
    const tableBody = document.getElementById('adminCommitteesTableBody');
    tableBody.innerHTML = SHL_DATA.committees.map(c => {
      const allocated = c.countries.filter(country => country.status === 'reserved').length;
      return `
        <tr>
          <td>
            <div style="font-weight: 700; font-family: var(--font-heading);">${c.shortName}</div>
            <span style="font-size: var(--text-xs); color: var(--text-tertiary);">${c.name}</span>
          </td>
          <td style="font-size: var(--text-xs); max-width: 240px; white-space: normal;">${c.topic}</td>
          <td><span class="badge badge-primary">${c.difficulty}</span></td>
          <td><strong>${allocated} / ${c.delegateCount} filled</strong></td>
          <td>${c.chairperson} <span style="font-size: var(--text-xs); color: var(--text-tertiary); block;">(Chair)</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="Toast.show('Manage Committee', 'Allocating country weights simulated.', 'info')">⚙️ Manage</button>
          </td>
        </tr>
      `;
    }).join('');
  };
  renderCommitteesAdmin();

  // --- Render Transaction Log ---
  const renderTransactionsAdmin = () => {
    const tableBody = document.getElementById('adminTransactionsTableBody');
    tableBody.innerHTML = SHL_DATA.adminStats.recentTransactions.map(txn => {
      let statusBadge = '';
      if (txn.status === 'completed') {
        statusBadge = `<span class="badge badge-success">Completed</span>`;
      } else if (txn.status === 'pending') {
        statusBadge = `<span class="badge badge-warning">Pending</span>`;
      } else if (txn.status === 'failed') {
        statusBadge = `<span class="badge badge-danger">Failed</span>`;
      }

      return `
        <tr>
          <td style="font-family: var(--font-mono); font-size: var(--text-xs);">${txn.id}</td>
          <td><strong>${txn.delegate}</strong></td>
          <td>${txn.event}</td>
          <td><strong>${Utils.formatCurrency(txn.amount)}</strong></td>
          <td>${txn.method}</td>
          <td>${Utils.formatDate(txn.date)}</td>
          <td>${statusBadge}</td>
        </tr>
      `;
    }).join('');
  };
  renderTransactionsAdmin();

  // --- Render Entry QR Scanner Simulator ---
  const renderScannerLogs = () => {
    const logsContainer = document.getElementById('scanHistoryLogContainer');
    logsContainer.innerHTML = SHL_DATA.adminStats.scanLog.map(log => {
      let statusText = '';
      if (log.status === 'success') {
        statusText = `🟢 Check-in Approved: ${log.delegate} (${log.ticket})`;
      } else if (log.status === 'already_scanned') {
        statusText = `🟡 Already Scanned: ${log.delegate} (${log.ticket})`;
      } else if (log.status === 'failed') {
        statusText = `🔴 Invalid Passcode: Verification Failed`;
      }

      return `
        <div class="scan-log-row ${log.status}">
          <span>${statusText}</span>
          <span style="color: var(--text-tertiary);">${log.time}</span>
        </div>
      `;
    }).join('');
  };
  renderScannerLogs();

  // Scan Button Trigger
  const manualScanBtn = document.getElementById('manualScanBtn');
  manualScanBtn.addEventListener('click', () => {
    const input = document.getElementById('manualScanInput').value.trim();
    if (!input) {
      Toast.show('Empty Code', 'Please enter a ticket passcode to scan.', 'warning');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Compare code
    // Check against current mock user ticket codes
    const matchedTicket = SHL_DATA.currentUser.tickets.find(t => t.id === input || t.qrCode === input);

    if (matchedTicket) {
      if (matchedTicket.checkedIn) {
        SHL_DATA.adminStats.scanLog.unshift({
          time: timeStr,
          delegate: SHL_DATA.currentUser.name,
          ticket: matchedTicket.id,
          status: 'already_scanned'
        });
        Toast.show('Verification Alert', 'Ticket has already been verified previously.', 'warning');
      } else {
        matchedTicket.checkedIn = true;
        SHL_DATA.adminStats.todayCheckIns++;
        document.getElementById('metricTodayCheckins').textContent = SHL_DATA.adminStats.todayCheckIns;

        SHL_DATA.adminStats.scanLog.unshift({
          time: timeStr,
          delegate: SHL_DATA.currentUser.name,
          ticket: matchedTicket.id,
          status: 'success'
        });
        Toast.show('Verification Successful', 'Pass code validated. Delegate checked in.', 'success');
      }
    } else {
      SHL_DATA.adminStats.scanLog.unshift({
        time: timeStr,
        delegate: 'Unknown',
        ticket: input,
        status: 'failed'
      });
      Toast.show('Verification Failed', 'Invalid ticket passcode. Please try again.', 'error');
    }

    // Reset fields & re-render logs
    document.getElementById('manualScanInput').value = '';
    renderScannerLogs();
  });
});
