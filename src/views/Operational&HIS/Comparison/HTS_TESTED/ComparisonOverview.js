import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../../utils/utils';
import moment from 'moment';
import { getAll } from './../../../Shared/Api';
import * as htsTestKHIS from '../../../../selectors/Operational&HIS/Comparison/htsTestByGenderKHIS';

const ComparisonOverview= () => {
    const filters = useSelector((state) => state.filters);
    const [DWHHts, setDWHHtsOverview] = useState({
        DWHHtsTest: 0,
        DWHHtsTestAdult: 0,
        DWHHtsTestChildren: 0,
        DWHHtsTestAdolecents: 0,
        KHISHtsTest: 0,
        KHISHtsTestAdult: 0,
        KHISHtsTestChildren: 0,
        KHISHtsTestAdolecents: 0,
    });
    let testKHIS = useSelector(htsTestKHIS.getHTSTESTKHIS);

    const loadComparisonOverview = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            gender: filters.genders,
            datimAgeGroup: filters.datimAgeGroups,
            year: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYY')
                : moment().subtract(2, 'month').add(17, 'days').format('YYYY'),
            month: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('MM')
                : moment().subtract(2, 'month').add(17, 'days').format('MM'),
        };
        const result = await getAll(
            'operational-his/getDWHHTSPOSPositive',
            params
        );
        let data = {
            DWHHtsTest: 0,
            DWHHtsTestAdult: 0,
            DWHHtsTestChildren: 0,
            DWHHtsTestAdolecents: 0,
            KHISHtsTest: 0,
            KHISHtsTestAdult: 0,
            KHISHtsTestChildren: 0,
            KHISHtsTestAdolecents: 0,
        };

        for (let i = 0; i < result.length; i++) {
            data.DWHHtsTest = data.DWHHtsTest + parseInt(result[i].tested);
            data.DWHHtsTestAdult =
                data.DWHHtsTestAdult + parseInt(result[i].adultTested);
            data.DWHHtsTestChildren =
                data.DWHHtsTestChildren + parseInt(result[i].childrenTested);
            data.DWHHtsTestAdolecents =
                data.DWHHtsTestAdolecents +
                parseInt(result[i].adolescentTested);
        }

        data.KHISHtsTest = testKHIS.totalTested;
        data.KHISHtsTestAdult = testKHIS.adultsTested;
        data.KHISHtsTestChildren = testKHIS.childrenTested;
        data.KHISHtsTestAdolecents = testKHIS.adolescentsTested;

        setDWHHtsOverview(data);
    }, [filters, testKHIS]);

    useEffect(() => {
        loadComparisonOverview();
    }, [loadComparisonOverview]);

    let percOfNewly = (curr, total) => {
        if (total === 0 || isNaN(total) || total === null) {
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
                                    <Col md={4}>
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
                                                    DWHHts.KHISHtsTest
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
                                            <span
                                                className="comparison-card-numbers"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {formatNumber(
                                                    DWHHts.DWHHtsTest
                                                )}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div>
                                            <span className="comparison-card-text">
                                                SMART
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
                                                    0
                                                )}
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
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            DWHHts.KHISHtsTestAdult
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.KHISHtsTestAdult,
                                                            DWHHts.KHISHtsTest
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
                                                            DWHHts.DWHHtsTestAdult
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.DWHHtsTestAdult,
                                                            DWHHts.DWHHtsTest
                                                        )}
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
                                                        0
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
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            DWHHts.KHISHtsTestChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.KHISHtsTestChildren,
                                                            DWHHts.KHISHtsTest
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
                                                            DWHHts.DWHHtsTestChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.DWHHtsTestChildren,
                                                            DWHHts.DWHHtsTest
                                                        )}
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
                                                        {0}
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
                                            <Col md={4}>
                                                <div>
                                                    <span className="comparison-card-text">
                                                        KHIS
                                                    </span>
                                                    <br />
                                                    <span className="comparison-card-numbers">
                                                        {formatNumber(
                                                            DWHHts.KHISHtsTestAdolecents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.KHISHtsTestAdolecents,
                                                            DWHHts.KHISHtsTest
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
                                                            DWHHts.DWHHtsTestAdolecents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.DWHHtsTestAdolecents,
                                                            DWHHts.DWHHtsTest
                                                        )}
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
                                                        {0}
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
