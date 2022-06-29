import React, { useEffect } from 'react';
import SectionHeader from '../../Shared/SectionHeader';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import { useDispatch } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import { Col, Row } from 'reactstrap';
import ComparisonIndicator from './TX_NEW/ComparisonIndicator';
import ComparisonOverview from './TX_NEW/ComparisonOverview';
import SectionFooter from '../../Shared/SectionFooter';
import ComparisonNewlyByGender from './TX_NEW/ComparisonNewlyByGender';
import ComparisonNewlyByAge from './TX_NEW/ComparisonNewlyByAge';
import ComparisonNewlyTrends from './TX_NEW/ComparisonNewlyTrends';
import ComparisonNewVsHTSPositivesKHIS from './TX_NEW/ComparisonNewHTSPositivesKHIS';
import ComparisonNewVsHTSPositivesDWH from './TX_NEW/ComparisonNewHTSPositivesDWH';
import ComparisonTXNewByGender from './TX_NEW/ComparisonTX_NewByGender';

const Comparison = () => {
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());

        }
    };
    let Indicator = 'NEWLY STARTED ON ART';
    return (
        <>
            {Indicator == 'NEWLY STARTED ON ART' ?
                <>
                    <SectionHeader
                        title={Indicator}
                        description={`YEAR ${moment().year()}`}
                    />
                    <VisibilitySensor onChange={onVisibilityChange}>
                        <UniversalFilter/>
                    </VisibilitySensor>
                    <ComparisonOverview/>
                    <Row>
                        <Col md={12}>
                            <ComparisonIndicator/>
                        </Col>
                    </Row>
                    <SectionFooter/>
                    <Row>
                        <Col md={6}>
                            <ComparisonNewlyByGender/>
                        </Col>
                        <Col md={6}>
                            <ComparisonNewlyByAge/>
                        </Col>
                    </Row>
                    <SectionFooter/>
                    <ComparisonNewlyTrends/>
                    <SectionFooter/>
                    <ComparisonNewVsHTSPositivesKHIS/>
                    <SectionFooter/>
                    <ComparisonNewVsHTSPositivesDWH/>
                    <SectionFooter/>
                    <ComparisonTXNewByGender/>
                    <SectionFooter/>
                </> : null}
        </>
    );
};


export default Comparison;
