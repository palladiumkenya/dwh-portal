import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const HomeOverview = () => {
    return (
        <Row>
            <Col>
                <Card className="primary-card">
                    <CardBody className="primary-card-body">
                        <CardTitle tag="h4" className="pb-2">WELCOME</CardTitle>
                        <CardText className="mb-5">
                            <strong>1223</strong> Health Facilities in 44 Countries in Kenya,supported by 44 SDPs have ever uploaded care & treatment data to the warehouse since it’s inception. As at July 2020, <strong>1035</strong> facilities had reported patients current on ART
                        </CardText>
                        <CardTitle tag="h4" className="pb-2">THEME OF THE MONTH</CardTitle>
                        <CardSubtitle tag="h5" className="pb-2">Differenciated Service Delivery</CardSubtitle>
                        <CardText className="mb-5">
                            We will embark on taking you through the various milestones achieved within the Differerenciated Service Delivery program including MMD Uptake of Active Patients, Trends and various categories
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
