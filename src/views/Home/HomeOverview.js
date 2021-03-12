import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HomeOverview = () => {
    const counties = useSelector(state => state.ctSites.counties);
    const facilities = useSelector(state => state.ctSites.facilities);
    const partners = useSelector(state => state.ctSites.partners);
    
    return (
        <Row>
            <Col>
                <Card className="primary-card">
                    <CardBody className="primary-card-body">
                        <CardTitle tag="h4" className="pb-2">WELCOME</CardTitle>
                        <CardText className="mb-5">
                            <strong>{facilities.length}</strong> Health Facilities in <strong>{counties.length}</strong> counties in Kenya,
                            supported by <strong>{partners.length}</strong> SDPs have ever uploaded care & treatment data to the
                            warehouse since it’s inception. As at {moment().format('MMM YYYY')},
                            <strong> {facilities.length}</strong> facilities had reported patients current on ART
                        </CardText>
                        <CardTitle tag="h4" className="pb-2">KEY HIGHLIGHTS</CardTitle>
                        <ol>
                            <li>Trends in identification of new positives cumulatively and by month. The highlight also shows male and female identification trends by month.</li>
                            <li>Overall MMD uptake based on last month's patients current on ART. The highlight also shows MMD uptake among males and females.</li>
                        </ol>
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
