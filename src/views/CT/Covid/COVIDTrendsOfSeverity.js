import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as covidManagementAdmittedSelectors
    from '../../../selectors/CT/Covid/covidManagementAdmitted';

const COVIDTrendsOfSeverity = () => {
    const [trendsOfSeverity, setTrendsOfSeverity] = useState({});
    const covidManagementAdmitted = useSelector(covidManagementAdmittedSelectors.getCovidManagementAdmitted);

    console.log(covidManagementAdmitted)
    const loadTrendsOfPLHIVVaccination = useCallback(async () => {
        setTrendsOfSeverity({
            title: { text: '' },
            plotOptions: {
                column: {
                    stacking: 'bar',
                }
            },
            xAxis: [{ categories: covidManagementAdmitted.labels, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients'.toUpperCase() } }],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'NUMBER OF PATIENTS',
                    data: covidManagementAdmitted.data,
                    type: 'column',
                    color: '#1AB394'
                }
            ]
        });
    }, [covidManagementAdmitted]);

    useEffect(() => {
        loadTrendsOfPLHIVVaccination();
    }, [loadTrendsOfPLHIVVaccination]);


    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                MANAGEMENT OF SYMPTOMATIC COVID -19 ADMITTED IN HOSPITAL
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={trendsOfSeverity} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDTrendsOfSeverity;
