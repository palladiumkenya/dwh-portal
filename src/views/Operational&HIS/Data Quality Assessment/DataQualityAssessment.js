import React, { useEffect } from 'react';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '../../Shared/SectionHeader';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';


const DataQualityAssessmentTabs = Loadable({ loader: () => import('./DataQualityAssessmentTabs'), loading: Loading, delay: LOADING_DELAY });

const DataQualityAssessment = () => {
    const dispatch = useDispatch();

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());

        }
    };
    return (
        <>
            <DataQualityAssessmentTabs />
        </>
    );
}


export default DataQualityAssessment;
