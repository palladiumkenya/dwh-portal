import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import moment from 'moment';
import { getAll } from '../Shared/Api';

const RROverview = () => {
    const filters = useSelector(state => state.filters);
    const rrTab = useSelector(state => state.ui.rrTab);
    const [expected, setExpected] = useState(0);
    const [consistencyStats, setConsistnecy] = useState({ consistency: [], stats: 0, statsPerc: 0 });
    const [recencyStats, setRecency] = useState({ recency: [], stats: 0, statsPerc: 0 });

    const getPerc = (count, total) => {
        if (count && total) {
            return Math.round((count / total) * 100);
        } else {
            return 0;
        }
    };

    const loadExpected = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate ? filters.fromDate : moment().format("MMM YYYY")
        };
        params.period = filters.fromDate ?
            moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M') :
            moment().startOf('month').subtract(2, 'month').format('YYYY,M');
        const data = await getAll('manifests/expected/' + rrTab, params);
        setExpected(data.expected);
    }, [filters, rrTab]);

    const loadConsistnecy = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate ? filters.fromDate : moment().format("MMM YYYY")
        };
        params.period = filters.fromDate ?
            moment(params.fromDate, "MMM YYYY").startOf('month').subtract(1, 'month').format('YYYY,M') :
            moment().startOf('month').subtract(2, 'month').format('YYYY,M');
        const data = await getAll('manifests/consistency/' + rrTab, params);
        setConsistnecy({ consistency: [], stats: data.consistency, statsPerc: getPerc(data.consistency , expected) });
    }, [filters, rrTab, expected]);

    const loadRecency = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            fromDate: filters.fromDate ? filters.fromDate : moment().format("MMM YYYY")
        };
        params.period = filters.fromDate ?
            moment(params.fromDate, "MMM YYYY").startOf('month').subtract(0, 'month').format('YYYY,M') :
            moment().startOf('month').subtract(1, 'month').format('YYYY,M');
        const data = await getAll('manifests/recency/' + rrTab, params);
        setRecency({ recency: [], stats: data.recency, statsPerc: getPerc(data.recency , expected) });
    }, [filters, rrTab, expected]);

    useEffect(() => {
        loadExpected();
        loadConsistnecy();
        loadRecency();
    }, [loadExpected, loadConsistnecy, loadRecency]);

    return (
        <div className="row">
            <div className="col-4">
                <Card className="card-uploads-consistency-rates">
                    <CardHeader className="expected-uploads-header">
                        EXPECTED UPLOADS
                    </CardHeader>
                    <CardBody
                        className="align-items-center d-flex justify-content-center"
                        style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
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
                            <span className="overall-rates-figure">{recencyStats.stats}</span>&nbsp;
                            <sup className="overall-rates-sup"> {recencyStats.statsPerc ? recencyStats.statsPerc:0}<span className="overall-rates-sup-perc"> %</span></sup>
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
                            <span className="consistency-reporting-figure">{consistencyStats.stats}</span>
                            <sup className="consistency-reporting-sup"> { consistencyStats.statsPerc ? consistencyStats.statsPerc:0 }<span className="consistency-reporting-sup-perc"> %</span></sup>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RROverview;
