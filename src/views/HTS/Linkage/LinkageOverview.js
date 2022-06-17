import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const LinkageOverview = () => {
    const filters = useSelector(state => state.filters);
    const [linkageOverview, setLinkageOverview] = useState({
        totalPositive: 0,
        malePositive: 0,
        malePositivePercent: 0,
        femalePositive: 0,
        femalePositivePercent: 0,
        totalLinked: 0,
        totalLinkedPercent: 0,
        malePostive: 0,
        malePostivePercent: 0,
        femalePostive: 0,
        femalePostivePercent: 0,
    });
    const loadLinkageOverview = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : null, //removed month when page loads because it was showing blanks
            month: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : null,//removed month when page loads because it was showing blanks
        };
        const result = await getAll('hts/linkageBySex', params);
        let data = {
            totalPositive: 0,
            malePositive: 0,
            malePositivePercent: 0,
            femalePositive: 0,
            femalePositivePercent: 0,
            totalLinked: 0,
            totalLinkedPercent: 0,
            maleLinked: 0,
            maleLinkedPercent: 0,
            femaleLinked: 0,
            femaleLinkedPercent: 0,
        }
        console.log(result)
        for(let i = 0; i < result.length; i++) {
            data.totalPositive = data.totalPositive + parseInt(result[i].positive);
            data.totalLinked = data.totalLinked + parseInt(result[i].linked);
            if (result[i].gender.toLowerCase() === "m" || result[i].gender.toLowerCase() === "male") {
                data.malePositive = data.malePositive + parseInt(result[i].positive);
                data.maleLinked = data.maleLinked + parseFloat(result[i].linked);
            }
            if (result[i].gender.toLowerCase() === "f"  || result[i].gender.toLowerCase() === "female") {
                data.femalePositive = data.femalePositive + parseInt(result[i].positive);
                data.femaleLinked = data.femaleLinked + parseFloat(result[i].linked);
            }
        }
        if (data.totalPositive > 0) {
            data.malePositivePercent = ((data.malePositive/data.totalPositive)*100).toFixed(1);
            data.femalePositivePercent = ((data.femalePositive/data.totalPositive)*100).toFixed(1);
        }
        if (data.totalPositive > 0) {
            data.totalLinkedPercent = ((data.totalLinked/data.totalPositive)*100).toFixed(1);
        }
        if (data.malePositive > 0) {
            data.maleLinkedPercent = ((data.maleLinked/data.malePositive)*100).toFixed(1);
        }
        if (data.femalePositive > 0) {
            data.femaleLinkedPercent = ((data.femaleLinked/data.femalePositive)*100).toFixed(1);
        }
        setLinkageOverview(data);
    }, [filters]);

    useEffect(() => {
        loadLinkageOverview();
    }, [loadLinkageOverview]);

    return (
        <div>
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
                                <span className="expected-uploads-text">{linkageOverview.totalPositive ? linkageOverview.totalPositive.toLocaleString('en'):''}</span>
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
                                <span className="expected-uploads-text">{linkageOverview.malePositive ? linkageOverview.malePositive.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {linkageOverview.malePositivePercent}<span className="overall-rates-sup-perc"> %</span></sup>
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
                            <div className="col-12">
                                <span className="expected-uploads-text">{linkageOverview.femalePositive ? linkageOverview.femalePositive.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {linkageOverview.femalePositivePercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            TOTAL LINKED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{linkageOverview.totalLinked ? linkageOverview.totalLinked.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {linkageOverview.totalLinkedPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            MALE LINKED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{linkageOverview.maleLinked ? linkageOverview.maleLinked.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {linkageOverview.maleLinkedPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            FEMALE LINKED
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12" style={{ textAlign: 'center' }}>
                                <span className="overall-rates-figure">{linkageOverview.femaleLinked ? linkageOverview.femaleLinked.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {linkageOverview.femaleLinkedPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LinkageOverview;
