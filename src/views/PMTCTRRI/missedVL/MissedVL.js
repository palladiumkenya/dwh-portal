import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import SectionHeader from '../../Shared/SectionHeader';
import moment from 'moment';
import SectionFooter from '../../Shared/SectionFooter';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import { useDispatch } from 'react-redux';
import MissedVLOverview from './MissedVLOverview';
import MissingVLCounty from './MissingVLCounty';
import MissingVLPartner from './MissingVLPartner';
import VLNonSupressionCounty from './VLNonSupressionCounty';
import VLNonSupressionPartner from './VLNonSupressionPartner';

const MissedVL = () => {
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
            <MissedVLOverview />
            <MissingVLCounty />
            <SectionFooter overview={'Missed Viral Load'} />
            <MissingVLPartner />
            <SectionFooter overview={'Missed Viral Load'} />
            <VLNonSupressionCounty />
            <SectionFooter overview={'Missed Viral Load'} />
            <VLNonSupressionPartner />
            <SectionFooter overview={'Missed Viral Load'} />
            <SectionFooter overview={'Missed Viral Load'} />

        </>
    );
};

export default MissedVL;
