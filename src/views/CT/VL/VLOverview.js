import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLOverview = () => {
    const filters = useSelector(state => state.filters);
    const [vlOverview, setVlOverview] = useState({
        txCurr: 0,
        vlDone: 0,
        vlDonePercent: 0,
        suppressed: 0,
        suppressedPercent: 0
    });
    const loadVlOverview = useCallback(async () => {
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
        const result = await getAll('care-treatment/vlOverallUptakeAndSuppression', params);
        let data = {
            txCurr: parseInt(result.txCurr) ? parseInt(result.txCurr) : 0,
            vlDone: parseInt(result.vlDone) ? parseInt(result.vlDone) : 0,
            vlDonePercent: 0,
            suppressed: parseInt(result.suppressed) ? parseInt(result.suppressed) : 0,
            suppressedPercent: 0
        }
        if (data.txCurr > 0) {
           data.vlDonePercent = ((data.vlDone/data.txCurr)*100).toFixed(1);
           data.suppressedPercent = ((data.suppressed/data.txCurr)*100).toFixed(1);
        }
        setVlOverview(data);
    }, [filters]);

    useEffect(() => {
        loadVlOverview();
    }, [loadVlOverview]);

    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            PATIENTS CURRENT ON TREATMENT
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{vlOverview.txCurr}</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            PATIENTS WITH CURRENT VL
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{vlOverview.vlDone}</span>
                                <sup className="overall-rates-sup"> {vlOverview.vlDonePercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            VIRAL SUPPRESSION
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{ textAlign: 'center', backgroundColor: '#F6F6F6', height: '100px' }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">{vlOverview.suppressed}</span>
                                <sup className="overall-rates-sup"> {vlOverview.suppressedPercent}<span className="overall-rates-sup-perc"> %</span></sup>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default VLOverview;
