import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSContactsTestingOverview = () => {
    const filters = useSelector(state => state.filters);
    const [indexClients, setPnsIndex] = useState(0);
    const [pnsSexualContactsCascade, setPNSSexualContactsCascade] = useState({
        elicited: 0,
        tested: 0,
        positive: 0,
        linked: 0,
        knownPositive: 0
    });

    const loadPnsIndex = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : null,
            month: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : null
        };
        const result = await getAll('hts/pnsIndex', params);
        setPnsIndex(result.indexClients ? parseInt(result.indexClients) : 0);
    }, [filters]);

    const loadPNSSexualContactsCascade = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : null,
            month: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : null
        };
        const data = await getAll('hts/pnsSexualContactsCascade', params);
        setPNSSexualContactsCascade({
            elicited: data.elicited ? data.elicited:0,
            tested: data.tested ? data.tested:0,
            positive: data.positive ? data.positive:0,
            linked: data.linked ? data.linked:0,
            knownPositive: data.knownPositive ? data.knownPositive:0
        });
    }, [filters]);

    useEffect(() => {
        loadPnsIndex();
        loadPNSSexualContactsCascade();
    }, [loadPnsIndex, loadPNSSexualContactsCascade]);

    return (
        <Row>
            <Col>
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        NEW HIV+ PATIENTS
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">{ indexClients ?  indexClients.toLocaleString('en') : '0'}</span>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        SEXUAL CONTACTS ELICITED
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">{ pnsSexualContactsCascade.elicited ? Number(pnsSexualContactsCascade.elicited).toLocaleString('en') : '0' }</span>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        SEXUAL CONTACTS TESTED
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text"> { pnsSexualContactsCascade.tested ? pnsSexualContactsCascade.tested.toLocaleString('en') : '0' } </span>
                            <sup className="overall-rates-sup">
                                {
                                    pnsSexualContactsCascade.elicited > 0 ?
                                    ((pnsSexualContactsCascade.tested/pnsSexualContactsCascade.elicited)*100).toFixed(0).toLocaleString('en') :
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
                        SEXUAL CONTACTS POSITIVE
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text"> { pnsSexualContactsCascade.positive ? pnsSexualContactsCascade.positive.toLocaleString('en') : '0' } </span>
                            <sup className="overall-rates-sup">
                                {
                                    pnsSexualContactsCascade.tested > 0 ?
                                    ((pnsSexualContactsCascade.positive/pnsSexualContactsCascade.tested)*100).toFixed(0).toLocaleString('en') :
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
                        SEXUAL CONTACTS LINKED
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text"> { pnsSexualContactsCascade.linked ? pnsSexualContactsCascade.linked.toLocaleString('en') : '0' } </span>
                            <sup className="overall-rates-sup">
                                {
                                    pnsSexualContactsCascade.positive > 0 ?
                                    ((pnsSexualContactsCascade.linked/pnsSexualContactsCascade.positive)*100).toFixed(0).toLocaleString('en') :
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

export default PNSContactsTestingOverview;
