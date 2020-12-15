import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const AppointmentDurationStableByCounty = () => {
    const filters = useSelector(state => state.filters);
    const [appointmentDurationStableByCounty, setAppointmentDurationStableByCounty] = useState({});

    const loadAppointmentDurationStableByCounty = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):'',
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const appointmentCategories = ['<3 Months', '> 3 Months'];
        const countyCategories = [];
        const result = await getAll('care-treatment/dsdAppointmentDurationByCounty', params);
        let data = [];
        for(let i = 0; i < result.length; i++) {
            if(countyCategories.indexOf(result[i].county) === -1){
                countyCategories.push(result[i].county);
            }
        }
        // seed all values sp that missing values default to 0
        for(let i = 0; i < appointmentCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < countyCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let appointmentIndex = appointmentCategories.indexOf(result[i].AppointmentsCategory);
            let ageIndex = countyCategories.indexOf(result[i].county);
            if(appointmentIndex === -1 || ageIndex === -1 ) { // unsupported
                continue;
            }
            data[appointmentIndex][ageIndex] = data[appointmentIndex][ageIndex] + parseInt(result[i].patients);
        }
        setAppointmentDurationStableByCounty({
            title: { text: '' },
            xAxis: [{ categories: countyCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: '> 3 MONTHS', data: data[1], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '< 3 MONTHS', data: data[0], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadAppointmentDurationStableByCounty();
    }, [loadAppointmentDurationStableByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MMD UPTAKE IN ACTIVE STABLE PATIENTS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={appointmentDurationStableByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentDurationStableByCounty;
