import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as newOnPrepSelector from '../../../selectors/HTS/Prep/newOnPrepSelector';
import * as ctPrepSelector from '../../../selectors/HTS/Prep/ctPrepSelector';
import * as prepSelector from '../../../selectors/HTS/Prep/PrepTrendsSelector';
import * as prepTestedSelector from '../../../selectors/HTS/Prep/prepTotalTestedSelector';
import * as prepSelectorMonth1 from '../../../selectors/HTS/Prep/prepMonth1RefillSelector';
import * as prepSelectorMonth3 from '../../../selectors/HTS/Prep/prepMonth3RefillSelector';

const PrEPCascade = () => {
    let newOnPrep = useSelector(newOnPrepSelector.getNewOnPrepTotal);
    let prepCT = useSelector(ctPrepSelector.getCTPrepTotal);
    let screened = useSelector(prepSelector.getPrepScreenedTotal);
    let eligible = useSelector(prepSelector.getPrepEligibleTotal);
    let month1 = useSelector(prepSelectorMonth1.getPrepMonth1Refill);
    let month3 = useSelector(prepSelectorMonth3.getPrepMonth3Refill);
    
    let tested = month1?.tested + month3?.tested;

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
                    text: 'CASCADE',
                },
                categories: [
                    'TOTAL TESTED',
                    'SCREENED FOR PREP',
                    'ELIGIBLE FOR PREP',
                    'INITIATED PREP',
                    'CONTINUING ON PREP',
                    // 'CURRENT ON PREP',
                ],
                crosshair: true,
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
                enabled: false,
            },
            colors: [
                '#142459',
                '#142459',
                '#142459',
                '#142459',
                '#142459',
                '#142459',
            ],
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: '',
                    data: [
                        { y: tested, color: '#00a65a' },
                        { y: screened, color: '#142459' },
                        { y: eligible, color: 'rgb(124, 181, 236)' },
                        { y: newOnPrep, color: '#3281CC' },
                        { y: prepCT, color: '#1AB394' },
                        // { y: 40, color: 'rgb(144, 237, 125)' },
                    ],
                },
            ],
        });
    }, [screened, newOnPrep, tested, eligible, prepCT, month1, month3]);

    useEffect(() => {
        loadPrepOverall();
    }, [loadPrepOverall]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                PREP CASCADE
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepOverall} />
            </CardBody>
        </Card>
    );
};

export default PrEPCascade;
