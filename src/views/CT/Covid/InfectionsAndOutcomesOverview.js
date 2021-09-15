import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const COVIDPLHIVCurrentOnART = Loadable({ loader: () => import('./COVIDPLHIVCurrentOnART'), loading: Loading, delay: LOADING_DELAY });

const InfectionsAndOutcomesOverview = () => {
    return (
        <Row>
            <Col className={"col-4"}>
                <COVIDPLHIVCurrentOnART />
            </Col>

            <Col className={"col-4"}>

            </Col>

            <Col className={"col-4"}>

            </Col>
        </Row>
    );
};

export default InfectionsAndOutcomesOverview;
