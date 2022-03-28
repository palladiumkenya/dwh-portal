import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as covidSeverityByGenderSelectors from '../../../selectors/CT/Covid/covidSeverityByGender';

export const COVIDSeverityOfInfectionByGender = () => {
    const [severityOfInfectionByGender, setSeverityOfInfectionByGender] = useState({});
    const severityByGender = useSelector(covidSeverityByGenderSelectors.getCovidSeverityByGender);

    const loadSeverityOfInfectionByGender = useCallback(async () => {
        setSeverityOfInfectionByGender({
            title: { text: '' },
            plotOptions: { column: { stacking: 'normal' } },
            xAxis: [{ categories: severityByGender.genders.map(n => n.toUpperCase()), crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients'.toUpperCase() }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'ASYMPTOMATIC', data: severityByGender.asymptomatic, type: 'column', color: "#F08532", tooltip: { valueSuffix: '% ({point.text:.0f})' } },
                { name: 'SYMPTOMATIC', data: severityByGender.symptomatic, type: 'column', color: "#00AD30", tooltip: { valueSuffix: '% ({point.text:.0f})' } },
            ]
        });
    }, [severityByGender]);

    useEffect(() => {
        loadSeverityOfInfectionByGender();
    }, [loadSeverityOfInfectionByGender]);

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

