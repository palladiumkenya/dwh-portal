import React, { useEffect } from 'react';
import SectionHeader from '../../Shared/SectionHeader';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionFooter from '../../Shared/SectionFooter';
import { useDispatch } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';

import MissedFirstANCOverview from './MissedFirstANCOverview';
import KnownStatusANCCounty from './KnownStatusANCCounty';
import KnownStatusANCPartner from './KnownStatusANCPartner';

const MissedFirstANC = () => {
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
            <br />
            <MissedFirstANCOverview />
            <KnownStatusANCCounty />
            <SectionFooter overview={'Missed Testing at First ANC'} />
            <KnownStatusANCPartner />
            <SectionFooter overview={'Missed Testing at First ANC'} />
            
            <SectionFooter overview={'Missed Testing at First ANC'} />
        </>
    );
};


export default MissedFirstANC;
