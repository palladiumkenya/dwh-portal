import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const TwentyFourMonthRetention = ({ globalFilter }) => {
    const [twentyFourMonthRetention, setTwentyFourMonthRetention] = useState({});

    const loadTwentyFourMonthRetention = useCallback(async () => {
        let params = null;
        if (globalFilter) {
            params = { ...globalFilter };
        }
        const treatmentOutcomesCategories = ['Active'];
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
        setTwentyFourMonthRetention({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{
                categories: yearCategories,
                crosshair: true,
                title: { text: 'Year of start from 2011' }
            }],
            yAxis: [
                {
                    title: { text: 'Number of Patients', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Number of Patients', data: data[0], type: 'bar', color: "#485969" },
            ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadTwentyFourMonthRetention();
    }, [loadTwentyFourMonthRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        24 MONTH RETENTION BY YEAR OF ART START (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={twentyFourMonthRetention} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TwentyFourMonthRetention;
