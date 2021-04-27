import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as adverseEventsSeverityGradingSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsSeverityGrading';

const AdverseEventsSeverityGrading = ({ tab }) => {
    const [severityGrading, setSeverityGrading] = useState({});
    const methodSelected = tab === 'adult' ? adverseEventsSeverityGradingSelectors.getAdverseEventsSeverityGrading : adverseEventsSeverityGradingSelectors.getAdverseEventsSeverityGradingCalHIV;
    const adverseEventsSeverityGrading = useSelector(methodSelected);

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
                        name: 'MODERATE',
                        y: adverseEventsSeverityGrading.moderateVal,
                        color: "#F7ED00"
                    },
                    {
                        name: 'SEVERE',
                        y: adverseEventsSeverityGrading.severeVal,
                        color: "#E15759"
                    },
                    {
                        name: 'UNDOCUMENTED',
                        y: adverseEventsSeverityGrading.notindictatedVal,
                        color: "#2F4050"
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
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
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
