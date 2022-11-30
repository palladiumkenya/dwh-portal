import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../../utils/utils';

const ComparisonOverview= () => {

    const KHISHtsPos = 120500;
    const DWHHtsPos = 100230;
    const KHISHtsPosAdult = 21000;
    const DWHHtsPosAdult = 45000;
    const KHISHtsPosChildren = 25260;
    const DWHHtsPosChildren = 31000;
    const KHISHtsPosAdolecents = 17431;
    const DWHHtsPosAdolecents = 10531;

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
                            TOTAL TESTED HIV POSITIVE
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
                                                {formatNumber(KHISHtsPos)}
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
                                                {formatNumber(DWHHtsPos)}
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
                                    {'ADULTS TESTED HIV POSITIVE (15+ YRS)'}
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
                                                            KHISHtsPosAdult
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            KHISHtsPosAdult,
                                                            KHISHtsPos
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
                                                            DWHHtsPosAdult
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHtsPosAdult,
                                                            DWHHtsPos
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
                                    {'CHILDREN TESTED HIV POSITIVE (<14 YRS)'}
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
                                                            KHISHtsPosChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            KHISHtsPosChildren,
                                                            KHISHtsPos
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
                                                            DWHHtsPosChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHtsPosChildren,
                                                            DWHHtsPos
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
                                    ADOLESCENTS TESTED HIV POSITIVE (10 - 19 YRS)
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
                                                            KHISHtsPosAdolecents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            KHISHtsPosAdolecents,
                                                            KHISHtsPos
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
                                                            DWHHtsPosAdolecents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHtsPosAdolecents,
                                                            DWHHtsPos
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
