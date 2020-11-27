import React from 'react';
import AdultsOptimization from './AdultsOptimization';
import CALHIVOptimization from './CALHIVOptimization';
import ARVOptimizationHeader from './ARVOptimizationHeader';
import ARVOptimizationFooter from './ARVOptimizationFooter';

const ARVOptimization = () => {
    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>
            <ARVOptimizationHeader/>
            <hr />
            <AdultsOptimization/>
            <hr />
            <CALHIVOptimization/>
            <hr />
            <ARVOptimizationFooter/>
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
        </div>
    );
};

export default ARVOptimization;
