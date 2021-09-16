import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

export const COVIDSeverityOfInfectionByGender = () => {
    const [severityOfInfectionByGender, setSeverityOfInfectionByGender] = useState({});

    const loadSeverityOfInfectionByGender = useCallback(async () => {
        setSeverityOfInfectionByGender({
            title: { text: '' },
            xAxis: [{ categories: ["ASYMPTOMATIC", "SYMPTOMATIC"], crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'ASYMPTOMATIC', data: 40, type: 'column', color: "#F08532", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'SYMPTOMATIC', data: 30, type: 'column', color: "#69B34C", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, []);

    useEffect(() => {
        loadSeverityOfInfectionByGender();
    }, []);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                SEVERITY OF COVID-19 INFECTION BY GENDER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={severityOfInfectionByGender} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDSeverityOfInfectionByGender;

