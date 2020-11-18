import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import moment from 'moment';
import { getAll } from '../../Shared/Api';

const RROverview = ({ globalFilters }) => {
    const [expected, setExpected] = useState(0);
    const [consistnecyStats, setConsistnecy] = useState({ consistnecy: [], stats: 0, statsPerc: 0 });
    const [recencyStats, setRecency] = useState({ recency: [], stats: 0, statsPerc: 0 });

    const getPerc = (count, total) => {
        return parseInt((count / total) * 100);
    };

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

    const loadConsistnecy = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            period: globalFilters.year + ',' + (globalFilters.month ? globalFilters.month:moment().startOf('month').subtract(1, 'month').format('M'))
        };
        const data = await getAll('manifests/consistency/' + globalFilters.rrTab, params);
        setConsistnecy({ consistnecy: [], stats: data.consistency, statsPerc: getPerc(data.consistency , expected) });
    }, [globalFilters, expected]);

    const loadRecency = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            period: globalFilters.year + ',' + (globalFilters.month ? globalFilters.month:moment().startOf('month').subtract(1, 'month').format('M'))
        };
        const data = await getAll('manifests/recency/' + globalFilters.rrTab, params);
        setRecency({ recency: [], stats: data.recency, statsPerc: getPerc(data.recency , expected) });
    }, [globalFilters, expected]);

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
                            <span className="consistency-reporting-figure">{consistnecyStats.stats}</span>
                            <sup className="consistency-reporting-sup"> { consistnecyStats.statsPerc ? consistnecyStats.statsPerc:0 }<span className="consistency-reporting-sup-perc"> %</span></sup>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RROverview;
