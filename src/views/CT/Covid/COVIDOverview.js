import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const COVIDAdultPLHIVCurrentOnTreatment = Loadable({ loader: () => import('./COVIDAdultPlhivCurrentOnTreatment'), loading: Loading, delay: LOADING_DELAY });
const COVIDPartiallyVaccinated = Loadable( { loader: () => import('./COVIDPartiallyVaccinated'), loading: Loading, delay: LOADING_DELAY });
const COVIDFullyVaccinated = Loadable( { loader: () => import('./COVIDFullyVaccinated'), loading: Loading, delay: LOADING_DELAY });

const COVIDOverview = () => {

    return (
        <Row>
            <Col>
                <COVIDAdultPLHIVCurrentOnTreatment />
            </Col>

            <Col>
                <COVIDPartiallyVaccinated />
            </Col>

            <Col>
                <COVIDFullyVaccinated />
            </Col>
        </Row>
    );
};

export default COVIDOverview;
