import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
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

const TreatmentOutcomes = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.ctTab === 'tOut') {
            onGlobalFiltersChange({ ...globalFilters, stickyFilter: !isVisible});
        }
    }, [globalFilters, onGlobalFiltersChange]);
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <TreatmentOutcomesHeader></TreatmentOutcomesHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <TreatmentOutcomesOverall globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <TreatmentOutcomesBySex globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByAge globalFilters={globalFilters}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByYear globalFilters={globalFilters}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByCounty globalFilters={globalFilters}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByPartner globalFilters={globalFilters}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><ThreeMonthRetention globalFilters={globalFilters}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><SixMonthRetention globalFilters={globalFilters}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TwelveMonthRetention globalFilters={globalFilters}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TwentyFourMonthRetention globalFilters={globalFilters}/>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default TreatmentOutcomes;
