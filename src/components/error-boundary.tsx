import { Component, ReactNode } from "react";

export default class ErrorBoundary extends Component<{ children: ReactNode, fallback?: ReactNode }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  state: Readonly<{ hasError: boolean }> = {
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className="flex w-full h-full justify-center items-center p-8 text-center">{this.props.fallback ?? `Đã có lỗi xảy ra, vui lòng liên hệ BTC để khắc phục sự cố 🐞`}</div>;
    }

    return this.props.children;
  }
}