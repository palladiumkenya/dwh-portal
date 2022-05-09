import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import PNSContactsTestingOverview from './PNSContactsTestingOverview';
import PNSDistributionElicitedAgeSex from './PNSDistributionElicitedAgeSex';
import PNSDistributionPositiveAgeSex from './PNSDistributionPositiveAgeSex';
import PNSContactsHivStatus from './PNSContactsHivStatus';
import PNSContactsCascade from './PNSContactsCascade';
import PNSFamilyTestingOverview from './PNSFamilyTestingOverview';
import PNSChildrenFamilyTestingCascade from './PNSChildrenFamilyTestingCascade';
import PNSContactsTestingPositivityTrends from './PNSContactsTestingPositivityTrends';
import PNSChildrenFamilyTestingPositivityTrends from './PNSChildrenFamilyTestingPositivityTrends';
import PNSPositivityTrends from './PNSPositivityTrends';
import PNSContactsTestingPositivityByCounty from './PNSContactsTestingPositivityByCounty';
import PNSContactsTestingPositivityByPartner from './PNSContactsTestingPositivityByPartner';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { useHistory, useParams } from 'react-router-dom';

const PNS = () => {
    const dispatch = useDispatch();
    const htsTab = useSelector(state => state.ui.htsTab);
    const [activeTab, setActiveTab] = useState('contacts');
    const branding = {
        title: "PARTNER NOTIFICATION SERVICES",
        description: "OVERVIEW",
        overview: "PNS"
    };
    const onVisibilityChange = (isVisible) => {
        if (htsTab === 'pns') {
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
            history.push(`/hiv-testing/pns/${activeTab}`);
        }
    }, [activeTab, history, mini_tab]);

    if(!mini_tab){
        history.push(`/hiv-testing/pns/${activeTab}`);
    }

    const toggle = tab => {
        if (mini_tab !== tab) {
            history.push(`/hiv-testing/pns/${tab}`);
        }
    };


    return (
        <div className="animated fadeIn">
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'contacts' })} onClick={() => { setActiveTab('contacts'); toggle("contacts") }}>SEXUAL CONTACT TESTING</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'family' })} onClick={() => { setActiveTab('family'); toggle("family") }}>FAMILY TESTING</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={mini_tab}>
                <TabPane tabId="contacts">
                    <SectionHeader title={branding.title} description="SEXUAL CONTACT TESTING"/>
                    <PNSContactsTestingOverview/>
                    <Row>
                        <Col className={"col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6"}>
                            <PNSContactsCascade/>
                        </Col>
                        <Col className={"col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6"}>
                            <PNSDistributionElicitedAgeSex/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6"}>
                            <PNSContactsHivStatus/>
                        </Col>
                        <Col className={"col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6"}>
                            <PNSDistributionPositiveAgeSex/>
                        </Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                    <PNSContactsTestingPositivityTrends/>
                    <SectionFooter overview={branding.overview}/>
                    <PNSPositivityTrends/>
                    <SectionFooter overview={branding.overview}/>
                    <PNSContactsTestingPositivityByCounty/>
                    <SectionFooter overview={branding.overview}/>
                    <PNSContactsTestingPositivityByPartner/>
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
                <TabPane tabId="family">
                    <SectionHeader title={branding.title} description="FAMILY TESTING"/>
                    <PNSFamilyTestingOverview/>
                    <PNSChildrenFamilyTestingCascade/>
                    <SectionFooter overview={branding.overview}/>
                    <PNSChildrenFamilyTestingPositivityTrends/>
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default PNS;
