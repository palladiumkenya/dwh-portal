import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import * as currentOnArtByAgeSexSelectors from '../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import { formatNumber } from '../../utils/utils';

const HomeAgeDistribution = () => {
    const currentOnArtAdults = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtAdults);
    const currentOnArtAdolescents = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtAdolescents);
    const currentOnArtChildren = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtChildren);

    return (
        <>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-left m-2">ADULTS ON ART</CardTitle>
                            <CardSubtitle tag="h6" className="text-left m-2">15+ YEARS</CardSubtitle>
                            {/* <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle> */}
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{formatNumber(currentOnArtAdults.currentOnArt)}</CardText>
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
                            {/* <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle> */}
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{formatNumber(currentOnArtAdolescents.currentOnArt)}</CardText>
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
                            {/* <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle> */}
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{formatNumber(currentOnArtChildren.currentOnArt)}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default HomeAgeDistribution;
