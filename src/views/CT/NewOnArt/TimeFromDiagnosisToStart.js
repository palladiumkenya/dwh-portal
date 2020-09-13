import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';

const TimeFromDiagnosisToStart = ({ globalFilter }) => {
    const [linkageByAgeSex, setTimeFromDiagnosisToStart] = useState({});

    const loadTimeFromDiagnosisToStart = useCallback(async () => {
        const periodGroups = [];
        let firstPeriod = [];
        let secondPeriod = [];
        let thirdPeriod = [];
        let fourthPeriod = [];

        const result = [
            {"year":"2011","period":"firstPeriod","txNew":"25"},
            {"year":"2011","period":"secondPeriod","txNew":"25"},
            {"year":"2011","period":"thirdPeriod","txNew":"25"},
            {"year":"2011","period":"fourthPeriod","txNew":"25"},
            {"year":"2012","period":"firstPeriod","txNew":"20"},
            {"year":"2012","period":"secondPeriod","txNew":"25"},
            {"year":"2012","period":"thirdPeriod","txNew":"25"},
            {"year":"2012","period":"fourthPeriod","txNew":"30"},
            {"year":"2013","period":"firstPeriod","txNew":"32"},
            {"year":"2013","period":"secondPeriod","txNew":"25"},
            {"year":"2013","period":"thirdPeriod","txNew":"28"},
            {"year":"2013","period":"fourthPeriod","txNew":"15"},
            {"year":"2014","period":"firstPeriod","txNew":"20"},
            {"year":"2014","period":"secondPeriod","txNew":"30"},
            {"year":"2014","period":"thirdPeriod","txNew":"30"},
            {"year":"2014","period":"fourthPeriod","txNew":"20"},
            {"year":"2015","period":"firstPeriod","txNew":"15"},
            {"year":"2015","period":"secondPeriod","txNew":"35"},
            {"year":"2015","period":"thirdPeriod","txNew":"20"},
            {"year":"2015","period":"fourthPeriod","txNew":"30"},
            {"year":"2016","period":"firstPeriod","txNew":"25"},
            {"year":"2016","period":"secondPeriod","txNew":"25"},
            {"year":"2016","period":"thirdPeriod","txNew":"25"},
            {"year":"2016","period":"fourthPeriod","txNew":"25"},
            {"year":"2017","period":"firstPeriod","txNew":"30"},
            {"year":"2017","period":"secondPeriod","txNew":"30"},
            {"year":"2017","period":"thirdPeriod","txNew":"25"},
            {"year":"2017","period":"fourthPeriod","txNew":"15"}
        ];

        for(let i = 0; i < result.length; i++) {
            if(periodGroups.indexOf(result[i].year) !== -1){
                continue;
            } else{
                periodGroups.push(result[i].year);
            }
        }

        for(let i = 0; i < result.length; i++) {
            let index = periodGroups.indexOf(result[i].year);
            if (result[i].period === 'firstPeriod') {
                firstPeriod.splice(index, 0, parseInt(result[i].txNew));
            } else if (result[i].period === 'secondPeriod') {
                secondPeriod.splice(index, 0, parseInt(result[i].txNew));
            } else if (result[i].period === 'thirdPeriod') {
                thirdPeriod.splice(index, 0, parseInt(result[i].txNew));
            } else if (result[i].period === 'fourthPeriod') {
                fourthPeriod.splice(index, 0, parseInt(result[i].txNew));
            }
        }

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
                { name: 'Same Day', data: fourthPeriod, type: 'column', color: "#485969", tooltip: { valueSuffix: ' ' } },
                { name: '1-7 Days', data: thirdPeriod, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ' } },
                { name: '8-14 Days', data: secondPeriod, type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' ' } },
                { name: '14 Days', data: firstPeriod, type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ' } },
            ]
        });
    }, []);

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
