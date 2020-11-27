import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { enableStickyFilter, disableStickyFilter } from "../../../actions/uiActions";

const TreatmentOutcomes = () => {
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'tOut') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <TreatmentOutcomesHeader></TreatmentOutcomesHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <TreatmentOutcomesOverall />
                </div>
                <div className="col-6">
                    <TreatmentOutcomesBySex />
                </div>
            </div>
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByAge />
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByYear />
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByCounty />
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TreatmentOutcomesByPartner />
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><ThreeMonthRetention />
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><SixMonthRetention />
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TwelveMonthRetention />
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TwentyFourMonthRetention />
            <hr/><TreatmentOutcomesFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default TreatmentOutcomes;
