import React from 'react';
import { Card, CardBody, CardText, CardTitle, Row, Col } from 'reactstrap';

const DataCardOTZ = ({ title, body, subtitle, percent }) => {
    return (
        <Card className="primary-card-otz">
            <CardBody>
                <Row>
                    <Col className={"primary-card-otz-title"}>
                        {title}
                    </Col>
                </Row>
                <Row>
                    <Col className={"col-3 zero-margin-right"}>
                        <CardTitle tag="h5" className="text-left primary-card-otz-body">
                            {body}
                        </CardTitle>
                    </Col>
                    {
                        percent !== null ?
                            <div className={"col-9 bb"}>
                                <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 11C18.625 11 19.1875 9.6875 18.375 8.875L10.375 0.875C9.875 0.375 9.0625 0.375 8.5625 0.875L0.5625 8.875C-0.25 9.6875 0.3125 11 1.4375 11H17.5Z" fill="#00AD30"/>
                                </svg>
                                <span className="text-left primary-card-otz-percent">{percent}</span>
                            </div> : ""
                    }
                </Row>
                <Row>
                    <Col className={"primary-card-otz-subtitle"}>
                        {subtitle}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default DataCardOTZ;
