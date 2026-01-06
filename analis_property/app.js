// Navigation scroll effect
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

const revealElements = document.querySelectorAll('.scroll-reveal');
revealElements.forEach(el => observer.observe(el));

// Progress bar animation
const progressFill = document.querySelector('.progress-fill');
if (progressFill) {
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = progressFill.getAttribute('data-progress');
        progressFill.style.setProperty('--progress-width', progress + '%');
        progressFill.classList.add('animated');
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  progressObserver.observe(progressFill);
}

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const target = document.getElementById(header.getAttribute('data-target'));
    const icon = header.querySelector('.accordion-icon');
    
    // Toggle active state
    header.classList.toggle('active');
    
    // Toggle content display
    if (target.style.display === 'block') {
      target.style.display = 'none';
      icon.textContent = '+';
    } else {
      target.style.display = 'block';
      icon.textContent = '−';
    }
  });
});

// Chart modal functionality
const chartCards = document.querySelectorAll('.chart-card');
const modal = document.getElementById('chartModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

const chartData = {
  1: {
    title: 'Proyeksi Cash Flow 10 Tahun',
    description: 'Visualisasi cash flow negatif Rp 6-9 juta/bulan selama 10 tahun. Grafik menunjukkan tren konsisten pengeluaran melebihi pendapatan operasional.',
    image: '01_cashflow_projection.png',
    color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  },
  2: {
    title: 'NOI vs Cicilan KPR',
    description: 'Gap analysis antara Net Operating Income (NOI) dan pembayaran cicilan KPR.',
    image: 'chart2.png',
    color: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
  },
  3: {
    title: 'Apresiasi Nilai Properti',
    description: 'Proyeksi capital gain sebesar Rp 900 juta (+41%) dalam periode 10 tahun.',
    image: 'chart3.png',
    color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  },
  4: {
    title: 'Scatter Plot: 8 Kota Indonesia',
    description: 'Positioning 8 kota berdasarkan harga properti vs rental yield.',
    image: 'chart4.png',
    color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
  },
  5: {
    title: 'Dashboard Metrik Kelayakan',
    description: 'Comprehensive dashboard dengan 6 metrik investasi utama.',
    image: 'chart5.png',
    color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
  },
  6: {
    title: 'Scenario NPV Impact',
    description: 'Analisis skenario menunjukkan range NPV dari best case hingga worst case.',
    image: 'chart6.png',
    color: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
  },
  7: {
    title: 'Scenario DSCR Risk',
    description: 'Probability distribution DSCR per skenario menunjukkan likelihood bank approval.',
    image: 'chart7.png',
    color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  8: {
    title: 'Comparative 8 Kota',
    description: 'Multi-metrik comparison dengan normalized scores (0-100).',
    image: 'chart8.png',
    color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  9: {
    title: 'Sensitivity Parameter Ranking',
    description: 'Tornado chart menunjukkan property appreciation rate paling berpengaruh.',
    image: 'chart9.png',
    color: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
  },
  10: {
    title: 'Sensitivity Heatmap',
    description: 'Heatmap 2-dimensi menunjukkan kombinasi parameter NPV positif vs negatif.',
    image: 'chart10.png',
    color: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'
  },
  11: {
    title: 'Extended 8 Kota Analysis',
    description: 'Clustering kota ke dalam 3 tier: Premium, Secondary, Emerging.',
    image: 'chart11.png',
    color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
  }
};


// SESUDAH - dengan image:
chartCards.forEach(card => {
  card.addEventListener('click', () => {
      const chartId = card.getAttribute('data-chart');
      const chart = chartData[chartId];
      
      // Get image dari chartData atau dari HTML card
      const imageSrc = chart.image || card.querySelector('img')?.src;
      
      // Build HTML content dengan image
      const imageHtml = imageSrc ? `<img src="${imageSrc}" alt="${chart.title}" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;">` : '';
      
      modalBody.innerHTML = `
          <h2 style="color: #fff; margin-bottom: 20px; text-align: center;">${chart.title}</h2>
          <div style="text-align: center;">
              ${imageHtml}
          </div>
          <p style="color: #0f172a; line-height: 1.6; margin-top: 20px; text-align: center;">${chart.description}</p>
      `;
      modal.classList.add('active');
  });
});


// Close modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('.section, .hero');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Animate numbers on scroll
function animateNumber(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Initialize animations when elements come into view
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      if (element.classList.contains('score-value')) {
        const targetValue = parseInt(element.textContent);
        animateNumber(element, 0, targetValue, 1000);
      }
    }
  });
}, { threshold: 0.5 });

// Observe elements with numbers
const numberElements = document.querySelectorAll('.score-value');
numberElements.forEach(el => {
  if (el.textContent.match(/^\d+$/)) {
    animateOnScroll.observe(el);
  }
});

console.log('Portfolio website loaded successfully! 🚀');