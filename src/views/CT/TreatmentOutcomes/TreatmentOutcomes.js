import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { ETL_DAY, LOADING_DELAY } from '../../../constants';
import Loading from './../../Shared/Loading';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from './../../Shared/UniversalFilter';
import moment from 'moment';
import classnames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import AppointmetKeeping from './AppointmetKeeping';
import QuaterlyIIT from './QuaterlyIIT';
import TrackingIIT from './TrackingIIT';
import { disableToDateFilter, enableToDateFilter } from '../../../actions/Shared/filterActions';

const SixMonthRetention = Loadable({ loader: () => import('./SixMonthRetention'), loading: Loading, delay: LOADING_DELAY });
const ThreeMonthRetention = Loadable({ loader: () => import('./ThreeMonthRetention'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesByAge = Loadable({ loader: () => import('./TreatmentOutcomesByAge'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesRetentionByAge = Loadable({ loader: () => import('./TreatmentOutcomesRetentionByAge'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesByCounty = Loadable({ loader: () => import('./TreatmentOutcomesByCounty'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesRetentionByCounty = Loadable({ loader: () => import('./TreatmentOutcomesRetentionByCounty'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesByPartner = Loadable({ loader: () => import('./TreatmentOutcomesByPartner'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesRetentionByPartner = Loadable({ loader: () => import('./TreatmentOutcomesRetentionByPartner'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesByPopulationType = Loadable({ loader: () => import('./TreatmentOutcomesByPopulationType'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesRetentionByPopulationType = Loadable({ loader: () => import('./TreatmentOutcomesRetentionByPopulationType'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesBySex = Loadable({ loader: () => import('./TreatmentOutcomesBySex'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesRetentionBySex = Loadable({ loader: () => import('./TreatmentOutcomesRetentionBySex'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesByYear = Loadable({ loader: () => import('./TreatmentOutcomesByYear'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesRetentionByYear = Loadable({ loader: () => import('./TreatmentOutcomesRetentionByYear'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesOverview = Loadable({ loader: () => import('./TreatmentOutcomesOverview'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesRetentionOverview = Loadable({ loader: () => import('./TreatmentOutcomesRetentionOverview'), loading: Loading, delay: LOADING_DELAY });
const TwelveMonthRetention = Loadable({ loader: () => import('./TwelveMonthRetention'), loading: Loading, delay: LOADING_DELAY });
const TwentyFourMonthRetention = Loadable({ loader: () => import('./TwentyFourMonthRetention'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomesUndocumentedByFacility = Loadable({ loader: () => import('./TreatmentOutcomesUndocumentedByFacility'), loading: Loading, delay: LOADING_DELAY });
const IITTracingContact = Loadable({ loader: () => import('./IITTracingContact'), loading: Loading, delay: LOADING_DELAY });
const IITTracingNoContact = Loadable({ loader: () => import('./IITTracingNoContact'), loading: Loading, delay: LOADING_DELAY });

const TreatmentOutcomes = () => {
    const branding = { title: "TREATMENT OUTCOMES", description: "OVERVIEW", overview: "Treatment Outcomes" };
    const [activeTab, setActiveTab] = useState('outcomes');
    const filters = useSelector(state => state.filters);
    const { active_tab } = useParams();
    const ctTab = active_tab
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === "treatmentOutcomes") {
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
        if (mini_tab === 'ContinuityOfTreatment') {
            dispatch(disableToDateFilter());
        } else {
            dispatch(enableToDateFilter());
        }
    },[mini_tab])

    useEffect(() => {
        if (!mini_tab) {
            history.push(`/hiv-treatment/treatmentOutcomes/${activeTab}`);
        }
    }, [mini_tab, history, activeTab]);

    if(!mini_tab){
        history.push(`/hiv-treatment/treatmentOutcomes/${activeTab}`);
    }

    const toggle = tab => {
        if (mini_tab !== tab) {
            history.push(`/hiv-treatment/treatmentOutcomes/${tab}`);
        }
    };
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title} />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>
            <Nav tabs>
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
                        TREATMENT OUTCOMES
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: mini_tab === 'retention',
                        })}
                        onClick={() => {
                            setActiveTab('retention');
                            toggle('retention');
                        }}
                    >
                        RETENTION
                    </NavLink>
                </NavItem>
{/*
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: mini_tab === 'ContinuityOfTreatment',
                        })}
                        onClick={() => {
                            setActiveTab('ContinuityOfTreatment');
                            toggle('ContinuityOfTreatment');
                        }}
                    >
                        CONTINUITY OF TREATMENT
                    </NavLink>
                </NavItem>
*/}
            </Nav>
            <TabContent activeTab={mini_tab}>
                <TabPane tabId="outcomes">
                    <Card>
                        <CardBody style={{ textAlign: 'center' }}>
                            <p>
                                <span style={{ fontSize: '1.2em' }}>
                                    Data displayed is for the patients started
                                    on ART between &nbsp;
                                    <strong>
                                        {filters.fromDate
                                            ? filters.fromDate.split(' - ')[0]
                                            : moment()
                                                  .startOf('month')
                                                  .subtract(13, 'month')
                                                  .add(ETL_DAY, 'days') // Because refresh happens on the 15th date should change on the ETL_DAYth day of the month
                                                  .format('MMM YYYY')}
                                    </strong>{' '}
                                    to &nbsp;
                                    <strong>
                                        {filters.toDate
                                            ? filters.toDate
                                            : moment()
                                                  .startOf('month')
                                                  .subtract(2, 'month')
                                                  .add(ETL_DAY, 'days')
                                                  .format('MMM YYYY')}
                                    </strong>
                                </span>
                            </p>
                            <p>
                                <span style={{ fontSize: '1.2em' }}>
                                    Outcomes are as at{' '}
                                    <strong>
                                        {moment()
                                            .startOf('month')
                                            .subtract(2, 'month')
                                            .add(ETL_DAY, 'days')
                                            .format('MMM YYYY')}
                                    </strong>
                                </span>
                            </p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    Started on ART =&gt; Number of patients
                                    whose documented ART start date is within
                                    the period selected (Default is last 12
                                    months).
                                </li>
                                <li>
                                    All outcomes are computed for patients who
                                    started ART within the period selected
                                    (Default is last 12 months). The Outcomes
                                    are computed and displayed for the last
                                    completed month
                                    <ol>
                                        <li>
                                            Current on ART =&gt; Number of
                                            patients whose documented ART start
                                            date is within the period selected
                                            (Default is last 12 months).
                                        </li>
                                        <li>
                                            Lost to Follow Up =&gt; A lost to
                                            follow up (LTFU) is a patient
                                            Started on ART who did not honor
                                            their last drug pick-up appointment
                                            and at least 30 days had elapsed
                                            since the last missed drug pick-up.
                                        </li>
                                        <li>
                                            Dead =&gt; A patient Started on ART
                                            whose outcome is documented in the
                                            EMR as "Died"
                                        </li>
                                        <li>
                                            Transfer out =&gt; A patient Started
                                            on ART whose outcome is documented
                                            in the EMR as transferred out
                                            (moved) to a different health
                                            facility to continue receiving
                                            continuum of care and have a
                                            corresponding outcome date.
                                        </li>
                                        <li>
                                            Stopped ART =&gt; A patient Started
                                            on ART whose outcome is documented
                                            in the EMR as "Stopped ART" and have
                                            a corresponding outcome date.
                                        </li>
                                    </ol>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>

                    <TreatmentOutcomesOverview />

                    <Row>
                        <Col className={'col-12'}>
                            <TreatmentOutcomesBySex />
                        </Col>
                        {/*<Col className={"col-6"}>*/}
                        {/*    <TreatmentOutcomesByPopulationType />*/}
                        {/*</Col>*/}
                    </Row>

                    <SectionFooter overview={branding.overview} />
                    <TreatmentOutcomesByAge />
                    <SectionFooter overview={branding.overview} />
                    <TreatmentOutcomesByYear />
                    <SectionFooter overview={branding.overview} />
                    <TreatmentOutcomesByCounty />
                    <SectionFooter overview={branding.overview} />
                    <TreatmentOutcomesByPartner />
                    <SectionFooter overview={branding.overview} />
                    {/*<ThreeMonthRetention />
                    <SectionFooter overview={branding.overview}/>}
                    <SixMonthRetention />
                    <SectionFooter overview={branding.overview}/>
                    <TwelveMonthRetention />
                    <SectionFooter overview={branding.overview}/>
                    <TwentyFourMonthRetention />
                    <SectionFooter overview={branding.overview}/>*/}
                    <TreatmentOutcomesUndocumentedByFacility />
                    <SectionFooter overview={branding.overview} />
                </TabPane>

                <TabPane tabId="retention">
                    <Card>
                        <CardBody style={{ textAlign: 'center' }}>
                            <p>
                                <span style={{ fontSize: '1.2em' }}>
                                    Data displayed is for the patients started
                                    on ART between &nbsp;
                                    <strong>
                                        {filters.fromDate
                                            ? filters.fromDate
                                            : moment()
                                                  .startOf('month')
                                                  .subtract(12, 'month')
                                                  .format('MMM YYYY')}
                                    </strong>{' '}
                                    to &nbsp;
                                    <strong>
                                        {filters.toDate
                                            ? filters.toDate
                                            : moment()
                                                  .startOf('month')
                                                  .subtract(1, 'month')
                                                  .format('MMM YYYY')}
                                    </strong>
                                </span>
                            </p>
                            <p>
                                <span style={{ fontSize: '1.2em' }}>
                                    Outcomes are as at{' '}
                                    <strong>
                                        {moment()
                                            .startOf('month')
                                            .subtract(1, 'month')
                                            .format('MMM YYYY')}
                                    </strong>
                                </span>
                            </p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    Net Cohort =&gt; Number of patients whose
                                    documented ART start date is within the
                                    period selected (Default is last 12 months).
                                    This computed as "Started on ART" less
                                    "Stopped ART" and "Transfer Out"
                                </li>
                                <li>
                                    All outcomes are computed for patients who
                                    started ART within the period selected
                                    (Default is last 12 months). The Outcomes
                                    are computed and displayed for the last
                                    completed month
                                </li>
                                <li>
                                    Current on ART =&gt; Number of adults and
                                    children currently receiving ART including
                                    those who have missed their appointment and
                                    30 days have not passed since the last
                                    missed appointment. Assumptions on this
                                    computation can be found under Current on
                                    ART tab.
                                </li>
                                <li>
                                    Lost to Follow Up =&gt; A lost to follow up
                                    (LTFU) is a patient Started on ART who did
                                    not honor their last drug pick-up
                                    appointment and at least 30 days had elapsed
                                    since the last missed drug pick-up.
                                </li>
                                <li>
                                    Dead =&gt; A patient Started on ART whose
                                    outcome is documented in the EMR as "Died"
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                    <TreatmentOutcomesRetentionOverview />
                    <Row>
                        <Col className={'col-12'}>
                            <TreatmentOutcomesRetentionBySex />
                        </Col>
                        {
                            // Request to hide population type charts
                        }
                        {/*<Col className={"col-6"}>*/}
                        {/*    <TreatmentOutcomesRetentionByPopulationType />*/}
                        {/*</Col>*/}
                    </Row>
                    <SectionFooter overview={branding.overview} />
                    <TreatmentOutcomesRetentionByAge />
                    <SectionFooter overview={branding.overview} />
                    <TreatmentOutcomesRetentionByYear />
                    <SectionFooter overview={branding.overview} />
                    <TreatmentOutcomesRetentionByCounty />
                    <SectionFooter overview={branding.overview} />
                    <TreatmentOutcomesRetentionByPartner />
                    <SectionFooter overview={branding.overview} />
                    <Card>
                        <CardBody style={{ textAlign: 'center' }}>
                            <p>
                                <span style={{ fontSize: '1.2em' }}>
                                    <strong>
                                        RETENTION BY YEAR OF ART START
                                    </strong>
                                </span>
                            </p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Indicator Definitions</CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    {
                                        'Started on ART => Number of patients whose documented ART start date is in the specified year.'
                                    }
                                </li>
                                <li>
                                    {
                                        'Net Cohort =>Number of patients whose documented ART start date is in the specified year. This computed as "Started on ART" less "Stopped ART" and "Transfer Out"'
                                    }
                                </li>
                                <li>
                                    {
                                        'Retention Outcomes are computed as at a point in time (e.g. 3/6/12/18 months after ART Start) for patients who started ART in the specified Year'
                                    }
                                </li>
                                <li>
                                    {
                                        'Active and Retained => Number of adults and children who were receiving ART at a point in time(e.g. 3/6/12/18 months after ART Start) including those who have missed their appointment and 30 days had not passed since the last missed appointment.'
                                    }
                                </li>
                                <li>
                                    Retention = Active and Retained / Net Cohort
                                    e.g. 3 Month Retention = Active and Retained
                                    at 3 months / Net Cohort at 3 months
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                    <ThreeMonthRetention />
                    <SectionFooter overview={branding.overview} />
                    <SixMonthRetention />
                    <SectionFooter overview={branding.overview} />
                    <TwelveMonthRetention />
                    <SectionFooter overview={branding.overview} />
                    <TwentyFourMonthRetention />
                    <SectionFooter overview={branding.overview} />
                    {/*<TreatmentOutcomesUndocumentedByFacility />
                    <SectionFooter overview={branding.overview}/>*/}
                </TabPane>
{/*
                <TabPane tabId={'ContinuityOfTreatment'}>
                    <AppointmetKeeping />
                    <SectionFooter />
                    <QuaterlyIIT />
                    <SectionFooter />
                    <TrackingIIT />
                    <SectionFooter />
                    <IITTracingContact />
                    <SectionFooter />
                    <IITTracingNoContact />
                    <SectionFooter />
                </TabPane>
*/}
            </TabContent>
        </div>
    );

};

export default TreatmentOutcomes;
