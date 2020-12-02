import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeOverview = () => {
    const filters = useSelector(state => state.filters);
    const [uptakeOverview, setUptakeOverview] = useState({
        totalTested: 0,
        maleTested: 0,
        maleTestedPercent: 0,
        femaleTested: 0,
        femaleTestedPercent: 0,
        totalPositive: 0,
        totalPositivePercent: 0,
        malePostive: 0,
        malePostivePercent: 0,
        femalePostive: 0,
        femalePostivePercent: 0,
    });
    const loadUptakeOverview = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : ''
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/uptakeBySex', params);
        let data = {
            totalTested: 0,
            maleTested: 0,
            maleTestedPercent: 0,
            femaleTested: 0,
            femaleTestedPercent: 0,
            totalPositive: 0,
            totalPositivePercent: 0,
            malePositive: 0,
            malePositivePercent: 0,
            femalePositive: 0,
            femalePositivePercent: 0,
        }
        for(let i = 0; i < result.length; i++) {
            data.totalTested = data.totalTested + parseInt(result[i].tested);
            data.totalPositive = data.totalPositive + parseInt(result[i].positive);
            if (result[i].gender === "M") {
                data.maleTested = data.maleTested + parseInt(result[i].tested);
                data.malePositive = data.malePositive + parseFloat(result[i].positive);
            }
            if (result[i].gender === "F") {
                data.femaleTested = data.femaleTested + parseInt(result[i].tested);
                data.femalePositive = data.femalePositive + parseFloat(result[i].positive);
            }
        }
        if (data.totalTested > 0) {
           data.maleTestedPercent = ((data.maleTested/data.totalTested)*100).toFixed(1);
           data.femaleTestedPercent = ((data.femaleTested/data.totalTested)*100).toFixed(1);
        }
        if (data.totalTested > 0) {
            data.totalPositivePercent = ((data.totalPositive/data.totalTested)*100).toFixed(1);
        }
        if (data.maleTested > 0) {
            data.malePositivePercent = ((data.malePositive/data.maleTested)*100).toFixed(1);
        }
        if (data.femaleTested > 0) {
            data.femalePositivePercent = ((data.femalePositive/data.femaleTested)*100).toFixed(1);
        }
        setUptakeOverview(data);
    }, [filters]);

    useEffect(() => {
        loadUptakeOverview();
    }, [loadUptakeOverview]);

    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL TESTED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{uptakeOverview.totalTested}</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            MALE TESTED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{uptakeOverview.maleTested}</span>
                                <sup className="overall-rates-sup"> {uptakeOverview.maleTestedPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            FEMALE TESTED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{uptakeOverview.femaleTested}</span>
                                <sup className="overall-rates-sup"> {uptakeOverview.femaleTestedPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL POSITIVE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{uptakeOverview.totalPositive}</span>
                                <sup className="overall-rates-sup"> {uptakeOverview.totalPositivePercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            MALE POSITIVE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{uptakeOverview.malePositive}</span>
                                <sup className="overall-rates-sup"> {uptakeOverview.malePositivePercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            FEMALE POSITIVE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12" style={{ textAlign: 'center' }}>
                                <span className="overall-rates-figure">{uptakeOverview.femalePositive}</span>
                                <sup className="overall-rates-sup"> {uptakeOverview.femalePositivePercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UptakeOverview;
