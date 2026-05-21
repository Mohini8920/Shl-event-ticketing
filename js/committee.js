/* ============================================
   SHL COMMITTEE SELECTION JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // State Variables
  let selectedCommitteeId = SHL_DATA.committees[0].id;
  let selectedCountryName = null;

  // DOM Elements
  const committeesGrid = document.getElementById('committeesGrid');
  const selectedCommitteeTitle = document.getElementById('selectedCommitteeTitle');
  const selectedCommitteeTopic = document.getElementById('selectedCommitteeTopic');
  const countriesGrid = document.getElementById('countriesGrid');
  const selectedChoiceText = document.getElementById('selectedChoiceText');
  const confirmAllocationBtn = document.getElementById('confirmAllocationBtn');
  const joinWaitlistBtn = document.getElementById('joinWaitlistBtn');
  const waitlistModal = document.getElementById('waitlistModal');
  const submitWaitlistBtn = document.getElementById('submitWaitlistBtn');

  // --- Render Committees Cards ---
  const renderCommittees = () => {
    committeesGrid.innerHTML = SHL_DATA.committees.map(committee => {
      const isSelected = committee.id === selectedCommitteeId;
      return `
        <div class="committee-select-card ${isSelected ? 'selected' : ''}" data-id="${committee.id}">
          <div class="committee-select-icon">${committee.icon}</div>
          <h3>${committee.shortName}</h3>
          <p style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; color: var(--primary);">${committee.difficulty}</p>
          <p style="font-size: var(--text-xs); color: var(--text-secondary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${committee.name}</p>
        </div>
      `;
    }).join('');

    // Attach Click Handlers
    committeesGrid.querySelectorAll('.committee-select-card').forEach(card => {
      card.addEventListener('click', () => {
        selectedCommitteeId = card.dataset.id;
        selectedCountryName = null;
        renderCommittees();
        renderCountries();
      });
    });
  };

  // --- Render Country Portfolio Grid ---
  const renderCountries = () => {
    const committee = SHL_DATA.committees.find(c => c.id === selectedCommitteeId);
    if (!committee) return;

    // Update Headers
    selectedCommitteeTitle.textContent = `2. Select Portfolio for ${committee.shortName}`;
    selectedCommitteeTopic.textContent = `📌 Agenda: ${committee.topic}`;

    // Render Countries
    countriesGrid.innerHTML = committee.countries.map(country => {
      const isSelected = country.name === selectedCountryName;
      let selectedClass = isSelected ? 'selected-country' : '';
      let badgeHTML = '';

      if (country.status === 'available') {
        badgeHTML = `<span class="country-status-badge available">Available</span>`;
      } else if (country.status === 'limited') {
        badgeHTML = `<span class="country-status-badge limited">Few Left</span>`;
      } else if (country.status === 'reserved') {
        badgeHTML = `<span class="country-status-badge reserved">Reserved</span>`;
      } else if (country.status === 'waitlisted') {
        badgeHTML = `<span class="country-status-badge waitlisted">Full</span>`;
      }

      return `
        <div class="country-card ${country.status} ${selectedClass}" data-name="${country.name}" data-status="${country.status}">
          <div class="country-info">
            <span class="country-flag">${country.flag}</span>
            <span class="country-name">${country.name}</span>
          </div>
          ${badgeHTML}
        </div>
      `;
    }).join('');

    // Attach Click Handlers to Country Cards
    countriesGrid.querySelectorAll('.country-card').forEach(card => {
      card.addEventListener('click', () => {
        const status = card.dataset.status;
        const name = card.dataset.name;

        if (status === 'reserved') {
          Toast.show('Unavailable', 'This country is already locked or reserved by another delegate.', 'warning');
          return;
        }

        selectedCountryName = name;
        
        // Refresh grid highlight
        countriesGrid.querySelectorAll('.country-card').forEach(c => c.classList.remove('selected-country'));
        card.classList.add('selected-country');

        // Update Action Panel states
        selectedChoiceText.textContent = `${committee.shortName} — ${name} (${status.toUpperCase()})`;
        
        if (status === 'waitlisted') {
          joinWaitlistBtn.style.display = 'inline-flex';
          confirmAllocationBtn.disabled = true;
        } else {
          joinWaitlistBtn.style.display = 'none';
          confirmAllocationBtn.disabled = false;
        }
      });
    });

    // Reset controls when committee changes
    selectedChoiceText.textContent = 'None';
    confirmAllocationBtn.disabled = true;
    joinWaitlistBtn.style.display = 'none';
  };

  // --- Confirm Allocation Button ---
  confirmAllocationBtn.addEventListener('click', () => {
    const committee = SHL_DATA.committees.find(c => c.id === selectedCommitteeId);
    
    Toast.show(
      'Allocation Requested',
      `Requested ${selectedCountryName} in ${committee.shortName}. Approval pending organizer review.`,
      'success'
    );

    // Save allocation mock request to user profile in LocalStorage
    const currentUser = JSON.parse(localStorage.getItem('shl_current_user') || JSON.stringify(SHL_DATA.currentUser));
    
    // Check if user has an active ticket to allocate
    if (currentUser.tickets && currentUser.tickets.length > 0) {
      currentUser.tickets[0].committee = committee.shortName;
      currentUser.tickets[0].country = selectedCountryName;
      localStorage.setItem('shl_current_user', JSON.stringify(currentUser));
    }

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 2000);
  });

  // --- Waitlist Button Operations ---
  joinWaitlistBtn.addEventListener('click', () => {
    Modal.open('waitlistModal');
  });

  submitWaitlistBtn.addEventListener('click', () => {
    const committee = SHL_DATA.committees.find(c => c.id === selectedCommitteeId);
    Modal.close('waitlistModal');
    Toast.show(
      'Joined Waitlist',
      `You are now in queue for ${selectedCountryName} in ${committee.shortName}.`,
      'info'
    );
    
    // Reset selection
    selectedCountryName = null;
    renderCountries();
  });

  // Initial runs
  renderCommittees();
  renderCountries();
});
