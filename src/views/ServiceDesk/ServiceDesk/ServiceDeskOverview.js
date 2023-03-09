import { useSelector } from 'react-redux';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import * as currentNewOnArtOverviewSelectors from '../../../selectors/CT/NewOnArt/currentNewOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const ServiceDeskOverview = () => {

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
                                <span className="expected-uploads-text">{formatNumber(203)} </span>
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
                                <span className="expected-uploads-text">{formatNumber(432)} </span>
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
                                <span className="expected-uploads-text">{formatNumber(24)} </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ServiceDeskOverview;
