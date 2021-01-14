import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
// import TrendsInTxCurr from './TrendsInTxCurr';
import CurrentOnARTTxCurrByAgeSex from './CurrentOnARTTxCurrByAgeSex';
import CurrentOnARTTxCurrBySex from './CurrentOnARTTxCurrBySex';
import CurrentOnARTTxCurrDistributionByCounty from './CurrentOnARTTxCurrDistributionByCounty';
import CurrentOnARTTxCurrDistributionByPartner from './CurrentOnARTTxCurrDistributionByPartner';
import CurrentOnARTTxCurrByCounty from './CurrentOnARTTxCurrByCounty';
import CurrentOnARTTxCurrByPartner from './CurrentOnARTTxCurrByPartner';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import CurrentOnARTTiles from './CurrentOnARTTiles';

const CurrentOnART = () => {
    const branding = { title: "CURRENT ON ART", description: "OVERVIEW", overview: "Current on ART" };
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
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <CurrentOnARTTiles />
            {/* <TrendsInTxCurr />
            <SectionFooter overview={branding.overview}/> */}
            <Row>
                <Col>
                    <CurrentOnARTTxCurrBySex />
                </Col>
                <Col>
                    <CurrentOnARTTxCurrByAgeSex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <CurrentOnARTTxCurrDistributionByCounty />
            <SectionFooter overview={branding.overview}/>
            <CurrentOnARTTxCurrDistributionByPartner />
            <SectionFooter overview={branding.overview}/>
            <CurrentOnARTTxCurrByCounty />
            <SectionFooter overview={branding.overview}/>
            <CurrentOnARTTxCurrByPartner />
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default CurrentOnART;
