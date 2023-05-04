import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Row,
    Col
} from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import { LOADING_DELAY } from '../../../constants';
import Loading from '../../Shared/Loading';
import {
    enableStickyFilter,
    disableStickyFilter
} from '../../../actions/Shared/uiActions';

import PrEPCurrentTrends from './PrEPCurrentTrends';
import PrEPUsePopulation3RDMonth from './PrEPUsePopulation3RDMonth';
import PrEPCurrentVsTestedPositiveTrends from './PrEPCurrentVsTestedPositiveTrends';
import PrEPScreeningByAge from './PrEPScreeningByAge';
import PrEPUsePopulation1stMonth from './PrEPUsePopulation1stMonth';
import PrEPTestedPositiveBySubPopulation from './PrEPTestedPositiveBySubPopulation';
import PrEPEligibleVsNewlyBySubPopulation from './PrEPEligibleVsNewlyBySubPopulation';

const PrEPOverview = Loadable({
    loader: () => import('./PrEPOverview'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPScreeningOverall = Loadable({
    loader: () => import('./PrEPScreeningOverall'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPNewByAgeSex = Loadable({
    loader: () => import('./PrEPNewByAgeSex'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPHIVTesting1stMonth = Loadable({
    loader: () => import('./PrEPHIVTesting1stMonth'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPContinuityByAgeSex = Loadable({
    loader: () => import('./PrEPContinuityByAgeSex'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPHIV1STMonthRefill = Loadable({
    loader: () => import('./PrEPHIV1STMonthRefill'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPHIVTesting3RDMonth = Loadable({
    loader: () => import('./PrEPHIVTesting3RDMonth'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPHIV3RDMonthRefill = Loadable({
    loader: () => import('./PrEPHIV3RDMonthRefill'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPScreeningDiscontinuation = Loadable({
    loader: () => import('./PrEPScreeningDiscontinuation'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPCascade = Loadable({
    loader: () => import('./PrEPCascade'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPEligibleVsNewInitiatedTrends  = Loadable({
    loader: () => import('./PrEPEligibleVsNewInitiatedTrends'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPCurrentBySubPopulation = Loadable({
    loader: () => import('./PrEPCurrentBySubPopulation'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPSTIScreeningOutcome  = Loadable({
    loader: () => import('./PrEPSTIScreeningOutcome'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPSTITreatmentOutcome  = Loadable({
    loader: () => import('./PrEPSTITreatmentOutcome'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPEligibleVsNewlyByAge = Loadable({
    loader: () => import('./PrEPEligibleVsNewlyByAge'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPDiagnosedWithSTITrends = Loadable({
    loader: () => import('./PrEPDiagnosedWithSTITrends'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const PrEPDiscontinuationTrends = Loadable({
    loader: () => import('./PrEPDiscontinuationTrends'),
    loading: Loading,
    delay: LOADING_DELAY,
});

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
                <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <PrEPCascade />
                </Col>
                <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <PrEPEligibleVsNewlyByAge />
                </Col>
                {/* <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <PrEPEligibleVsNewlyBySubPopulation />
                </Col> */}
            </Row>
            <SectionFooter />
            <PrEPNewByAgeSex />
            <SectionFooter />
            <PrEPEligibleVsNewInitiatedTrends />
            <SectionFooter />
            <Row>
                {/* <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                > */}
                    {/*<PrEPEligibleVsNewlyBySubPopulation />*/}
                {/* </Col> */}
                <Col
                    // className={
                    //     'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    // }
                >
                    <PrEPCurrentBySubPopulation />
                </Col>
            </Row>
            {/* <SectionFooter />
            <PrEPCurrentTrends /> */}
            <SectionFooter />
            {/* <PrEPCurrentVsTestedPositiveTrends />
            <SectionFooter /> */}
            <PrEPContinuityByAgeSex />
            <SectionFooter />
            <Row>
                {/* <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <PrEPUsePopulation1stMonth />
                </Col> */}
                <Col
                    // className={
                    //     'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    // }
                >
                    <PrEPHIVTesting1stMonth />
                </Col>
            </Row>
            <SectionFooter />
            <PrEPHIV1STMonthRefill />
            <SectionFooter />
            <Row>
                {/* <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <PrEPUsePopulation3RDMonth />
                </Col> */}
                <Col
                    // className={
                    //     'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    // }
                >
                    <PrEPHIVTesting3RDMonth />
                </Col>
            </Row>
            <SectionFooter />
            <PrEPHIV3RDMonthRefill />
            <SectionFooter />
            <Row>
                <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <PrEPSTIScreeningOutcome />
                </Col>
                <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <PrEPSTITreatmentOutcome />
                </Col>
            </Row>
            <SectionFooter />
            {/*<PrEPTestedPositiveBySubPopulation />*/}
            {/*<SectionFooter />*/}
            <PrEPDiagnosedWithSTITrends />
            <SectionFooter />
            <PrEPScreeningDiscontinuation />
            <SectionFooter />
            <PrEPDiscontinuationTrends />
            <SectionFooter />
        </div>
    );
};

export default PrEP;
