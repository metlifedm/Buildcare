// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Button from '@components/ui/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-dark-50 mb-4">
              Something Went Wrong
            </h1>
            <p className="text-dark-300 mb-8">
              We apologize for the inconvenience. An unexpected error has occurred.
              Please try refreshing the page.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                icon={RefreshCw}
                iconPosition="left"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
              <Link to="/">
                <Button variant="secondary" icon={Home} iconPosition="left">
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}