import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const VLSuppressionByYear12Month = () => {
    const [vlSuppressionByYear12Month, setVLSuppressionByYear12Month] = useState({});

    const loadVLSuppressionByYear12Month = useCallback(async () => {
        const result = await getAll('care-treatment/vlSuppressionByYear');

        let year = [];
        let vlSuppressionByYear12Month = [];

        for(let i = 0; i < result.length; i++) {
            year.push(result[i].year);
            vlSuppressionByYear12Month.push(parseInt(result[i].retention12Months, 10));
        }

        setVLSuppressionByYear12Month({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: year, crosshair: true, title: { text: 'Year of Start' } }],
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
                { name: 'Number of Patients', data: vlSuppressionByYear12Month, type: 'column', color: "#485969" },
            ]
        });
    }, []);

    useEffect(() => {
        loadVLSuppressionByYear12Month();
    }, [loadVLSuppressionByYear12Month]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        12 MONTH VIRAL SUPPRESSION BY YEAR OF ART START (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlSuppressionByYear12Month} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLSuppressionByYear12Month;
