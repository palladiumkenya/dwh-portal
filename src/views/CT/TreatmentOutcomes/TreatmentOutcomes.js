import React, { useState } from 'react';
import CTFilter from '../../Shared/CTFilter';
import TreatmentOutcomesHeader from './TreatmentOutcomesHeader';
import TreatmentOutcomesFooter from './TreatmentOutcomesFooter';
import TreatmentOutcomesOverall from './TreatmentOutcomesOverall';
import TreatmentOutcomesBySex from './TreatmentOutcomesBySex';
import TreatmentOutcomesByAge from './TreatmentOutcomesByAge';
import TreatmentOutcomesByYear from './TreatmentOutcomesByYear';
import TreatmentOutcomesByCounty from './TreatmentOutcomesByCounty';
import TreatmentOutcomesByPartner from './TreatmentOutcomesByPartner';
import ThreeMonthRetention from './ThreeMonthRetention';
import SixMonthRetention from './SixMonthRetention';
import TwelveMonthRetention from './TwelveMonthRetention';
import TwentyFourMonthRetention from './TwentyFourMonthRetention';

const TreatmentOutcomes = () => {
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
            <TreatmentOutcomesHeader></TreatmentOutcomesHeader>
            <CTFilter onFilterChange={updateGlobalFilter} />
            <p></p>
            <div className="row">
                <div className="col-6">
                    <TreatmentOutcomesOverall globalFilter={globalFilter}/>
                </div>
                <div className="col-6">
                    <TreatmentOutcomesBySex globalFilter={globalFilter}/>
                </div>
            </div>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByAge globalFilter={globalFilter}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByYear globalFilter={globalFilter}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByCounty globalFilter={globalFilter}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByPartner globalFilter={globalFilter}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><ThreeMonthRetention globalFilter={globalFilter}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><SixMonthRetention globalFilter={globalFilter}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TwelveMonthRetention globalFilter={globalFilter}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TwentyFourMonthRetention globalFilter={globalFilter}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default TreatmentOutcomes;
