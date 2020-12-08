import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { getAll } from '../../Shared/Api';
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';

const CurrentOnARTTiles = () => {
    const filters = useSelector(state => state.filters);
    const [currentOnArtTiles, setCurrentOnArtTiles] = useState({
        currentOnArt: 0,
        currentOnArtText: '',
        eligibleForVl: 0,
        eligibleForVlText: '',
        eligibleForVlPercent: '',
        hasCurrentVl: 0,
        hasCurrentVlText: '',
        hasCurrentVlPercent: '',
        suppressed: 0,
        suppressedText: '',
        suppressedPercent: '',
        highViremia: 0,
        highViremiaText: '',
        highViremiaPercent: '',
        lowViremia: 0,
        lowViremiaText: '',
        lowViremiaPercent: '',
    });

    const loadHomeVLCascade = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        const result = await getAll('care-treatment/viralLoadCascade', params);
        let data = [
            result.TX_CURR ? result.TX_CURR : 0,
            result.Eligible4VL ? result.Eligible4VL : 0,
            result.Last12MonthVL ? result.Last12MonthVL : 0,
            result.Last12MVLSup ? result.Last12MVLSup : 0,
            result.HighViremia ? result.HighViremia : 0,
            result.LowViremia ? result.LowViremia : 0
        ];
        setCurrentOnArtTiles({
            currentOnArt: data[0],
            currentOnArtText: data[0].toLocaleString('en'),
            eligibleForVl: data[1],
            eligibleForVlText: data[1].toLocaleString('en'),
            eligibleForVlPercent: parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%',
            hasCurrentVl: data[2],
            hasCurrentVlText: data[2].toLocaleString('en'),
            hasCurrentVlPercent: parseFloat(((data[2]/data[0])*100).toString()).toFixed(0) + '%',
            suppressed: data[3],
            suppressedText: data[3].toLocaleString('en'),
            suppressedPercent: parseFloat(((data[3]/data[2])*100).toString()).toFixed(0) + '%',
            highViremia: data[4],
            highViremiaText: data[4].toLocaleString('en'),
            highViremiaPercent: parseFloat(((data[4]/data[0])*100).toString()).toFixed(0) + '%',
            lowViremia: data[5],
            lowViremiaText: data[5].toLocaleString('en'),
            lowViremiaPercent: parseFloat(((data[5]/data[0])*100).toString()).toFixed(0) + '%',
        });
    }, [filters]);

    useEffect(() => {
        loadHomeVLCascade();
    }, [loadHomeVLCascade]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-center m-2">CURRENTLY ON ART</CardTitle>
                            <Row className="justify-content-center">
                                <Col className="col-7">
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right" style={{ color: '#FFFFFF' }} >100%</CardSubtitle>
                                </Col>
                            </Row>
                            <CardText className="primary-card-body-text text-center">{currentOnArtTiles.currentOnArtText}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-center m-2">ELIGIBLE FOR VL</CardTitle>
                            <Row className="justify-content-center">
                                <Col className="col-7">
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{currentOnArtTiles.eligibleForVlPercent}</CardSubtitle>
                                </Col>
                            </Row>
                            <CardText className="primary-card-body-text text-center">{currentOnArtTiles.eligibleForVlText}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-center m-2">HAS CURRENT VIRAL LOAD</CardTitle>
                            <Row className="justify-content-center">
                                <Col className="col-7">
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{currentOnArtTiles.hasCurrentVlPercent}</CardSubtitle>
                                </Col>
                            </Row>
                            <CardText className="primary-card-body-text text-center">{currentOnArtTiles.hasCurrentVlText}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-center m-2">VIRALLY SUPPRESSED</CardTitle>
                            <Row className="justify-content-center">
                                <Col className="col-7">
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{currentOnArtTiles.suppressedPercent}</CardSubtitle>
                                </Col>
                            </Row>
                            <CardText className="primary-card-body-text text-center">{currentOnArtTiles.suppressedText}</CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-center m-2">LOW LEVEL VIREMIA</CardTitle>
                            <Row className="justify-content-center">
                                <Col className="col-7">
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{currentOnArtTiles.lowViremiaPercent}</CardSubtitle>
                                </Col>
                            </Row>
                            <CardText className="primary-card-body-text text-center">{currentOnArtTiles.lowViremiaText}</CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-center m-2">HIGH VIRAL LOAD</CardTitle>
                            <Row className="justify-content-center">
                                <Col className="col-7">
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{currentOnArtTiles.highViremiaPercent}</CardSubtitle>
                                </Col>
                            </Row>
                            <CardText className="primary-card-body-text text-center">{currentOnArtTiles.highViremiaText}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CurrentOnARTTiles;
