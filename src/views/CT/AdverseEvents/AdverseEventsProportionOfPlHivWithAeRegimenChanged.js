import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';

const AdverseEventsProportionOfPlHivWithAeRegimenChanged = () => {
    const [proportionOfPlHivWithAeRegimenChanged, setProportionOfPlHivWithAeRegimenChanged] = useState({});

    const loadProportionOfPlHivWithAeRegimenChanged = useCallback(async () => {
        setProportionOfPlHivWithAeRegimenChanged({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS WITH AEs'
                }
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
            legend: {
                enabled: false
            },
            series: [{
                data: [
                    {
                        name: 'Number with adverse events (AEs)',
                        y: 50,
                        color: '#28B294'
                    },
                    {
                        name: 'Number changed',
                        y: 40,
                        color: '#14084D'
                    }
                ]
            }]
        });
    }, []);

    useEffect(() => {
        loadProportionOfPlHivWithAeRegimenChanged();
    }, [loadProportionOfPlHivWithAeRegimenChanged]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF PLHIV WITH ADVERSE EVENTS(AEs) WHOSE REGIMEN WAS CHANGED
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfPlHivWithAeRegimenChanged} />
                </div>
            </CardBody>
        </Card>
    );
}

export default AdverseEventsProportionOfPlHivWithAeRegimenChanged;
