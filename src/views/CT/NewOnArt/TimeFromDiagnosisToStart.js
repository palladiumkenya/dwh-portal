import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const TimeFromDiagnosisToStart = ({ globalFilter }) => {
    const [linkageByAgeSex, setTimeFromDiagnosisToStart] = useState({});

    const loadTimeFromDiagnosisToStart = useCallback(async () => {
        let params = null;
        if (globalFilter) {
            params = { ...globalFilter };
        }
        const periodGroups = [];
        let firstPeriod = [];
        let firstPeriodPercent = [];
        let secondPeriod = [];
        let secondPeriodPercent = [];
        let thirdPeriod = [];
        let thirdPeriodPercent = [];
        let fourthPeriod = [];
        let fourthPeriodPercent = [];

        const result = await getAll('care-treatment/timeToArt', params);

        result.forEach(function (res) {
            if(periodGroups.indexOf(res.year) === -1){
                periodGroups.push(res.year);
            }
        });

        result.forEach(function (res) {
            let index = periodGroups.indexOf(res.year);
            if (res.period === 'Same Day') {
                firstPeriod.splice(index, 0, parseInt(res.txNew));
            } else if (res.period === '1 to 7 Days') {
                secondPeriod.splice(index, 0, parseInt(res.txNew));
            } else if (res.period === '8 to 14 Days') {
                thirdPeriod.splice(index, 0, parseInt(res.txNew));
            } else if (res.period === '> 14 Days') {
                fourthPeriod.splice(index, 0, parseInt(res.txNew));
            }
        });

        periodGroups.forEach(function (periodGroup, i) {
            let total = 0;
            total = total + firstPeriod[i];
            total = total + secondPeriod[i];
            total = total + thirdPeriod[i];
            total = total + fourthPeriod[i];
            firstPeriodPercent.splice(i, 0, Number(parseFloat((firstPeriod[i]/total)*100).toFixed(1)));
            secondPeriodPercent.splice(i, 0, Number(parseFloat((secondPeriod[i]/total)*100).toFixed(1)));
            thirdPeriodPercent.splice(i, 0, Number(parseFloat((thirdPeriod[i]/total)*100).toFixed(1)));
            fourthPeriodPercent.splice(i, 0, Number(parseFloat((fourthPeriod[i]/total)*100).toFixed(1)));
        });

        setTimeFromDiagnosisToStart({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            plotOptions: { column: { stacking: 'normal' } },
            xAxis: [{ categories: periodGroups, crosshair: true, title: { text: 'Year of Start' } }],
            yAxis: [
                {
                    title: { text: 'Percentage of Patients', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                    max: 100,
                }
            ],
            tooltip: { shared: true },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Same Day', data: firstPeriodPercent, type: 'column', color: "#485969", tooltip: { valueSuffix: ' %' } },
                { name: '1-7 Days', data: secondPeriodPercent, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' %' } },
                { name: '8-14 Days', data: thirdPeriodPercent, type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' %' } },
                { name: '> 14 Days', data: fourthPeriodPercent, type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' %' } },
            ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadTimeFromDiagnosisToStart();
    }, [loadTimeFromDiagnosisToStart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TIME FROM DIAGNOSIS TO ART START AMONG NEWLY DIAGNOSED PATIENTS BY YEAR OF ART (N=495)
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

export default TimeFromDiagnosisToStart;
