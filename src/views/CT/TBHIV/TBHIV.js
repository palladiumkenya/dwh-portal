import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import TBHIVHeader from './TBHIVHeader';
import TBHIVFooter from './TBHIVFooter';
import TBStatTrends from './TBStatTrends';
import IPTCompletionByAge from './IPTCompletionByAge';
import IPTUptake from './IPTUptake';
import TBActiveCaseFindingAdults from './TBActiveCaseFindingAdults';
import TBActiveCaseFindingChildren from './TBActiveCaseFindingChildren';
import HIVNegativeTB from './HIVNegativeTB';
import HIVTBCoinfected from './HIVTBCoinfected';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/uiActions";

const TBHIV = () => {
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'tbHiv') {
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
            <h3 style={{color: '#ff0000', textAlign: 'center', padding: '1em'}}>Please note that the data on this page is dummy data</h3>
            <TBHIVHeader></TBHIVHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <p></p><TBStatTrends />
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <TBActiveCaseFindingAdults />
                </div>
                <div className="col-6">
                    <TBActiveCaseFindingChildren />
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <HIVNegativeTB />
                </div>
                <div className="col-6">
                    <HIVTBCoinfected />
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <div className="row">
                <div className="col-4">
                    <IPTUptake />
                </div>
                <div className="col-8">
                    <IPTCompletionByAge />
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default TBHIV;
