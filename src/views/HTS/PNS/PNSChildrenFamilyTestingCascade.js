import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const PNSChildrenFamilyTestingCascade = ({ globalFilters }) => {
    const [pnsChildrenFamilyTestingCascade, setPNSChildrenFamilyTestingCascade] = useState({});
    
    const loadPNSChildrenFamilyTestingCascade = useCallback(async () => {
        let categories = [
            'Children Eligible',
            'Children Tested',
            'Positive',
            'Linked',
        ];
        const result = await getAll('care-treatment/viralLoadCascade', { ...globalFilters });
        let data = [
            result.TX_CURR ? result.TX_CURR/10000 : 0,
            result.Eligible4VL ? result.Eligible4VL/10000 : 0,
            result.Last12MonthVL ? result.Last12MonthVL/10000 : 0,
            result.Last12MVLSup ? result.Last12MVLSup/10000 : 0,
        ].map(x => Number(parseFloat(x).toFixed(0)));

        setPNSChildrenFamilyTestingCascade({
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
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () {
                return '' + this.point.text;
            }}}},
            series: [{ name: 'Family Testing of children Cascade', color: "#1AB394", type: 'column', data: [
                { name: categories[0], y: data[0], text: data[0].toLocaleString('en') },
                { name: categories[1], y: data[1], text: data[1].toLocaleString('en') + ' (' + parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%)' },
                { name: categories[2], y: data[2], text: data[2].toLocaleString('en') + ' (' + parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%)' },
                { name: categories[3], y: data[3], text: data[3].toLocaleString('en') + ' (' + parseFloat(((data[2]/data[0])*100).toString()).toFixed(0) + '%)' },
            ]}]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadPNSChildrenFamilyTestingCascade();
    }, [loadPNSChildrenFamilyTestingCascade]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="cardTitle">THE CASCADE OF FAMILY TESTING OF CHILDREN</CardTitle>
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={pnsChildrenFamilyTestingCascade} />
            </CardBody>
        </Card>
    );
};

export default PNSChildrenFamilyTestingCascade;
