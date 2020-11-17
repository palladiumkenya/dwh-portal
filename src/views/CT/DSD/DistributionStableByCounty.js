import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';

const DistributionStableByCounty = ({ globalFilters }) => {
    const [distributionStableByCounty, setDistributionStableByCounty] = useState({});

    const loadTxCurrDistributionByCounty = useCallback(async () => {
        let params = null;

        if (globalFilters) {
             params = { ...globalFilters };
        }

        const counties = [];
        const stable = [];

        const result = await getAll('care-treatment/dsdStabilityStatusByCounty', params);
        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].county);
            stable.push(result[i].stable);
        }

        setDistributionStableByCounty({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: counties,
                crosshair: true,
                title: {
                    text: 'County'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Patients'
                }
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            series: [{
                name: 'Number of Patients',
                color: "#485969",
                data: stable
            }]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadTxCurrDistributionByCounty();
    }, [loadTxCurrDistributionByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY COUNTY (N =495)
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
