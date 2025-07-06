// Preloader
window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

mobileMenuBtn.addEventListener('click', function() {
  // Toggle mobile menu
  navLinks.classList.toggle('mobile-active');
  navButtons.classList.toggle('mobile-active');
  
  // Toggle icon
  const icon = this.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
  
  // Toggle body scroll
  document.body.style.overflow = navLinks.classList.contains('mobile-active') ? 'hidden' : '';
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 992) {
      navLinks.classList.remove('mobile-active');
      navButtons.classList.remove('mobile-active');
      mobileMenuBtn.querySelector('i').classList.remove('fa-times');
      mobileMenuBtn.querySelector('i').classList.add('fa-bars');
      document.body.style.overflow = '';
    }
  });
});

// Close menu when resizing to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 992) {
    navLinks.classList.remove('mobile-active');
    navButtons.classList.remove('mobile-active');
    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    document.body.style.overflow = '';
  }
});

// Header scroll effect
window.addEventListener('scroll', function () {
  const header = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
});

backToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Market Chart
const ctx = document.getElementById('marketChart')?.getContext('2d');
if (ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'BTC Price (USD)',
        data: [29000, 32000, 40000, 38000, 42000, 45000, 39000],
        borderColor: '#6c5ce7',
        backgroundColor: 'rgba(108, 92, 231, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#6c5ce7',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#fff',
            font: {
              family: 'Inter'
            }
          }
        },
        tooltip: {
          backgroundColor: '#181824',
          titleColor: '#fff',
          bodyColor: '#b8b8c5',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          usePointStyle: true,
          callbacks: {
            label: function (context) {
              return ` $${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#b8b8c5'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#b8b8c5',
            callback: function (value) {
              return `$${value.toLocaleString()}`;
            }
          }
        }
      }
    }
  });
}

// Market Table Data
const marketData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 39000,
    change24h: -3.26,
    volume: 28450000000,
    marketCap: 760000000000,
    trend: 'down'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2895,
    change24h: -4.73,
    volume: 12500000000,
    marketCap: 350000000000,
    trend: 'down'
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    price: 1,
    change24h: -0.05,
    volume: 45000000000,
    marketCap: 83000000000,
    trend: 'down'
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    price: 398,
    change24h: -3.92,
    volume: 1200000000,
    marketCap: 65000000000,
    trend: 'down'
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 0.62,
    change24h: -5.71,
    volume: 2500000000,
    marketCap: 33000000000,
    trend: 'down'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 102,
    change24h: 2.45,
    volume: 1800000000,
    marketCap: 43000000000,
    trend: 'up'
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.38,
    change24h: -1.18,
    volume: 450000000,
    marketCap: 13000000000,
    trend: 'down'
  }
];

// Populate Market Table
const marketTable = document.querySelector('.market-table tbody');
if (marketTable) {
  marketData.forEach(coin => {
    const row = document.createElement('tr');

    const changeClass = coin.change24h >= 0 ? 'positive' : 'negative';
    const trendIcon = coin.change24h >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';

    row.innerHTML = `
      <td>
        <div class="coin-info">
          <span class="coin-name">${coin.name}</span>
          <span class="coin-symbol">${coin.symbol}</span>
        </div>
      </td>
      <td>$${coin.price.toLocaleString()}</td>
      <td class="${changeClass}">
        <i class="fas ${trendIcon}"></i> ${Math.abs(coin.change24h)}%
      </td>
      <td>$${(coin.volume / 1000000000).toFixed(2)}B</td>
      <td>$${(coin.marketCap / 1000000000).toFixed(2)}B</td>
      <td><button class="btn btn-outline btn-sm">Trade</button></td>
    `;

    marketTable.appendChild(row);
  });
}

// Market Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Filter table data based on tab
      const tab = this.getAttribute('data-tab');
      filterTable(tab);
    });
  });
}

function filterTable(tab) {
  const rows = document.querySelectorAll('.market-table tbody tr');

  rows.forEach(row => {
    const changeCell = row.querySelector('td:nth-child(3)');
    const changeValue = parseFloat(changeCell.textContent.match(/-?\d+\.\d+/)[0]);

    switch (tab) {
      case 'all':
        row.style.display = '';
        break;
      case 'gainers':
        row.style.display = changeValue >= 0 ? '' : 'none';
        break;
      case 'losers':
        row.style.display = changeValue < 0 ? '' : 'none';
        break;
      case 'volume':
        const volumeCell = row.querySelector('td:nth-child(4)');
        const volumeValue = parseFloat(volumeCell.textContent.replace(/[^0-9.]/g, ''));
        break;
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});