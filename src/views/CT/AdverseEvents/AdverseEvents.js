import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
import classnames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import AdverseEventsOverviewAdults from './AdverseEventsOverviewAdults';
import AdverseEventsOverviewChildren from './AdverseEventsOverviewChildren';
import AdverseEventsClientsByAgeSexAdults from './AdverseEventsClientsByAgeSexAdults';
import AdverseEventsClientsByAgeSexChildren from './AdverseEventsClientsByAgeSexChildren';
import AdverseEventsSeverityGrading from './AdverseEventsSeverityGrading';
import AdverseEventsSeverityActions from './AdverseEventsSeverityActions';
import AdverseEventsSeverityLevels from './AdverseEventsSeverityLevels';
import AdverseEventsCauses from './AdverseEventsCauses';
import AdverseEventsActionsByDrugs from './AdverseEventsActionsByDrugs';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import AdverseEventsProportionOfPlHivByTypeOfSuspectedCausativeDrugs
    from './AdverseEventsProportionOfPlHivByTypeOfSuspectedCausativeDrugs';
import AdverseEventsProportionOfPlHivWithAeRegimenChanged from './AdverseEventsProportionOfPlHivWithAeRegimenChanged';
import AdverseEventsProportionOfPlHivWithAeRelatedToArtOrSuspectedArt
    from './AdverseEventsProportionOfPlHivWithAeRelatedToArtOrSuspectedArt';
import AdverseEventsProportionOfPlHivWithAeRegimenStopped from './AdverseEventsProportionOfPlHivWithAeRegimenStopped';
import AdverseEventsProportionOfPlHivWithAeRegimenNotAltered
    from './AdverseEventsProportionOfPlHivWithAeRegimenNotAltered';
import AdverseEventsProportionOfPlHivOnArtWithAe from './AdverseEventsProportionOfPlHivOnArtWithAe';

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
                        <Col><AdverseEventsSeverityGrading/></Col>
                        <Col><AdverseEventsSeverityActions/></Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <AdverseEventsSeverityLevels />
                    <SectionFooter overview={branding.overview}/>
                    <Row>
                        <Col><AdverseEventsCauses/></Col>
                        <Col><AdverseEventsActionsByDrugs/></Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <AdverseEventsProportionOfPlHivByTypeOfSuspectedCausativeDrugs />
                    <SectionFooter overview={branding.overview}/>
                    <AdverseEventsProportionOfPlHivWithAeRelatedToArtOrSuspectedArt />
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
                    {/*<AdverseEventsProportionOfPlHivOnArtWithAe />
                    <SectionFooter overview={branding.overview}/>*/}
                </TabPane>
                <TabPane tabId="children">
                    <SectionHeader title={branding.title + " - CHILDREN"}/>
                    <AdverseEventsOverviewChildren/>
                    <AdverseEventsClientsByAgeSexChildren/>
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default AdverseEvents;
