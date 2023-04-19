import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as missedVLSelectors from '../../../selectors/PMTCTRRI/MissedViralLoad';


const MissedVLOverview = () => {
    const missedVL = useSelector(missedVLSelectors.getMissedViralLoadOverview);

    return (
        <>
            <Row>
                <Col md={3}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CALHIV TX CURR
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
                                        {formatNumber(missedVL.calhiv)}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ELIGIBLE FOR VIRAL LOAD
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
                                        {formatNumber(missedVL.eligibleVL)}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            VIRAL LOAD DONE
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
                                        {formatNumber(missedVL.vlDone)}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            VIRAL LOAD SUPPRESSION
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
                                        {formatNumber(missedVL.suppressed)}
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

export default MissedVLOverview;
