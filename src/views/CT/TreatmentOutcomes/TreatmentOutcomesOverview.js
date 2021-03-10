import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import * as newOnArtOverviewSelectors from '../../../selectors/CT/NewOnArt/newOnArtOverview';
import * as treatmentOutcomesBySexSelectors from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesBySex';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const TreatmentOutcomesOverview = () => {
    const startedOnArt = useSelector(newOnArtOverviewSelectors.getNewOnArt);
    const active = useSelector(treatmentOutcomesBySexSelectors.getActive);
    const dead = useSelector(treatmentOutcomesBySexSelectors.getDead);
    const ltfu = useSelector(treatmentOutcomesBySexSelectors.getLtfu);
    const stopped = useSelector(treatmentOutcomesBySexSelectors.getStopped);
    const transferOut = useSelector(treatmentOutcomesBySexSelectors.getTransferOut);
    const netCohort = startedOnArt > 0 ? (startedOnArt - transferOut - stopped) : 0;
    const deadPercent = startedOnArt > 0 ? ((dead/startedOnArt)*100) : 0;
    const ltfuPercent = startedOnArt > 0 ? ((ltfu/startedOnArt)*100) : 0;
    const stoppedPercent = startedOnArt > 0 ? ((stopped/startedOnArt)*100) : 0;
    const transferOutPercent = startedOnArt > 0 ? ((transferOut/startedOnArt)*100) : 0;

    return (
        <Row>
            <Col xs={12} sm={12} md={12} lg={3}>
                <Card className="primary-card" style={{height:"95%"}}>
                    <CardBody className="primary-card-body" style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                        <Row style={{display:"block"}}>
                            <Col>
                                <CardTitle tag="h5" className="text-center m-2">EVER STARTED ART</CardTitle>
                                <Row className="justify-content-center">
                                    <Col className="col-7">
                                        <CardTitle tag="h5" className="primary-card-body-subtitle text-right" style={{ color: '#FFFFFF' }}>100%</CardTitle>
                                    </Col>
                                </Row>
                                <CardText className="primary-card-body-text text-center">{formatNumber(startedOnArt)}</CardText>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={12} sm={12} md={12} lg={9}>
                <Row>
                    <Col>
                        <DataCard
                            title="TRANSFERRED OUT"
                            subtitle={roundNumber(transferOutPercent) + "%"}
                            data={formatNumber(transferOut)}
                        />
                    </Col>
                    <Col>
                        <DataCard
                            title="STOPPED ART"
                            subtitle={roundNumber(stoppedPercent) + "%"}
                            data={formatNumber(stopped)}
                        />
                    </Col>
                    <Col>
                        <DataCard
                            title="NET COHORT"
                            subtitle={null}
                            data={formatNumber(netCohort)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataCard
                            title="CURRENT ON ART"
                            subtitle={null}
                            data={formatNumber(active)}
                        />
                    </Col>
                    <Col>
                        <DataCard
                            title="LOST TO FOLLOW UP"
                            subtitle={roundNumber(ltfuPercent) + "%"}
                            data={formatNumber(ltfu)}
                        />
                    </Col>
                    <Col>
                        <DataCard
                            title="DEAD"
                            subtitle={roundNumber(deadPercent) + "%"}
                            data={formatNumber(dead)}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default TreatmentOutcomesOverview;
