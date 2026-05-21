/* ============================================
   SHL EVENTS PAGE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const eventsGrid = document.getElementById('eventsGrid');
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const filtersSidebar = document.getElementById('filtersSidebar');
  const mobileFiltersTrigger = document.getElementById('mobileFiltersTrigger');
  const filtersBackdrop = document.getElementById('filtersBackdrop');
  const closeFiltersBtn = document.getElementById('closeFiltersBtn');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const resetAllBtn = document.getElementById('resetAllBtn');

  // Load and preserve categories from URL if present
  const urlCategory = Utils.getUrlParam('category');
  if (urlCategory) {
    const input = document.querySelector(`input[name="category"][value="${urlCategory}"]`);
    if (input) input.checked = true;
  }

  // --- Render Events ---
  const renderEvents = () => {
    // 1. Get filter values
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
    const selectedCities = Array.from(document.querySelectorAll('input[name="city"]:checked')).map(el => el.value);
    const priceRange = document.querySelector('input[name="price"]:checked')?.value || 'any';
    const searchQuery = searchInput.value.toLowerCase().trim();
    const sortBy = sortSelect.value;

    // 2. Filter data
    let filtered = SHL_DATA.events.filter(evt => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(evt.category)) return false;

      // City / Location filter
      if (selectedCities.length > 0 && !selectedCities.includes(evt.city)) return false;

      // Price filter
      if (priceRange === 'under-1000' && evt.price >= 1000) return false;
      if (priceRange === '1000-3000' && (evt.price < 1000 || evt.price > 3000)) return false;
      if (priceRange === 'above-3000' && evt.price <= 3000) return false;

      // Search filter
      if (searchQuery) {
        const matchesTitle = evt.title.toLowerCase().includes(searchQuery);
        const matchesDesc = evt.description.toLowerCase().includes(searchQuery);
        const matchesCity = evt.city.toLowerCase().includes(searchQuery);
        const matchesTags = evt.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        if (!matchesTitle && !matchesDesc && !matchesCity && !matchesTags) return false;
      }

      return true;
    });

    // 3. Sort data
    filtered.sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'spots-desc') {
        return b.spotsLeft - a.spotsLeft;
      }
      return 0;
    });

    // 4. Update UI
    resultsCount.textContent = `Showing ${filtered.length} event${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      eventsGrid.classList.add('hidden');
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      eventsGrid.classList.remove('hidden');

      eventsGrid.innerHTML = filtered.map(evt => {
        const formattedPrice = Utils.formatCurrency(evt.price, evt.currency);
        const isLimited = evt.spotsLeft < 100;
        const spotsClass = isLimited ? 'event-card-spots limited' : 'event-card-spots';
        const spotsText = isLimited ? `🔥 Only ${evt.spotsLeft} spots left!` : `🟢 ${evt.spotsLeft} spots left`;
        
        const eventDate = new Date(evt.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

        return `
          <article class="event-card">
            <div class="event-card-image">
              <img src="${evt.image}" alt="${evt.title}">
              <div class="event-card-date">
                <span class="day">${day}</span>
                <span class="month">${month}</span>
              </div>
              <span class="badge badge-primary event-card-category">${evt.category}</span>
            </div>
            <div class="event-card-body">
              <h3 class="event-card-title">${evt.title}</h3>
              <div class="event-card-location">
                <span>📍</span> ${evt.city}, ${evt.country}
              </div>
              <p class="event-card-description">${evt.description}</p>
              <div class="event-card-footer">
                <div class="event-card-price">
                  <span class="from">From</span> ${formattedPrice}
                </div>
                <div class="${spotsClass}">${spotsText}</div>
              </div>
              <div style="margin-top: 16px;">
                <a href="booking.html?event=${evt.id}" class="btn btn-primary" style="width: 100%;">Book Ticket</a>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }
  };

  // --- Clear / Reset All Filters ---
  const clearFilters = () => {
    document.querySelectorAll('input[name="category"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="city"]').forEach(el => el.checked = false);
    const defaultRadio = document.querySelector('input[name="price"][value="any"]');
    if (defaultRadio) defaultRadio.checked = true;
    searchInput.value = '';
    renderEvents();
  };

  // --- Mobile Filter Display Toggle ---
  const toggleMobileFilters = (show) => {
    if (show) {
      filtersSidebar.classList.add('active');
      filtersBackdrop.classList.add('active');
      closeFiltersBtn.style.display = 'block';
    } else {
      filtersSidebar.classList.remove('active');
      filtersBackdrop.classList.remove('active');
      closeFiltersBtn.style.display = 'none';
    }
  };

  // --- Event Listeners ---
  document.querySelectorAll('input[name="category"]').forEach(el => el.addEventListener('change', renderEvents));
  document.querySelectorAll('input[name="city"]').forEach(el => el.addEventListener('change', renderEvents));
  document.querySelectorAll('input[name="price"]').forEach(el => el.addEventListener('change', renderEvents));
  searchInput.addEventListener('input', Utils.debounce(renderEvents, 250));
  sortSelect.addEventListener('change', renderEvents);

  clearFiltersBtn.addEventListener('click', clearFilters);
  resetAllBtn.addEventListener('click', clearFilters);

  mobileFiltersTrigger.addEventListener('click', () => toggleMobileFilters(true));
  filtersBackdrop.addEventListener('click', () => toggleMobileFilters(false));
  closeFiltersBtn.addEventListener('click', () => toggleMobileFilters(false));

  // Run initial render
  renderEvents();
});
