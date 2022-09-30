import { useSelector } from 'react-redux';
import React from 'react';
import { Col, Row } from 'reactstrap';
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import { formatNumber, roundNumber } from '../../../utils/utils';
import {
    Card,
    CardBody,
    CardHeader,
} from 'reactstrap';
import DataCardCT from '../../Shared/DataCardCT';

const CurrentOnArtOverview = () => {
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const currentOnArtMale = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtBySex).currentOnArtMale;
    const currentOnArtMalePercent = currentOnArt ? ((currentOnArtMale/currentOnArt)*100) : 0;
    const currentOnArtFemale = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtBySex).currentOnArtFemale;
    const currentOnArtFemalePercent = currentOnArt ? ((currentOnArtFemale/currentOnArt)*100) : 0;
    const currentOnArtAdults = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtAdults).currentOnArt;
    const currentOnArtAdultsPercent = currentOnArt ? ((currentOnArtAdults/currentOnArt)*100) : 0;
    const currentOnArtAdolescents = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtAdolescents).currentOnArt;
    const currentOnArtAdolescentsPercent = currentOnArt ? ((currentOnArtAdolescents/currentOnArt)*100) : 0;
    const currentOnArtChildren = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtChildren).currentOnArt;
    const currentOnArtChildrenPercent = currentOnArt ? ((currentOnArtChildren/currentOnArt)*100) : 0;
    const currentOnArtVerified = useSelector(currentOnArtOverviewSelectors.getCurrentOnArtVerified);

    return (
        <>
            <Row>
                <Col
                    className={
                        'col-3 col-lg-3 col-md-12 col-sm-12 col-xs-12  col-xl-3'
                    }
                >
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            {'TOTAL CURRENT ON ART'}
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '265px',
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">
                                    {formatNumber(currentOnArt)}
                                </span>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col
                    className={
                        'col-9 col-lg-9 col-md-12 col-sm-12 col-xs-12  col-xl-9'
                    }
                >
                    <Row>
                        <Col
                            className={
                                'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                            }
                        >
                            <DataCardCT
                                title={'VERIFIED & CURRENT ON ART'}
                                data={formatNumber(currentOnArtVerified)}
                            />
                        </Col>
                        <Col
                            className={
                                'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                            }
                        >
                            <DataCardCT
                                title="MALES CURRENT ON ART"
                                subtitle={
                                    roundNumber(currentOnArtMalePercent) + '%'
                                }
                                data={formatNumber(currentOnArtMale)}
                            />
                        </Col>
                        <Col
                            className={
                                'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 col-xl-4'
                            }
                        >
                            <DataCardCT
                                title="FEMALES CURRENT ON ART"
                                subtitle={
                                    roundNumber(currentOnArtFemalePercent) + '%'
                                }
                                data={formatNumber(currentOnArtFemale)}
                            />
                        </Col>
                        <Col
                            className={
                                'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                            }
                        >
                            <DataCardCT
                                title="ADULTS CURRENT ON ART(15+ YRS)"
                                subtitle={
                                    roundNumber(currentOnArtAdultsPercent) + '%'
                                }
                                data={formatNumber(currentOnArtAdults)}
                            />
                        </Col>
                        <Col
                            className={
                                'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                            }
                        >
                            <DataCardCT
                                title="CHILDREN CURRENT ON ART(<15 YRS)"
                                subtitle={
                                    roundNumber(currentOnArtChildrenPercent) +
                                    '%'
                                }
                                data={formatNumber(currentOnArtChildren)}
                            />
                        </Col>
                        <Col
                            className={
                                'col-4 col-lg-4 col-md-6 col-sm-12 col-xs-12  col-xl-4'
                            }
                        >
                            <DataCardCT
                                title="ADOLESCENTS CURRENT ON ART(10 - 19 YRS)"
                                subtitle={
                                    roundNumber(
                                        currentOnArtAdolescentsPercent
                                    ) + '%'
                                }
                                data={formatNumber(currentOnArtAdolescents)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default CurrentOnArtOverview;
