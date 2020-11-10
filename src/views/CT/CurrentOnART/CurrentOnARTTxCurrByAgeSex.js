import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const CurrentOnARTTxCurrByAgeSex = ({ globalFilter }) => {
    const [txCurrByAgeAndSex, setTxCurrByAgeAndSex] = useState({});

    const getYear = () => {
        if (globalFilter.year) {
            return globalFilter.year.split(',')[0];
        }
        return 2020;
    };

    const loadTxCurrByAgeAndSex = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let ageGroups = [];
        let txNewMale = [];
        let txNewFemale = [];

        const txCurrResult = await getAll('care-treatment/txCurrByAgeAndSex', params);
        for (let i = 0; i < txCurrResult.length; i++) {
            if (txCurrResult[i].Gender.toLowerCase() === "M".toLowerCase() || txCurrResult[i].Gender.toLowerCase() === "Male".toLowerCase()) {
                ageGroups.push(txCurrResult[i].ageGroup);
                txNewMale.push(parseInt(-txCurrResult[i].txCurr, 10));
            } else if (txCurrResult[i].Gender.toLowerCase() === "F".toLowerCase() || txCurrResult[i].Gender.toLowerCase() === "Female".toLowerCase()) {
                txNewFemale.push(parseInt(txCurrResult[i].txCurr, 10));
                ageGroups.push(txCurrResult[i].ageGroup);
            }
        }
        ageGroups = [...new Set(ageGroups)];


        const max_male = Math.max(...txNewMale);
        const max_female = Math.max(...txNewFemale);
        let max = 0;
        max = max_male > max_female ? max_male: max_female;
        let max_val = Math.floor(Math.log(max)/Math.log(10));
        if (max_val === 1) {
            max = max + 10;
        } else if (max_val === 2) {
            max = max + 100;
        } else if (max_val === 3) {
            max = max + 1000;
        } else if (max_val > 3) {
            max = max + 10000;
        }

        setTxCurrByAgeAndSex({
            chart: { type: 'bar' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [
                { categories: ageGroups, title: { text: '' }, reversed: false },
                { categories: ageGroups, title: { text: '' }, linkedTo: 0, reversed: false, opposite: true }
            ],
            yAxis: [
                {
                    min: -(max),
                    max: (max),
                    title: { text: 'TX CURR', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        }
                    },
                }
            ],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 22, } },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                        'TX CURR: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }
            },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Female', data: txNewFemale, color: "#485969", tooltip: { valueSuffix: ' ' } },
                { name: 'Male', data: txNewMale, color: "#1AB394", tooltip: { valueSuffix: ' ' } }
            ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadTxCurrByAgeAndSex();
    }, [loadTxCurrByAgeAndSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TX CURR BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={txCurrByAgeAndSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CurrentOnARTTxCurrByAgeSex;
