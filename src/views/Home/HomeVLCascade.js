import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardText, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import { getAll } from '../Shared/Api';

const HomeVLCascade = () => {
    const filters = useSelector(state => state.filters);
    const [vlCascade, setHomeVLCascade] = useState({
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
        suppressedPercent: ''
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
        ];
        setHomeVLCascade({
            currentOnArt: data[0],
            currentOnArtText: data[0].toLocaleString('en'),
            eligibleForVl: data[1],
            eligibleForVlText: data[1].toLocaleString('en'),
            eligibleForVlPercent: typeof data[1] !== 'undefined' && typeof data[0] !== 'undefined' && data[1] !== 0 && data[0] !== 0 ? parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%' : 0 + '%',
            hasCurrentVl: data[2],
            hasCurrentVlText: data[2].toLocaleString('en'),
            hasCurrentVlPercent: typeof data[2] !== 'undefined' && typeof data[1] !== 'undefined' && data[2] !== 0 && data[1] !== 0 ? parseFloat(((data[2]/data[1])*100).toString()).toFixed(0) + '%' : 0 + '%',
            suppressed: data[3],
            suppressedText: data[3].toLocaleString('en'),
            suppressedPercent: typeof data[3] !== 'undefined' && typeof data[2] !== 'undefined' && data[3] !== 0 && data[2] !== 0 ? parseFloat(((data[3]/data[2])*100).toString()).toFixed(0) + '%' : 0 + '%'
        });

        console.log(data[1]);
    }, [filters]);

    useEffect(() => {
        loadHomeVLCascade();
    }, [loadHomeVLCascade]);

    return (
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
                        <CardText className="primary-card-body-text text-center">{vlCascade.currentOnArtText}</CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="primary-card">
                    <CardBody className="primary-card-body">
                        <CardTitle tag="h5" className="text-center m-2">ELIGIBLE FOR VL</CardTitle>
                        <Row className="justify-content-center">
                            <Col className="col-7">
                                <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{vlCascade.eligibleForVlPercent}</CardSubtitle>
                            </Col>
                        </Row>
                        <CardText className="primary-card-body-text text-center">{vlCascade.eligibleForVlText}</CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="primary-card">
                    <CardBody className="primary-card-body">
                        <CardTitle tag="h5" className="text-center m-2">HAS CURRENT VIRAL LOAD</CardTitle>
                        <Row className="justify-content-center">
                            <Col className="col-7">
                                <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{vlCascade.hasCurrentVlPercent}</CardSubtitle>
                            </Col>
                        </Row>
                        <CardText className="primary-card-body-text text-center">{vlCascade.hasCurrentVlText}</CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="primary-card">
                    <CardBody className="primary-card-body">
                        <CardTitle tag="h5" className="text-center m-2">SUPPRESSED</CardTitle>
                        <Row className="justify-content-center">
                            <Col className="col-7">
                                <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{vlCascade.suppressedPercent}</CardSubtitle>
                            </Col>
                        </Row>
                        <CardText className="primary-card-body-text text-center">{vlCascade.suppressedText}</CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default HomeVLCascade;
