import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import LinkageOverview from './LinkageOverview';
import LinkageNumberPositive from './LinkageNumberPositive';
import LinkageByAgeSex from './LinkageByAgeSex';
import LinkageByPopulationType from './LinkageByPopulationType';
import LinkageByStrategyEntryPoint from './LinkageByStrategyEntryPoint';
import LinkageByPartner from './LinkageByPartner';
import LinkageByCounty from './LinkageByCounty';
import LinkageNumberNotLinkedByFacility from './LinkageNumberNotLinkedByFacility';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const Linkage = () => {
    const dispatch = useDispatch();
    const branding = {
        title: "HIV TESTING SERVICES LINKAGE",
        description: "OVERVIEW",
        overview: "HTS Linkage"
    };
    const htsTab = useSelector(state => state.ui.htsTab);

    const onVisibilityChange = (isVisible) => {
        if (htsTab === 'linkage') {
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
            <LinkageOverview/>
            <Card>
                <CardHeader>Indicator Definition</CardHeader>
                <CardBody>
                    <ul>
                        <li>HIV Testing Services (HTS) Linkage =&gt; Proportion of HIV positive individuals who are linked to care and treatment services within a reporting period. This is based on a documented CCC number in the linkage form.</li>
                    </ul>
                </CardBody>
            </Card>
            <LinkageNumberPositive/>
            <SectionFooter overview={branding.overview}/>
            <LinkageByAgeSex />
            <SectionFooter overview={branding.overview}/>
            <LinkageByPopulationType/>
            <SectionFooter overview={branding.overview}/>
            <LinkageByStrategyEntryPoint/>
            <SectionFooter overview={branding.overview}/>
            <LinkageByCounty/>
            <SectionFooter overview={branding.overview}/>
            <LinkageByPartner/>
            <SectionFooter overview={branding.overview}/>
            <LinkageNumberNotLinkedByFacility/>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default Linkage;
