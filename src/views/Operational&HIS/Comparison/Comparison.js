import React, { useEffect } from 'react';
import SectionHeader from '../../Shared/SectionHeader';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import { useDispatch, useSelector } from 'react-redux';
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
import { enableFromDateFilter, enableIndicatorFilter } from '../../../actions/Shared/filterActions';
import ComparisonOverviewTxCurr from './TX_CURR/ComparisonOverview';
import ComparisonIndicatorNotesTxCurr from './TX_CURR/ComparisonIndicator';
import ComparisonCurrByAge from './TX_CURR/ComparisonCurrByAge';
import ComparisonCurrByGender from './TX_CURR/ComparisonCurrByGender';
import ComparisonCurrByCounty from './TX_CURR/ComparisonCurrByCounty';
import ComparisonCurrByPartner from './TX_CURR/ComparisonCurrByPartner';
import ComparisonTX_CurrNewByGender from './TX_CURR/ComparisonTX_CurrNewByGender';

const Comparison = () => {
    const dispatch = useDispatch();
    const indicator = useSelector(state => state.filters.indicators);

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
                title={indicator === 'Tx_New' ? 'NEWLY STARTED ON ART': 'CURRENT ON ART'}
                description={`YEAR ${moment().year()}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            {indicator === 'Tx_New' ?
                <>
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
                </> :
                <>
                    <ComparisonOverviewTxCurr/>
                    <ComparisonIndicatorNotesTxCurr/>
                    <SectionFooter />
                    <Row>
                        <Col md={6}>
                            <ComparisonCurrByGender/>
                        </Col>
                        <Col md={6}>
                            <ComparisonCurrByAge/>
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
            }

        </>
    );
};


export default Comparison;
