import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSFamilyTestingOverview = () => {
    const filters = useSelector(state => state.filters);
    const [pnsChildrenCascade, setPNSChildrenCascade] = useState({
        elicited: 0,
        tested: 0,
        positive: 0,
        linked: 0,
        knownPositive: 0
    });
    const loadPNSChildrenCascade = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):""
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const data = await getAll('hts/pnsChildrenCascade', params);
        setPNSChildrenCascade({
            elicited: data.elicited ? data.elicited:0,
            tested: data.tested ? data.tested:0,
            positive: data.positive ? data.positive:0,
            linked: data.linked ? data.linked:0,
            knownPositive: data.knownPositive ? data.knownPositive:0
        });
    }, [filters]);

    useEffect(() => {
        loadPNSChildrenCascade();
    }, [loadPNSChildrenCascade]);

    return (
        <Row>
            <Col>
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        CHILDREN ELICITED
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">{ pnsChildrenCascade.elicited ? Number(pnsChildrenCascade.elicited).toLocaleString('en') : '' }</span>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        CHILDREN TESTED
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text"> { pnsChildrenCascade.tested ? pnsChildrenCascade.tested.toLocaleString('en') : '0' } </span>
                            <sup className="overall-rates-sup">
                                {
                                    pnsChildrenCascade.elicited > 0 ?
                                    ((pnsChildrenCascade.tested/pnsChildrenCascade.elicited)*100).toFixed(0).toLocaleString('en') :
                                    0
                                }
                                <span className="overall-rates-sup-perc"> %</span>
                            </sup>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        CHILDREN POSITIVE
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text"> { pnsChildrenCascade.positive ? pnsChildrenCascade.positive.toLocaleString('en') : '0' } </span>
                            <sup className="overall-rates-sup">
                                {
                                    pnsChildrenCascade.tested > 0 ?
                                    ((pnsChildrenCascade.positive/pnsChildrenCascade.tested)*100).toFixed(0).toLocaleString('en') :
                                    0
                                }
                                <span className="overall-rates-sup-perc"> %</span>
                            </sup>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        CHILDREN LINKED
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text"> { pnsChildrenCascade.linked ? pnsChildrenCascade.linked.toLocaleString('en') : '0' } </span>
                            <sup className="overall-rates-sup">
                                {
                                    pnsChildrenCascade.positive > 0 ?
                                    ((pnsChildrenCascade.linked/pnsChildrenCascade.positive)*100).toFixed(0).toLocaleString('en') :
                                    0
                                }
                                <span className="overall-rates-sup-perc"> %</span>
                            </sup>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default PNSFamilyTestingOverview;
