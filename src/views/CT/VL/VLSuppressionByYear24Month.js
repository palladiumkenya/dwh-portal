import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const VLSuppressionByYear24Month = ({ globalFilters }) => {
    const [vlSuppressionByYear24Month, setVLSuppressionByYear24Month] = useState({});

    const loadVLSuppressionByYear24Month = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const result = await getAll('care-treatment/vlSuppressionByYear', params);

        let year = [];
        let vlSuppressionByYear24Month = [];

        for(let i = 0; i < result.length; i++) {
            year.push(result[i].year);
            vlSuppressionByYear24Month.push(parseInt(result[i].retention24Months, 10));
        }

        setVLSuppressionByYear24Month({
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
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Number of Patients', data: vlSuppressionByYear24Month, type: 'column', color: "#485969" },
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadVLSuppressionByYear24Month();
    }, [loadVLSuppressionByYear24Month]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        24 MONTH VIRAL SUPPRESSION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlSuppressionByYear24Month} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLSuppressionByYear24Month;
