import React, { useEffect } from 'react';
import SectionHeader from '../../../Shared/SectionHeader';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import KHISComparisonFilter from '../../../Shared/KHISComparisonFilter';
import { useDispatch, useSelector } from 'react-redux';
import {
    disableStickyFilter,
    enableStickyFilter,
} from '../../../../actions/Shared/uiActions';
import { Col, Row } from 'reactstrap';
import ComparisonIndicator from './ComparisonIndicator';
import ComparisonOverview from './ComparisonOverview';
import SectionFooter from '../../../Shared/SectionFooter';
import ComparisonNewlyByGender from './ComparisonNewlyByGender';
import ComparisonNewlyByAge from './ComparisonNewlyByAge';
import ComparisonNewlyTrends from './ComparisonNewlyTrends';
import ComparisonNewVsHTSPositivesKHIS from './ComparisonNewHTSPositivesKHIS';
import ComparisonNewVsHTSPositivesDWH from './ComparisonNewHTSPositivesDWH';
import ComparisonTXNewByGender from './ComparisonTX_NewByGender';

const TxNew = () => {
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
                title={ 'NEWLY STARTED ON ART' }
                description={`YEAR ${moment().year()}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <KHISComparisonFilter />
            </VisibilitySensor>
            
            <>
                <ComparisonOverview />
                <Row>
                    <Col md={12}>
                        <ComparisonIndicator />
                    </Col>
                </Row>
                <SectionFooter />
                <Row>
                    <Col md={6}>
                        <ComparisonNewlyByGender />
                    </Col>
                    <Col md={6}>
                        <ComparisonNewlyByAge />
                    </Col>
                </Row>
                <SectionFooter />
                <ComparisonNewlyTrends />
                <SectionFooter />
                <ComparisonNewVsHTSPositivesKHIS />
                <SectionFooter />
                <ComparisonNewVsHTSPositivesDWH />
                <SectionFooter />
                <ComparisonTXNewByGender />
                <SectionFooter />
            </>
        </>
    );
};

export default TxNew;
