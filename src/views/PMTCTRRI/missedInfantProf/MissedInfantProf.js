import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import { Col, Row } from 'reactstrap';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import MissedInfantProfOverview from './MissedInfantProfOverview';
import KnownPositivesNoInfantProfPartner from './KnownPositivesNoInfantProfPartner';
import KnownPositivesNoInfantProfCounty from './KnownPositivesNoInfantProfCounty';
import NewlyDiagnosedNoInfantProfCounty from './NewlyDiagnosedNoInfantProfCounty';
import NewlyDiagnosedNoInfantProfPartner from './NewlyDiagnosedNoInfantProfPartner';
import MissingInfantProfList from './MissingInfantProfList';

const MissedInfantProf = () => {
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
            <MissedInfantProfOverview />
            <KnownPositivesNoInfantProfCounty />
            <SectionFooter overview={'Missed Infant Prophylaxis'} />
            <KnownPositivesNoInfantProfPartner />
            <SectionFooter overview={'Missed Infant Prophylaxis'} />
            <NewlyDiagnosedNoInfantProfCounty />
            <SectionFooter overview={'Missed Infant Prophylaxis'} />
            <NewlyDiagnosedNoInfantProfPartner />
            <SectionFooter overview={'Missed Infant Prophylaxis'} />
            <MissingInfantProfList />
            <SectionFooter overview={'Missed Infant Prophylaxis'} />
        </>
    );
};


export default MissedInfantProf;
