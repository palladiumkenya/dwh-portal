import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../../utils/utils';

const ComparisonOverview= () => {

    const KHISHtsTested = 120500;
    const DWHHtsTested = 100230;
    const KHISHtsTestedAdult = 21000;
    const DWHHtsTestedAdult = 45000;
    const KHISHtsTestedChildren = 25260;
    const DWHHtsTestedChildren = 31000;
    const KHISHtsTestedAdolecents = 17431;
    const DWHHtsTestedAdolecents = 10531;

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
                            TOTAL HTS TESTED
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
                                                {formatNumber(KHISHtsTested)}
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
                                                {formatNumber(DWHHtsTested)}
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
                                    {'ADULTS HTS TESTED (15+ YRS)'}
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
                                                            KHISHtsTestedAdult
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            KHISHtsTestedAdult,
                                                            KHISHtsTested
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
                                                            DWHHtsTestedAdult
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHtsTestedAdult,
                                                            DWHHtsTested
                                                        )}
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
                                    {'CHILDREN HTS TESTED (<14 YRS)'}
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
                                                            KHISHtsTestedChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            KHISHtsTestedChildren,
                                                            KHISHtsTested
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
                                                            DWHHtsTestedChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHtsTestedChildren,
                                                            DWHHtsTested
                                                        )}
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
                                    ADOLESCENTS HTS TESTED (10 - 19 YRS)
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
                                                            KHISHtsTestedAdolecents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            KHISHtsTestedAdolecents,
                                                            KHISHtsTested
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
                                                            DWHHtsTestedAdolecents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHtsTestedAdolecents,
                                                            DWHHtsTested
                                                        )}
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
