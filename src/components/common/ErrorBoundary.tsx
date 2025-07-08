import React from "react";

export type ErrorBoundaryProps = {
    fallback: (err: any) => React.ReactNode;
    children: React.ReactNode;
};

export type ErrorBoundaryState = {
    _hasError: boolean;
    _error: any;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {_hasError: false, _error: null};
    }

    static getDerivedStateFromError(error: any) {
        return {_hasError: true, _error: error};
    }

    componentDidCatch(error: any, info: any) {
        console.error(error, info.componentStack);
    }

    render() {
        return this.state._hasError ?
            this.props.fallback(this.state._error) :
            this.props.children;
    }
}