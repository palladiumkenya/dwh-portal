import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/newlyStartedOnArtKHIS';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../../utils/utils';
import * as currentNewOnArtOverviewSelectors from '../../../../selectors/CT/NewOnArt/currentNewOnArtOverview';


const ComparisonOverview = () => {
    let newlyKHIS = useSelector(newlyStartedOnArtKHIS.getNewlyStartedOnArtKHIS);
    const newOnArt = useSelector(currentNewOnArtOverviewSelectors.getNewOnArt);
    // const newOnArtMale = useSelector(
    //     currentNewOnArtOverviewSelectors.getNewOnArtMale
    // );
    // const newOnArtMalePercent = newOnArt ? (newOnArtMale / newOnArt) * 100 : 0;
    // const newOnArtFemale = useSelector(
    //     currentNewOnArtOverviewSelectors.getNewOnArtFemale
    // );
    // const newOnArtFemalePercent = newOnArt
    //     ? (newOnArtFemale / newOnArt) * 100
    //     : 0;
    const newOnArtAdults = useSelector(
        currentNewOnArtOverviewSelectors.getNewOnArtAdults
    );
    const newOnArtAdultsPercent = newOnArt
        ? (newOnArtAdults / newOnArt) * 100
        : 0;
    const newOnArtAdolescents = useSelector(
        currentNewOnArtOverviewSelectors.getNewOnArtAdolescents
    );
    const newOnArtAdolescentsPercent = newOnArt
        ? (newOnArtAdolescents / newOnArt) * 100
        : 0;
    const newOnArtChildren = useSelector(
        currentNewOnArtOverviewSelectors.getNewOnArtChildren
    );
    const newOnArtChildrenPercent = newOnArt
        ? (newOnArtChildren / newOnArt) * 100
        : 0;

    let percOfNewly = (newly, total) => {
        if (total === 0 || isNaN(total) || total === null) {
            return 0 + '%';
        }
        return roundNumber((newly / total) * 100) + '%';
    };

    return (
        <>
            <Row>
                <Col md={4}>
                    <Card
                        className="card-uploads-consistency-rates"
                        style={{ height: '360px' }}
                    >
                        <CardHeader className="expected-uploads-header">
                            TOTAL NEWLY STARTED ON ART
                        </CardHeader>
                        <CardBody
                            className="vertical_dotted_line"
                            style={{
                                backgroundColor: '#F6F6F6',
                                height: '100%',
                            }}
                        >
                            <div>
                                <Row>
                                    <Col md={4}>
                                        <div>
                                            <span className="comparison-card-text">
                                                KHIS
                                            </span>
                                            <br />
                                            <span className="comparison-card-numbers">
                                                {formatNumber(
                                                    newlyKHIS.totalNewlyStarted
                                                )}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div>
                                            <span className="comparison-card-text">
                                                DWH
                                            </span>
                                            <br />
                                            <span className="comparison-card-numbers">
                                                {formatNumber(newOnArt)}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div>
                                            <span className="comparison-card-text">
                                                SMART
                                            </span>
                                            <br />
                                            <span className="comparison-card-numbers">
                                                {formatNumber(0)}
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={12}>
                            <Card
                                className="card-uploads-consistency-rates"
                                style={{ height: '170px' }}
                            >
                                <CardHeader className="expected-uploads-header">
                                    {'ADULTS STARTED ON ART(15+ YRS)'}
                                </CardHeader>
                                <CardBody
                                    className="vertical_dotted_line"
                                    style={{
                                        backgroundColor: '#F6F6F6',
                                        height: '100%',
                                    }}
                                >
                                    <div>
                                        <Row>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            newlyKHIS.adultsNewlyStarted
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            newlyKHIS.adultsNewlyStarted,
                                                            newlyKHIS.totalNewlyStarted
                                                        )}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        DWH
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            newOnArtAdults
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            newOnArtAdultsPercent
                                                        ) + '%'}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        SMART
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            0
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            0
                                                        ) + '%'}
                                                    </sup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card
                                className="card-uploads-consistency-rates"
                                style={{ height: '170px' }}
                            >
                                <CardHeader className="expected-uploads-header">
                                    {'CHILDREN STARTED ON ART(<14 YRS)'}
                                </CardHeader>
                                <CardBody
                                    className="vertical_dotted_line"
                                    style={{
                                        backgroundColor: '#F6F6F6',
                                        height: '100%',
                                    }}
                                >
                                    <div>
                                        <Row>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            newlyKHIS.childrenNewlyStarted
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            newlyKHIS.childrenNewlyStarted,
                                                            newlyKHIS.totalNewlyStarted
                                                        )}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        DWH
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            newOnArtChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            newOnArtChildrenPercent
                                                        ) + '%'}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        SMART
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            0
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            0
                                                        ) + '%'}
                                                    </sup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card
                                className="card-uploads-consistency-rates"
                                style={{ height: '170px' }}
                            >
                                <CardHeader className="expected-uploads-header">
                                    ADOLESCENTS STARTED ON ART(10 - 19 YRS)
                                </CardHeader>
                                <CardBody
                                    className="vertical_dotted_line"
                                    style={{
                                        backgroundColor: '#F6F6F6',
                                        height: '100%',
                                    }}
                                >
                                    <div>
                                        <Row>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            newlyKHIS.adolescentsNewlyStarted
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            newlyKHIS.adolescentsNewlyStarted,
                                                            newlyKHIS.totalNewlyStarted
                                                        )}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        DWH
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            newOnArtAdolescents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            newOnArtAdolescentsPercent
                                                        ) + '%'}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        SMART
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            0
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            0
                                                        ) + '%'}
                                                    </sup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default ComparisonOverview;
