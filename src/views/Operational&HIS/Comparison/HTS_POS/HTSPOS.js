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
import ComparisonPosByGender from './ComparisonPosByGender';
import ComparisonPosByAge from './ComparisonPosByAge';


const HTSPOS = () => {
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
                title={'HTS POSITIVE'}
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
                    <Col>
                        <ComparisonPosByGender />
                    </Col>
                    <Col>
                        <ComparisonPosByAge />
                    </Col>
                </Row>
                <SectionFooter />
            </>
        </>
    );
};

export default HTSPOS;
