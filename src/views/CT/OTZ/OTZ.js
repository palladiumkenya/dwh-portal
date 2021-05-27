import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from '../../Shared/UniversalFilter';
import VisibilitySensor from 'react-visibility-sensor';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const OTZOverview = Loadable({ loader: () => import('./OTZOverview'), loading: Loading, delay: LOADING_DELAY });
const OTZTabs = Loadable({ loader: () => import('./OTZTabs'), loading: Loading, delay: LOADING_DELAY });

const OTZ = () => {
    const branding = { title: "OTZ", description: "OVERVIEW", overview: "OTZ" };
    const [activeTab, setActiveTab] = useState('otz');
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'otz') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'otz' })} onClick={() => { setActiveTab('otz') }}>OTZ CHARTS</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'ovc' })} onClick={() => { setActiveTab('ovc') }}>OVC CHARTS</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="otz">
                    {/*<OTZOverview />*/}

                    <OTZTabs />
                </TabPane>
            </TabContent>
        </div>
    );
}

export default OTZ;
