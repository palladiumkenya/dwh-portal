import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';

const PNSOverview = ({ globalFilters }) => {
    const [pnsSexualContactsCascade, setPNSSexualContactsCascade] = useState({
        elicited: 0,
        tested: 0,
        positive: 0,
        linked: 0,
        knownPositive: 0
    });
    const [pnsChildrenCascade, setPNSChildrenCascade] = useState({
        elicited: 0,
        tested: 0,
        positive: 0,
        linked: 0,
        knownPositive: 0
    });
    const loadPNSSexualContactsCascade = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            year: globalFilters.year,
            month: globalFilters.month
        };
        const data = await getAll('hts/pnsSexualContactsCascade', params);
        setPNSSexualContactsCascade({
            elicited: data.elicited ? data.elicited:0,
            tested: data.tested ? data.tested:0,
            positive: data.positive ? data.positive:0,
            linked: data.linked ? data.linked:0,
            knownPositive: data.knownPositive ? data.knownPositive:0
        });
    }, [globalFilters]);
    const loadPNSChildrenCascade = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            year: globalFilters.year,
            month: globalFilters.month
        };
        const data = await getAll('hts/pnsChildrenCascade', params);
        setPNSChildrenCascade({
            elicited: data.elicited ? data.elicited:0,
            tested: data.tested ? data.tested:0,
            positive: data.positive ? data.positive:0,
            linked: data.linked ? data.linked:0,
            knownPositive: data.knownPositive ? data.knownPositive:0
        });
    }, [globalFilters]);

    useEffect(() => {
        loadPNSSexualContactsCascade();
        loadPNSChildrenCascade();
    }, [loadPNSSexualContactsCascade, loadPNSChildrenCascade]);

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
                                <span className="expected-uploads-text">{pnsSexualContactsCascade.elicited + pnsChildrenCascade.elicited}</span>
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
                                <span className="expected-uploads-text">{pnsSexualContactsCascade.elicited}</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL CHILDREN ELICITED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{pnsChildrenCascade.elicited}</span>
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
                                <span className="expected-uploads-text">
                                    {
                                        pnsSexualContactsCascade.elicited > 0 ?
                                        ((pnsSexualContactsCascade.tested/pnsSexualContactsCascade.elicited)*100).toFixed(0) :
                                        0
                                    }
                                %</span>
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
                                <span className="expected-uploads-text">
                                    {
                                        pnsSexualContactsCascade.tested > 0 ?
                                        ((pnsSexualContactsCascade.positive/pnsSexualContactsCascade.tested)*100).toFixed(0) :
                                        0
                                    }
                                %</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            SEXUAL CONTACTS LINKED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">
                                    {
                                        pnsSexualContactsCascade.positive > 0 ?
                                        ((pnsSexualContactsCascade.linked/pnsSexualContactsCascade.positive)*100).toFixed(0) :
                                        0
                                    }
                                %</span>
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
                                <span className="expected-uploads-text">
                                    {
                                        pnsChildrenCascade.elicited > 0 ?
                                        ((pnsChildrenCascade.tested/pnsChildrenCascade.elicited)*100).toFixed(0) :
                                        0
                                    }
                                %</span>
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
                                <span className="expected-uploads-text">
                                    {
                                        pnsChildrenCascade.tested > 0 ?
                                        ((pnsChildrenCascade.positive/pnsChildrenCascade.tested)*100).toFixed(0) :
                                        0
                                    }
                                %</span>
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
                                <span className="expected-uploads-text">
                                    {
                                        pnsChildrenCascade.positive > 0 ?
                                        ((pnsChildrenCascade.linked/pnsChildrenCascade.positive)*100).toFixed(0) :
                                        0
                                    }
                                %</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PNSOverview;
