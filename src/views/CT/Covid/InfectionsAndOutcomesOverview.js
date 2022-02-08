import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const COVIDPLHIVCurrentOnART = Loadable({ loader: () => import('./COVIDPLHIVCurrentOnART'), loading: Loading, delay: LOADING_DELAY });
const COVIDPLHIVEverHadInfection = Loadable({ loader: () => import('./COVIDPLHIVEverHadInfection'), loading: Loading, delay: LOADING_DELAY });
const COVIDPLHIVWhoHadSymptomaticInfection = Loadable({ loader: () => import('./COVIDPLHIVWhoHadSymptomaticInfection'), loading: Loading, delay: LOADING_DELAY });

const InfectionsAndOutcomesOverview = () => {
    return (
        <Row>
            <Col className={"col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12"}>
                <COVIDPLHIVCurrentOnART />
            </Col>

            <Col className={"col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12"}>
                <COVIDPLHIVEverHadInfection />
            </Col>

            <Col className={"col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12"}>
                <COVIDPLHIVWhoHadSymptomaticInfection />
            </Col>
        </Row>
    );
};

export default InfectionsAndOutcomesOverview;
