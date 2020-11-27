import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getAll } from '../Shared/Api';

const HomeAgeDistribution = () => {
    const filters = useSelector(state => state.filters);
    const [ARTClientsChildren, setARTClientsChildren] = useState({ ActiveARTChildren: '' });
    const [ARTClientsAdults, setARTClientsAdults] = useState({ ActiveARTAdults: '' });
    const [ARTClientsAdolescents, setARTClientsAdolescents] = useState({ ActiveARTAdolescents: '' });

    const loadActiveOnARTChildren = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        let ActiveARTChildren = 0;
        const result = await getAll('care-treatment/activeArtChildren', params);
        if(result && result.length > 0) {
            ActiveARTChildren = result[0].ActiveARTChildren;
        }
        setARTClientsChildren({
            ActiveARTChildren: ActiveARTChildren.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [filters]);

    const loadActiveOnARTAdults = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        let ActiveARTAdults = 0;
        const result = await getAll('care-treatment/activeArtAdults', params);
        if(result && result.length > 0) {
            ActiveARTAdults = result[0].ActiveARTAdults;
        }
        setARTClientsAdults({
            ActiveARTAdults: ActiveARTAdults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [filters]);

    const loadActiveOnARTAdolescents = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        let ActiveARTAdolescents = 0;
        const result = await getAll('care-treatment/activeArtAdolescents', params);
        if(result && result.length > 0) {
            ActiveARTAdolescents = result[0].ActiveARTAdolescents;
        }
        setARTClientsAdolescents({
            ActiveARTAdolescents: ActiveARTAdolescents.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [filters]);

    useEffect(() => {
        loadActiveOnARTChildren();
        loadActiveOnARTAdults();
        loadActiveOnARTAdolescents();
    }, [loadActiveOnARTChildren, loadActiveOnARTAdults, loadActiveOnARTAdolescents]);

    return (
        <>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-left m-2">ADULTS ON ART</CardTitle>
                            <CardSubtitle tag="h6" className="text-left m-2">15+ YEARS</CardSubtitle>
                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle>
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{ARTClientsAdults.ActiveARTAdults}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-left m-2">ADOLESCENTS ON ART</CardTitle>
                            <CardSubtitle tag="h6" className="text-left m-2">10-19 YEARS</CardSubtitle>
                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle>
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{ARTClientsAdolescents.ActiveARTAdolescents}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-left m-2">CHILDREN ON ART</CardTitle>
                            <CardSubtitle tag="h6" className="text-left m-2">0-14 YEARS</CardSubtitle>
                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle>
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{ARTClientsChildren.ActiveARTChildren}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default HomeAgeDistribution;
