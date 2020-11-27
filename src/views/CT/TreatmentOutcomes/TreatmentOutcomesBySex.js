import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const TreatmentOutcomesBySex = () => {
    const filters = useSelector(state => state.filters);
    const [treatmentOutcomesBySex, setTreatmentOutcomesBySex] = useState({});

    const loadTreatmentOutcomesBySex = useCallback(async () => {
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
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped'];
        const sexCategories = ['Male', 'Female'];
        const result = await getAll('care-treatment/treatmentOutcomesBySex', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < treatmentOutcomesCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < sexCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let treatmentOutcomesIndex = treatmentOutcomesCategories.indexOf(result[i].artOutcome);
            let sexIndex = sexCategories.indexOf(result[i].gender);
            if(treatmentOutcomesIndex === -1 || sexIndex === -1 ) { // unsupported
                continue;
            }
            data[treatmentOutcomesIndex][sexIndex] = data[treatmentOutcomesIndex][sexIndex] + parseInt(result[i].totalOutcomes);
        }
        setTreatmentOutcomesBySex({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: sexCategories,
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
                { name: 'ACTIVE', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'DEAD', data: data[1], type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LTFU', data: data[2], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'STOPPED', data: data[3], type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadTreatmentOutcomesBySex();
    }, [loadTreatmentOutcomesBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART TREATMENT OUTCOMES BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesBySex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesBySex;
