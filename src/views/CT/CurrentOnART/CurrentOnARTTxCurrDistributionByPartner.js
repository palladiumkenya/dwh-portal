import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const CurrentOnARTTxCurrDistributionByPartner = ({ globalFilter }) => {
    const [txCurrDistributionByPartner, setTxCurrDistributionByPartner] = useState({});

    const loadTxCurrDistributionByPartner = useCallback(async () => {
        // let params = null;

        // if (globalFilter) {
        //     params = { ...globalFilter };
        // }

        setTxCurrDistributionByPartner({
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
                categories: [
                    'NAIROBI',
                    'KAJIADO',
                    'KISUMU',
                    'MOMBASA',
                    'MERU',
                    'EMBU',
                    'SIAYA',
                    'NAKURU',
                    'KIAMBU',
                    'MACHAKOS',
                    'MAKUENI',
                    'ISIOLO'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
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
            series: [{
                color: "#485969",
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
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
                        TX CURR DISTRIBUTION BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={txCurrDistributionByPartner} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CurrentOnARTTxCurrDistributionByPartner;
