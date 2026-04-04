// src/utils/performance.js
export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  const reportMetric = (metric) => {
    if (import.meta.env.DEV) {
      console.log(`[Web Vital] ${metric.name}: ${Math.round(metric.value)}ms`);
    }
  };

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    reportMetric({ name: 'LCP', value: lastEntry.startTime });
  });

  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Safari fallback
  }

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      reportMetric({ name: 'FID', value: entry.processingStart - entry.startTime });
    });
  });

  try {
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // Fallback
  }

  // Cumulative Layout Shift
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    reportMetric({ name: 'CLS', value: clsValue * 1000 });
  });

  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // Fallback
  }
}

export function measurePageLoad() {
  window.addEventListener('load', () => {
    const timing = performance.getEntriesByType('navigation')[0];
    if (timing && import.meta.env.DEV) {
      console.log('[Performance]', {
        'DNS Lookup': `${Math.round(timing.domainLookupEnd - timing.domainLookupStart)}ms`,
        'TCP Connect': `${Math.round(timing.connectEnd - timing.connectStart)}ms`,
        'DOM Interactive': `${Math.round(timing.domInteractive)}ms`,
        'DOM Complete': `${Math.round(timing.domComplete)}ms`,
        'Page Load': `${Math.round(timing.loadEventEnd - timing.startTime)}ms`,
      });
    }
  });
}