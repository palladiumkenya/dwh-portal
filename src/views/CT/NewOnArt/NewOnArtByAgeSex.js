import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';

const NewOnArtByAgeSex = ({ globalFilter }) => {
    const [linkageByAgeSex, setNewOnArtByAgeSex] = useState({});

    const loadNewOnArtByAgeSex = useCallback(async () => {
        const ageGroups = [];
        const ageGroupsMale = [];
        const ageGroupsFemale = [];
        let txNewMale = [];
        let txNewFemale = [];

        const result = [
            {"AgeGroup":"Under 5","Gender":"Male","txNew":"338"},
            {"AgeGroup":"Under 5","Gender":"Female","txNew":"318"},
            {"AgeGroup":"5 to 9","Gender":"Male","txNew":"274"},
            {"AgeGroup":"5 to 9","Gender":"Female","txNew":"288"},
            {"AgeGroup":"10 to 14","Gender":"Female","txNew":"315"},
            {"AgeGroup":"10 to 14","Gender":"Male","txNew":"206"},
            {"AgeGroup":"15 to 19","Gender":"Female","txNew":"1637"},
            {"AgeGroup":"15 to 19","Gender":"Male","txNew":"313"},
            {"AgeGroup":"20 to 24","Gender":"Female","txNew":"5558"},
            {"AgeGroup":"20 to 24","Gender":"Male","txNew":"1176"},
            {"AgeGroup":"25 to 29","Gender":"Male","txNew":"2562"},
            {"AgeGroup":"25 to 29","Gender":"Female","txNew":"6415"},
            {"AgeGroup":"30 to 34","Gender":"Male","txNew":"3573"},
            {"AgeGroup":"30 to 34","Gender":"Female","txNew":"5693"},
            {"AgeGroup":"35 to 39","Gender":"Male","txNew":"3285"},
            {"AgeGroup":"35 to 39","Gender":"Female","txNew":"3537"},
            {"AgeGroup":"40 to 44","Gender":"Male","txNew":"2602"},
            {"AgeGroup":"40 to 44","Gender":"Female","txNew":"2324"},
            {"AgeGroup":"45 to 49","Gender":"Female","txNew":"1474"},
            {"AgeGroup":"45 to 49","Gender":"Male","txNew":"1673"},
            {"AgeGroup":"50 to 54","Gender":"Male","txNew":"984"},
            {"AgeGroup":"50 to 54","Gender":"Female","txNew":"838"},
            {"AgeGroup":"55 to 59","Gender":"Female","txNew":"479"},
            {"AgeGroup":"55 to 59","Gender":"Male","txNew":"612"},
            {"AgeGroup":"60 to 64","Gender":"Female","txNew":"288"},
            {"AgeGroup":"60 to 64","Gender":"Male","txNew":"337"},
            {"AgeGroup":"65+","Gender":"Male","txNew":"1123"},
            {"AgeGroup":"65+","Gender":"Female","txNew":"1447"}
        ];

        for(let i = 0; i < result.length; i++) {
            if(ageGroups.indexOf(result[i].AgeGroup) !== -1){
                continue;
            } else{
                ageGroups.push(result[i].AgeGroup);
            }
        }

        for(let i = 0; i < result.length; i++) {
            let index = ageGroups.indexOf(result[i].AgeGroup);
            if (result[i].Gender === 'Male' || result[i].Gender === 'M') {
                ageGroupsMale.splice(index, 0, result[i].AgeGroup);
                txNewMale.splice(index, 0, parseInt(result[i].txNew) * -1);
            } else {
                ageGroupsFemale.splice(index, 0, result[i].AgeGroup);
                txNewFemale.splice(index, 0, parseInt(result[i].txNew));
            }
        }

        setNewOnArtByAgeSex({
            chart: { type: 'bar' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [
                { categories: ageGroups, title: { text: '' }, reversed: false },
                { categories: ageGroups, title: { text: '' }, linkedTo: 0, reversed: false, opposite: true }
            ],
            yAxis: [
                {
                    title: { text: 'Number Positive', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        }
                    },
                }
            ],
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                        'Number Positive: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }
            },
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Female', data: txNewFemale, color: "#485969", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: txNewMale, color: "#1AB394", tooltip: { valueSuffix: ' ' } }
            ]
        });
    }, []);

    useEffect(() => {
        loadNewOnArtByAgeSex();
    }, [loadNewOnArtByAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TX NEW DISTRIBUTION BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={linkageByAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NewOnArtByAgeSex;
