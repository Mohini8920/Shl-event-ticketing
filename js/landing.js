/* ============================================
   SHL LANDING PAGE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate Featured Events
  const featuredEventsGrid = document.getElementById('featuredEventsGrid');
  if (featuredEventsGrid) {
    const featuredEvents = SHL_DATA.events.filter(evt => evt.featured);
    
    featuredEventsGrid.innerHTML = featuredEvents.map(evt => {
      const formattedPrice = Utils.formatCurrency(evt.price, evt.currency);
      const isLimited = evt.spotsLeft < 100;
      const spotsClass = isLimited ? 'event-card-spots limited' : 'event-card-spots';
      const spotsText = isLimited ? `🔥 Only ${evt.spotsLeft} spots left!` : `🟢 ${evt.spotsLeft} spots remaining`;
      
      const eventDate = new Date(evt.date);
      const day = eventDate.getDate();
      const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

      return `
        <article class="event-card reveal-child">
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
              <a href="booking.html?event=${evt.id}" class="btn btn-primary" style="width: 100%;">Book Now</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // 2. Populate Testimonial Carousel
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialDots = document.getElementById('testimonialDots');
  if (testimonialTrack && testimonialDots) {
    const testimonials = SHL_DATA.testimonials;
    
    // Create slides
    testimonialTrack.innerHTML = testimonials.map(t => {
      const stars = '⭐'.repeat(t.rating);
      return `
        <div class="testimonial-slide">
          <div class="testimonial-card">
            <div class="testimonial-stars">${stars}</div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-avatar">${t.avatar}</div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-role">${t.role}</div>
          </div>
        </div>
      `;
    }).join('');

    // Create dots
    testimonialDots.innerHTML = testimonials.map((_, i) => `
      <button class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>
    `).join('');

    // Carousel Logic
    let currentSlide = 0;
    const dots = testimonialDots.querySelectorAll('.testimonial-dot');
    
    const goToSlide = (index) => {
      currentSlide = index;
      testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    };

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        goToSlide(index);
      });
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
      let nextSlide = (currentSlide + 1) % testimonials.length;
      goToSlide(nextSlide);
    }, 5000);
  }

  // 3. Populate Sponsor Ticker
  const sponsorTicker = document.getElementById('sponsorTicker');
  if (sponsorTicker) {
    const sponsors = SHL_DATA.sponsors;
    // Double the sponsors for seamless loop
    const sponsorList = [...sponsors, ...sponsors];
    sponsorTicker.innerHTML = sponsorList.map(s => `
      <div class="sponsor-item">${s}</div>
    `).join('');
  }

  // 4. Populate FAQ Accordions
  const faqContainer = document.getElementById('faqContainer');
  if (faqContainer) {
    const faqs = SHL_DATA.faqs;
    faqContainer.innerHTML = faqs.map(faq => `
      <div class="accordion-item">
        <button class="accordion-header">
          <span>${faq.question}</span>
          <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-body">
          <div class="accordion-content">
            <p>${faq.answer}</p>
          </div>
        </div>
      </div>
    `).join('');

    // Re-initialize Accordion in app.js if needed, or bind click here
    // Since Accordion.init() runs globally, it handles dynamically added accordions if they were present at init.
    // However, since we populate FAQs dynamically after DOMContentLoaded, we need to bind clicks to these new headers:
    faqContainer.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Close other items
        faqContainer.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
});
