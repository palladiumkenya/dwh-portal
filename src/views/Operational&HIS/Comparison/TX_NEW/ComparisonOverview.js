import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';
import { useSelector } from 'react-redux';


const ComparisonOverview = () => {
    let newlyKHIS =  useSelector(newlyStartedOnArtKHIS.getNewlyStartedOnArtKHIS);

    return (
        <>
            <Row>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL NEWLY STARTED ON ART
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{newlyKHIS.totalNewlyStarted}</span>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{"73900"}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            MALES STARTED ON ART
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{newlyKHIS.malesNewlyStarted}</span>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{"73900"}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            FEMALES STARTED ON ART
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{newlyKHIS.femalesNewlyStarted}</span>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{"73900"}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            {"ADULTS STARTED ON ART(15+ YRS)"}
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{newlyKHIS.adultsNewlyStarted}</span>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{"73900"}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            {"CHILDREN STARTED ON ART(<14 YRS)"}
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{newlyKHIS.childrenNewlyStarted}</span>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{"73900"}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADOLESCENTS STARTED ON ART(10 - 19 YRS)
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{newlyKHIS.adolescentsNewlyStarted}</span>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{"73900"}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>

    );
};

export default ComparisonOverview;
