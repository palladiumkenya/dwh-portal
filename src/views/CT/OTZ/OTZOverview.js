import React from 'react';
import { Col, Row } from 'reactstrap';
import DataCardOTZ from '../../Shared/DataCardOTZ';

const OTZOverview = () => {
    return (
        <Row>
            <Col>
                <DataCardOTZ title={"TOTAL ADOLESCENTS"} body={"1,442"} subtitle={"Total adolescents - Dec 2020"} percent={null}  />
            </Col>
            <Col>
                <DataCardOTZ title={"ENROLLED ON OTZ"} body={"4427"} subtitle={"Total adolescents - Dec 2020"} percent={"92%"} />
            </Col>
            <Col>
                <DataCardOTZ />
            </Col>
            <Col>
                <DataCardOTZ />
            </Col>
        </Row>
    );
}

export default OTZOverview;
