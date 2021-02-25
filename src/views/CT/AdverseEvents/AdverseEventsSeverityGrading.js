import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as adverseEventsSeverityGradingSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsSeverityGrading';

const AdverseEventsSeverityGrading = () => {
    const [severityGrading, setSeverityGrading] = useState({});
    const adverseEventsSeverityGrading = useSelector(adverseEventsSeverityGradingSelectors.getAdverseEventsSeverityGrading);

    const loadSeverityGrading =  useCallback(async () => {
        setSeverityGrading({
            chart: {
                type: 'pie',
                renderTo: 'container'
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: '60%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y})'
                    },
                    showInLegend: true
                }
            },
            series: [
                {
                    name: 'SEVERITY GRADING OF AEs',
                    colorByPoint: true,
                    data: [
                    {
                        name: 'MILD',
                        y: adverseEventsSeverityGrading.mildVal,
                        color: "#1AB394"
                    },
                    {
                        name: 'SEVERE',
                        y: adverseEventsSeverityGrading.severeVal,
                        color: "#2F4050"
                    },
                    {
                        name: 'MODERATE',
                        y: adverseEventsSeverityGrading.moderateVal,
                        color: "#D4FF78"
                    },
                    {
                        name: 'NOT INDICATED',
                        y: adverseEventsSeverityGrading.notindictatedVal,
                        color: "#f28e2b"
                    }]
                }
            ]
        });
    }, [adverseEventsSeverityGrading]);

    useEffect(() => {
        loadSeverityGrading();
    }, [loadSeverityGrading]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                SEVERITY GRADING OF AEs
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={severityGrading} />
                </div>
            </CardBody>
        </Card>
    );
}

export default AdverseEventsSeverityGrading;
