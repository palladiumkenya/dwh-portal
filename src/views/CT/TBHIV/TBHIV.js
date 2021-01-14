import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import TBStatTrends from './TBStatTrends';
import IPTCompletionByAge from './IPTCompletionByAge';
import IPTUptake from './IPTUptake';
import TBActiveCaseFindingAdults from './TBActiveCaseFindingAdults';
import TBActiveCaseFindingChildren from './TBActiveCaseFindingChildren';
import HIVNegativeTB from './HIVNegativeTB';
import HIVTBCoinfected from './HIVTBCoinfected';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const TBHIV = () => {
    const branding = { title: "TB/HIV - UPTAKE AND OUTCOMES", description: "OVERVIEW", overview: "TB/HIV - Uptake and Outcomes" };
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
            <h3 style={{color: '#ff0000', textAlign: 'center', padding: '1em'}}>Please note that the data on this page is dummy data</h3>
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <TBStatTrends />
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col>
                    <TBActiveCaseFindingAdults />
                </Col>
                <Col>
                    <TBActiveCaseFindingChildren />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col>
                    <HIVNegativeTB />
                </Col>
                <Col>
                    <HIVTBCoinfected />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col sm={4}>
                    <IPTUptake />
                </Col>
                <Col sm={8}>
                    <IPTCompletionByAge />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default TBHIV;
