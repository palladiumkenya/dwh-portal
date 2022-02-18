import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

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

const COVIDOverview = () => {

    return (
        <Row>
            <Col className={'col-3 col-lg-3 col-md-3 col-sm-12 col-xs-12'}>
                <COVIDAdultPLHIVCurrentOnTreatment/>
            </Col>

            <Col className={'col-3 col-lg-3 col-md-3 col-sm-12 col-xs-12'}>
                <COVIDNumberScreened/>
            </Col>

            <Col className={'col-3 col-lg-3 col-md-3 col-sm-12 col-xs-12'}>
                <COVIDPartiallyVaccinated/>
            </Col>

            <Col className={'col-3 col-lg-3 col-md-3 col-sm-12 col-xs-12'}>
                <COVIDFullyVaccinated/>
            </Col>
        </Row>
    );
};

export default COVIDOverview;
