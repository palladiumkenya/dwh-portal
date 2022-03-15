import React from 'react';
import { Card, CardBody, CardText, CardTitle, Row, Col, CardHeader } from 'reactstrap';


const DataCardCT = ({ title, subtitle, data, bottomSubTitle }) => {
    return (

        <Card className="card-uploads-consistency-rates">
            <CardHeader className="expected-uploads-header">
                {title}
            </CardHeader>
            <CardBody
                className="align-items-center d-flex justify-content-center"
                style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
            >
                <div className="col-12">
                    <span className="expected-uploads-text">{data}</span>
                    <sup className="overall-rates-sup overall-rates-sup-perc">{subtitle}</sup>
                </div>
                <Row>
                    <Col className={"col-12"}>
                        <CardText tag="h5" className="text-center card-bottom-sub-title">
                            {bottomSubTitle}
                        </CardText>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default DataCardCT;
