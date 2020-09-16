import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const DistributionStableAgeSex = ({ globalFilter }) => {
    const [distributionStableAgeSex, setDistributionStableAgeSex] = useState({});

    const loadDistributionStableAgeSex = useCallback(async () => {
        let params = null;
        if (globalFilter) {
            params = { ...globalFilter };
        }
        const result3 = await getAll('care-treatment/txNewByAgeSex', params);
        const result = [
            {"AgeGroup": "20 - 24 YRS", "Gender": "M", "stable": 40 },
            {"AgeGroup": "20 - 24 YRS", "Gender": "F", "stable": 50 },
            {"AgeGroup": "25 - 34 YRS", "Gender": "M", "stable": 55 },
            {"AgeGroup": "25 - 34 YRS", "Gender": "F", "stable": 65 },
            {"AgeGroup": "35 - 44 YRS", "Gender": "M", "stable": 67 },
            {"AgeGroup": "35 - 44 YRS", "Gender": "F", "stable": 79 },
            {"AgeGroup": "45 - 54 YRS", "Gender": "M", "stable": 67 },
            {"AgeGroup": "45 - 54 YRS", "Gender": "F", "stable": 79 },
            {"AgeGroup": "55 - 65 YRS", "Gender": "M", "stable": 55 },
            {"AgeGroup": "55 - 65 YRS", "Gender": "F", "stable": 63 },
            {"AgeGroup": "65+ YRS", "Gender": "M", "stable": 43 },
            {"AgeGroup": "65+ YRS", "Gender": "F", "stable": 48 },
        ];
        const ageGroups = ["20 - 24 YRS", "25 - 34 YRS", "35 - 44 YRS", "45 - 54 YRS", "55 - 65 YRS", "65+ YRS"];
        const ageGroupsMale = [];
        const ageGroupsFemale = [];
        let stableMale = [];
        let stableFemale = [];

        // for(let i = 0; i < result.length; i++) {
        //     if(ageGroups.indexOf(result[i].AgeGroup) !== -1){
        //         continue;
        //     } else{
        //         ageGroups.push(result[i].AgeGroup);
        //     }
        // }

        for(let i = 0; i < result.length; i++) {
            let index = ageGroups.indexOf(result[i].AgeGroup);
            if (result[i].Gender === 'Male' || result[i].Gender === 'M') {
                ageGroupsMale.splice(index, 0, result[i].AgeGroup);
                stableMale.splice(index, 0, parseInt(result[i].stable) * -1);
            } else {
                ageGroupsFemale.splice(index, 0, result[i].AgeGroup);
                stableFemale.splice(index, 0, parseInt(result[i].stable));
            }
        }

        setDistributionStableAgeSex({
            chart: { type: 'bar' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [
                { categories: ageGroups, title: { text: '' }, reversed: false },
                { categories: ageGroups, title: { text: '' }, linkedTo: 0, reversed: false, opposite: true }
            ],
            yAxis: [
                {
                    title: { text: 'Number Stable', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        }
                    }
                }
            ],
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {
                    pointWidth: 40,
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                        'Number Stable: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }
            },
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Female', data: stableFemale, color: "#485969", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: stableMale, color: "#1AB394", tooltip: { valueSuffix: ' ' } }
            ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadDistributionStableAgeSex();
    }, [loadDistributionStableAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={distributionStableAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionStableAgeSex;
