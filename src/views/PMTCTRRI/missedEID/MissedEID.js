import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
    disableStickyFilter,
    enableStickyFilter,
} from '../../../actions/Shared/uiActions';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import MissedEIDOverview from './MissedEIDOverview';
import HeiAgeAtPCR from './HeiAgeAtPCR';
import HeiAgeAtPCRByCounty from './HeiAgeAtPCRByCounty';
import HeiAgeAtPCRByPartner from './HeiAgeAtPCRByPartner';
import MissedEIDList from './MissedEIDList';

const MissedEID = () => {
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
            <MissedEIDOverview />
            <HeiAgeAtPCR />
            <SectionFooter overview={'Missed EID Testing'} />
            <HeiAgeAtPCRByCounty /> 
            <SectionFooter overview={'Missed EID Testing'} />
            <HeiAgeAtPCRByPartner />
            <SectionFooter overview={'Missed EID Testing'} />
            <MissedEIDList />
            <SectionFooter overview={'Missed EID Testing'} />
        </>
    );
}


export default MissedEID;
