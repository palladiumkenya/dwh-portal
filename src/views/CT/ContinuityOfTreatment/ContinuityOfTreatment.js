import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    disableStickyFilter,
    enableStickyFilter,
} from '../../../actions/Shared/uiActions';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from '../../Shared/UniversalFilter';
import VisibilitySensor from 'react-visibility-sensor';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { useParams } from 'react-router-dom';
import AppointmetKeeping from './AppointmetKeeping';
import SectionFooter from './../../Shared/SectionFooter';

const ContinuityOfTreatment = () => {
    const branding = {
        title: 'CONTINUITY OF TREATMENT',
        description: 'OVERVIEW',
        overview: 'Continuity Of Treatment',
    };
    const dispatch = useDispatch();

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());
        }
    };

    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title} />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>
			<AppointmetKeeping />
			<SectionFooter />
        </div>
    );
};

export default ContinuityOfTreatment;
