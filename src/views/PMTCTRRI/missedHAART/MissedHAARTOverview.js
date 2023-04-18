import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as missedHAARTSelectors from '../../../selectors/PMTCTRRI/MissedHAART';

const MissedHAARTOverview = () => {
    const missedHaart = useSelector(missedHAARTSelectors.getMissedHAARTOverview);

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
                            GIVEN MATERNAL HAART
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
                                        {formatNumber(missedHaart.onhaart)}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            NOT GIVEN MATERNAL HAART
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
                                        {formatNumber(missedHaart.nothaart)}
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

export default MissedHAARTOverview;
