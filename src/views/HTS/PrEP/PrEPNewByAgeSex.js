import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';


const PrEPNewByAgeSex = () => {
    const filters = useSelector(state => state.filters);
    let newList = useSelector(prepSelector.getPrepNewAgeSexGroup);

    const [prepOverall, setPrepOverall] = useState({});

    const loadPrepOverall = useCallback(async () => {
        setPrepOverall({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: newList.agegrp,
                crosshair: true,
                title: {
                    text: 'AGE GROUP',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS',
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            plotOptions: {
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'MALE',
                    data: newList.iniListM,
                    color: '#14084D',
                },
                {
                    name: 'FEMALE',
                    data: newList.iniListF,
                    color: '#EA4C8B',
                },
            ],
        });
    }, [newList]);

    useEffect(() => {
        loadPrepOverall();
    }, [loadPrepOverall]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                NEW ON PREP BY AGE AND SEX
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepOverall}/>
            </CardBody>
        </Card>
    );
};

export default PrEPNewByAgeSex;
