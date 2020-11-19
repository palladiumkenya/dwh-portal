import React, { useCallback } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../Shared/UniversalFilter';
import RROverviewHeader from './Overview/RROverviewHeader';
import RROverview from './Overview/RROverview';
import RROverviewTrends from './Overview/RROverviewTrends';
import RROverviewFooter from './Overview/RROverviewFooter';
import RRCountyHeader from './County/RRCountyHeader';
import RRCounty from './County/RRCounty';
import RRCountyFooter from './County/RRCountyFooter';
import RRPartnerHeader from './Partner/RRPartnerHeader';
import RRPartner from './Partner/RRPartner';
import RRPartnerFooter from './Partner/RRPartnerFooter';

const RR = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        onGlobalFiltersChange({
            ...globalFilters,
            stickyFilter: !isVisible,
            countyFilterEnabled: true,
            subCountyFilterEnabled: false,
            facilityFilterEnabled: false,
            partnerFilterEnabled: true,
            agencyFilterEnabled: true,
            fromDateFilterEnabled: true,
            toDateFilterEnabled: false,
        });
    }, [globalFilters, onGlobalFiltersChange]);

    const changeRRTabTo = (tab) => {
        onGlobalFiltersChange({ ...globalFilters, rrTab: tab});
    }

    const renderTabNavItems = () => {
        return (
            Object.keys(globalFilters.rrTabs).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={globalFilters.rrTab === value} onClick={() => { changeRRTabTo(value); }} >
                            {globalFilters.rrTabs[value]}
                        </NavLink>
                    </NavItem>
                );
            })
        );
    };

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={globalFilters.rrTab}>
                <TabPane tabId={globalFilters.rrTab}>
                    <RROverviewHeader period={globalFilters?.year} />
                    <VisibilitySensor onChange={onVisibilityChange}>
                        <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                    </VisibilitySensor>
                    <RROverview globalFilters={globalFilters} />
                    <RROverviewTrends globalFilters={globalFilters} />
                    <RROverviewFooter/>
                    <RRCountyHeader period={globalFilters?.year} />
                    <RRCounty globalFilters={globalFilters} />
                    <RRCountyFooter/>
                    <RRPartnerHeader period={globalFilters?.year} />
                    <RRPartner globalFilters={globalFilters} />
                    <RRPartnerFooter/>
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );

};

export default RR;
