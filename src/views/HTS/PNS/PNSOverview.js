import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import moment from 'moment';
import { getAll } from '../../Shared/Api';

const PNSOverview = ({ globalFilters }) => {
    const [expected, setExpected] = useState(0);
    const loadExpected = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            period: globalFilters.year + ',' + (globalFilters.month ? globalFilters.month:moment().startOf('month').subtract(1, 'month').format('M'))
        };
        const data = await getAll('manifests/expected/' + globalFilters.rrTab, params);
        setExpected(data.expected);
    }, [globalFilters]);

    useEffect(() => {
        loadExpected();
    }, [loadExpected]);

    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL ACTIVE PATIENTS
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{expected*600}</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL SEXUAL CONTACTS ELICITED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{expected*700}</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL CHILDREN LINE ELICITED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{expected*620}</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            SEXUAL CONTACTS TESTED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">53%</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            SEXUAL CONTACTS POSITIVE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">28%</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            SEXUAL CONTACTS LINKD
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">96%</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CHILDREN TESTED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">67%</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CHILDREN POSITIVE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">5%</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CHILDREN LINKED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">98%</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PNSOverview;
