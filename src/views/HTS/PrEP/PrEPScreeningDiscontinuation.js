import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as prepDisc from '../../../selectors/HTS/Prep/newOnPrepSelector';


const PrEPDiscontinuation = () => {
    const filters = useSelector(state => state.filters);
    const [prepDiscontinuation, setPrepDiscontinuation] = useState({});
    let prepDiscReasons = useSelector(prepDisc.getPrEPDiscontinuationReason);

    const loadPrepDiscontinuation = useCallback(async () => {
        setPrepDiscontinuation({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: prepDiscReasons.reasons,
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
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'Percentage',
                    data: prepDiscReasons.discontinuations,
                    color: '#142459',
                },
            ],
        });
    }, [prepDiscReasons]);

    useEffect(() => {
        loadPrepDiscontinuation();
    }, [loadPrepDiscontinuation]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                PREP DISCONTINUATION
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepDiscontinuation} />
            </CardBody>
        </Card>
    );
};

export default PrEPDiscontinuation;
