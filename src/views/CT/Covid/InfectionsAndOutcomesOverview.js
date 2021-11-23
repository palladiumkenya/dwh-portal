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
            <Col className={"col-4"}>
                <COVIDPLHIVCurrentOnART />
            </Col>

            <Col className={"col-4"}>
                <COVIDPLHIVEverHadInfection />
            </Col>

            <Col className={"col-4"}>
                <COVIDPLHIVWhoHadSymptomaticInfection />
            </Col>
        </Row>
    );
};

export default InfectionsAndOutcomesOverview;
