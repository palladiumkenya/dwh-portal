import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as prepSelector from '../../../selectors/HTS/Prep/prepMonth1RefillSelector';

const PrEPHIVTesting1STMonth = () => {
    const filters = useSelector(state => state.filters);
    let month1 = useSelector(prepSelector.getPrepMonth1Refill)
    
    const [prepHIVTesting1STMonth, setPrepHIVTesting1STMonth] = useState({});

    const loadPrepHIVTesting1STMonth = useCallback(async () => {
        setPrepHIVTesting1STMonth({
            chart: {
                type: 'pie',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['TESTED', 'NOT TESTED'],
                crosshair: true,
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{point.key}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                shadow: false,
            },
            plotOptions: {
                pie: {
                    shadow: false,
                },
            },
            series: [
                {
                    name: 'patients',
                    data: [
                        {
                            name: 'NOT TESTED',
                            y: month1?.nottested ?? 0,
                            color: '#2F4050',
                        },
                        {
                            name: 'TESTED',
                            y: month1?.tested ?? 0,
                            color: '#1AB394',
                        },
                    ],
                    size: '60%',
                    innerSize: '80%',
                    showInLegend: true,
                },
            ],
        });
    }, [month1]);

    useEffect(() => {
        loadPrepHIVTesting1STMonth();
    }, [loadPrepHIVTesting1STMonth]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                HIV TESTING AT 1ST MONTH PREP REFILL
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepHIVTesting1STMonth} />
            </CardBody>
        </Card>
    );
};

export default PrEPHIVTesting1STMonth;
