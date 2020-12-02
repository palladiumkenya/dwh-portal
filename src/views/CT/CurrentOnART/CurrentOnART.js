import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
// import TrendsInTxCurr from './TrendsInTxCurr';
import CurrentOnARTHeader from './CurrentOnARTHeader';
import CurrentOnARTFooter from './CurrentOnARTFooter';
import CurrentOnARTTxCurrByAgeSex from './CurrentOnARTTxCurrByAgeSex';
import CurrentOnARTTxCurrBySex from './CurrentOnARTTxCurrBySex';
import CurrentOnARTTxCurrDistributionByCounty from './CurrentOnARTTxCurrDistributionByCounty';
import CurrentOnARTTxCurrDistributionByPartner from './CurrentOnARTTxCurrDistributionByPartner';
import CurrentOnARTTxCurrByCounty from './CurrentOnARTTxCurrByCounty';
import CurrentOnARTTxCurrByPartner from './CurrentOnARTTxCurrByPartner';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/uiActions";
import CurrentOnARTTiles from './CurrentOnARTTiles';

const CurrentOnART = () => {
    const filters = useSelector(state => state.filters);
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txCurr') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>
            <CurrentOnARTHeader period={filters?.year}>&nbsp;</CurrentOnARTHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            {/* <TrendsInTxCurr /> */}
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p></p>
            <CurrentOnARTTiles />
            <div className="row">
                <div className="col-6">
                    <CurrentOnARTTxCurrBySex />
                </div>
                <div className="col-6">
                    <CurrentOnARTTxCurrByAgeSex />
                </div>
            </div>
            <p>&nbsp;</p>
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrDistributionByCounty />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrDistributionByPartner />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrByCounty />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrByPartner />
        </div>
    );
};

export default CurrentOnART;
