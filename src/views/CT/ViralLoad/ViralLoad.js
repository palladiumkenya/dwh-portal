import React, { useState } from 'react';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { LOADING_DELAY } from "../../../constants";
import Loading from '../../Shared/Loading';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from '../../Shared/UniversalFilter';

const ViralLoadOverview = Loadable({ loader: () => import('./ViralLoadOverview'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadOverallUptakeAndSuppressionBySex = Loadable({ loader: () => import('./ViralLoadOverallUptakeAndSuppressionBySex'), loading: Loading, delay: LOADING_DELAY });
const MedianTimeTo1stVlByYear = Loadable({ loader: () => import('./MedianTimeTo1stVlByYear'), loading: Loading, delay: LOADING_DELAY });
const MedianTimeTo1stVlByCounty = Loadable({ loader: () => import('./MedianTimeTo1stVlByCounty'), loading: Loading, delay: LOADING_DELAY });
const MedianTimeTo1stVlByPartner = Loadable({ loader: () => import('./MedianTimeTo1stVlByPartner'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadUptakeBySex = Loadable({ loader: () => import('./ViralLoadUptakeBySex'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadUptakeByAge = Loadable({ loader: () => import('./ViralLoadUptakeByAge'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadUptakeByCounty = Loadable({ loader: () => import('./ViralLoadUptakeByCounty'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadUptakeByPartner = Loadable({ loader: () => import('./ViralLoadUptakeByPartner'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadOutcomesOverall = Loadable({ loader: () => import('./ViralLoadOutcomesOverall'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadOutcomesBySex = Loadable({ loader: () => import('./ViralLoadOutcomesBySex'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadSuppressionByAge = Loadable({ loader: () => import('./ViralLoadSuppressionByAge'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadSuppressionByRegimen = Loadable({ loader: () => import('./ViralLoadSuppressionByRegimen'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadSuppressionByYear = Loadable({ loader: () => import('./ViralLoadSuppressionByYear'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadSuppressionByCounty = Loadable({ loader: () => import('./ViralLoadSuppressionByCounty'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadSuppressionByPartner = Loadable({ loader: () => import('./ViralLoadSuppressionByPartner'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadSuppressionByYear6Month = Loadable({ loader: () => import('./ViralLoadSuppressionByYear6Month'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadSuppressionByYear12Month = Loadable({ loader: () => import('./ViralLoadSuppressionByYear12Month'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadSuppressionByYear24Month = Loadable({ loader: () => import('./ViralLoadSuppressionByYear24Month'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadOutcomesOverview = Loadable({ loader: () => import('./ViralLoadOutcomesOverview'), loading: Loading, delay: LOADING_DELAY });

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
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>Eligible for Viral Load =&gt; Patients who are current on treatment for more than 6 months</li>
                                <li>Valid Viral Load =&gt; Patients who are current on treatment for more than 6 months and have a viral load result whose sample was taken within the last 14 months of the latest visit.</li>
                            </ul>
                        </CardBody>
                    </Card>
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
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>Virally suppressed =&gt; Patients who are current on treatment with valid viral load results of &lt;1000 copies/ml</li>
                                <li>High Viral Load =&gt; Patients who are current on treatment with valid viral load results of ≥1,000 copies/ml</li>
                                <li>Low Level Viremia =&gt; Patients who are current on treatment with valid viral load results of 400 – 999 copies/ml</li>
                            </ul>
                        </CardBody>
                    </Card>
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
