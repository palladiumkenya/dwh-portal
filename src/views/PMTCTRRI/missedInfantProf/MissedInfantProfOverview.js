import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as missedInfantProphylaxisSelectors from '../../../selectors/PMTCTRRI/MissedInfantProphylaxis';
import * as missedHAARTSelectors from '../../../selectors/PMTCTRRI/MissedHAART';

const MissedInfantProfOverview = () => {
    const missedHaart = useSelector(
        missedHAARTSelectors.getMissedHAARTOverview
    );
    const missedInfantProf = useSelector(
        missedInfantProphylaxisSelectors.getMissedInfantProphylaxisOverview
    );

    return (
        <>
            <Row>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            HIV POSITIVE PREGNANT & BREASTFEEDING WOMEN
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px',
                            }}
                        >
                            <div>
                                <div>
                                    <span className="expected-uploads-text">
                                        {formatNumber(missedHaart.pospreg)}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            GIVEN PROPHYLAXIS (ANC, L&D, PNC)
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px',
                            }}
                        >
                            <div>
                                <div>
                                    <span className="expected-uploads-text">
                                        {formatNumber(
                                            missedInfantProf.givenProph
                                        )}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            NOT GIVEN PROPHYLAXIS (ANC, L&D, PNC)
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px',
                            }}
                        >
                            <div>
                                <div>
                                    <span className="expected-uploads-text">
                                        {formatNumber(
                                            missedInfantProf.notGivenProph
                                        )}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default MissedInfantProfOverview;
