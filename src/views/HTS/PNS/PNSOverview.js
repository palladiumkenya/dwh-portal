import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSOverview = () => {
    const filters = useSelector(state => state.filters);
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
    const [vlCascade, setHomeVLCascade] = useState({
        currentOnArt: 0,
        currentOnArtText: ''
    });
    const loadHomeVLCascade = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        const result = await getAll('care-treatment/viralLoadCascade', params);
        let data = [
            result.TX_CURR ? result.TX_CURR : 0,
        ];
        setHomeVLCascade({
            currentOnArt: data[0],
            currentOnArtText: data[0].toLocaleString('en')
        });
    }, [filters]);
    const loadPNSSexualContactsCascade = useCallback(async () => {
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
        const data = await getAll('hts/pnsSexualContactsCascade', params);
        setPNSSexualContactsCascade({
            elicited: data.elicited ? data.elicited:0,
            tested: data.tested ? data.tested:0,
            positive: data.positive ? data.positive:0,
            linked: data.linked ? data.linked:0,
            knownPositive: data.knownPositive ? data.knownPositive:0
        });
    }, [filters]);
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
        loadHomeVLCascade();
        loadPNSSexualContactsCascade();
        loadPNSChildrenCascade();
    }, [loadHomeVLCascade, loadPNSSexualContactsCascade, loadPNSChildrenCascade]);

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
                                <span className="expected-uploads-text">{vlCascade.currentOnArt.toLocaleString('en')}</span>
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
                                <span className="expected-uploads-text">{pnsSexualContactsCascade.elicited.toLocaleString('en')}</span>
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
                                <span className="expected-uploads-text">{pnsChildrenCascade.elicited.toLocaleString('en')}</span>
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
                                        ((pnsSexualContactsCascade.tested/pnsSexualContactsCascade.elicited)*100).toFixed(0).toLocaleString('en') :
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
                                        ((pnsSexualContactsCascade.positive/pnsSexualContactsCascade.tested)*100).toFixed(0).toLocaleString('en') :
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
                                        ((pnsSexualContactsCascade.linked/pnsSexualContactsCascade.positive)*100).toFixed(0).toLocaleString('en') :
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
                                        ((pnsChildrenCascade.tested/pnsChildrenCascade.elicited)*100).toFixed(0).toLocaleString('en') :
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
                                        ((pnsChildrenCascade.positive/pnsChildrenCascade.tested)*100).toFixed(0).toLocaleString('en') :
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
                                        ((pnsChildrenCascade.linked/pnsChildrenCascade.positive)*100).toFixed(0).toLocaleString('en') :
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
