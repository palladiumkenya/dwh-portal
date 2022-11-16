import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from '../../Shared/UniversalFilter';
import VisibilitySensor from 'react-visibility-sensor';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { useParams } from 'react-router-dom';

const OTZTabs = Loadable({ loader: () => import('./OTZTabs'), loading: Loading, delay: LOADING_DELAY });

const OTZ = () => {
    const branding = { title: "OTZ", description: "OVERVIEW", overview: "OTZ" };
    const [activeTab, setActiveTab] = useState('otz');
    const { active_tab } = useParams();
    const ctTab = active_tab
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
            <OTZTabs />
        </div>
    );
}

export default OTZ;
