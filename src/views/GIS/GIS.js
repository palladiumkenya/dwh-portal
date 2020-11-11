import React, { useState } from 'react';
import GISHeader from './GISHeader';
import GISFooter from './GISFooter';
import DsdStabilityStatusByCountyMap from './DsdStabilityStatusByCountyMap';
import TxCurrByProvinceMap from './TxCurrByProvinceMap';

const GIS = () => {
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <GISHeader></GISHeader>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <DsdStabilityStatusByCountyMap/>
                </div>
                <div className="col-6">
                    <TxCurrByProvinceMap/>
                </div>
            </div>
            <hr/><GISFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
        </div>
    );
};

export default GIS;
