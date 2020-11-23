import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const TreatmentOutcomesByAge = ({ globalFilters }) => {
    const [treatmentOutcomesByAge, setTreatmentOutcomesByAge] = useState({});

    const loadTreatmentOutcomesByAge = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped'];
        const ageCategories = [
            '<1',
            '1-4',
            '5-9',
            '10-14',
            '15-19',
            '20-24',
            '25-29',
            '30-34',
            '35-39',
            '40-44',
            '45-49',
            '50+'
        ];
        const result = await getAll('care-treatment/treatmentOutcomesByAge', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < treatmentOutcomesCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let treatmentOutcomesIndex = treatmentOutcomesCategories.indexOf(result[i].artOutcome);
            let ageIndex = ageCategories.indexOf(result[i].ageGroup);
            if(treatmentOutcomesIndex === -1 || ageIndex === -1 ) { // unsupported
                continue;
            }
            data[treatmentOutcomesIndex][ageIndex] = data[treatmentOutcomesIndex][ageIndex] + parseInt(result[i].totalOutcomes);
        }
        setTreatmentOutcomesByAge({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: ageCategories,
                crosshair: true,
                title: { text: 'Age Group' },
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
    }, [globalFilters]);

    useEffect(() => {
        loadTreatmentOutcomesByAge();
    }, [loadTreatmentOutcomesByAge]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART TREATMENT OUTCOMES BY AGE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesByAge} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesByAge;
