import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as missedFirstANCSelectors from '../../../selectors/PMTCTRRI/MissedFirstANC';


const MissedFirstANCOverview = () => {
    const missedFirstANC = useSelector(
        missedFirstANCSelectors.getMissedFirstANCOverview
    );

    return (
        <>
            <Row>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            FIRST ANC ATTENDANCE
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
                                        {formatNumber(missedFirstANC?.FirstANC)}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            HIV TESTING
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
                                        {formatNumber(missedFirstANC?.HIVTested)}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            SYPHILIS TESTING
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
                                            missedFirstANC?.SyphilisTested
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

export default MissedFirstANCOverview;
