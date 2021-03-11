import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import ViralLoadOverview from './ViralLoadOverview';
import ViralLoadOverallUptakeAndSuppressionBySex from './ViralLoadOverallUptakeAndSuppressionBySex';
import MedianTimeTo1stVlByYear from './MedianTimeTo1stVlByYear';
import MedianTimeTo1stVlByCounty from './MedianTimeTo1stVlByCounty';
import MedianTimeTo1stVlByPartner from './MedianTimeTo1stVlByPartner';
import ViralLoadUptakeBySex from './ViralLoadUptakeBySex';
import ViralLoadUptakeByAge from './ViralLoadUptakeByAge';
import ViralLoadUptakeByCounty from './ViralLoadUptakeByCounty';
import ViralLoadUptakeByPartner from './ViralLoadUptakeByPartner';
import ViralLoadOutcomesOverall from './ViralLoadOutcomesOverall';
import ViralLoadOutcomesBySex from './ViralLoadOutcomesBySex';
import ViralLoadSuppressionByAge from './ViralLoadSuppressionByAge';
import ViralLoadSuppressionByRegimen from './ViralLoadSuppressionByRegimen';
import ViralLoadSuppressionByYear from './ViralLoadSuppressionByYear';
import ViralLoadSuppressionByCounty from './ViralLoadSuppressionByCounty';
import ViralLoadSuppressionByPartner from './ViralLoadSuppressionByPartner';
import ViralLoadSuppressionByYear6Month from './ViralLoadSuppressionByYear6Month';
import ViralLoadSuppressionByYear12Month from './ViralLoadSuppressionByYear12Month';
import ViralLoadSuppressionByYear24Month from './ViralLoadSuppressionByYear24Month';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import classnames from 'classnames';
import ViralLoadOutcomesOverview from './ViralLoadOutcomesOverview';

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
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    Eligible for Viral Load => Patients who are current on treatment for more than 6 months
                                </li>
                                <li>
                                    Valid Viral Load => Patients who are current on treatment for more than 6 months and have a viral load result whose sample was taken within the last 14 months of the latest visit.
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                    <ViralLoadOverview />
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
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    Virally suppressed => Patients who are current on treatment with valid viral load results of &#60;400 copies/ml
                                </li>
                                <li>
                                    Low Level Viremia => Patients who are current on treatment with valid viral load results of 400 – 999 copies/ml
                                </li>
                                <li>
                                    High Viral Load => Patients who are current on treatment with valid viral load results of ≥1,000 copies/ml
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                    <ViralLoadOutcomesOverview />
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
