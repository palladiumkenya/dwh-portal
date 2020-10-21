import React, { useState } from 'react';
import CTFilter from '../../Shared/CTFilter';
import VLHeader from './VLHeader';
import VLFooter from './VLFooter';
import VLOverallUptakeAndSuppression from './VLOverallUptakeAndSuppression';
import MedianTimeTo1stVL from './MedianTimeTo1stVL';
import MedianTimeTo1stVLByCounty from './MedianTimeTo1stVLByCounty';
import MedianTimeTo1stVLByPartner from './MedianTimeTo1stVLByPartner';
import VLUptakeBySex from './VLUptakeBySex';
import VLUptakeByAge from './VLUptakeByAge';
import VLUptakeByCounty from './VLUptakeByCounty';
import VLUptakeByPartner from './VLUptakeByPartner';

const VL = () => {
    const [globalFilter, setGlobalFilter] = useState({
        county: [],
        subCounty: [],
        facility: [],
        partner: [],
        year:`${new Date().getFullYear()}`,
        month: ''
    });

    const updateGlobalFilter = (selection) => {
        setGlobalFilter(selection);
    };

    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <VLHeader></VLHeader>
            <CTFilter onFilterChange={updateGlobalFilter} />
            <p></p>
            <div className="row">
                <div className="col-6">
                    <VLOverallUptakeAndSuppression globalFilter={globalFilter}/>
                </div>
                <div className="col-6">
                    <MedianTimeTo1stVL globalFilter={globalFilter}/>
                </div>
            </div>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeTo1stVLByCounty globalFilter={globalFilter}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeTo1stVLByPartner globalFilter={globalFilter}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-4">
                    <VLUptakeBySex globalFilter={globalFilter}/>
                </div>
                <div className="col-8">
                    <VLUptakeByAge globalFilter={globalFilter}/>
                </div>
            </div>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLUptakeByCounty globalFilter={globalFilter}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLUptakeByPartner globalFilter={globalFilter}/>
        </div>
    );

};

export default VL;
