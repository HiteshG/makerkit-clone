import type { ReactNode } from 'react';
import { Component } from 'react';

class ErrorBoundary extends Component<{
  fallback: ReactNode;
  children: ReactNode;
}> {
  readonly state = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
