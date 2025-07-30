import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';

const HomeOverview = () => {
    const counties = useSelector(state => state.ctSites.counties);
    const facilities = useSelector(state => state.ctSites.facilities);
    const partners = useSelector(state => state.ctSites.partners);
    const totalCounties = useSelector(state => state.dwhSummary.totalCounties);
    const totalFacilities = useSelector(state => state.dwhSummary.totalFacilities);
    const totalPartners = useSelector(state => state.dwhSummary.totalPartners);

    return (
        <Row>
            <Col>
                <Card className="primary-card">
                    <CardBody className="primary-card-body">
                        <CardTitle tag="h4" className="pb-2">WELCOME</CardTitle>
                        <CardText className="mb-5">
                            <p>
                                Since the inception of the National Data Warehouse(NDWH), a cumulative total of <strong>{facilities.length}</strong> Health Facilities across <strong>{counties.length}</strong> counties in Kenya,
                                supported by various <strong>Service Delivery Partners(SDPs)</strong> have uploaded <strong>Care and Treatment</strong> data to the platform.
                            </p>
                            <p>
                                As of <strong>{moment().format('MMMM YYYY')}</strong>, <strong>{totalFacilities}</strong> facilities submitted Care and Treatment datasets to the NDWH,
                                supported by <strong>{totalPartners}</strong> SDPs operating in <strong>{totalCounties}</strong> counties.
                            </p>
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
