import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getAll } from '../Shared/Api';
import moment from 'moment';
import { useSelector } from 'react-redux';

const HomeOverview = () => {
    const filters = useSelector(state => state.filters);
    const [counties, setCounties] = useState(0);
    const [facilities, setFacilities] = useState(0);
    const [partners, setPartners] = useState(0);

    const [selectedCounty, setSelectedCounty] = useState('');

    const loadCounties = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
        };

        const counties = filters.counties.length > 0 ? filters.counties.toString() : '';
        setSelectedCounty(counties);
        //<strong>{counties}</strong> counties

        const data = await getAll('care-treatment/counties', params);
        setCounties(data.length);
    }, [filters]);

    const loadFacilities = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
        };

        const data = await getAll('care-treatment/facilities', params);
        setFacilities(data.length);
    }, [filters]);

    const loadPartners = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
        };

        const data = await getAll('care-treatment/partners', params);
        setPartners(data.length);
    }, [filters]);

    useEffect(() => {
        loadCounties();
        loadFacilities();
        loadPartners()
    }, [loadCounties, loadFacilities, loadPartners]);

    return (
        <Row>
            <Col>
                <Card className="primary-card">
                    <CardBody className="primary-card-body">
                        <CardTitle tag="h4" className="pb-2">WELCOME</CardTitle>
                        <CardText className="mb-5">
                            <strong>{facilities}</strong> Health Facilities in <strong>{counties}</strong> counties in Kenya,
                            supported by <strong>{partners}</strong> SDPs have ever uploaded care & treatment data to the
                            warehouse since it’s inception. As at {moment().format('MMM YYYY')},
                            <strong> {facilities}</strong> facilities had reported patients current on ART
                        </CardText>
                        <CardTitle tag="h4" className="pb-2">THEME OF THE MONTH</CardTitle>
                        <CardSubtitle tag="h5" className="pb-2">Differenciated Service Delivery</CardSubtitle>
                        <CardText className="mb-5">
                            We will embark on taking you through the various milestones achieved within the
                            Differerenciated Service Delivery program including MMD Uptake of Active Patients,
                            Trends and various categories
                        </CardText>
                        <CardTitle tag="h4" className="pb-2">EMR SITES IN KENYA</CardTitle>
                        <CardSubtitle tag="h5" className="pb-2">Kenya EMR</CardSubtitle>
                        <CardText className="mb-5">
                            Use the map to zero in to certain Counties to understand how programs have been reporting.
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default HomeOverview;
