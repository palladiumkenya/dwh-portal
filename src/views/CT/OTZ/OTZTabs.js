import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
const OtzEnrollmentAmongAlhivOnArtBySex = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtBySex'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentAmongAlhivOnArtByAge = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtByAge'), loading: Loading, delay: LOADING_DELAY });
const OtzEnrollmentAmongAlhivOnArtByCounty = Loadable({ loader: () => import('./OtzEnrollmentAmongAlhivOnArtByCounty'), loading: Loading, delay: LOADING_DELAY });

const OTZTabs = () => {
    const [activeTab, setActiveTab] = useState('otz_enrollment');

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'otz_enrollment' })} onClick={() => { setActiveTab('otz_enrollment') }}>OTZ ENROLLMENT</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'otz_outcomes' })} onClick={() => { setActiveTab('otz_outcomes') }}>OTZ OUTCOMES</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
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
                </TabPane>
                <TabPane tabId={"otz_outcomes"}>

                </TabPane>
            </TabContent>
        </div>
    );
};

export default OTZTabs;
