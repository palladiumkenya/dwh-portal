import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const VLUptakeByAge = ({ globalFilter }) => {
    const [vlUptakeByAge, setVLUptakeByAge] = useState({});

    const loadVLUptakeByAge = useCallback(async () => {
        let params = null;
        if (globalFilter) {
            params = { ...globalFilter };
        }
        const sexCategories = ['Male', 'Female'];
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
        const result = await getAll('care-treatment/vlUptakeByAge', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < sexCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < ageCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let sexIndex = sexCategories.indexOf(result[i].gender);
            let ageIndex = ageCategories.indexOf(result[i].ageGroup);
            if(sexIndex === -1 || ageIndex === -1) { // unsupported
                continue;
            }
            data[sexIndex][ageIndex] = data[sexIndex][ageIndex] + parseInt(result[i].vlDone);
        }
        setVLUptakeByAge({
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
            legend: { floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'MALE', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FEMALE', data: data[1], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadVLUptakeByAge();
    }, [loadVLUptakeByAge]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG TX CURR PATIENTS BY AGE (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlUptakeByAge} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLUptakeByAge;
