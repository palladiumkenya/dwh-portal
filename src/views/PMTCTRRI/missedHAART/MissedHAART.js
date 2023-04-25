import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import MissedHAARTOverview from './MissedHAARTOverview';
import PostiveMothesNotStartedHAARTCounty from './PostiveMothesNotStartedHAARTCounty';
import PostiveMothesNotStartedHAARTPartner from './PostiveMothesNotStartedHAARTPartner';
import MissingHAARTFacility from './MissingHAARTFacility';

const MissedHAART = () => {
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
            <MissedHAARTOverview />
            <PostiveMothesNotStartedHAARTCounty />
            <SectionFooter overview={'Missed Maternal HAART'} />
            <PostiveMothesNotStartedHAARTPartner />
            <SectionFooter overview={'Missed Maternal HAART'} />
            {/* <MissingHAARTFacility />
            <SectionFooter overview={'Missed Maternal HAART'} /> */}
        </>
    );
};


export default MissedHAART;
