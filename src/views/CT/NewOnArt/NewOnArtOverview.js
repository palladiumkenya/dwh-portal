import { useSelector } from 'react-redux';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import * as currentNewOnArtOverviewSelectors from '../../../selectors/CT/NewOnArt/currentNewOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const NewOnArtOverview = () => {
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

    return (
        <>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            NEWLY STARTED ON ART
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(newOnArt)} </span>
                                <sup className="overall-rates-sup overall-rates-sup-perc"></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            MALES STARTED ON ART
                        </CardHeader>

                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(newOnArtMale)} </span>
                                <sup className="overall-rates-sup overall-rates-sup-perc"> {roundNumber(newOnArtMalePercent) + "%"}</sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            FEMALES STARTED ON ART
                        </CardHeader>

                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(newOnArtFemale)} </span>
                                <sup className="overall-rates-sup overall-rates-sup-perc"> {roundNumber(newOnArtFemalePercent) + "%"}</sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS STARTED ON ART(15+ YRS)
                        </CardHeader>

                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(newOnArtAdults)} </span>
                                <sup className="overall-rates-sup overall-rates-sup-perc"> {roundNumber(newOnArtAdultsPercent) + "%"}</sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CHILDREN STARTED ON ART(&lt;14 YRS)
                        </CardHeader>

                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(newOnArtChildren)} </span>
                                <sup className="overall-rates-sup overall-rates-sup-perc"> {roundNumber(newOnArtChildrenPercent) + "%"}</sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADOLESCENTS STARTED ON ART(10 - 19 YRS)
                        </CardHeader>

                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(newOnArtAdolescents)} </span>
                                <sup className="overall-rates-sup overall-rates-sup-perc"> {roundNumber(newOnArtAdolescentsPercent) + "%"}</sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default NewOnArtOverview;
