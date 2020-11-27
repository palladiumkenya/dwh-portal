import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const AppointmentDurationByAge = () => {
    const filters = useSelector(state => state.filters);
    const [appointmentDurationByAge, setAppointmentDurationByAge] = useState({});

    const loadAppointmentDurationByAge = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const appointmentCategories = ['< 1 Month', '1-2 Months', '3-4 Months', '> 4 Months'];
        const ageCategories = [
            'Under 1',
            '1 to 4',
            '5 to 9',
            '10 to 14',
            '15 to 19',
            '20 to 24',
            '25 to 29',
            '30 to 34',
            '35 to 39',
            '40 to 44',
            '45 to 49',
            '50 to 54',
            '55 to 59',
            '60 to 64',
            '65+'
        ];
        const result = await getAll('care-treatment/dsdAppointmentDurationByAge', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < appointmentCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let appointmentIndex = appointmentCategories.indexOf(result[i].AppointmentsCategory);
            let ageIndex = ageCategories.indexOf(result[i].AgeGroup);
            if(appointmentIndex === -1 || ageIndex === -1 ) { // unsupported
                continue;
            }
            data[appointmentIndex][ageIndex] = data[appointmentIndex][ageIndex] + parseInt(result[i].patients);
        }
        setAppointmentDurationByAge({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: ageCategories,
                crosshair: true
            }],
            yAxis: [{
                min: 0,
                title: { text: 'Percentage of Patients' },
            }],
            tooltip: { shared: true },
            legend: {
                floating: true,
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: '< 1 MONTH', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '1-2 MONTHS', data: data[1], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '3-4 MONTHS', data: data[2], type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '> 4 MONTHS', data: data[3], type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadAppointmentDurationByAge();
    }, [loadAppointmentDurationByAge]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        APPOINTMENT DURATION PRACTICES BY AGE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={appointmentDurationByAge} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentDurationByAge;
