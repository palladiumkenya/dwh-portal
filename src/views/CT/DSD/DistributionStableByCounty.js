import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as dsdStabilityStatusByCountySelectors from '../../../selectors/CT/Dsd/dsdStabilityStatusByCounty';

const DistributionStableByCounty = () => {
    const [distributionStableByCounty, setDistributionStableByCounty] = useState({});
    const stabilityStatusByCounty = useSelector(dsdStabilityStatusByCountySelectors.getStabilityStatusByCounty);

    const loadTxCurrDistributionByCounty = useCallback(async () => {
        setDistributionStableByCounty({
            title: { text: ''},
            xAxis: [{ categories: stabilityStatusByCounty.stability.map(a => a.name), title: { text: 'County' }, crosshair: true }],
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            legend: { enabled: false },
            plotOptions: { column: { dataLabels: { enabled: true, format: '{point.y:,.0f}%' } } },
            tooltip: { formatter: function () {
                    return this.point.text;
                }
            },
            series: [
                { data: stabilityStatusByCounty.stability, name: 'Number of Patients', type: 'column', color: "#485969" }
            ]
        });
    }, [stabilityStatusByCounty]);

    useEffect(() => {
        loadTxCurrDistributionByCounty();
    }, [loadTxCurrDistributionByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={distributionStableByCounty} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DistributionStableByCounty;
