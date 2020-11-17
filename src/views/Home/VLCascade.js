import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../Shared/Api';

const VLCascade = ({ globalFilters }) => {
    const [vlCascade, setVLCascade] = useState({});
    
    const loadVLCascade = useCallback(async () => {
        let categories = ['CURRENT ON ART', 'ELIGIBLE FOR VL', 'HAS VL AT 12 MONTHS', 'SUPPRESSED AT 12 MONTHS'];
        const result = await getAll('care-treatment/viralLoadCascade', { ...globalFilters });
        let data = [
            result.TX_CURR ? result.TX_CURR : 0,
            result.Eligible4VL ? result.Eligible4VL : 0,
            result.Last12MonthVL ? result.Last12MonthVL : 0,
            result.Last12MVLSup ? result.Last12MVLSup : 0,
        ];

        setVLCascade({
            chart: { type: 'column' },
            title: { text: '' },
            xAxis: { categories: categories, crosshair: true },
            yAxis: { title: { text: '' }, min: 0},
            legend: { enabled: false, },
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
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '' + this.point.text;
                        }
                    }
                }
            },
            series: [{
                name: 'Viral Load Cascade - Active ART Clients',
                data: [
                    {
                        name: categories[0], y: data[0], color: "#3475B3",
                        text: data[0].toLocaleString('en')
                    },
                    {
                        name: categories[1], y: data[1], color: "#F28E2B",
                        text: data[1].toLocaleString('en') + ' (' + parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%)'
                    },
                    {
                        name: categories[2], y: data[2], color: "#0D5647",
                        text: data[2].toLocaleString('en') + ' (' + parseFloat(((data[2]/data[0])*100).toString()).toFixed(0) + '%)'
                    },
                    {
                        name: categories[3], y: data[3], color: "#E15759",
                        text: data[3].toLocaleString('en') + ' (' + parseFloat(((data[3]/data[0])*100).toString()).toFixed(0) + '%)'
                    }
                ]
            }]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadVLCascade();
    }, [loadVLCascade]);

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h6">VIRAL LOAD CASCADE - ACTIVE ART CLIENTS</CardTitle>
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={vlCascade} />
            </CardBody>
        </Card>
    );
};

export default VLCascade;
