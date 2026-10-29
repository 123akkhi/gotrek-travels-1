import React, { ErrorInfo, ReactNode } from "react";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Yatra App Error:", error, errorInfo);

    const isChunkOrInstanceError = 
      error?.message?.includes("Failed to fetch dynamically imported module") ||
      error?.message?.includes("ChunkLoadError") ||
      error?.message?.includes("Invalid hook call") ||
      error?.message?.includes("reading 'useState'") ||
      error?.message?.includes("reading 'use");

    if (isChunkOrInstanceError && typeof window !== "undefined") {
      const alreadyReloaded = sessionStorage.getItem("app_chunk_auto_reloaded") === "true";
      if (!alreadyReloaded) {
        sessionStorage.setItem("app_chunk_auto_reloaded", "true");
        window.location.reload();
      }
    }
  }

  private handleReset = () => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("app_chunk_auto_reloaded");
      sessionStorage.removeItem("chunk_retry_refreshed");
    }
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
    }
    window.location.reload();
  };

  private handleReturnHome = () => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("app_chunk_auto_reloaded");
      sessionStorage.removeItem("chunk_retry_refreshed");
    }
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
    window.location.href = "/";
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunkError = 
        this.state.error?.message?.includes("Failed to fetch dynamically imported module") ||
        this.state.error?.message?.includes("ChunkLoadError") ||
        this.state.error?.message?.includes("Invalid hook call") ||
        this.state.error?.message?.includes("reading 'useState'") ||
        this.state.error?.name === "ChunkLoadError";

      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-[#FDFBF7]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E6E2D3] shadow-lg space-y-5">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shadow-xs">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-[#1E293B]">
                {isChunkError ? "Network Connection Refresh" : "Temporary View Exception"}
              </h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                {isChunkError
                  ? "A module update was released or the network connection momentarily paused. Please refresh to load the latest high-altitude yatra itineraries."
                  : "A temporary display glitch occurred while rendering this page view. Your booked yatras, permits, and cached routes remain safe."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
              >
                <RefreshCw size={14} />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleReturnHome}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#F5F2ED] hover:bg-[#E6E2D3] text-[#1E293B] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-[#E6E2D3] cursor-pointer active:scale-95"
              >
                <Home size={14} />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
