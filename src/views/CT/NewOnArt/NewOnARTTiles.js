import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { getAll } from '../../Shared/Api';
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';

const NewOnARTTiles = () => {
    const filters = useSelector(state => state.filters);
    const [newlyStartedOnARTTiles, setNewlyStartedOnARTTiles] = useState({
        totalStartedOnART: 0,
        totalStartedOnARTText: '',

        malesStartedOnART: 0,
        malesStartedOnARTText: '',
        malesStartedOnARTPercent: '',

        femalesStartedOnART: 0,
        femalesStartedOnARTText: '',
        femalesStartedOnARTPercent: '',

        adolescentsStartedOnART: 0,
        adolescentsStartedOnARTText: '',
        adolescentsStartedOnARTPercent: '',

        childrenStartedOnART: 0,
        childrenStartedOnARTText: '',
        childrenStartedOnARTPercent: '',
    });

    const loadNewlyStartedARTTiles = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        const result = await getAll('care-treatment/getNewlyStartedDesegregated', params);
        let data = [
            result.TotalStartedOnART ? result.TotalStartedOnART : 0,
            result.MalesStartedOnART ? result.MalesStartedOnART : 0,
            result.FemalesStartedOnART ? result.FemalesStartedOnART : 0,
            result.AdolescentsStartedOnART ? result.AdolescentsStartedOnART : 0,
            result.ChildrenStartedOnART ? result.ChildrenStartedOnART : 0
        ];
        setNewlyStartedOnARTTiles({
            totalStartedOnART: data[0],
            totalStartedOnARTText: data[0].toLocaleString('en'),
            malesStartedOnART: data[1],
            malesStartedOnARTText: data[1].toLocaleString('en'),
            malesStartedOnARTPercent: parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%',
            femalesStartedOnART: data[2],
            femalesStartedOnARTText: data[2].toLocaleString('en'),
            femalesStartedOnARTPercent: parseFloat(((data[2]/data[0])*100).toString()).toFixed(0) + '%',
            adolescentsStartedOnART: data[3],
            adolescentsStartedOnARTText: data[3].toLocaleString('en'),
            adolescentsStartedOnARTPercent: parseFloat(((data[3]/data[0])*100).toString()).toFixed(0) + '%',
            childrenStartedOnART: data[4],
            childrenStartedOnARTText: data[4].toLocaleString('en'),
            childrenStartedOnARTPercent: parseFloat(((data[4]/data[0])*100).toString()).toFixed(0) + '%'
        });
    }, [filters]);

    useEffect(() => {
        loadNewlyStartedARTTiles();
    }, [loadNewlyStartedARTTiles]);


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card className="primary-card" style={{ height: '95%' }}>
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-center m-2">TOTAL STARTED ON ART</CardTitle>
                            <Row className="justify-content-center">
                                <Col className="col-7">
                                    <CardTitle tag="h5" className="primary-card-body-subtitle text-right" style={{ color: '#FFFFFF' }}>100%</CardTitle>
                                </Col>
                            </Row>
                            <CardText className="primary-card-body-text text-center">{newlyStartedOnARTTiles.totalStartedOnARTText}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Card className="primary-card" style={{ height: '90%' }}>
                                <CardBody className="primary-card-body">
                                    <CardTitle tag="h5" className="text-center m-2">MALES STARTED ON ART</CardTitle>
                                    <Row className="justify-content-center">
                                        <Col className="col-7">
                                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{newlyStartedOnARTTiles.malesStartedOnARTPercent}</CardSubtitle>
                                        </Col>
                                    </Row>
                                    <CardText className="primary-card-body-text text-center">{newlyStartedOnARTTiles.malesStartedOnARTText}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="primary-card" style={{ height: '90%' }}>
                                <CardBody className="primary-card-body">
                                    <CardTitle tag="h5" className="text-center m-2">ADOLESCENTS STARTED ON ART</CardTitle>
                                    <Row className="justify-content-center">
                                        <Col className="col-7">
                                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{newlyStartedOnARTTiles.adolescentsStartedOnARTPercent}</CardSubtitle>
                                        </Col>
                                    </Row>
                                    <CardText className="primary-card-body-text text-center">{newlyStartedOnARTTiles.adolescentsStartedOnARTText}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Card className="primary-card" style={{ height: '90%' }}>
                                <CardBody className="primary-card-body">
                                    <CardTitle tag="h5" className="text-center m-2">FEMALES STARTED ON ART</CardTitle>
                                    <Row className="justify-content-center">
                                        <Col className="col-7">
                                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{newlyStartedOnARTTiles.femalesStartedOnARTPercent}</CardSubtitle>
                                        </Col>
                                    </Row>
                                    <CardText className="primary-card-body-text text-center">{newlyStartedOnARTTiles.femalesStartedOnARTText}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="primary-card" style={{ height: '90%' }}>
                                <CardBody className="primary-card-body">
                                    <CardTitle tag="h5" className="text-center m-2">CHILDREN STARTED ON ART</CardTitle>
                                    <Row className="justify-content-center">
                                        <Col className="col-7">
                                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{newlyStartedOnARTTiles.childrenStartedOnARTPercent}</CardSubtitle>
                                        </Col>
                                    </Row>
                                    <CardText className="primary-card-body-text text-center">{newlyStartedOnARTTiles.childrenStartedOnARTText}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default NewOnARTTiles;
