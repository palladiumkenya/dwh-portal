import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const ArtOptimizationOverview = () => {
    const filters = useSelector(state => state.filters);
    const [dsdStabilityStatus, setDsdStabilityStatus] = useState({
        txCurr: 0,
        mmd: 0,
        mmdPercent: 0,
        stable: 0,
        stablePercent: 0
    });
    const [dsdUnstable, setDsdUnstable] = useState({
        txCurr: 0,
        onArtLessThan12Months: 0,
        onArtLessThan12MonthsPercent: 0,
        highVl: 0,
        highVlPercent: 0,
        poorAdherence: 0,
        poorAdherencePercent: 0
    });

    const loadDsdStabilityStatus = useCallback(async () => {
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
        const result = await getAll('care-treatment/dsdStabilityStatus', params);
        let data = {
            txCurr: parseInt(result.txCurr) ? parseInt(result.txCurr) : 0,
            mmd: parseInt(result.mmd) ? parseInt(result.mmd) : 0,
            mmdPercent: 0,
            stable: parseInt(result.stable) ? parseInt(result.stable) : 0,
            stablePercent: 0
        }
        if (data.txCurr > 0) {
           data.mmdPercent = ((data.mmd/data.txCurr)*100).toFixed(1);
           data.stablePercent = ((data.stable/data.txCurr)*100).toFixed(1);
        }
        setDsdStabilityStatus(data);
    }, [filters]);

    const loadDsdUnstable = useCallback(async () => {
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
        const result = await getAll('care-treatment/dsdUnstable', params);
        let data = {
            txCurr: parseInt(dsdStabilityStatus.txCurr) ? parseInt(dsdStabilityStatus.txCurr) : 0,
            onArtLessThan12Months: parseInt(result.onArtLessThan12Months) ? parseInt(result.onArtLessThan12Months) : 0,
            onArtLessThan12MonthsPercent: 0,
            highVl: parseInt(result.highVl) ? parseInt(result.highVl) : 0,
            highVlPercent: 0,
            poorAdherence: parseInt(result.poorAdherence) ? parseInt(result.poorAdherence) : 0,
            poorAdherencePercent: 0
        }
        if (data.txCurr > 0) {
           data.onArtLessThan12MonthsPercent = ((data.onArtLessThan12Months/data.txCurr)*100).toFixed(1);
           data.highVlPercent = ((data.highVl/data.txCurr)*100).toFixed(1);
           data.poorAdherencePercent = ((data.poorAdherence/data.txCurr)*100).toFixed(1);
        }
        setDsdUnstable(data);
    }, [filters, dsdStabilityStatus.txCurr]);

    useEffect(() => {
        loadDsdStabilityStatus();
        loadDsdUnstable();
    }, [loadDsdStabilityStatus, loadDsdUnstable]);

    return (
        <>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON FIRST LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{dsdStabilityStatus.txCurr ? dsdStabilityStatus.txCurr.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {dsdStabilityStatus.mmdPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON SECOND LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{dsdStabilityStatus.mmd ? dsdStabilityStatus.mmd.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {dsdStabilityStatus.mmdPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON THIRD LINE
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{dsdStabilityStatus.stable ? dsdStabilityStatus.stable.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {dsdStabilityStatus.stablePercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON TLD
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{dsdUnstable.highVl ? dsdUnstable.highVl.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {dsdUnstable.highVlPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS ON NVP
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12" style={{ textAlign: 'center' }}>
                                <span className="overall-rates-figure">{dsdUnstable.poorAdherence ? dsdUnstable.poorAdherence.toLocaleString('en'):''}</span>
                                <sup className="overall-rates-sup"> {dsdUnstable.poorAdherencePercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ArtOptimizationOverview;
