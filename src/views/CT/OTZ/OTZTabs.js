import React, { useEffect, useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { useHistory, useParams } from 'react-router-dom';
import OTZCALHIVByAgeSex from './OTZCALHIVByAgeSex';
import OTZByAgeSex from './OTZByAgeSex';
import { Card, CardBody, CardHeader } from 'reactstrap';

const OtzEnrollmentAmongAlhivOnArtBySex = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtBySex'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentAmongAlhivOnArtByAge = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtByAge'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentAmongAlhivOnArtByCounty = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtByCounty'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentTrends = Loadable({
    loader: () => import('./OtzEnrollmentTrends'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OVCDistributionOfCALHIVByAgeSex = Loadable({ loader: () => import('../OVC/OVCDistributionOfCALHIVByAgeSex'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentAmongAlhivOnArtByPartner = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtByPartner'), loading: Loading, delay: LOADING_DELAY });
const OtzNotEnrolledAmongAlhivOnArtByCounty = Loadable({
    loader: () => import('./OtzNotEnrolledAmongAlhivOnArtByCounty'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OtzNotEnrolledAmongAlhivOnArtByPartner = Loadable({
    loader: () => import('./OtzNotEnrolledAmongAlhivOnArtByPartner'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OtzAlhivWithBaselineVl = Loadable({
    loader: () => import('./OtzAlhivWithBaselineVl'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const VLUptakeAmongAlHivEnrolledInOtzBySex = Loadable({ loader: () => import('./vlUptakeAmongAlHivEnrolledInOtzBySex'), loading: Loading, delay: LOADING_DELAY });
const VlUptakeAmongAlHivEnrolledInOTZByAge = Loadable({ loader: () => import('./VlUptakeAmongAlHivEnrolledInOTZByAge'), loading: Loading, delay: LOADING_DELAY });
const VlUptakeAmongAlHivEnrolledInOTZByCounty = Loadable({ loader: () => import('./VlUptakeAmongAlHivEnrolledInOTZByCounty'), loading: Loading, delay: LOADING_DELAY });
const VlUptakeAmongAlHivEnrolledInOTZByPartner = Loadable({ loader: () => import('./VlUptakeAmongAlHivEnrolledInOTZByPartner'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTraining = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTraining'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByCounty = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByCounty'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByPartner = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByPartner'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesAmongAlhivWithBaselineVl = Loadable({ loader: () => import('./OtzOutcomesAmongAlhivWithBaselineVl'), loading: Loading, delay: LOADING_DELAY });
const OtzAlhivWithReSuppression = Loadable({
    loader: () => import('./OtzAlhivWithReSuppression'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OtzOutcomesAmongAlhivWithReSuppression = Loadable({ loader: () => import('./OtzOutcomesAmongAlhivWithReSuppression'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesAmongAlhivWithSustainedSuppression = Loadable({ loader: () => import('./OtzOutcomesAmongAlhivWithSustainedSuppression'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByGender = Loadable({ loader: () => import('./OtzOutcomesByGender'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByPopulationType = Loadable({ loader: () => import('./OtzOutcomesByPopulationType'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByAgeGroup = Loadable({ loader: () => import('./OtzOutcomesByAgeGroup'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByYearOfArtStart = Loadable({ loader: () => import('./OtzOutcomesByYearOfArtStart'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByCounty = Loadable({ loader: () => import('./OtzOutcomesByCounty'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByPartner = Loadable({ loader: () => import('./OtzOutcomesByPartner'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingMales = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingMales'), loading: Loading, delay: LOADING_DELAY });
const OtzVlSuppressionNotEnrolledByPartner = Loadable({
    loader: () => import('./OtzVlSuppressionNotEnrolledByPartner'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OtzVlSuppressionNotEnrolledByCounty = Loadable({
    loader: () => import('./OtzVlSuppressionNotEnrolledByCounty'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingFemales = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingFemales'), loading: Loading, delay: LOADING_DELAY });

const OtzVlSuppressionBySex = Loadable({ loader: () => import('./OtzVlSuppressionBySex'), loading: Loading, delay: LOADING_DELAY });
const OtzVlSuppressionBySexNotEnrolled = Loadable({
    loader: () => import('./OtzVlSuppressionBySexNotEnrolled'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OtzVlSuppressionByAge = Loadable({ loader: () => import('./OtzVlSuppressionByAge'), loading: Loading, delay: LOADING_DELAY });
const OtzVlSuppressionByAgeNotEnrolled = Loadable({
    loader: () => import('./OtzVlSuppressionByAgeNotEnrolled'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const OtzVlSuppressionByCounty = Loadable({ loader: () => import('./OtzVlSuppressionByCounty'), loading: Loading, delay: LOADING_DELAY });
const OtzVlSuppressionByPartner = Loadable({ loader: () => import('./OtzVlSuppressionByPartner'), loading: Loading, delay: LOADING_DELAY });

const OTZOverview = Loadable({
    loader: () => import('./OTZOverview'),
    loading: Loading,
    delay: LOADING_DELAY,
});

const OTZTabs = () => {
    const [activeTab, setActiveTab] = useState('otz_enrollment');

    const { mini_tab } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!mini_tab) {
            history.push(`/hiv-treatment/otz/${activeTab}`);
        }
    }, [activeTab, history, mini_tab]);

    if(!mini_tab){
        history.push(`/hiv-treatment/otz/${activeTab}`);
    }

    const toggle = tab => {
        if (mini_tab !== tab) {
            history.push(`/hiv-treatment/otz/${tab}`);
        }
    };

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: mini_tab === 'otz_enrollment',
                        })}
                        onClick={() => {
                            setActiveTab('otz_enrollment');
                            toggle('otz_enrollment');
                        }}
                    >
                        OTZ ENROLLMENT
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: mini_tab === 'otz_management',
                        })}
                        onClick={() => {
                            setActiveTab('otz_management');
                            toggle('otz_management');
                        }}
                    >
                        MANAGEMENT OF ALHIV ON ART
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: mini_tab === 'otz_outcomes',
                        })}
                        onClick={() => {
                            setActiveTab('otz_outcomes');
                            toggle('otz_outcomes');
                        }}
                    >
                        OUTCOMES AMONG ALHIV ON ART
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={mini_tab}>
                <TabPane tabId="otz_enrollment">
                    <OTZOverview />
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>
                                    <strong>
                                        Adolescents Current on ART &#8594;
                                    </strong>{' '}
                                    Number of adolescents (10-24 years)
                                    currently receiving ART including those who
                                    have missed their appointment and 30 days
                                    have not passed since the last missed
                                    appointment.
                                </li>
                                <li>
                                    <strong>Valid Viral Load &#8594;</strong>{' '}
                                    Adolescents on OTZ (10-24 years) current on
                                    treatment for more than 3 months and have a
                                    viral load result whose sample was taken
                                    within the last 6 months of the latest
                                    visit.
                                </li>
                                <li>
                                    <strong>Virally suppressed &#8594;</strong>{' '}
                                    Adolescents on OTZ (10-24 years) who are
                                    current on treatment with valid viral load
                                    results of &#60;200 copies/ml.
                                </li>
                                <li>
                                    <strong>LDL &#8594;</strong>{' '}
                                    Adolescents on OTZ (10-24 years) who are
                                    current on treatment with valid viral load
                                    results of &lt;50 copies/ml
                                </li>
                                <li>
                                    <strong>Low Risk LLV &#8594;</strong>{' '}
                                    Adolescents on OTZ (10-24 years) who are
                                    current on treatment with valid viral load
                                    results of 50 – 199 copies/ml
                                </li>
                                <li>
                                    <strong>High Risk LLV &#8594;</strong>{' '}
                                    Adolescents on OTZ (10-24 years) who are
                                    current on treatment with valid viral load
                                    results of 200 – 999 copies/ml
                                </li>
                                <li>
                                    <strong>UNSUPPRESSED &#8594;</strong>{' '}
                                    Adolescents on OTZ (10-24 years) who are
                                    current on treatment with valid viral load
                                    results of &gt; 1,000 copies/ml
                                </li>
                                <li>
                                    <strong>Completed Training &#8594;</strong>{' '}
                                    Computed as having completed 7 out of 8 of
                                    the modules:OTZ_Orientation,OTZ_Participation,OTZ_MakingDecisions,OTZ_Transition,OTZ_Leadership,OTZ_TreatmentLiteracy,OTZ_SRH,OTZ_Beyond
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                    <Row>
                        <Col className={'col-6'}>
                            <OtzEnrollmentAmongAlhivOnArtBySex />
                        </Col>
                        <Col className={'col-6'}>
                            <OtzEnrollmentAmongAlhivOnArtByAge />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzEnrollmentTrends />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzEnrollmentAmongAlhivOnArtByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzEnrollmentAmongAlhivOnArtByPartner />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-6'}>
                            <OVCDistributionOfCALHIVByAgeSex />
                        </Col>
                        <Col className={'col-6'}>
                            <OTZByAgeSex />
                        </Col>
                    </Row>
                    {/* TODO:: 1 charts here: caregivers relationship */}
                    <OtzNotEnrolledAmongAlhivOnArtByCounty />
                    <OtzNotEnrolledAmongAlhivOnArtByPartner />
                    <Row>
                        <Col className={'col-4'}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTraining />
                        </Col>
                        <Col className={'col-4'}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingMales />
                        </Col>
                        <Col className={'col-4'}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingFemales />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByCounty />
                        </Col>
                        <Col className={'col-12'}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByPartner />
                        </Col>
                    </Row>
                    {/* TODO: New Table Here */}
                    {/* <Row>
                        <Col className={'col-6'}>
                            <VLUptakeAmongAlHivEnrolledInOtzBySex />
                        </Col>
                        <Col className={'col-6'}>
                            <VlUptakeAmongAlHivEnrolledInOTZByAge />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <VlUptakeAmongAlHivEnrolledInOTZByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <VlUptakeAmongAlHivEnrolledInOTZByPartner />
                        </Col>
                    </Row> */}
                </TabPane>
                <TabPane tabId="otz_management">
                    <Row>{/* TODO: 2 charts here on DTG col6 */}</Row>
                    <Row>{/* TODO: 2 charts here on MMD col6 */}</Row>
                    <Row>
                        <Col className={'col-6'}>
                            <OtzAlhivWithBaselineVl />
                        </Col>
                        <Col className={'col-6'}>
                            <OtzOutcomesAmongAlhivWithBaselineVl />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-6'}>
                            <OtzAlhivWithReSuppression />
                        </Col>
                        <Col className={'col-6'}>
                            <OtzOutcomesAmongAlhivWithReSuppression />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-6'}>
                            <OtzVlSuppressionBySex />
                        </Col>
                        <Col className={'col-6'}>
                            <OtzVlSuppressionBySexNotEnrolled />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-6'}>
                            <OtzVlSuppressionByAge />
                        </Col>
                        <Col className={'col-6'}>
                            <OtzVlSuppressionByAgeNotEnrolled />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzVlSuppressionByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzVlSuppressionNotEnrolledByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzVlSuppressionByPartner />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzVlSuppressionNotEnrolledByPartner />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId={'otz_outcomes'}>
                    <Row>
                        <Col className={'col-6'}>
                            <OtzOutcomesByGender />
                        </Col>
                        <Col className={'col-6'}>
                            <OtzOutcomesByAgeGroup />
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col className={'col-12'}>
                            <OtzOutcomesByYearOfArtStart />
                        </Col>
                    </Row> */}
                    <Row>
                        <Col className={'col-12'}>
                            <OtzOutcomesByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={'col-12'}>
                            <OtzOutcomesByPartner />
                        </Col>
                    </Row>
                    {/* TODO:: COMPARISON OUTCOMES CHART */}
                </TabPane>
            </TabContent>
        </div>
    );
};

export default OTZTabs;
