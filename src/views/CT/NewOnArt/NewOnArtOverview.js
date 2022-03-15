import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentNewOnArtOverviewSelectors from '../../../selectors/CT/NewOnArt/currentNewOnArtOverview';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';

const NewOnArtOverview = () => {
    const newOnArt = useSelector(currentNewOnArtOverviewSelectors.getNewOnArt);
    const newOnArtMale = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtMale);
    const newOnArtMalePercent = newOnArt ? ((newOnArtMale/newOnArt)*100) : 0;
    const newOnArtFemale = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtFemale);
    const newOnArtFemalePercent = newOnArt ? ((newOnArtFemale/newOnArt)*100) : 0;
    const newOnArtAdults = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtAdults);
    const newOnArtAdultsPercent = newOnArt ? ((newOnArtAdults/newOnArt)*100) : 0;
    const newOnArtAdolescents = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtAdolescents);
    const newOnArtAdolescentsPercent = newOnArt ? ((newOnArtAdolescents/newOnArt)*100) : 0;
    const newOnArtChildren = useSelector(currentNewOnArtOverviewSelectors.getNewOnArtChildren);
    const newOnArtChildrenPercent = newOnArt ? ((newOnArtChildren/newOnArt)*100) : 0;

    return (
        <>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            NEWLY STARTED ON ART
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{formatNumber(newOnArt)} </span>
                                <sup className="overall-rates-sup overall-rates-sup-perc"></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <DataCard
                        title="MALES STARTED ON ART"
                        subtitle={roundNumber(newOnArtMalePercent) + "%"}
                        data={formatNumber(newOnArtMale)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="FEMALES STARTED ON ART"
                        subtitle={roundNumber(newOnArtFemalePercent) + "%"}
                        data={formatNumber(newOnArtFemale)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataCard
                        title="ADULTS STARTED ON ART(15+ YRS)"
                        subtitle={roundNumber(newOnArtAdultsPercent) + "%"}
                        data={formatNumber(newOnArtAdults)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="CHILDREN STARTED ON ART(&lt;14 YRS)"
                        subtitle={roundNumber(newOnArtChildrenPercent) + "%"}
                        data={formatNumber(newOnArtChildren)}
                    />
                </Col>
                <Col>
                    <DataCard
                        title="ADOLESCENTS STARTED ON ART(10 - 19 YRS)"
                        subtitle={roundNumber(newOnArtAdolescentsPercent) + "%"}
                        data={formatNumber(newOnArtAdolescents)}
                    />
                </Col>
            </Row>
        </>
    );
}

export default NewOnArtOverview;
