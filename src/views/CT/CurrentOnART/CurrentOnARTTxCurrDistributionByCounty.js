import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';

const CurrentOnARTTxCurrDistributionByCounty = ({ globalFilter }) => {
    const [txCurrDistributionByCounty, setTxCurrDistributionByCounty] = useState({});

    const loadTxCurrDistributionByCounty = useCallback(async () => {
        let params = null;

        if (globalFilter) {
             params = { ...globalFilter };
        }

        const counties = [];
        const txCurr = [];

        const result = await getAll('care-treatment/txCurrDistributionByCounty', params);
        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].County);
            txCurr.push(result[i].txCurr);
        }

        setTxCurrDistributionByCounty({
            chart: {
                type: 'column'
            },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: counties,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            series: [{
                name: 'TX CURR DISTRIBUTION',
                color: "#485969",
                data: txCurr
            }]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadTxCurrDistributionByCounty();
    }, [loadTxCurrDistributionByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TX CURR DISTRIBUTION BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={txCurrDistributionByCounty} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CurrentOnARTTxCurrDistributionByCounty;
