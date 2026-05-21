/* ============================================
   SHL TICKETING SYSTEM — MOCK DATA
   ============================================ */

const SHL_DATA = {
  /* ---- Events ---- */
  events: [
    {
      id: 'evt-001',
      title: 'New Delhi Global Youth Summit 2026',
      slug: 'ndgys-2026',
      category: 'Summit',
      description: 'The flagship youth summit bringing together 1000+ delegates from across the globe to discuss pressing global issues, leadership, and innovation.',
      longDescription: 'The New Delhi Global Youth Summit is SHL\'s premier event that brings together over 1000 delegates from 30+ countries. This 3-day summit features keynote speakers, panel discussions, committee sessions, networking events, and cultural showcases. Delegates will engage in meaningful dialogue on global challenges including climate action, digital governance, youth empowerment, and sustainable development.',
      date: '2026-08-15',
      endDate: '2026-08-17',
      time: '09:00 AM',
      venue: 'India International Centre',
      city: 'New Delhi',
      country: 'India',
      image: 'images/Screenshot 2026-05-21 145557.png',
      banner: 'images/Screenshot 2026-05-21 145557.png',
      price: 149,
      currency: '₹',
      spots: 1000,
      spotsLeft: 234,
      status: 'open',
      featured: true,
      tags: ['MUN', 'Leadership', 'Global Affairs', 'Networking'],
      speakers: [
        { name: 'Dr. Priya Sharma', role: 'Keynote Speaker', topic: 'Youth & Policy Making' },
        { name: 'Arjun Mehta', role: 'Panelist', topic: 'Digital Diplomacy' }
      ],
      schedule: [
        { day: 'Day 1', items: ['Registration & Welcome', 'Opening Ceremony', 'Committee Sessions I', 'Networking Dinner'] },
        { day: 'Day 2', items: ['Committee Sessions II', 'Panel Discussion', 'Committee Sessions III', 'Cultural Night'] },
        { day: 'Day 3', items: ['Committee Sessions IV', 'Closing Ceremony', 'Awards & Certificates'] }
      ]
    },
    {
      id: 'evt-002',
      title: 'Dubai Global Youth Summit 2026',
      slug: 'dgys-2026',
      category: 'Summit',
      description: 'An international summit in the heart of Dubai bringing together young changemakers for dialogue on global challenges and innovation.',
      longDescription: 'Experience the future of youth diplomacy at Dubai\'s most prestigious youth summit. Join delegates from 40+ countries in the iconic city of Dubai for three days of intense debate, cultural exchange, and leadership development.',
      date: '2026-11-20',
      endDate: '2026-11-22',
      time: '10:00 AM',
      venue: 'Dubai World Trade Centre',
      city: 'Dubai',
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
      banner: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&h=500&fit=crop',
      price: 2500,
      currency: '₹',
      spots: 800,
      spotsLeft: 567,
      status: 'open',
      featured: true,
      tags: ['International', 'MUN', 'Innovation', 'Diplomacy'],
      speakers: [
        { name: 'Sarah Al-Maktoum', role: 'Keynote Speaker', topic: 'Global Youth Leadership' }
      ],
      schedule: [
        { day: 'Day 1', items: ['Arrival & Registration', 'Opening Session', 'Committee Sessions I'] },
        { day: 'Day 2', items: ['Committee Sessions II', 'Guest Lecture', 'Committee Sessions III'] },
        { day: 'Day 3', items: ['Finals', 'Awards Ceremony', 'Farewell'] }
      ]
    },
    {
      id: 'evt-003',
      title: 'SHL Model United Nations 2026',
      slug: 'shl-mun-2026',
      category: 'MUN',
      description: 'The premier Model United Nations conference with 8 committees simulating UN bodies and international organizations.',
      longDescription: 'SHL MUN is the most competitive and rewarding MUN conference in South Asia. With 8 diverse committees, experienced chairs, and rigorous preparation resources, this conference is designed for both beginners and seasoned MUNers.',
      date: '2026-09-10',
      endDate: '2026-09-12',
      time: '08:30 AM',
      venue: 'The Lalit, Connaught Place',
      city: 'New Delhi',
      country: 'India',
      image: 'images/sahil_edited.avif',
      banner: 'images/sahil_edited.avif',
      price: 350,
      currency: '₹',
      spots: 600,
      spotsLeft: 89,
      status: 'open',
      featured: true,
      tags: ['MUN', 'Debate', 'Diplomacy', 'Committees'],
      speakers: [],
      schedule: []
    },
    {
      id: 'evt-004',
      title: 'Baithak',
      slug: 'baithak-ps-2026',
      category: 'Workshop',
      description: 'An intensive meetup event full of fun and activities',
      longDescription: 'Baithak is SHL\'s signature workshop series focused on building confidence, eloquence, and persuasion skills. Through interactive exercises, peer feedback, and expert coaching, participants learn to command any stage.',
      date: '2026-05-23',
      endDate: '2026-05-23',
      time: '10:00 AM',
      venue: 'SHL Learning Hub',
      city: 'New Delhi',
      country: 'India',
      image: 'images/Screenshot 2026-05-21 154532.png',
      banner: 'images/Screenshot 2026-05-21 154532.png',
      price: 149,
      currency: '₹',
      spots: 50,
      spotsLeft: 12,
      status: 'open',
      featured: false,
      tags: ['Public Speaking', 'Workshop', 'Communication'],
      speakers: [],
      schedule: []
    },
    {
      id: 'evt-005',
      title: 'SHL Leadership Bootcamp',
      slug: 'leadership-bootcamp-2026',
      category: 'Workshop',
      description: 'A 2-day intensive leadership development program with hands-on exercises, case studies, and expert mentorship.',
      longDescription: 'Transform your leadership skills in this immersive bootcamp. Learn from industry leaders, build your personal brand, and develop the strategic thinking needed to lead in the 21st century.',
      date: '2026-10-05',
      endDate: '2026-10-06',
      time: '09:00 AM',
      venue: 'Hyatt Regency',
      city: 'Mumbai',
      country: 'India',
      image: 'images/Screenshot 2026-05-21 145545.png',
      banner: 'images/Screenshot 2026-05-21 145545.png',
      price: 149,
      currency: '₹',
      spots: 100,
      spotsLeft: 43,
      status: 'open',
      featured: false,
      tags: ['Leadership', 'Bootcamp', 'Professional'],
      speakers: [],
      schedule: []
    },
    {
      id: 'evt-006',
      title: 'London Youth Summit 2026',
      slug: 'lys-2026',
      category: 'Summit',
      description: 'An international summit in London bringing together young leaders and changemakers from across the globe for three days of intensive learning and networking.',
      longDescription: 'The London Youth Summit is a prestigious international event that brings together delegates from 50+ countries in the historic city of London. Experience world-class debates, keynote sessions from global leaders, and unparalleled networking opportunities.',
      date: '2027-02-20',
      endDate: '2027-02-22',
      time: '10:00 AM',
      venue: 'Central Hall Westminster',
      city: 'London',
      country: 'United Kingdom',
      image: 'images/image.png',
      banner: 'images/image.png',
      price: 149,
      currency: '₹',
      spots: 600,
      spotsLeft: 450,
      status: 'upcoming',
      featured: false,
      tags: ['International', 'Leadership', 'Global', 'Summit'],
      speakers: [],
      schedule: []
    }
  ],

  /* ---- Ticket Types ---- */
  ticketTypes: [
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Limited early bird tickets at a discounted price',
      priceMultiplier: 0.7,
      features: ['Event Access', 'Certificate', 'Lunch & Refreshments', 'Event Kit'],
      available: true,
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Standard delegate pass with all essential access',
      priceMultiplier: 1.0,
      features: ['Event Access', 'Certificate', 'Lunch & Refreshments', 'Event Kit', 'Networking Session'],
      available: true,
      popular: true
    },
    {
      id: 'vip',
      name: 'VIP Delegate',
      description: 'Premium experience with exclusive perks and priority access',
      priceMultiplier: 1.8,
      features: ['Priority Event Access', 'Premium Certificate', 'All Meals', 'Premium Event Kit', 'VIP Networking', 'Speaker Meet & Greet', 'Priority Seating'],
      available: true,
      popular: false
    },
    {
      id: 'group',
      name: 'Group Pass (5+)',
      description: 'Discounted rates for delegations of 5 or more',
      priceMultiplier: 0.8,
      features: ['Event Access', 'Certificate', 'Lunch & Refreshments', 'Event Kit', 'Group Photo Session'],
      available: true,
      popular: false,
      minQty: 5
    }
  ],

  /* ---- Committees (MUN) ---- */
  committees: [
    {
      id: 'unsc',
      name: 'United Nations Security Council',
      shortName: 'UNSC',
      topic: 'Addressing the Crisis in the South China Sea',
      difficulty: 'Advanced',
      delegateCount: 15,
      chairperson: 'Ananya Verma',
      viceChair: 'Rohan Singh',
      description: 'The principal organ responsible for international peace and security. Delegates simulate the world\'s most powerful diplomatic body.',
      icon: '🛡️',
      countries: [
        { name: 'United States', flag: '🇺🇸', status: 'reserved' },
        { name: 'United Kingdom', flag: '🇬🇧', status: 'available' },
        { name: 'France', flag: '🇫🇷', status: 'available' },
        { name: 'Russia', flag: '🇷🇺', status: 'waitlisted' },
        { name: 'China', flag: '🇨🇳', status: 'reserved' },
        { name: 'India', flag: '🇮🇳', status: 'available' },
        { name: 'Japan', flag: '🇯🇵', status: 'available' },
        { name: 'Brazil', flag: '🇧🇷', status: 'available' },
        { name: 'Germany', flag: '🇩🇪', status: 'limited' },
        { name: 'South Africa', flag: '🇿🇦', status: 'available' },
        { name: 'Australia', flag: '🇦🇺', status: 'available' },
        { name: 'Mexico', flag: '🇲🇽', status: 'available' },
        { name: 'Nigeria', flag: '🇳🇬', status: 'available' },
        { name: 'South Korea', flag: '🇰🇷', status: 'limited' },
        { name: 'Egypt', flag: '🇪🇬', status: 'available' }
      ]
    },
    {
      id: 'unga',
      name: 'United Nations General Assembly',
      shortName: 'UNGA',
      topic: 'Reforming Global Trade for Equitable Development',
      difficulty: 'Beginner',
      delegateCount: 40,
      chairperson: 'Meera Kapoor',
      viceChair: 'Aditya Nair',
      description: 'The main deliberative, policymaking, and representative organ of the United Nations. Perfect for first-time MUNers.',
      icon: '🌍',
      countries: [
        { name: 'India', flag: '🇮🇳', status: 'available' },
        { name: 'United States', flag: '🇺🇸', status: 'available' },
        { name: 'China', flag: '🇨🇳', status: 'available' },
        { name: 'Brazil', flag: '🇧🇷', status: 'available' },
        { name: 'Germany', flag: '🇩🇪', status: 'available' },
        { name: 'France', flag: '🇫🇷', status: 'limited' },
        { name: 'Japan', flag: '🇯🇵', status: 'available' },
        { name: 'United Kingdom', flag: '🇬🇧', status: 'available' },
        { name: 'Canada', flag: '🇨🇦', status: 'available' },
        { name: 'Australia', flag: '🇦🇺', status: 'available' }
      ]
    },
    {
      id: 'unhrc',
      name: 'UN Human Rights Council',
      shortName: 'UNHRC',
      topic: 'Digital Privacy and Surveillance in the Modern Age',
      difficulty: 'Intermediate',
      delegateCount: 30,
      chairperson: 'Kavya Reddy',
      viceChair: 'Ishaan Deshmukh',
      description: 'Responsible for strengthening the promotion and protection of human rights around the globe.',
      icon: '⚖️',
      countries: [
        { name: 'Sweden', flag: '🇸🇪', status: 'available' },
        { name: 'Norway', flag: '🇳🇴', status: 'available' },
        { name: 'Switzerland', flag: '🇨🇭', status: 'available' },
        { name: 'India', flag: '🇮🇳', status: 'limited' },
        { name: 'United States', flag: '🇺🇸', status: 'reserved' },
        { name: 'China', flag: '🇨🇳', status: 'available' },
        { name: 'Saudi Arabia', flag: '🇸🇦', status: 'available' },
        { name: 'Russia', flag: '🇷🇺', status: 'available' }
      ]
    },
    {
      id: 'ecosoc',
      name: 'Economic and Social Council',
      shortName: 'ECOSOC',
      topic: 'Bridging the Digital Divide in Developing Nations',
      difficulty: 'Intermediate',
      delegateCount: 25,
      chairperson: 'Tanvi Gupta',
      viceChair: 'Arjun Malhotra',
      description: 'Central platform for fostering debate and innovative thinking on sustainable development.',
      icon: '📊',
      countries: [
        { name: 'India', flag: '🇮🇳', status: 'available' },
        { name: 'Ethiopia', flag: '🇪🇹', status: 'available' },
        { name: 'Bangladesh', flag: '🇧🇩', status: 'available' },
        { name: 'Kenya', flag: '🇰🇪', status: 'available' },
        { name: 'Philippines', flag: '🇵🇭', status: 'available' },
        { name: 'Mexico', flag: '🇲🇽', status: 'limited' }
      ]
    },
    {
      id: 'unep',
      name: 'UN Environment Programme',
      shortName: 'UNEP',
      topic: 'Climate Finance and Green Technology Transfer',
      difficulty: 'Beginner',
      delegateCount: 30,
      chairperson: 'Riya Chatterjee',
      viceChair: 'Vikram Joshi',
      description: 'The leading global environmental authority that sets the global environmental agenda.',
      icon: '🌱',
      countries: [
        { name: 'Maldives', flag: '🇲🇻', status: 'available' },
        { name: 'Tuvalu', flag: '🇹🇻', status: 'available' },
        { name: 'Norway', flag: '🇳🇴', status: 'available' },
        { name: 'India', flag: '🇮🇳', status: 'available' },
        { name: 'China', flag: '🇨🇳', status: 'available' },
        { name: 'United States', flag: '🇺🇸', status: 'available' },
        { name: 'Brazil', flag: '🇧🇷', status: 'available' },
        { name: 'Germany', flag: '🇩🇪', status: 'available' }
      ]
    },
    {
      id: 'crisis',
      name: 'Crisis Committee',
      shortName: 'Crisis',
      topic: 'The Cuban Missile Crisis — A Historical Simulation',
      difficulty: 'Advanced',
      delegateCount: 20,
      chairperson: 'Kabir Ahuja',
      viceChair: 'Sanya Bhatia',
      description: 'A fast-paced, high-pressure committee where delegates must respond to evolving crises in real-time.',
      icon: '🔥',
      countries: [
        { name: 'United States (JFK Cabinet)', flag: '🇺🇸', status: 'limited' },
        { name: 'Soviet Union (Politburo)', flag: '🇷🇺', status: 'available' },
        { name: 'Cuba (Castro\'s Council)', flag: '🇨🇺', status: 'reserved' },
        { name: 'United Kingdom', flag: '🇬🇧', status: 'available' },
        { name: 'NATO Command', flag: '🏳️', status: 'available' }
      ]
    },
    {
      id: 'lok-sabha',
      name: 'Lok Sabha (Indian Parliament)',
      shortName: 'Lok Sabha',
      topic: 'Uniform Civil Code: For or Against?',
      difficulty: 'Intermediate',
      delegateCount: 35,
      chairperson: 'Nishant Kumar',
      viceChair: 'Aditi Saxena',
      description: 'Simulate India\'s lower house of Parliament and debate on critical domestic policy issues.',
      icon: '🏛️',
      countries: [
        { name: 'BJP', flag: '🟠', status: 'available' },
        { name: 'INC', flag: '🔵', status: 'available' },
        { name: 'AAP', flag: '🟢', status: 'available' },
        { name: 'TMC', flag: '🟡', status: 'limited' },
        { name: 'DMK', flag: '🔴', status: 'available' },
        { name: 'Independent', flag: '⚪', status: 'available' }
      ]
    },
    {
      id: 'ipc',
      name: 'International Press Corps',
      shortName: 'IPC',
      topic: 'Covering All Committees — Journalism & Reporting',
      difficulty: 'Beginner',
      delegateCount: 15,
      chairperson: 'Zara Khan',
      viceChair: 'Dhruv Patel',
      description: 'Report on proceedings across all committees. Perfect for aspiring journalists and media enthusiasts.',
      icon: '📰',
      countries: [
        { name: 'Reuters', flag: '📡', status: 'available' },
        { name: 'BBC', flag: '📺', status: 'available' },
        { name: 'Al Jazeera', flag: '📡', status: 'available' },
        { name: 'The Hindu', flag: '📰', status: 'available' },
        { name: 'CNN', flag: '📺', status: 'limited' },
        { name: 'Freelance', flag: '✍️', status: 'available' }
      ]
    }
  ],

  /* ---- Testimonials ---- */
  testimonials: [
    {
      name: 'Anisha Gupta',
      role: 'Delegate, NDGYS 2025',
      avatar: 'AG',
      text: 'The New Delhi Global Youth Summit was an absolutely transformative experience. The quality of debate, the caliber of speakers, and the friendships I made will last a lifetime.',
      rating: 5
    },
    {
      name: 'Mohammed Al-Rashid',
      role: 'Delegate, DGYS 2025',
      avatar: 'MA',
      text: 'Dubai Global Youth Summit exceeded all my expectations. SHL has created something truly special — a platform where young people from different cultures come together to solve real-world problems.',
      rating: 5
    },
    {
      name: 'Priya Menon',
      role: 'Best Delegate, SHL MUN 2025',
      avatar: 'PM',
      text: 'Winning Best Delegate at SHL MUN was a highlight of my academic career. The committees are well-researched and the chairs are incredibly supportive. Highly recommend!',
      rating: 5
    },
    {
      name: 'Rahul Krishnan',
      role: 'Delegate, Leadership Bootcamp',
      avatar: 'RK',
      text: 'The Leadership Bootcamp gave me tools and frameworks I use daily in my professional life. SHL doesn\'t just teach — they transform. An incredible investment in yourself.',
      rating: 5
    },
    {
      name: 'Sarah Chen',
      role: 'International Delegate, DGYS 2024',
      avatar: 'SC',
      text: 'Coming all the way from London was absolutely worth it. The international networking opportunities and the quality of discussions were unmatched. Can\'t wait for 2026!',
      rating: 5
    }
  ],

  /* ---- Sponsors ---- */
  sponsors: [
    'United Nations', 'UNICEF', 'IIT Delhi', 'BITS Pilani', 'Ashoka University',
    'Embassy of France', 'British Council', 'Google', 'Microsoft', 'Adobe',
    'Deloitte', 'McKinsey & Co', 'Times of India', 'NDTV', 'Hindustan Times'
  ],

  /* ---- FAQs ---- */
  faqs: [
    {
      question: 'What is Social House Learning?',
      answer: 'Social House Learning is a movement bridging education with real-world skills. We empower students, institutions, and professionals through innovative learning, leadership growth, and global connections. Partnering with top universities and industry leaders, we cultivate future leaders with confidence, critical thinking, and entrepreneurial skills. Join the SHL revolution and unlock your potential!'
    },
    {
      question: 'How do I register for an event?',
      answer: 'You can register by creating an account on our platform, browsing available events, selecting your preferred ticket type, and completing the checkout process. You\'ll receive a confirmation email with your QR-coded ticket.'
    },
    {
      question: 'What is included in the ticket price?',
      answer: 'Ticket prices typically include event access, certificate of participation, meals during the event, event kit/materials, and networking sessions. VIP tickets include additional perks like speaker meet & greets and priority seating.'
    },
    {
      question: 'Can I get a refund if I can\'t attend?',
      answer: 'Yes! We offer full refunds up to 30 days before the event, 50% refunds up to 15 days before, and no refunds within 14 days of the event. Please refer to our refund policy for detailed terms.'
    },
    {
      question: 'How does committee allocation work for MUN?',
      answer: 'After registering for an MUN event, you can select your preferred committee and country/portfolio. Allocation is on a first-come-first-served basis. If your choice is unavailable, you can join a waitlist and be notified if a spot opens up.'
    },
    {
      question: 'Is prior MUN experience required?',
      answer: 'Not at all! We have committees designed for all experience levels — from beginner-friendly General Assemblies to advanced Crisis Committees. Each committee listing shows its difficulty level to help you choose.'
    },
    {
      question: 'How do I check in at the event?',
      answer: 'Simply show your QR-coded ticket at the registration desk. Our team will scan your QR code for instant verification and check-in. You can access your QR ticket from your dashboard.'
    },
    {
      question: 'Are international delegates welcome?',
      answer: 'Absolutely! Our summits in Dubai and London specifically cater to international audiences. We provide visa support letters for registered delegates who need them.'
    }
  ],

  /* ---- User Profile (Mock) ---- */
  currentUser: {
    id: 'usr-001',
    name: 'Aarav Patel',
    email: 'aarav.patel@gmail.com',
    phone: '+91 98765 43210',
    institution: 'Delhi University',
    role: 'Delegate',
    avatar: 'AP',
    joinedDate: '2025-03-15',
    eventsAttended: 4,
    tickets: [
      {
        id: 'TKT-2026-001',
        eventId: 'evt-001',
        eventName: 'New Delhi Global Youth Summit 2026',
        type: 'Standard',
        date: '2026-08-15',
        venue: 'India International Centre, New Delhi',
        status: 'confirmed',
        price: 2999,
        qrCode: 'TKT-2026-001-AARAV',
        committee: 'UNSC',
        country: 'India',
        checkedIn: false
      },
      {
        id: 'TKT-2026-002',
        eventId: 'evt-003',
        eventName: 'SHL Model United Nations 2026',
        type: 'VIP Delegate',
        date: '2026-09-10',
        venue: 'The Lalit, New Delhi',
        status: 'confirmed',
        price: 3598,
        qrCode: 'TKT-2026-002-AARAV',
        committee: 'Crisis Committee',
        country: 'Soviet Union (Politburo)',
        checkedIn: false
      },
      {
        id: 'TKT-2025-010',
        eventId: 'evt-past',
        eventName: 'NDGYS 2025',
        type: 'Standard',
        date: '2025-08-20',
        venue: 'Vigyan Bhawan, New Delhi',
        status: 'attended',
        price: 2499,
        qrCode: 'TKT-2025-010-AARAV',
        committee: 'UNGA',
        country: 'France',
        checkedIn: true
      }
    ],
    notifications: [
      { id: 1, text: 'Your ticket for NDGYS 2026 has been confirmed!', time: '2 hours ago', read: false, type: 'success' },
      { id: 2, text: 'Committee allocation for SHL MUN 2026 is now open.', time: '1 day ago', read: false, type: 'info' },
      { id: 3, text: 'Early bird registration ends in 3 days!', time: '2 days ago', read: true, type: 'warning' },
      { id: 4, text: 'Study guide for UNSC has been published.', time: '5 days ago', read: true, type: 'info' },
      { id: 5, text: 'Payment of ₹2,999 received successfully.', time: '1 week ago', read: true, type: 'success' }
    ],
    payments: [
      { id: 'PAY-001', date: '2026-05-15', event: 'NDGYS 2026', amount: 2999, method: 'UPI', status: 'completed' },
      { id: 'PAY-002', date: '2026-05-18', event: 'SHL MUN 2026', amount: 3598, method: 'Credit Card', status: 'completed' },
      { id: 'PAY-003', date: '2025-07-20', event: 'NDGYS 2025', amount: 2499, method: 'Net Banking', status: 'completed' },
      { id: 'PAY-004', date: '2025-06-10', event: 'Baithak Workshop', amount: 499, method: 'UPI', status: 'refunded' }
    ]
  },

  /* ---- Admin Stats ---- */
  adminStats: {
    totalTickets: 3847,
    totalRevenue: 11541053,
    pendingApprovals: 23,
    todayCheckIns: 156,
    ticketGrowth: 18.5,
    revenueGrowth: 24.3,
    approvalChange: -12,
    checkInChange: 45,
    recentSales: [
      { date: 'Mon', count: 45 },
      { date: 'Tue', count: 62 },
      { date: 'Wed', count: 38 },
      { date: 'Thu', count: 71 },
      { date: 'Fri', count: 89 },
      { date: 'Sat', count: 54 },
      { date: 'Sun', count: 33 }
    ],
    categoryBreakdown: [
      { name: 'Summit', count: 1820, percentage: 47 },
      { name: 'MUN', count: 1340, percentage: 35 },
      { name: 'Workshop', count: 450, percentage: 12 },
      { name: 'Bootcamp', count: 237, percentage: 6 }
    ],
    pendingDelegates: [
      { id: 'DEL-001', name: 'Vikram Sharma', email: 'vikram@email.com', event: 'NDGYS 2026', date: '2026-05-20', status: 'pending' },
      { id: 'DEL-002', name: 'Priya Iyer', email: 'priya@email.com', event: 'SHL MUN 2026', date: '2026-05-19', status: 'pending' },
      { id: 'DEL-003', name: 'Arjun Das', email: 'arjun@email.com', event: 'NDGYS 2026', date: '2026-05-19', status: 'pending' },
      { id: 'DEL-004', name: 'Sneha Pillai', email: 'sneha@email.com', event: 'DGYS 2026', date: '2026-05-18', status: 'pending' },
      { id: 'DEL-005', name: 'Kabir Malhotra', email: 'kabir@email.com', event: 'SHL MUN 2026', date: '2026-05-18', status: 'pending' }
    ],
    recentTransactions: [
      { id: 'TXN-001', delegate: 'Anisha Gupta', event: 'NDGYS 2026', amount: 2999, method: 'UPI', date: '2026-05-20', status: 'completed' },
      { id: 'TXN-002', delegate: 'Rahul K.', event: 'SHL MUN 2026', amount: 1999, method: 'Card', date: '2026-05-20', status: 'completed' },
      { id: 'TXN-003', delegate: 'Sarah C.', event: 'DGYS 2026', amount: 4999, method: 'Card', date: '2026-05-19', status: 'completed' },
      { id: 'TXN-004', delegate: 'Meera K.', event: 'NDGYS 2026', amount: 2999, method: 'Net Banking', date: '2026-05-19', status: 'pending' },
      { id: 'TXN-005', delegate: 'Ali H.', event: 'DGYS 2026', amount: 4999, method: 'UPI', date: '2026-05-18', status: 'failed' }
    ],
    scanLog: [
      { time: '10:15 AM', delegate: 'Aarav Patel', ticket: 'TKT-2026-001', status: 'success' },
      { time: '10:12 AM', delegate: 'Riya Chatterjee', ticket: 'TKT-2026-045', status: 'success' },
      { time: '10:08 AM', delegate: 'Unknown', ticket: 'TKT-INVALID', status: 'failed' },
      { time: '10:05 AM', delegate: 'Kabir Ahuja', ticket: 'TKT-2026-022', status: 'success' },
      { time: '10:01 AM', delegate: 'Zara Khan', ticket: 'TKT-2026-089', status: 'already_scanned' }
    ]
  },

  /* ---- Add-ons ---- */
  addOns: [
    { id: 'merch', name: 'Official Event Merchandise', description: 'T-shirt + Tote Bag + Notebook', price: 799, icon: '👕' },
    { id: 'workshop', name: 'Pre-Summit Workshop', description: '2-hour intensive prep session', price: 299, icon: '📚' },
    { id: 'dinner', name: 'Networking Dinner', description: 'Exclusive networking dinner with speakers', price: 999, icon: '🍽️' },
    { id: 'transfer', name: 'Airport Transfer', description: 'Round-trip airport pickup and drop', price: 1499, icon: '🚗' }
  ]
};
