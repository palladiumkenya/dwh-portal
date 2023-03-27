import { useSelector } from 'react-redux';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as tickets from '../../../selectors/ServiceDesk/ticketsOverview';


const ServiceDeskOverview = () => {
    const overview = useSelector(tickets.getTicketsOverview);

    return (
        <>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CREATED TICKETS
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(overview.total)} </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CLOSED TICKETS
                        </CardHeader>

                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(overview.closed)} </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            OPEN TICKETS
                        </CardHeader>

                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(overview.opened)} </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ServiceDeskOverview;
