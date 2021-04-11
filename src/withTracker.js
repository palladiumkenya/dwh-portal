import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { GA_TRACKING_ID } from "./constants";

ReactGA.initialize(GA_TRACKING_ID);

export default (WrappedComponent, options = {}) => {
    const trackPage = page => {
        ReactGA.set({
            page,
            ...options
        });
        ReactGA.pageview(page);
    };

    const HOC = props => {
        useEffect(() => trackPage(props.location.pathname), [
            props.location.pathname
        ]);

        return <WrappedComponent {...props} />;
    };

    return HOC;
};