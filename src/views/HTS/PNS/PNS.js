import React, { useCallback } from 'react';
import { CardColumns } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import PNSHeader from './PNSHeader';
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
import PNSFooter from './PNSFooter';

const PNS = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.htsTab === 'pns') {
            onGlobalFiltersChange({
                ...globalFilters,
                stickyFilter: !isVisible,
                countyFilterEnabled: true,
                subCountyFilterEnabled: true,
                facilityFilterEnabled: true,
                partnerFilterEnabled: true,
                agencyFilterEnabled: false,
                fromDateFilterEnabled: true,
                toDateFilterEnabled: false,
            });
        }
    }, [globalFilters, onGlobalFiltersChange]);
    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>
            <PNSHeader/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <PNSOverview globalFilters={globalFilters} />
            <CardColumns className="cols-2">
                <PNSScreening globalFilters={globalFilters} />
                <PNSDistributionElicitedAgeSex globalFilters={globalFilters} />
            </CardColumns>
            <hr/><PNSFooter/><hr/><div className="strip"></div><p></p>
            <CardColumns className="cols-2">
                <PNSContactsCascade globalFilters={globalFilters} />
                <PNSChildrenFamilyTestingCascade globalFilters={globalFilters} />
            </CardColumns>
            <hr/><PNSFooter/><hr/><div className="strip"></div><p></p>
            <PNSContactsTestingPositivityTrends globalFilters={globalFilters} />
            <hr/><PNSFooter/><hr/><div className="strip"></div><p></p>
            <PNSChildrenFamilyTestingPositivityTrends globalFilters={globalFilters} />
            <hr/><PNSFooter/><hr/><div className="strip"></div><p></p>
            <PNSPositivityTrends globalFilters={globalFilters} />
            <hr/><PNSFooter/><hr/><div className="strip"></div><p></p>
            <PNSContactsTestingPositivityByCounty globalFilters={globalFilters} />
            <hr/><PNSFooter/><hr/><div className="strip"></div><p></p>
            <PNSContactsTestingPositivityByPartner globalFilters={globalFilters} />
            <hr/><PNSFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );
};

export default PNS;
