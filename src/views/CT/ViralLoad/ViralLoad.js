import React, { useEffect, useState } from 'react';
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
import { useHistory, useParams } from 'react-router-dom';

const ViralLoadOverview = Loadable({ loader: () => import('./ViralLoadOverview'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadOverallUptakeAndSuppressionBySex = Loadable({ loader: () => import('./ViralLoadOverallUptakeAndSuppressionBySex'), loading: Loading, delay: LOADING_DELAY });
const ViralLoadOverallNonSuppressedVlTest = Loadable({ loader: () => import('./ViralLoadOverallNonSuppressedVlTest'), loading: Loading, delay: LOADING_DELAY });
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
const ViralLoadOutcomesHvlByFacility = Loadable({ loader: () => import('./ViralLoadOutcomesHvlByFacility'), loading: Loading, delay: LOADING_DELAY });

const ViralLoad = () => {
    const branding = { title: "VIRAL LOAD", description: "OVERVIEW", overview: "Viral Load Monitoring" };
    const [activeTab, setActiveTab] = useState('uptake');
    const { active_tab } = useParams();
    const ctTab = active_tab
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

    const { mini_tab } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!mini_tab) {
            history.push(`/hiv-treatment/vl/${activeTab}`);
        }
    }, [activeTab, history, mini_tab]);

    if(!mini_tab){
        history.push(`/hiv-treatment/vl/${activeTab}`);
    }

    const toggle = tab => {
        if (mini_tab !== tab) {
            history.push(`/hiv-treatment/vl/${tab}`);
        }
    };

    return (
        <div className="animated fadeIn">
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: mini_tab === 'uptake',
                        })}
                        onClick={() => {
                            setActiveTab('uptake');
                            toggle('uptake');
                        }}
                    >
                        VIRAL LOAD UPTAKE
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: mini_tab === 'outcomes',
                        })}
                        onClick={() => {
                            setActiveTab('outcomes');
                            toggle('outcomes');
                        }}
                    >
                        VIRAL LOAD OUTCOMES
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: mini_tab === 'unsuppressed',
                        })}
                        onClick={() => {
                            setActiveTab('unsuppressed');
                            toggle('unsuppressed');
                        }}
                    >
                        VIRAL LOAD OUTCOMES UNSUPPRESSED
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={mini_tab}>
                <TabPane tabId="uptake">
                    <SectionHeader title={branding.title + ' UPTAKE'} />
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    Eligible for Viral Load =&gt; Patients who
                                    are current on treatment for more than 3
                                    months.
                                </li>
                                <li>
                                    Valid Viral Load =&gt; 0 - 24 Years (New) -
                                    6 months from Viral load date 25 Years and
                                    Older (New) - 12 months from Viral load date.
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
                    <SectionFooter overview={branding.overview} />
                    <MedianTimeTo1stVlByCounty />
                    <SectionFooter overview={branding.overview} />
                    <MedianTimeTo1stVlByPartner />
                    <SectionFooter overview={branding.overview} />
                    <Row>
                        <Col sm={4}>
                            <ViralLoadUptakeBySex />
                        </Col>
                        <Col sm={8}>
                            <ViralLoadUptakeByAge />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadUptakeByCounty />
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadUptakeByPartner />
                    <SectionFooter overview={branding.overview} />
                </TabPane>
                <TabPane tabId="outcomes">
                    <SectionHeader title={branding.title + ' OUTCOMES'} />
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    LDL =&gt; Patients who are current on
                                    treatment with valid viral load results of
                                    &lt;50 copies/ml
                                </li>
                                <li>
                                    Low Risk LLV =&gt; Patients who are current
                                    on treatment with valid viral load results
                                    of 50 – 199 copies/ml
                                </li>
                                <li>
                                    High Risk LLV =&gt; Patients who are
                                    current on treatment with valid viral load
                                    results of 200 – 999 copies/ml
                                </li>
                                <li>
                                    UNSUPPRESSED =&gt; Patients who are current
                                    on treatment with valid viral load results
                                    of ≥1,000 copies/ml
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
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadSuppressionByAge />
                    <SectionFooter overview={branding.overview} />
                    <Row>
                        <Col sm={4}>
                            <ViralLoadSuppressionByRegimen />
                        </Col>
                        <Col sm={8}>
                            <ViralLoadSuppressionByYear />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadSuppressionByCounty />
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadSuppressionByPartner />
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadSuppressionByYear6Month />
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadSuppressionByYear12Month />
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadSuppressionByYear24Month />
                    <SectionFooter overview={branding.overview} />
                </TabPane>
                <TabPane tabId="unsuppressed">
                    <SectionHeader
                        title={branding.title + ' OUTCOMES UNSUPPRESSED'}
                    />
                    <ViralLoadOverallNonSuppressedVlTest />
                    <SectionFooter overview={branding.overview} />
                    <ViralLoadOutcomesHvlByFacility />
                    <SectionFooter overview={branding.overview} />
                </TabPane>
            </TabContent>
        </div>
    );

};

export default ViralLoad;
