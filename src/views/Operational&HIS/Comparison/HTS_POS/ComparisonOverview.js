import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap/lib';
import { Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { formatNumber, roundNumber } from '../../../../utils/utils';
import moment from 'moment';
import { getAll } from './../../../Shared/Api';
import * as htsPosKHIS from '../../../../selectors/Operational&HIS/Comparison/htsPosByGenderKHIS';

const ComparisonOverview= () => {
    const filters = useSelector((state) => state.filters);
    const [DWHHts, setDWHHtsOverview] = useState({
        DWHHtsPos: 0,
        DWHHtsPosAdult: 0,
        DWHHtsPosChildren: 0,
        DWHHtsPosAdolecents: 0,
        KHISHtsPos: 0,
        KHISHtsPosAdult: 0,
        KHISHtsPosChildren: 0,
        KHISHtsPosAdolecents: 0,
    });
    let posKHIS = useSelector(htsPosKHIS.getHTSPOSKHIS);

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
            DWHHtsPos: 0,
            DWHHtsPosAdult: 0,
            DWHHtsPosChildren: 0,
            DWHHtsPosAdolecents: 0,
            KHISHtsPos: 0,
            KHISHtsPosAdult: 0,
            KHISHtsPosChildren: 0,
            KHISHtsPosAdolecents: 0,
        };

        for (let i = 0; i < result.length; i++) {
            data.DWHHtsPos = data.DWHHtsPos + parseInt(result[i].positive);
            data.DWHHtsPosAdult =
                data.DWHHtsPosAdult + parseInt(result[i].adult);
            data.DWHHtsPosChildren =
                data.DWHHtsPosChildren + parseInt(result[i].children);
            data.DWHHtsPosAdolecents =
                data.DWHHtsPosAdolecents + parseInt(result[i].adolecent);
        }
        
        data.KHISHtsPos = posKHIS.totalPositive;
        data.KHISHtsPosAdult = posKHIS.adultsPositive;
        data.KHISHtsPosChildren = posKHIS.childrenPositive
        data.KHISHtsPosAdolecents = posKHIS.adolescentsPositive;
        
        setDWHHtsOverview(data);
    }, [filters]);

    useEffect(() => {
        loadComparisonOverview();
    }, [loadComparisonOverview]);

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
                                                {formatNumber(
                                                    DWHHts.KHISHtsPos
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
                                                {formatNumber(DWHHts.DWHHtsPos)}
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
                                                            DWHHts.KHISHtsPosAdult
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.KHISHtsPosAdult,
                                                            DWHHts.KHISHtsPos
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
                                                            DWHHts.DWHHtsPosAdult
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.DWHHtsPosAdult,
                                                            DWHHts.DWHHtsPos
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
                                                            DWHHts.KHISHtsPosChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.KHISHtsPosChildren,
                                                            DWHHts.KHISHtsPos
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
                                                            DWHHts.DWHHtsPosChildren
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.DWHHtsPosChildren,
                                                            DWHHts.DWHHtsPos
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
                                    ADOLESCENTS TESTED HIV POSITIVE (10 - 19
                                    YRS)
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
                                                            DWHHts.KHISHtsPosAdolecents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.KHISHtsPosAdolecents,
                                                            DWHHts.KHISHtsPos
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
                                                            DWHHts.DWHHtsPosAdolecents
                                                        )}
                                                    </span>
                                                    <sup className="comparison-sup comparison-sup-perc">
                                                        {' '}
                                                        {percOfNewly(
                                                            DWHHts.DWHHtsPosAdolecents,
                                                            DWHHts.DWHHtsPos
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
