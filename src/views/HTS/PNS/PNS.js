import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardColumns } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import PNSOverview from './PNSOverview';
import PNSScreening from './PNSScreening';
import PNSDistributionElicitedAgeSex from './PNSDistributionElicitedAgeSex';
import PNSContactsCascade from './PNSContactsCascade';
import PNSChildrenFamilyTestingCascade from './PNSChildrenFamilyTestingCascade';
import PNSContactsTestingPositivityTrends from './PNSContactsTestingPositivityTrends';
import PNSChildrenFamilyTestingPositivityTrends from './PNSChildrenFamilyTestingPositivityTrends';
import PNSPositivityTrends from './PNSPositivityTrends';
import PNSContactsTestingPositivityByCounty from './PNSContactsTestingPositivityByCounty';
import PNSContactsTestingPositivityByPartner from './PNSContactsTestingPositivityByPartner';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/uiActions";

const PNS = () => {
    const dispatch = useDispatch();
    const htsTab = useSelector(state => state.ui.htsTab);
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
    
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title} description={branding.description}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <PNSOverview/>
            <CardColumns className="cols-2">
                <PNSScreening/>
                <PNSDistributionElicitedAgeSex/>
            </CardColumns>
            <SectionFooter overview={branding.overview}/>
            <CardColumns className="cols-2">
                <PNSContactsCascade/>
                <PNSChildrenFamilyTestingCascade/>
            </CardColumns>
            <SectionFooter overview={branding.overview}/>
            <PNSContactsTestingPositivityTrends/>
            <SectionFooter overview={branding.overview}/>
            <PNSChildrenFamilyTestingPositivityTrends/>
            <SectionFooter overview={branding.overview}/>
            <PNSPositivityTrends/>
            <SectionFooter overview={branding.overview}/>
            <PNSContactsTestingPositivityByCounty/>
            <SectionFooter overview={branding.overview}/>
            <PNSContactsTestingPositivityByPartner/>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default PNS;
