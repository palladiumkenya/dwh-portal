import React, { useState } from 'react';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from '../../Shared/UniversalFilter';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const COVIDTabs = Loadable({ loader: () => import('./COVIDTabs'), loading: Loading, delay: LOADING_DELAY });

const Covid = () => {
    const branding = { title: "COVID-19", description: "OVERVIEW", overview: "COVID-19" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'covid') {
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
            <COVIDTabs />
        </div>
    );
}

export default Covid;
