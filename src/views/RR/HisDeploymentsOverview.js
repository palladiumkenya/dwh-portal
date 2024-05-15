import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { formatNumber } from '../../utils/utils';
import React from 'react';

const HisDeploymentsOverview = () =>{

    return (
        <>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ACTIVE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(100)} </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            DISCONTINUED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(100)} </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            STALLED/INACTIVE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(100)} </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}


export default HisDeploymentsOverview
