import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';

const SectionHeader = ({ title, description}) => {
    return (
        <>
            <br></br>
            <div className="strip"></div>
            <Card className="pageHeading_reporting">
                <CardBody>
                    <Row>
                        <Col xl={3} lg={3} md={4} sm={6} xs={12}>
                            <div className="reporting-rates-card-title">
                                {title}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1} className="d-none d-sm-block">
                            <div className="reporting-rates-card-separator"></div>
                        </Col>
                        <Col xl={8} lg={8} md={7} sm={5} className="d-none d-sm-block">
                            <div className="reporting-rates-card-overview">
                                {description}
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};

export default SectionHeader;
