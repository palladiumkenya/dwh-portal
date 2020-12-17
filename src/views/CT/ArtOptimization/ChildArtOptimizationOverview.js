import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';

const ChildArtOptimizationOverview = () => {
    const children = useSelector(artOptimizationOverviewSelectors.getChildren);
    const childrenOnFirstLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnFirstLine);
    const childrenOnFirstLinePercent = children ? ((childrenOnFirstLine/children)*100).toFixed(1) : 0;
    const childrenOnSecondLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnSecondLine);
    const childrenOnSecondLinePercent = children ? ((childrenOnSecondLine/children)*100).toFixed(1) : 0;
    const childrenOnThirdLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnThirdLine);
    const childrenOnThirdLinePercent = children ? ((childrenOnThirdLine/children)*100).toFixed(1) : 0;

    return (
        <>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CALHIV ON FIRST LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{childrenOnFirstLine.toLocaleString('en')}</span>
                                <sup className="overall-rates-sup"> {childrenOnFirstLinePercent.toLocaleString('en')}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CALHIV ON SECOND LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{childrenOnSecondLine.toLocaleString('en')}</span>
                                <sup className="overall-rates-sup"> {childrenOnSecondLinePercent.toLocaleString('en')}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CALHIV ON THIRD LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{childrenOnThirdLine.toLocaleString('en')}</span>
                                <sup className="overall-rates-sup"> {childrenOnThirdLinePercent.toLocaleString('en')}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ChildArtOptimizationOverview;
