import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Row,
    Col
} from 'reactstrap';
import classnames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import {
    enableStickyFilter,
    disableStickyFilter
} from '../../../actions/Shared/uiActions';
import PrEPOverview from './PrEPOverview';
import PrEPScreeningOverall from './PrEPScreeningOverall';
import PrEPScreeningByAge from './PrEPScreeningByAge';
import PrEPNewByAgeSex from './PrEPNewByAgeSex';
import PrEPUsePopulation1stMonth from './PrEPUsePopulation1stMonth';
import PrEPHIVTesting1stMonth from './PrEPHIVTesting1stMonth';
import PrEPContinuityByAgeSex from './PrEPContinuityByAgeSex';
import PrEPHIV1STMonthRefill from './PrEPHIV1STMonthRefill';
import PrEPUsePopulation3RDMonth from './PrEPUsePopulation3RDMonth';
import PrEPHIVTesting3RDMonth from './PrEPHIVTesting3RDMonth';
import PrEPHIV3RDMonthRefill from './PrEPHIV3RDMonthRefill';
import PrEPScreeningDiscontinuation from './PrEPScreeningDiscontinuation';
import PrEPCascade from './PrEPCascade';
import PrEPEligibleVsNewlyBySubPopulation from './PrEPEligibleVsNewlyBySubPopulation';
import PrEPEligibleVsNewInitiatedTrends from './PrEPEligibleVsNewInitiatedTrends';

const PrEP = () => {
    const dispatch = useDispatch();
    const htsTab = useSelector((state) => state.ui.htsTab);
    const [activeTab, setActiveTab] = useState('contacts');
    const branding = {
        title: 'PrEP',
        description: 'OVERVIEW',
        overview: 'PrEP'
    };
    const onVisibilityChange = (isVisible) => {
        if (htsTab === 'prep') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    // const { mini_tab } = useParams();
    // const history = useHistory();

    // useEffect(() => {
    //     if (!mini_tab) {
    //         history.push(`/hiv-testing/pns/${activeTab}`);
    //     }
    // }, [activeTab, history, mini_tab]);

    // if (!mini_tab) {
    //     history.push(`/hiv-testing/pns/${activeTab}`);
    // }

    // const toggle = (tab) => {
    //     if (mini_tab !== tab) {
    //         history.push(`/hiv-testing/pns/${tab}`);
    //     }
    // };

    return (
        <div className="animated fadeIn">
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>

            <SectionHeader title={branding.title} description="" />
            <PrEPOverview />

            <Row>
                <Col>
                    <PrEPCascade />
                </Col>
                <Col>
                    <PrEPEligibleVsNewlyBySubPopulation />
                </Col>
            </Row>
            <SectionFooter />
            <PrEPNewByAgeSex />
            <SectionFooter />
            <PrEPEligibleVsNewInitiatedTrends />
            <SectionFooter />
            <Row>
                <Col>
                    <PrEPScreeningOverall />
                </Col>
                <Col>
                    <PrEPScreeningByAge />
                </Col>
            </Row>
            <SectionFooter />
            <PrEPContinuityByAgeSex />
            <SectionFooter />
            <Row>
                <Col>
                    <PrEPUsePopulation1stMonth />
                </Col>
                <Col>
                    <PrEPHIVTesting1stMonth />
                </Col>
            </Row>
            <SectionFooter />
            <PrEPHIV1STMonthRefill />
            <SectionFooter />
            <Row>
                <Col>
                    <PrEPUsePopulation3RDMonth />
                </Col>
                <Col>
                    <PrEPHIVTesting3RDMonth />
                </Col>
            </Row>
            <SectionFooter />
            <PrEPHIV3RDMonthRefill />
            <SectionFooter />
            <PrEPScreeningDiscontinuation />
            <SectionFooter />
        </div>
    );
};

export default PrEP;
