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
                categories: ['AYPs Enrolled in OTZ', 'ALHIV in OTZ with Baseline VL', 'ALHIV with VL<1000', 'ALHIV with VL>1000'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
                },
                labels: { format: '{value} %' }
            },
            legend: {
                enabled: false
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.y + '%'; } }, tooltip: { valueSuffix: '% ({point.text:.0f})' }, }},
            series: [
                {
                    name: 'OTZ OUTCOMES AMONG ALHIV WITH BASELINE VL',
                    color: '#14084D',
                    data: [
                        {
                            name: 'AYPs Enrolled in OTZ',
                            y: otzOutcomesWithBaselineVl[0].AlHivEnrolledInOTZPerc,
                            text: otzOutcomesWithBaselineVl[0].AlHivEnrolledInOTZ
                        },
                        {
                            name: 'ALHIV in OTZ with Baseline VL',
                            y: otzOutcomesWithBaselineVl[0].AlHivWithBaselineVlPerc,
                            text: otzOutcomesWithBaselineVl[0].AlHivWithBaselineVl
                        },
                        {
                            name: 'ALHIV with VL<1000',
                            y: otzOutcomesWithBaselineVl[0].AlHivWithVlGreaterThan1000Perc,
                            text: otzOutcomesWithBaselineVl[0].AlHivWithVlGreaterThan1000
                        },
                        {
                            name: 'ALHIV with VL>1000',
                            y: otzOutcomesWithBaselineVl[0].AlHivWithVlLessThan1000Perc,
                            text: otzOutcomesWithBaselineVl[0].AlHivWithVlLessThan1000
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
