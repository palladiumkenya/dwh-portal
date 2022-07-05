import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../../utils/utils';
import * as currentNewOnArtOverviewSelectors from '../../../../selectors/CT/NewOnArt/currentNewOnArtOverview';


const ComparisonOverviewTxCurr = () => {
    let newlyKHIS =  useSelector(newlyStartedOnArtKHIS.getNewlyStartedOnArtKHIS);
    const newOnArt = useSelector(currentNewOnArtOverviewSelectors.getNewOnArt);
    const newOnArtMale = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtMale);
    const newOnArtMalePercent = newOnArt ? ((newOnArtMale/newOnArt)*100) : 0;
    const newOnArtFemale = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtFemale);
    const newOnArtFemalePercent = newOnArt ? ((newOnArtFemale/newOnArt)*100) : 0;
    const newOnArtAdults = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtAdults);
    const newOnArtAdultsPercent = newOnArt ? ((newOnArtAdults/newOnArt)*100) : 0;
    const newOnArtAdolescents = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtAdolescents);
    const newOnArtAdolescentsPercent = newOnArt ? ((newOnArtAdolescents/newOnArt)*100) : 0;
    const newOnArtChildren = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtChildren);
    const newOnArtChildrenPercent = newOnArt ? ((newOnArtChildren/newOnArt)*100) : 0;

    let percOfNewly = (newly, total) => {
        if (total === 0) {
            return 0  + "%";
        }
        return roundNumber((newly / total) * 100) + "%";
    }

    return (
        <>
            <Row>
                <Col md={4}>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL CURRENT ON ART
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{formatNumber(newlyKHIS.totalNewlyStarted)}</span>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{formatNumber(newOnArt)}</span>
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
                            MALES CURRENT ON ART
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{formatNumber(newlyKHIS.malesNewlyStarted)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {percOfNewly(newlyKHIS.malesNewlyStarted, newlyKHIS.totalNewlyStarted)}</sup>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{formatNumber(newOnArtMale)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {roundNumber(newOnArtMalePercent) + "%"}</sup>
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
                            FEMALES CURRENT ON ART
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{formatNumber(newlyKHIS.femalesNewlyStarted)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {percOfNewly(newlyKHIS.femalesNewlyStarted, newlyKHIS.totalNewlyStarted)}</sup>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{formatNumber(newOnArtFemale)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {roundNumber(newOnArtFemalePercent) + "%"}</sup>
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
                            {"ADULTS CURRENT ON ART(15+ YRS)"}
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{formatNumber(newlyKHIS.adultsNewlyStarted)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {percOfNewly(newlyKHIS.adultsNewlyStarted, newlyKHIS.totalNewlyStarted)}</sup>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{formatNumber(newOnArtAdults)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {roundNumber(newOnArtAdultsPercent) + "%"}</sup>
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
                            {"CHILDREN CURRENT ON ART(<14 YRS)"}
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{formatNumber(newlyKHIS.childrenNewlyStarted)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {percOfNewly(newlyKHIS.childrenNewlyStarted, newlyKHIS.totalNewlyStarted)}</sup>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{formatNumber(newOnArtChildren)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {roundNumber(newOnArtChildrenPercent) + "%"}</sup>
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
                            ADOLESCENTS CURRENT ON ART(10 - 19 YRS)
                        </CardHeader>
                        <CardBody
                            style={{ backgroundColor: '#F6F6F6', height: '100%' }}>
                            <div
                                style={{ background: 'linear-gradient(#000, #000) no-repeat center/2px 100%' }}>
                                <Row>
                                    <Col md={6}>
                                        <div >
                                            <span className="comparison-card-text">KHIS</span><br/>
                                            <span className="comparison-card-numbers">{formatNumber(newlyKHIS.adolescentsNewlyStarted)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {percOfNewly(newlyKHIS.adolescentsNewlyStarted, newlyKHIS.totalNewlyStarted)}</sup>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">DWH</span><br />
                                            <span className="comparison-card-numbers">{formatNumber(newOnArtAdolescents)}</span>
                                            <sup className="comparison-sup comparison-sup-perc"> {roundNumber(newOnArtAdolescentsPercent) + "%"}</sup>
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

export default ComparisonOverviewTxCurr;
