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
import SectionFooter from '../../../Shared/SectionFooter';
import ComparisonOverviewTxCurr from './ComparisonOverview';
import ComparisonIndicatorNotesTxCurr from './ComparisonIndicator';
import ComparisonCurrByAge from './ComparisonCurrByAge';
import ComparisonCurrByGender from './ComparisonCurrByGender';
import ComparisonCurrByCounty from './ComparisonCurrByCounty';
import ComparisonCurrByPartner from './ComparisonCurrByPartner';
import ComparisonTX_CurrNewByGender from './ComparisonTX_CurrNewByGender';

const TxCurr = () => {
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
                title={'CURRENT ON ART'}
                description={`YEAR ${moment().year()}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <KHISComparisonFilter />
            </VisibilitySensor>
            <>
                <ComparisonOverviewTxCurr />
                <ComparisonIndicatorNotesTxCurr />
                <SectionFooter />
                <Row>
                    <Col md={6}>
                        <ComparisonCurrByGender />
                    </Col>
                    <Col md={6}>
                        <ComparisonCurrByAge />
                    </Col>
                
                </Row>
                <SectionFooter />
                <ComparisonCurrByCounty />
                <SectionFooter />
                <ComparisonCurrByPartner />
                <SectionFooter />
                <ComparisonTX_CurrNewByGender />
                <SectionFooter />
            </>
        </>
    );
};

export default TxCurr;
