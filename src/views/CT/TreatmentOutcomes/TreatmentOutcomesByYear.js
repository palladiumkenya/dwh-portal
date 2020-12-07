import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const TreatmentOutcomesByYear = () => {
    const filters = useSelector(state => state.filters);
    const [treatmentOutcomesByYear, setTreatmentOutcomesByYear] = useState({});

    const loadTreatmentOutcomesByYear = useCallback(async () => {
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
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped', 'TransferOut'];
        const yearCategories = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
        const result = await getAll('care-treatment/treatmentOutcomesByYear', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < treatmentOutcomesCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < yearCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let treatmentOutcomesIndex = treatmentOutcomesCategories.indexOf(result[i].artOutcome);
            let yearIndex = yearCategories.indexOf(result[i].year);
            if(treatmentOutcomesIndex === -1 || yearIndex === -1 ) { // unsupported
                continue;
            }
            data[treatmentOutcomesIndex][yearIndex] = data[treatmentOutcomesIndex][yearIndex] + parseInt(result[i].totalOutcomes);
        }
        setTreatmentOutcomesByYear({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: yearCategories,
                crosshair: true,
                title: { text: 'Year of start from 2011' },
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
                { name: 'ACTIVE', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'DEAD', data: data[1], type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LTFU', data: data[2], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'STOPPED', data: data[3], type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                // { name: 'TRANSFER OUT', data: data[4], type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadTreatmentOutcomesByYear();
    }, [loadTreatmentOutcomesByYear]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART TREATMENT OUTCOMES BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesByYear} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesByYear;
