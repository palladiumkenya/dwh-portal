import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OvcDistributionOfOvcClients = () => {
    const [ovcDistributionOfClients, setOvcDistributionOfClients] = useState({});

    const loadOvcDistributionOfClients = useCallback(async () => {
        setOvcDistributionOfClients({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ["OVC COMPREHENSIVE", "DREAMS", "OVC PREVENTATIVE"],
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
                },
                labels: { format: '{value} %' }
            },
            legend: {
                enabled: false
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.y + '%'; } }, tooltip: { valueSuffix: '% ({point.text:.0f})' }, }},
            series: [
                {
                    name: 'DISTRIBUTION OF OVC CLIENTS',
                    data: [],
                    color: '#14084D',
                }
            ]
        });
    }, []);

    useEffect(() => {
        loadOvcDistributionOfClients();
    }, [loadOvcDistributionOfClients]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                DISTRIBUTION OF OVC CLIENTS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcDistributionOfClients} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OvcDistributionOfOvcClients;
