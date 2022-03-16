import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { useSelector } from 'react-redux';
import COVIDPLHIVCurrentOnART from './COVIDPLHIVCurrentOnART';
import COVIDPLHIVEverHadInfection from './COVIDPLHIVEverHadInfection';
import COVIDPLHIVWhoHadSymptomaticInfection from './COVIDPLHIVWhoHadSymptomaticInfection';

const COVIDAdultPLHIVCurrentOnTreatment = Loadable({
    loader: () => import('./COVIDAdultPlhivCurrentOnTreatment'),
    loading: Loading,
    delay: LOADING_DELAY
});
const COVIDPartiallyVaccinated = Loadable({
    loader: () => import('./COVIDPartiallyVaccinated'),
    loading: Loading,
    delay: LOADING_DELAY
});
const COVIDFullyVaccinated = Loadable({
    loader: () => import('./COVIDFullyVaccinated'),
    loading: Loading,
    delay: LOADING_DELAY
});
const COVIDNumberScreened = Loadable({
    loader: () => import('./COVIDNumberScreened'),
    loading: Loading,
    delay: LOADING_DELAY
});

const COVIDOverview = (props) => {
    if (props.tab === "infection&Outcomes") {
        return <Row className={"col-12 pt-5 pb-5"}>
            <Col className={"col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12  col-xl-4"}>
                <COVIDPLHIVCurrentOnART />
            </Col>

            <Col className={"col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12  col-xl-4"}>
                <COVIDPLHIVEverHadInfection />
            </Col>

            <Col className={"col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12  col-xl-4"}>
                <COVIDPLHIVWhoHadSymptomaticInfection />
            </Col>
        </Row>
    }
    else
    return (
        <Row>
            <Col className={'col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'}>
                <COVIDAdultPLHIVCurrentOnTreatment/>
            </Col>

            <Col className={'col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'}>
                <COVIDNumberScreened/>
            </Col>

            <Col className={'col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'}>
                <COVIDPartiallyVaccinated/>
            </Col>

            <Col className={'col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'}>
                <COVIDFullyVaccinated/>
            </Col>
        </Row>
    );
};

export default COVIDOverview;
