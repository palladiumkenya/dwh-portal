import React, { Component, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';

const UploadsReportingConsistency = ({ globalFilter }) => {
    const [expected, setExpected] = useState(0);
    const [overallStats, setOverall] = useState({
        overall: [],
        stats: 0,
        statsPerc: 0
    });
    const [consistnecyStats, setConsistnecy] = useState({
        consistnecy: [],
        stats: 0,
        statsPerc: 0
    });
    const [recencyStats, setRecency] = useState({
        recency: [],
        stats: 0,
        statsPerc: 0
    });

    useEffect(() => {
        loadExpected();
        loadConsistnecy();
        loadRecency();
    }, [globalFilter]);

    const loadExpected = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const data = await getAll('manifests/expected/CT', params);
        setExpected(data.expected);
    };

    const getPerc = (count, total) => {
        return (count / total) * 100;
    };

    const loadConsistnecy = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const data = await getAll('manifests/overall/CT', params);
        setOverall({
            overall: [],
            stats: data.overall,
            statsPerc: getPerc(data.overall , expected)
        });
    };

    const loadRecency = () => {

    };

    return (
        <div className="row">
            <div className="col-4">
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        EXPECTED UPLOADS
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{
                            textAlign: 'center',
                            backgroundColor: '#F6F6F6',
                            height: '100px'
                        }}
                    >
                        <div className="col-12">
                            <span className="expected-uploads-text">{expected}</span>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-4">
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        OVERALL REPORTING RATES
                    </CardHeader>
                    <CardBody
                        className="align-items-center justify-content-center"
                        style={{ backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12" style={{ textAlign: 'center' }}>
                            <span className="overall-rates-figure">{overallStats.stats}</span>&nbsp;
                            <sup className="overall-rates-sup">{overallStats.statsPerc} %</sup>
                        </div>
                        <div className="col-12" style={{ textAlign: 'center' }}>
                <span className="overall-rates-text">
                  CARE & TREATMENT {globalFilter.period}
                </span>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-4">
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        CONSISTENCY OF REPORTING
                    </CardHeader>
                    <CardBody
                        className="align-items-center justify-content-center"
                        style={{ backgroundColor: '#F6F6F6', height: '100px' }}
                    >
                        <div className="col-12" style={{ textAlign: 'center' }}>
                            <span className="consistency-reporting-figure">{consistnecyStats.stats}</span>
                            <sup className="consistency-reporting-sup">{consistnecyStats.statsPerc} %</sup>
                        </div>
                        <div className="col-12" style={{ textAlign: 'center' }}>
                <span className="consistency-reporting-text">
                  CONSISTENCY FOR {globalFilter.period}
                </span>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UploadsReportingConsistency;
