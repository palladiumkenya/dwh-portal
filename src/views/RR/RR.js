import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../Shared/UniversalFilter';
import SectionHeader from './../Shared/SectionHeader';
import SectionFooter from './../Shared/SectionFooter';
import RROverview from './RROverview';
import RROverviewTrends from './RROverviewTrends';
import RRCounty from './RRCounty';
import RRPartner from './RRPartner';
import { enableStickyFilter, disableStickyFilter, changeRRTab } from "../../actions/uiActions";
import { RR_TABS } from "../../constants";

const RR = () => {
    const dispatch = useDispatch();
    const rrTab = useSelector(state => state.ui.rrTab);

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());
        }
    };

    const renderTabNavItems = () => {
        return (
            Object.keys(RR_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={rrTab === value} onClick={() => { dispatch(changeRRTab(value)); }} >
                            {RR_TABS[value]}
                        </NavLink>
                    </NavItem>
                );
            })
        );
    };

    useEffect(() => {
        console.log('On mount');
        return () => {
            console.log('On dismount');
        }
    }, []);

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={rrTab}>
                <TabPane tabId={rrTab}>
                    <SectionHeader title="REPORTING RATES" description="OVERVIEW"/>
                    <VisibilitySensor onChange={onVisibilityChange}>
                        <UniversalFilter/>
                    </VisibilitySensor>
                    <RROverview/>
                    <RROverviewTrends/>
                    <SectionFooter overview="The Overall reporting rates refers to the proportion of EMR
                        sites that submitted the most recent i.e. The Jan 2020 Overall
                        reporting rates in the number of EMR sites that uploaded data to
                        the NDW in Jan 2020 and so forth."
                    />
                    <SectionHeader title="REPORTING RATES" description="BY COUNTY"/>
                    <RRCounty/>
                    <SectionFooter overview="The overall reporting rate for March, 2020 is the
                        number of EMR sites that uploaded data in March, 2020"
                    />
                    <SectionHeader title="REPORTING RATES" description="BY PARTNER"/>
                    <RRPartner/>
                    <SectionFooter overview="The overall reporting rate for March, 2020 is the
                        number of EMR sites that uploaded data in March, 2020"
                    />
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );

};

export default RR;
