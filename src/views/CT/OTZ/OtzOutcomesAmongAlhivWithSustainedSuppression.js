import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzOutcomesAmongAlhivWithReSuppression from '../../../selectors/CT/OTZ/otzOutcomesAmongAlhivWithReSuppression';

const OtzOutcomesAmongAlhivWithSustainedSuppression = () => {
    const [otzOutcomesAmongAlHivReSuppression, setOtzOutcomesAmongAlHivReSuppression] = useState({});
    const otzOutcomesWithReSuppression = useSelector(otzOutcomesAmongAlhivWithReSuppression.getOtzOutcomesAmongAlHivWithReSuppression);

    const loadOtzOutcomesAmongAlhivWithReSuppression = useCallback(async () => {
        setOtzOutcomesAmongAlHivReSuppression({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['ALHIV WITH VL >1000 AT BASELINE', 'ALHIV WITH VL <1000 WITH REPEAT VL', 'NUMBER WITH VL <1000 UPON REPEAT VL', 'NUMBER WITH VL >1000 UPON REPEAT'],
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
                    data: []
                }
            ]
        });
    },[otzOutcomesWithReSuppression]);

    useEffect(() => {
        loadOtzOutcomesAmongAlhivWithReSuppression();
    }, [loadOtzOutcomesAmongAlhivWithReSuppression]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ OUTCOMES AMONG ALHIV WITH RE-SUPPRESSION
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzOutcomesAmongAlHivReSuppression} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzOutcomesAmongAlhivWithSustainedSuppression;
