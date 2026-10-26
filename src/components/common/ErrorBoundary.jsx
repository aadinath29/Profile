import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Catch WebGL or ChunkLoadError failures (T2-F28-03)
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught failure:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          data-testid="error-boundary-fallback"
          className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-surface/40 border border-border rounded-xl backdrop-blur-sm space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-[#C4704A]/10 border border-[#C4704A]/30 flex items-center justify-center text-[#C4704A]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-semibold text-text-primary">
              Visual Scene Offline
            </h3>
            <p className="text-sm text-text-muted max-w-sm font-sans">
              The 3D graphics canvas encountered a hardware or network glitch. Core content remains fully accessible.
            </p>
          </div>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-[#C4704A] border border-[#C4704A]/30 rounded-md hover:bg-[#C4704A]/10 transition-colors"
          >
            Retry Scene
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
