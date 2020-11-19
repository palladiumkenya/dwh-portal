import React from 'react';
import GISHeader from './GISHeader';
import GISFooter from './GISFooter';
import DsdStabilityStatusByCountyMap from './DsdStabilityStatusByCountyMap';
import CountiesMap from './CountiesMap';
import TxCurrByProvinceMap from './TxCurrByProvinceMap';

const GIS = () => {
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <GISHeader></GISHeader>
            <p></p>
            <div className="row">
                <div className="col-4">
                    <DsdStabilityStatusByCountyMap/>
                </div>
                <div className="col-4">
                    <CountiesMap/>
                </div>
                <div className="col-4">
                    <TxCurrByProvinceMap/>
                </div>
            </div>
            <hr/><GISFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
        </div>
    );
};

export default GIS;
