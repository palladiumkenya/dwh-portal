import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';

const AdultArtOptimizationOverview = () => {
    const adults = useSelector(artOptimizationOverviewSelectors.getAdults);
    const adultsOnFirstLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnFirstLine);
    const adultsOnFirstLinePercent = adults ? ((adultsOnFirstLine/adults)*100).toFixed(1) : 0;
    const adultsOnSecondLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnSecondLine);
    const adultsOnSecondLinePercent = adults ? ((adultsOnSecondLine/adults)*100).toFixed(1) : 0;
    const adultsOnThirdLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnThirdLine);
    const adultsOnThirdLinePercent = adults ? ((adultsOnThirdLine/adults)*100).toFixed(1) : 0;
    const adultsOnTld = useSelector(artOptimizationOverviewSelectors.getAdultsOnTld);
    const adultsOnTldPercent = adults ? ((adultsOnTld/adults)*100).toFixed(1) : 0;
    const adultsOnNvp = useSelector(artOptimizationOverviewSelectors.getAdultsOnNvp);
    const adultsOnNvpPercent = adults ? ((adultsOnNvp/adults)*100).toFixed(1) : 0;

    return (
        <>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON FIRST LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{adultsOnFirstLine.toLocaleString('en')}</span>
                                <sup className="overall-rates-sup"> {adultsOnFirstLinePercent.toLocaleString('en')}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON SECOND LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{adultsOnSecondLine.toLocaleString('en')}</span>
                                <sup className="overall-rates-sup"> {adultsOnSecondLinePercent.toLocaleString('en')}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON THIRD LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{adultsOnThirdLine.toLocaleString('en')}</span>
                                <sup className="overall-rates-sup"> {adultsOnThirdLinePercent.toLocaleString('en')}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON TLD
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{adultsOnTld.toLocaleString('en')}</span>
                                <sup className="overall-rates-sup"> {adultsOnTldPercent.toLocaleString('en')}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON NVP
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12" style={{ textAlign: 'center' }}>
                                <span className="overall-rates-figure">{adultsOnNvp.toLocaleString('en')}</span>
                                <sup className="overall-rates-sup"> {adultsOnNvpPercent.toLocaleString('en')}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AdultArtOptimizationOverview;
