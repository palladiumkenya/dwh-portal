import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { formatNumber } from './../../../utils/utils';
import { useSelector } from 'react-redux';

import * as adverseEventsSeverityGradingSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsSeverityGrading';

const AdverseEventsSeverityGrading = ({ tab }) => {
    const [severityGrading, setSeverityGrading] = useState({});
    const methodSelected = tab === 'adult' ? adverseEventsSeverityGradingSelectors.getAdverseEventsSeverityGrading : adverseEventsSeverityGradingSelectors.getAdverseEventsSeverityGradingCalHIV;
    const adverseEventsSeverityGrading = useSelector(methodSelected);
    const n = parseInt(adverseEventsSeverityGrading.mildVal) +
        parseInt(adverseEventsSeverityGrading.moderateVal) +
        parseInt(adverseEventsSeverityGrading.severeVal) +
        parseInt(adverseEventsSeverityGrading.notindictatedVal);

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
                        color: "#16c21d"
                    },
                    {
                        name: 'MODERATE',
                        y: adverseEventsSeverityGrading.moderateVal,
                        color: "#fdc538"
                    },
                    {
                        name: 'SEVERE',
                        y: adverseEventsSeverityGrading.severeVal,
                        color: "#ff0d0d"
                    },
                    {
                        name: 'UNDOCUMENTED',
                        y: adverseEventsSeverityGrading.notindictatedVal,
                        color: "#5d6180"
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
                SEVERITY GRADING OF REPORTED CASES OF AEs
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
