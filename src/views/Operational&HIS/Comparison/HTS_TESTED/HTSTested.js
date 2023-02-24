import React, { useEffect } from 'react';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import {
    disableStickyFilter,
    enableStickyFilter,
} from '../../../../actions/Shared/uiActions';
import { Col, Row } from 'reactstrap';
import KHISComparisonFilter from '../../../Shared/KHISComparisonFilter';
import SectionFooter from '../../../Shared/SectionFooter';
import SectionHeader from '../../../Shared/SectionHeader';
import ComparisonOverview from './ComparisonOverview';
import ComparisonIndicatorNotes from './ComparisonIndicator';
import ComparisonTestedByGender from './ComparisonTestedByGender';
import ComparisonTestedByAge from './ComparisonTestedByAge';
import ComparisonTestedTrends from './ComparisonTestedTrends';
import ComparisonTestedByCounty from './ComparisonTestedByCounty';
import ComparisonTestedByPartner from './ComparisonTestedByPartner';
import ComparisonHTSTestedByGender from './ComparisonTestedByFacility';

const HTSTested = () => {
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
                title={'HTS TESTED'}
                description={`YEAR ${moment().year()}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <KHISComparisonFilter />
            </VisibilitySensor>
            <>
                <ComparisonOverview />
                <ComparisonIndicatorNotes />
                <SectionFooter />
                <Row>
                    <Col md={6}>
                        <ComparisonTestedByGender />
                    </Col>
                    <Col md={6}>
                        <ComparisonTestedByAge />
                    </Col>
                </Row>
                <SectionFooter />
                <ComparisonTestedTrends />
                <SectionFooter />
                <ComparisonTestedByCounty />
                <SectionFooter />
                <ComparisonTestedByPartner />
                <SectionFooter />
                <ComparisonHTSTestedByGender />
                <SectionFooter />
            </>
        </>
    );
};

export default HTSTested;
