import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcClientExitReasonsSelector from '../../../selectors/CT/OVC/ovcClientExitReasons';

const OVCClientExitReasons = () => {
    const [ovcClientsExitReasons, setOvcClientsExitReasons] = useState({});
    const ovcClientExitReasons = useSelector(ovcClientExitReasonsSelector.getOvcClientExitReasons);

    const loadOvcClientsExitReasons = useCallback(async () => {
        setOvcClientsExitReasons({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ovcClientExitReasons.map(obj => obj.OVCExitReason),
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
                    name: 'OVC CLIENTS EXIT REASONS',
                    data: ovcClientExitReasons,
                    color: '#14084D',
                }
            ]
        });
    }, [ovcClientExitReasons]);

    useEffect(() => {
        loadOvcClientsExitReasons();
    }, [loadOvcClientsExitReasons]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OVC CLIENTS EXIT REASONS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcClientsExitReasons} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCClientExitReasons;
