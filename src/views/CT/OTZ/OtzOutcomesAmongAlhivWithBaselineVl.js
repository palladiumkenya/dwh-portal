import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzOutcomesAmongAlhivWithBaselineVL from '../../../selectors/CT/OTZ/otzOutcomesAmongAlhivWithBaselineVL';

const OtzOutcomesAmongAlhivWithBaselineVl = () => {
    const [otzOutcomesAmongAlHivWithBaselineVL, setOtzOutcomesAmongAlHivWithBaselineVL] = useState({});
    const otzOutcomesWithBaselineVl = useSelector(otzOutcomesAmongAlhivWithBaselineVL.getOtzOutcomesAmongAlHivWithBaselineVL);

    const loadOtzOutcomesAmongAlhivWithBaselineVl = useCallback(async () => {
        setOtzOutcomesAmongAlHivWithBaselineVL({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Enrolled in OTZ', 'Baseline VL', 'Virally Suppressed', 'HVL'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
                },
                labels: { format: '{value}' }
            },
            legend: {
                enabled: false
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.y + '(' + this.point.text  + '%)'; } }, tooltip: { valueSuffix: '({point.text:.0f})' }, }},
            series: [
                {
                    name: 'OTZ OUTCOMES AMONG ALHIV WITH BASELINE VL',
                    color: '#14084D',
                    data: [
                        {
                            name: 'Enrolled in OTZ',
                            y: otzOutcomesWithBaselineVl.length > 0 ? otzOutcomesWithBaselineVl[0].AlHivEnrolledInOTZ : 0,
                            text: otzOutcomesWithBaselineVl.length > 0 ? otzOutcomesWithBaselineVl[0].AlHivEnrolledInOTZPerc : 0
                        },
                        {
                            name: 'Baseline VL',
                            y: otzOutcomesWithBaselineVl.length > 0 ? otzOutcomesWithBaselineVl[0].AlHivWithBaselineVl : 0,
                            text: otzOutcomesWithBaselineVl.length > 0 ? otzOutcomesWithBaselineVl[0].AlHivWithBaselineVlPerc : 0
                        },
                        {
                            name: 'Virally Suppressed',
                            y: otzOutcomesWithBaselineVl.length > 0 ? otzOutcomesWithBaselineVl[0].AlHivWithVlLessThan1000 : 0,
                            text: otzOutcomesWithBaselineVl.length > 0 ? otzOutcomesWithBaselineVl[0].AlHivWithVlLessThan1000Perc : 0
                        },
                        {
                            name: 'HVL',
                            y: otzOutcomesWithBaselineVl.length > 0 ? otzOutcomesWithBaselineVl[0].AlHivWithVlGreaterThan1000 : 0,
                            text: otzOutcomesWithBaselineVl.length > 0 ? otzOutcomesWithBaselineVl[0].AlHivWithVlGreaterThan1000Perc : 0
                        }
                    ]
                }
            ]
        });
    },[otzOutcomesWithBaselineVl]);

    useEffect(() => {
        loadOtzOutcomesAmongAlhivWithBaselineVl();
    }, [loadOtzOutcomesAmongAlhivWithBaselineVl]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ OUTCOMES AMONG ALHIV WITH BASELINE VL
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzOutcomesAmongAlHivWithBaselineVL} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzOutcomesAmongAlhivWithBaselineVl;
