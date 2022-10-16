import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzOutcomesAmongAlhivWithBaselineVL from '../../../selectors/CT/OTZ/otzOutcomesAmongAlhivWithBaselineVL';
import * as otzTotalAdolescentsSelector from '../../../selectors/CT/OTZ/otzTotalAdolescents';

const OtzOutcomesAmongAlhivWithBaselineVl = () => {
    const [otzOutcomesAmongAlHivWithBaselineVL, setOtzOutcomesAmongAlHivWithBaselineVL] = useState({});
    const otzOutcomesWithBaselineVl = useSelector(otzOutcomesAmongAlhivWithBaselineVL.getOtzOutcomesAmongAlHivWithBaselineVL);
    const adolescents = useSelector(otzTotalAdolescentsSelector.getOtzTotalAdolescents);

    const loadOtzOutcomesAmongAlhivWithBaselineVl = useCallback(async () => {
        setOtzOutcomesAmongAlHivWithBaselineVL({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'ADOLECENTS IN CARE',
                    'ENROLLED IN ANY OTZ PROGRAM',
                    'BASELINE VL AVAILABLE',
                    'VIRALLY SUPPRESSED',
                    'HIGH VIRAL LOAD',
                ],
                crosshair: true,
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS',
                },
                labels: { format: '{value}' },
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            if (this.point.text)
                                return '' + this.point.y + '(' + this.point.text + '%)'
                            else return '' + this.point.y; 
                        },
                    },
                    tooltip: { valueSuffix: '({point.text:.0f})' },
                },
            },
            series: [
                {
                    name: 'OTZ OUTCOMES AMONG ALHIV WITH BASELINE VL',
                    data: [
                        // TODO: adolocents in care bar here
                        {
                            name: 'Adolecentes in care',
                            color: '#14084D',
                            y:
                                adolescents.totalAdolescents > 0
                                    ? adolescents.totalAdolescents
                                    : 0,
                        },
                        {
                            name: 'Enrolled in OTZ',
                            color: '#1AB394',
                            y:
                                otzOutcomesWithBaselineVl.length > 0
                                    ? otzOutcomesWithBaselineVl[0]
                                          .AlHivEnrolledInOTZ
                                    : 0,
                            text:
                                otzOutcomesWithBaselineVl.length > 0
                                    ? otzOutcomesWithBaselineVl[0]
                                          .AlHivEnrolledInOTZPerc
                                    : 0,
                        },
                        {
                            name: 'Baseline VL',
                            color: '#2D73F5',
                            y:
                                otzOutcomesWithBaselineVl.length > 0
                                    ? otzOutcomesWithBaselineVl[0]
                                          .AlHivWithBaselineVl
                                    : 0,
                            text:
                                otzOutcomesWithBaselineVl.length > 0
                                    ? otzOutcomesWithBaselineVl[0]
                                          .AlHivWithBaselineVlPerc
                                    : 0,
                        },
                        {
                            name: 'Virally Suppressed',
                            color: '#00AD30',
                            y:
                                otzOutcomesWithBaselineVl.length > 0
                                    ? otzOutcomesWithBaselineVl[0]
                                          .AlHivWithVlLessThan1000
                                    : 0,
                            text:
                                otzOutcomesWithBaselineVl.length > 0
                                    ? otzOutcomesWithBaselineVl[0]
                                          .AlHivWithVlLessThan1000Perc
                                    : 0,
                        },
                        // TODO: LOW LEVEL VIREMIA bar here
                        {
                            name: 'HVL',
                            color: '#bb1414',
                            y:
                                otzOutcomesWithBaselineVl.length > 0
                                    ? otzOutcomesWithBaselineVl[0]
                                          .AlHivWithVlGreaterThan1000
                                    : 0,
                            text:
                                otzOutcomesWithBaselineVl.length > 0
                                    ? otzOutcomesWithBaselineVl[0]
                                          .AlHivWithVlGreaterThan1000Perc
                                    : 0,
                        },
                    ],
                },
            ],
        });
    },[otzOutcomesWithBaselineVl]);

    useEffect(() => {
        loadOtzOutcomesAmongAlhivWithBaselineVl();
    }, [loadOtzOutcomesAmongAlhivWithBaselineVl]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OVERALL VL UPTAKE AND SUPPRESSION AMONG OTZ PATIENTS
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
