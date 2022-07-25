import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';


const AccuracyOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);

    return (
        <>
            <Row>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL ACTIVE ART PATIENTS
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}>
                            <div>
                                <div>
                                    <span className="expected-uploads-text">{formatNumber(currentOnArt)}</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ACCURATE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}>
                            <div>
                                <div>
                                    <span className="expected-uploads-text">{formatNumber(874663)}</span>
                                    <sup className="overall-rates-sup overall-rates-sup-perc"> {roundNumber(90) + '%'}</sup>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            INACCURATE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}>
                            <div>
                                <div>
                                    <span className="expected-uploads-text">{formatNumber(90458)}</span>
                                    <sup
                                        className="overall-rates-sup overall-rates-sup-perc"> {roundNumber(10) + '%'}</sup>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>

    );
};

export default AccuracyOverview;
