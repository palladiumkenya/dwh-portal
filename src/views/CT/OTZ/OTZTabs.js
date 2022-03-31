import React, { useEffect, useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { useHistory, useParams } from 'react-router-dom';
const OtzEnrollmentAmongAlhivOnArtBySex = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtBySex'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentAmongAlhivOnArtByAge = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtByAge'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentAmongAlhivOnArtByCounty = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtByCounty'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentAmongAlhivOnArtByPartner = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtByPartner'), loading: Loading, delay: LOADING_DELAY });
const VLUptakeAmongAlHivEnrolledInOtzBySex = Loadable({ loader: () => import('./vlUptakeAmongAlHivEnrolledInOtzBySex'), loading: Loading, delay: LOADING_DELAY });
const VlUptakeAmongAlHivEnrolledInOTZByAge = Loadable({ loader: () => import('./VlUptakeAmongAlHivEnrolledInOTZByAge'), loading: Loading, delay: LOADING_DELAY });
const VlUptakeAmongAlHivEnrolledInOTZByCounty = Loadable({ loader: () => import('./VlUptakeAmongAlHivEnrolledInOTZByCounty'), loading: Loading, delay: LOADING_DELAY });
const VlUptakeAmongAlHivEnrolledInOTZByPartner = Loadable({ loader: () => import('./VlUptakeAmongAlHivEnrolledInOTZByPartner'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTraining = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTraining'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByCounty = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByCounty'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByPartner = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByPartner'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesAmongAlhivWithBaselineVl = Loadable({ loader: () => import('./OtzOutcomesAmongAlhivWithBaselineVl'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesAmongAlhivWithReSuppression = Loadable({ loader: () => import('./OtzOutcomesAmongAlhivWithReSuppression'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesAmongAlhivWithSustainedSuppression = Loadable({ loader: () => import('./OtzOutcomesAmongAlhivWithSustainedSuppression'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByGender = Loadable({ loader: () => import('./OtzOutcomesByGender'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByPopulationType = Loadable({ loader: () => import('./OtzOutcomesByPopulationType'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByAgeGroup = Loadable({ loader: () => import('./OtzOutcomesByAgeGroup'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByYearOfArtStart = Loadable({ loader: () => import('./OtzOutcomesByYearOfArtStart'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByCounty = Loadable({ loader: () => import('./OtzOutcomesByCounty'), loading: Loading, delay: LOADING_DELAY });
const OtzOutcomesByPartner = Loadable({ loader: () => import('./OtzOutcomesByPartner'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingMales = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingMales'), loading: Loading, delay: LOADING_DELAY });
const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingFemales = Loadable({ loader: () => import('./OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingFemales'), loading: Loading, delay: LOADING_DELAY });

const OtzVlSuppressionBySex = Loadable({ loader: () => import('./OtzVlSuppressionBySex'), loading: Loading, delay: LOADING_DELAY });
const OtzVlSuppressionByAge = Loadable({ loader: () => import('./OtzVlSuppressionByAge'), loading: Loading, delay: LOADING_DELAY });
const OtzVlSuppressionByCounty = Loadable({ loader: () => import('./OtzVlSuppressionByCounty'), loading: Loading, delay: LOADING_DELAY });
const OtzVlSuppressionByPartner = Loadable({ loader: () => import('./OtzVlSuppressionByPartner'), loading: Loading, delay: LOADING_DELAY });

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
                    <NavLink className={classnames({ active: mini_tab === 'otz_enrollment' })} onClick={() => { setActiveTab('otz_enrollment'); toggle("otz_enrollment") }}>OTZ ENROLLMENT</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'otz_outcomes' })} onClick={() => { setActiveTab('otz_outcomes'); toggle("otz_outcomes") }}>OTZ OUTCOMES</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={mini_tab}>
                <TabPane tabId="otz_enrollment">
                    <Row>
                        <Col className={"col-6"}>
                            <OtzEnrollmentAmongAlhivOnArtBySex />
                        </Col>
                        <Col className={"col-6"}>
                            <OtzEnrollmentAmongAlhivOnArtByAge />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzEnrollmentAmongAlhivOnArtByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzEnrollmentAmongAlhivOnArtByPartner />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-6"}>
                            <VLUptakeAmongAlHivEnrolledInOtzBySex />
                        </Col>
                        <Col className={"col-6"}>
                            <VlUptakeAmongAlHivEnrolledInOTZByAge />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <VlUptakeAmongAlHivEnrolledInOTZByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <VlUptakeAmongAlHivEnrolledInOTZByPartner />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-4"}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTraining />
                        </Col>
                        <Col className={"col-4"}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingMales />
                        </Col>
                        <Col className={"col-4"}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingFemales />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByCounty />
                        </Col>
                        <Col className={"col-12"}>
                            <OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByPartner />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId={"otz_outcomes"}>
                    <Row>
                        <Col className={"col-6"}>
                            <OtzOutcomesAmongAlhivWithBaselineVl />
                        </Col>

                        <Col className={"col-6"}>
                            <OtzOutcomesAmongAlhivWithReSuppression />
                        </Col>
                    </Row>
                    {/*<Row>
                        <Col className={"col-12"}>
                            <OtzOutcomesAmongAlhivWithSustainedSuppression />
                        </Col>
                    </Row>*/}
                    <Row>
                        <Col className={"col-6"}>
                            <OtzVlSuppressionBySex />
                        </Col>
                        <Col className={"col-6"}>
                            <OtzVlSuppressionByAge />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzVlSuppressionByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzVlSuppressionByPartner />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-6"}>
                            <OtzOutcomesByGender />
                        </Col>
                        <Col className={"col-6"}>
                            <OtzOutcomesByPopulationType />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzOutcomesByAgeGroup />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzOutcomesByYearOfArtStart />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzOutcomesByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <OtzOutcomesByPartner />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default OTZTabs;
