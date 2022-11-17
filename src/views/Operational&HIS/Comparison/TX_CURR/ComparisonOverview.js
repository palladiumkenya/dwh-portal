import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import * as newlyStartedOnArtKHIS from '../../../../selectors/Operational&HIS/Comparison/currOnArtKHIS';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../../utils/utils';
import * as currentOnArtOverviewSelectors from '../../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as currentOnArtByAgeSexSelectors from '../../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';

const ComparisonOverviewTxCurr = () => {
    let currARTKHIS = useSelector(newlyStartedOnArtKHIS.getCurrOnArtKHIS);

    const currentOnArt = useSelector(
        currentOnArtOverviewSelectors.getCurrentOnArt
    );
    const currentOnArtMale = useSelector(
        currentOnArtByAgeSexSelectors.getCurrentOnArtBySex
    ).currentOnArtMale;
    const currentOnArtMalePercent = currentOnArt
        ? (currentOnArtMale / currentOnArt) * 100
        : 0;
    const currentOnArtFemale = useSelector(
        currentOnArtByAgeSexSelectors.getCurrentOnArtBySex
    ).currentOnArtFemale;
    const currentOnArtFemalePercent = currentOnArt
        ? (currentOnArtFemale / currentOnArt) * 100
        : 0;
    const currentOnArtAdults = useSelector(
        currentOnArtByAgeSexSelectors.getCurrentOnArtAdults
    ).currentOnArt;
    const currentOnArtAdultsPercent = currentOnArt
        ? (currentOnArtAdults / currentOnArt) * 100
        : 0;
    const currentOnArtAdolescents = useSelector(
        currentOnArtByAgeSexSelectors.getCurrentOnArtAdolescents
    ).currentOnArt;
    const currentOnArtAdolescentsPercent = currentOnArt
        ? (currentOnArtAdolescents / currentOnArt) * 100
        : 0;
    const currentOnArtChildren = useSelector(
        currentOnArtByAgeSexSelectors.getCurrentOnArtChildren
    ).currentOnArt;
    const currentOnArtChildrenPercent = currentOnArt
        ? (currentOnArtChildren / currentOnArt) * 100
        : 0;

    let percOfNewly = (curr, total) => {
        if (total === 0) {
            return 0 + '%';
        }
        return roundNumber((curr / total) * 100) + '%';
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
                            TOTAL CURRENT ON ART
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
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">
                                                KHIS
                                            </span>
                                            <br />
                                            <span
                                                className="comparison-card-numbers"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {formatNumber(
                                                    currARTKHIS.totalOnART
                                                )}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <span className="comparison-card-text">
                                                DWH
                                            </span>
                                            <br />
                                            <span
                                                className="comparison-card-numbers"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {formatNumber(currentOnArt)}
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
                                    {'ADULTS CURRENT ON ART(15+ YRS)'}
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
                                            <Col md={6}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            currARTKHIS.adultsOnART
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            currARTKHIS.adultsOnART,
                                                            currARTKHIS.totalOnART
                                                        )}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        DWH
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            currentOnArtAdults
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            currentOnArtAdultsPercent
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
                    <Row>
                        <Col md={6}>
                            <Card
                                className="card-uploads-consistency-rates"
                                style={{ height: '170px' }}
                            >
                                <CardHeader className="expected-uploads-header">
                                    {'CHILDREN CURRENT ON ART(<14 YRS)'}
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
                                            <Col md={6}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            currARTKHIS.childrenOnART
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            currARTKHIS.childrenOnART,
                                                            currARTKHIS.totalOnART
                                                        )}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        DWH
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            currentOnArtChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            currentOnArtChildrenPercent
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
                                    ADOLESCENTS CURRENT ON ART(10 - 19 YRS)
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
                                            <Col md={6}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            currARTKHIS.adolescentsOnART
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            currARTKHIS.adolescentsOnART,
                                                            currARTKHIS.totalOnART
                                                        )}
                                                    </sup>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        DWH
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            currentOnArtAdolescents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {roundNumber(
                                                            currentOnArtAdolescentsPercent
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

export default ComparisonOverviewTxCurr;
