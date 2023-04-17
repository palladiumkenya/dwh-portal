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
import SectionFooter from './../../Shared/SectionFooter';
import MissedDTGOverview from './MissedDTGOverview';
import MissingDTGCounty from './MissingDTGCounty';
import MissingDTGPartner from './MissingDTGPartner';

const MissedDTG = () => {
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
            <SectionHeader
                title={'PMTCT RRI'}
                description={`YEAR ${moment().year()}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>
            <MissedDTGOverview /> 
            <MissingDTGCounty />
            <SectionFooter overview={'Missed DTG Optimization'} />
            <MissingDTGPartner />
            <SectionFooter overview={'Missed DTG Optimization'} />
            <SectionFooter overview={'Missed DTG Optimization'} />
        </>
    );
};


export default MissedDTG;
