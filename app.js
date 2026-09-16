/**
 * YuWen · Personal Page & Real-Time Clock Engine
 */

(function () {
  'use strict';

  const PROFILE = {
    name: 'YuWen',
    initials: 'YW',
    location: 'Taiwan',
    timezoneLabel: 'Asia/Taipei (UTC+8)',
    utcOffset: '+8'
  };

  const THEME_STORAGE_KEY = 'yuwen_personal_theme';

  // DOM Elements
  const els = {
    navBrandName: document.getElementById('nav-display-name'),
    navBrandAvatar: document.getElementById('brand-avatar'),
    navLocationText: document.getElementById('nav-location-text'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),

    greetingText: document.getElementById('hero-greeting-text'),
    displayName: document.getElementById('display-name'),
    displayLocation: document.getElementById('display-location'),
    displayTimezone: document.getElementById('display-timezone'),
    avatarInitials: document.getElementById('avatar-initials'),

    liveClock: document.getElementById('live-clock'),
    clockTime: document.getElementById('clock-time'),
    clockAmpm: document.getElementById('clock-ampm'),
    dateDay: document.getElementById('date-day'),
    dateFull: document.getElementById('date-full'),
    metricLocation: document.getElementById('metric-location'),
    metricTimezone: document.getElementById('metric-timezone'),

    footerName: document.getElementById('footer-name'),
    footerYear: document.getElementById('footer-year'),
    toastContainer: document.getElementById('toast-container')
  };

  /**
   * Initialize Application
   */
  function init() {
    initTheme();
    renderProfile();
    initClock();
    updateGreeting();
    bindEvents();
  }

  /**
   * Theme Management (Dark / Light)
   */
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    localStorage.setItem(THEME_STORAGE_KEY, target);
    showToast(`Switched to ${target} mode`);
  }

  /**
   * Render User Details
   */
  function renderProfile() {
    if (els.navBrandName) els.navBrandName.textContent = PROFILE.name;
    if (els.navBrandAvatar) els.navBrandAvatar.textContent = PROFILE.initials;
    if (els.navLocationText) els.navLocationText.textContent = PROFILE.location;
    if (els.displayName) els.displayName.textContent = PROFILE.name;
    if (els.avatarInitials) els.avatarInitials.textContent = PROFILE.initials;
    if (els.displayLocation) els.displayLocation.textContent = PROFILE.location;
    if (els.displayTimezone) els.displayTimezone.textContent = `UTC${PROFILE.utcOffset}`;
    if (els.metricLocation) els.metricLocation.textContent = PROFILE.location;
    if (els.metricTimezone) els.metricTimezone.textContent = PROFILE.timezoneLabel;
    if (els.footerName) els.footerName.textContent = PROFILE.name;
  }

  /**
   * Real-Time Clock & Calendar Engine
   */
  function initClock() {
    const updateTime = () => {
      const now = new Date();

      // Format time with 2-digit hours, minutes, seconds
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const parts = timeStr.split(' ');
      const rawTime = parts[0];
      const ampm = parts[1] || '';

      if (els.liveClock) els.liveClock.textContent = timeStr;
      if (els.clockTime) els.clockTime.textContent = rawTime;
      if (els.clockAmpm) els.clockAmpm.textContent = ampm;

      // Calendar dates
      const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
      const fullDate = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      if (els.dateDay) els.dateDay.textContent = dayName;
      if (els.dateFull) els.dateFull.textContent = fullDate;
      if (els.footerYear) els.footerYear.textContent = now.getFullYear();
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  /**
   * Time-Based Greeting
   */
  function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    }

    if (els.greetingText) {
      els.greetingText.textContent = `${greeting}, ${PROFILE.name} · Taiwan`;
    }
  }

  /**
   * Toast Notifications
   */
  function showToast(message, duration = 2500) {
    if (!els.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;

    els.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  /**
   * Event Handlers
   */
  function bindEvents() {
    if (els.themeToggleBtn) {
      els.themeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
