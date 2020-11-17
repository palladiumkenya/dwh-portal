import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const TreatmentOutcomesByPartner = ({ globalFilters }) => {
    const [treatmentOutcomesByPartner, setTreatmentOutcomesByPartner] = useState({});

    const loadTreatmentOutcomesByPartner = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const treatmentOutcomesCategories = ['Active', 'Dead', 'LTFU', 'Stopped'];
        const partnerCategories = [];
        const result = await getAll('care-treatment/treatmentOutcomesByPartner', params);
        let data = [];
        for(let i = 0; i < result.length; i++) {
            if(partnerCategories.indexOf(result[i].partner) === -1){
                partnerCategories.push(result[i].partner);
            }
        }
        // seed all values sp that missing values default to 0
        for(let i = 0; i < treatmentOutcomesCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < partnerCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let appointmentIndex = treatmentOutcomesCategories.indexOf(result[i].artOutcome);
            let partnerIndex = partnerCategories.indexOf(result[i].partner);
            if(appointmentIndex === -1 || partnerIndex === -1 ) { // unsupported
                continue;
            }
            data[appointmentIndex][partnerIndex] = data[appointmentIndex][partnerIndex] + parseInt(result[i].totalOutcomes);
        }
        setTreatmentOutcomesByPartner({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: partnerCategories,
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
    }, [globalFilters]);

    useEffect(() => {
        loadTreatmentOutcomesByPartner();
    }, [loadTreatmentOutcomesByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART TREATMENT OUTCOMES BY PARTNER (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={treatmentOutcomesByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesByPartner;
