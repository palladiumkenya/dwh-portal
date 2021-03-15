import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import MedianTimeTo1stVlByCounty from './MedianTimeTo1stVlByCounty';
import MedianTimeTo1stVlByPartner from './MedianTimeTo1stVlByPartner';
import MedianTimeTo1stVlByYear from './MedianTimeTo1stVlByYear';
import React, { useState } from 'react';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from '../../Shared/UniversalFilter';
import ViralLoadOutcomesBySex from './ViralLoadOutcomesBySex';
import ViralLoadOutcomesIndicatorDefinition from './ViralLoadOutcomesIndicatorDefinition';
import ViralLoadOutcomesOverall from './ViralLoadOutcomesOverall';
import ViralLoadOutcomesOverview from './ViralLoadOutcomesOverview';
import ViralLoadOverallUptakeAndSuppressionBySex from './ViralLoadOverallUptakeAndSuppressionBySex';
import ViralLoadOverview from './ViralLoadOverview';
import ViralLoadSuppressionByAge from './ViralLoadSuppressionByAge';
import ViralLoadSuppressionByCounty from './ViralLoadSuppressionByCounty';
import ViralLoadSuppressionByPartner from './ViralLoadSuppressionByPartner';
import ViralLoadSuppressionByRegimen from './ViralLoadSuppressionByRegimen';
import ViralLoadSuppressionByYear from './ViralLoadSuppressionByYear';
import ViralLoadSuppressionByYear12Month from './ViralLoadSuppressionByYear12Month';
import ViralLoadSuppressionByYear24Month from './ViralLoadSuppressionByYear24Month';
import ViralLoadSuppressionByYear6Month from './ViralLoadSuppressionByYear6Month';
import ViralLoadUptakeByAge from './ViralLoadUptakeByAge';
import ViralLoadUptakeByCounty from './ViralLoadUptakeByCounty';
import ViralLoadUptakeByPartner from './ViralLoadUptakeByPartner';
import ViralLoadUptakeBySex from './ViralLoadUptakeBySex';
import ViralLoadUptakeIndicatorDefinition from './ViralLoadUptakeIndicatorDefinition';
import VisibilitySensor from 'react-visibility-sensor';

const ViralLoad = () => {
    const branding = { title: "VIRAL LOAD", description: "OVERVIEW", overview: "Viral Load Monitoring" };
    const [activeTab, setActiveTab] = useState('uptake');
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'vl') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'uptake' })} onClick={() => { setActiveTab('uptake') }}>VIRAL LOAD UPTAKE</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'outcomes' })} onClick={() => { setActiveTab('outcomes') }}>VIRAL LOAD OUTCOMES</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="uptake">
                    <SectionHeader title={branding.title + " UPTAKE"}/>
                    <ViralLoadOverview />
                    <ViralLoadUptakeIndicatorDefinition />
                    <Row>
                        <Col>
                            <ViralLoadOverallUptakeAndSuppressionBySex />
                        </Col>
                        <Col>
                            <MedianTimeTo1stVlByYear />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <MedianTimeTo1stVlByCounty />
                    <SectionFooter overview={branding.overview}/>
                    <MedianTimeTo1stVlByPartner />
                    <SectionFooter overview={branding.overview}/>
                    <Row>
                        <Col sm={4}>
                            <ViralLoadUptakeBySex />
                        </Col>
                        <Col sm={8}>
                            <ViralLoadUptakeByAge />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <ViralLoadUptakeByCounty />
                    <SectionFooter overview={branding.overview}/>
                    <ViralLoadUptakeByPartner />
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
                <TabPane tabId="outcomes">
                    <SectionHeader title={branding.title + " OUTCOMES"}/>
                    <ViralLoadOutcomesOverview />
                    <ViralLoadOutcomesIndicatorDefinition />
                    <Row>
                        <Col sm={4}>
                            <ViralLoadOutcomesOverall />
                        </Col>
                        <Col sm={8}>
                            <ViralLoadOutcomesBySex />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <ViralLoadSuppressionByAge />
                    <SectionFooter overview={branding.overview}/>
                    <Row>
                        <Col sm={4}>
                            <ViralLoadSuppressionByRegimen />
                        </Col>
                        <Col sm={8}>
                            <ViralLoadSuppressionByYear />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <ViralLoadSuppressionByCounty />
                    <SectionFooter overview={branding.overview}/>
                    <ViralLoadSuppressionByPartner />
                    <SectionFooter overview={branding.overview}/>
                    <ViralLoadSuppressionByYear6Month />
                    <SectionFooter overview={branding.overview}/>
                    <ViralLoadSuppressionByYear12Month />
                    <SectionFooter overview={branding.overview}/>
                    <ViralLoadSuppressionByYear24Month />
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
            </TabContent>
        </div>
    );

};

export default ViralLoad;
