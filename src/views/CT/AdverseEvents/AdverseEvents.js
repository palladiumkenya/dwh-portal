import React, { useState } from 'react';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { LOADING_DELAY } from "../../../constants";
import Loading from './../../Shared/Loading';
import SectionFooter from './../../Shared/SectionFooter';
import SectionHeader from './../../Shared/SectionHeader';
import UniversalFilter from './../../Shared/UniversalFilter';

const AdverseEventsActionsByDrugs = Loadable({ loader: () => import('./AdverseEventsActionsByDrugs'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsCauses = Loadable({ loader: () => import('./AdverseEventsCauses'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsClientsByAgeSexAdults = Loadable({ loader: () => import('./AdverseEventsClientsByAgeSexAdults'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsClientsByAgeSexChildren = Loadable({ loader: () => import('./AdverseEventsClientsByAgeSexChildren'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsOverviewAdults = Loadable({ loader: () => import('./AdverseEventsOverviewAdults'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsOverviewChildren = Loadable({ loader: () => import('./AdverseEventsOverviewChildren'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsProportionOfPlHivByTypeOfSuspectedCausativeDrugs = Loadable({ loader: () => import('./AdverseEventsProportionOfPlHivByTypeOfSuspectedCausativeDrugs'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsProportionOfPlHivWithAeRegimenChanged = Loadable({ loader: () => import('./AdverseEventsProportionOfPlHivWithAeRegimenChanged'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsProportionOfPlHivWithAeRegimenNotAltered = Loadable({ loader: () => import('./AdverseEventsProportionOfPlHivWithAeRegimenNotAltered'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsProportionOfPlHivWithAeRegimenStopped = Loadable({ loader: () => import('./AdverseEventsProportionOfPlHivWithAeRegimenStopped'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsProportionOfPlHivWithAeRelatedToArtOrSuspectedArt = Loadable({ loader: () => import('./AdverseEventsProportionOfPlHivWithAeRelatedToArtOrSuspectedArt'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsSeverityActions = Loadable({ loader: () => import('./AdverseEventsSeverityActions'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsSeverityGrading = Loadable({ loader: () => import('./AdverseEventsSeverityGrading'), loading: Loading, delay: LOADING_DELAY });
const AdverseEventsSeverityLevels = Loadable({ loader: () => import('./AdverseEventsSeverityLevels'), loading: Loading, delay: LOADING_DELAY });

const AdverseEvents = () => {
    const branding = { title: "ADVERSE EVENTS (AEs)", description: "OVERVIEW", overview: "Adverse Events (AEs)" };
    const [activeTab, setActiveTab] = useState('adults');
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'advEv') {
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
                    <NavLink className={classnames({ active: activeTab === 'adults' })} onClick={() => { setActiveTab('adults') }}>ADULTS</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'children' })} onClick={() => { setActiveTab('children') }}>CALHIV</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="adults">
                    <SectionHeader title={branding.title + " - ADULTS"}/>
                    <AdverseEventsOverviewAdults/>
                    <AdverseEventsClientsByAgeSexAdults/>
                    <SectionFooter overview={branding.overview}/>
                    <Row>
                        <Col><AdverseEventsSeverityGrading tab={'adult'} /></Col>
                        <Col><AdverseEventsSeverityActions tab={'adult'} /></Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <AdverseEventsSeverityLevels tab={'adult'} />
                    <SectionFooter overview={branding.overview}/>
                    <Row>
                        <Col>
                            <AdverseEventsCauses tab={'adult'} />
                        </Col>
                        <Col>
                            <AdverseEventsActionsByDrugs tab={'adult'} />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <AdverseEventsProportionOfPlHivByTypeOfSuspectedCausativeDrugs tab={'adult'} />
                    <SectionFooter overview={branding.overview}/>
                    <AdverseEventsProportionOfPlHivWithAeRelatedToArtOrSuspectedArt tab={'adult'} />
                    <SectionFooter overview={branding.overview}/>
                    <Row className={"col-12"}>
                        <Col className={"col-4"}>
                            <AdverseEventsProportionOfPlHivWithAeRegimenChanged />
                        </Col>
                        <Col className={"col-4"}>
                            <AdverseEventsProportionOfPlHivWithAeRegimenStopped />
                        </Col>
                        <Col className={"col-4"}>
                            <AdverseEventsProportionOfPlHivWithAeRegimenNotAltered />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
                <TabPane tabId="children">
                    <SectionHeader title={branding.title + " - CHILDREN"}/>
                    <AdverseEventsOverviewChildren/>
                    <AdverseEventsClientsByAgeSexChildren/>
                    <SectionFooter overview={branding.overview}/>
                    <Row>
                        <Col className={'col-6'}>
                            <AdverseEventsSeverityGrading tab={'calhiv'} />
                        </Col>
                        <Col className={'col-6'}>
                            <AdverseEventsSeverityActions tab={'calhiv'} />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <AdverseEventsSeverityLevels tab={'calhiv'} />
                    <SectionFooter overview={branding.overview}/>
                    <Row>
                        <Col className={'col-6'}>
                            <AdverseEventsCauses tab={'calhiv'} />
                        </Col>
                        <Col className={'col-6'}>
                            <AdverseEventsActionsByDrugs tab={'calhiv'} />
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default AdverseEvents;
