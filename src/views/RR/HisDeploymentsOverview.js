import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { formatNumber } from '../../utils/utils';
import React from 'react';
import * as hisSelector from '../../selectors/RR/HisDeploymentsSelector';
import { useSelector } from 'react-redux';

const HisDeploymentsOverview = () =>{
    const hisStatusData = useSelector(
        hisSelector.getFacilityStatus
    );
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
                                <span className="expected-uploads-text">{formatNumber(hisStatusData.active)} </span>
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
                                <span className="expected-uploads-text">{formatNumber(hisStatusData.discontinued)} </span>
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
                                <span className="expected-uploads-text">{formatNumber(hisStatusData.stalled)} </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}


export default HisDeploymentsOverview
