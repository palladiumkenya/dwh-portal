import React, { useState } from 'react';
import CTFilter from '../../Shared/CTFilter';
import TBHIVHeader from './TBHIVHeader';
import TBHIVFooter from './TBHIVFooter';
import TBStatTrends from './TBStatTrends';
import IPTCompletionByAge from './IPTCompletionByAge';
import IPTUptake from './IPTUptake';
import TBActiveCaseFindingAdults from './TBActiveCaseFindingAdults';
import TBActiveCaseFindingChildren from './TBActiveCaseFindingChildren';
import HIVNegativeTB from './HIVNegativeTB';
import HIVTBCoinfected from './HIVTBCoinfected';

const TBHIV = () => {
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
            <TBHIVHeader></TBHIVHeader>
            <CTFilter onFilterChange={updateGlobalFilter} />
            <p></p><TBStatTrends globalFilter={globalFilter}/>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <TBActiveCaseFindingAdults globalFilter={globalFilter}/>
                </div>
                <div className="col-6">
                    <TBActiveCaseFindingChildren globalFilter={globalFilter}/>
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <HIVNegativeTB globalFilter={globalFilter}/>
                </div>
                <div className="col-6">
                    <HIVTBCoinfected globalFilter={globalFilter}/>
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <div className="row">
                <div className="col-4">
                    <IPTUptake globalFilter={globalFilter}/>
                </div>
                <div className="col-8">
                    <IPTCompletionByAge globalFilter={globalFilter}/>
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default TBHIV;
