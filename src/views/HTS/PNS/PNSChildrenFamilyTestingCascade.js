import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const PNSChildrenFamilyTestingCascade = () => {
    const filters = useSelector(state => state.filters);
    const [pnsChildrenFamilyTestingCascade, setPNSChildrenFamilyTestingCascade] = useState({});
    
    const loadPNSChildrenFamilyTestingCascade = useCallback(async () => {
        let categories = [
            'Children Eligible',
            'Children Tested',
            'Positive',
            'Linked',
        ];
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY")
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/pnsChildrenCascade', params);
        let pnsChildrenCascade = {
            elicited: result.elicited ? result.elicited:0,
            tested: result.tested ? result.tested:0,
            positive: result.positive ? result.positive:0,
            linked: result.linked ? result.linked:0,
            knownPositive: result.knownPositive ? result.knownPositive:0
        };
        let data = [
            pnsChildrenCascade.elicited ? pnsChildrenCascade.elicited : 0,
            pnsChildrenCascade.tested ? pnsChildrenCascade.tested : 0,
            pnsChildrenCascade.positive ? pnsChildrenCascade.positive : 0,
            pnsChildrenCascade.linked ? pnsChildrenCascade.linked : 0,
        ].map(x => Number(parseFloat(x).toFixed(0)));
        setPNSChildrenFamilyTestingCascade({
            title: { text: '' },
            xAxis: { categories: categories, crosshair: true },
            yAxis: { title: { text: '' } },
            legend: { enabled: false },
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
            series: [{ name: 'Family Testing of Children Cascade', color: "#1AB394", type: 'column', data: [
                { name: categories[0], y: data[0], text: data[0].toLocaleString('en') },
                { name: categories[1], y: data[1], text: data[1].toLocaleString('en') + ' (' + parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%)' },
                { name: categories[2], y: data[2], text: data[2].toLocaleString('en') + ' (' + parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%)' },
                { name: categories[3], y: data[3], text: data[3].toLocaleString('en') + ' (' + parseFloat(((data[2]/data[0])*100).toString()).toFixed(0) + '%)' },
            ]}]
        });
    }, [filters]);

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
