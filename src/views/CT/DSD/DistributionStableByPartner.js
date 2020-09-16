import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../../Shared/Api';

const DistributionStableByPartner = ({ globalFilter }) => {
    const [distributionStableByPartner, setDistributionStableByPartner] = useState({});

    const loadTxCurrDistributionByPartner = useCallback(async () => {
        let params = null;

        if (globalFilter) {
             params = { ...globalFilter };
        }

        const counties = [];
        const stable = [];

        const result = await getAll('care-treatment/txCurrDistributionByPartner', params);
        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].Partner);
            stable.push(result[i].stable);
        }

        setDistributionStableByPartner({
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
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
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
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'STABLE PATIENTS DISTRIBUTION: ',
                color: "#485969",
                data: stable
            }]
        });
    }, []);

    useEffect(() => {
        loadTxCurrDistributionByPartner();
    }, [loadTxCurrDistributionByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY PARTNER (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={distributionStableByPartner} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DistributionStableByPartner;
