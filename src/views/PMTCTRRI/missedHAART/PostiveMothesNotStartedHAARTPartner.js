import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as newOnPrepSelector from '../../../selectors/HTS/Prep/newOnPrepSelector';
import * as ctPrepSelector from '../../../selectors/HTS/Prep/ctPrepSelector';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';
import * as prepTestedSelector from '../../../selectors/HTS/Prep/prepTotalTestedSelector';

const PostiveMothesNotStartedHAARTPartner = () => {
    let newOnPrep = useSelector(newOnPrepSelector.getNewOnPrepTotal);
    let prepCT = useSelector(ctPrepSelector.getCTPrepTotal);
    let screened = useSelector(prepSelector.getPrepScreenedTotal);
    let eligible = useSelector(prepSelector.getPrepEligibleTotal);
    let tested = useSelector(prepTestedSelector.getPrepTestTotal);

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
                title: {
                    text: 'PARTNER',
                },
                categories: ['NAIROB', 'DES', 'GSFDO', 'RTIT', 'GSFGR'],
                crosshair: true,
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS',
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
                    pointPadding: 0.2,
                    borderWidth: 0,
                    stacking: 'percent',
                },
            },
            series: [
                {
                    name: 'NEW POSITIVE',
                    color: '#00a65a',
                    data: [430, 130, 321, 543, 10],
                },
                {
                    name: 'KNOWN POSITIVE',
                    color: '#142459',
                    data: [430, 130, 321, 65, 23],
                },
                //rgb(144, 237, 125)
                
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepOverall();
    }, [loadPrepOverall]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                NUMBER OF HIV POSITIVE MOTHERS NOT STARTED ON HAART BY PARTNER
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepOverall}
                />
            </CardBody>
        </Card>
    );
};

export default PostiveMothesNotStartedHAARTPartner;
