/**
 * YuWen · Personal Website
 * Real-time Clock & Dynamic Greeting Engine
 */

(function () {
  'use strict';

  // DOM Elements
  const els = {
    clockTime: document.getElementById('clock-time'),
    clockAmpm: document.getElementById('clock-ampm'),
    dateDay: document.getElementById('date-day'),
    dateFull: document.getElementById('date-full'),
    greetingText: document.getElementById('hero-greeting-text'),
    footerYear: document.getElementById('footer-year')
  };

  /**
   * Real-Time Clock & Calendar Engine
   */
  function updateClock() {
    const now = new Date();

    // 12-hour format with AM/PM
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const parts = timeStr.split(' ');
    const rawTime = parts[0];
    const ampm = parts[1] || '';

    if (els.clockTime) els.clockTime.textContent = rawTime;
    if (els.clockAmpm) els.clockAmpm.textContent = ampm;

    // Day of the week and full date
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const fullDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    if (els.dateDay) els.dateDay.textContent = dayName;
    if (els.dateFull) els.dateFull.textContent = fullDate;
    if (els.footerYear) els.footerYear.textContent = now.getFullYear();
  }

  /**
   * Time-of-day Dynamic Greeting
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
      els.greetingText.textContent = `${greeting}, welcome to my space`;
    }
  }

  /**
   * Initialize on DOM ready
   */
  function init() {
    updateClock();
    updateGreeting();
    setInterval(updateClock, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
