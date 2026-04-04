// src/components/layout/SkipToContent.jsx
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-6 focus:py-3 focus:bg-primary-400 focus:text-dark-950 focus:rounded-lg focus:font-semibold focus:shadow-elevated focus:outline-none"
    >
      Skip to main content
    </a>
  );
}