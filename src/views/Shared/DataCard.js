import React from 'react';
import { Card, CardBody, CardText, CardTitle, Row, Col } from 'reactstrap';

const DataCard = ({ title, subtitle, data }) => {
    return (
        <Card className="primary-card">
            <CardBody className="primary-card-body">
                <CardTitle tag="h5" className="text-center m-2">{title}</CardTitle>
                <Row className="justify-content-center">
                    <Col className="col-7">
                        {
                            subtitle === null ?
                            <CardTitle tag="h5" className="primary-card-body-subtitle text-right" style={{ color: '#FFFFFF' }}>100%</CardTitle> :
                            <CardTitle tag="h5" className="primary-card-body-subtitle text-right">{subtitle}</CardTitle>
                        }
                    </Col>
                </Row>
                <CardText className="primary-card-body-text text-center">{data}</CardText>
            </CardBody>
        </Card>
    );
};

export default DataCard;
