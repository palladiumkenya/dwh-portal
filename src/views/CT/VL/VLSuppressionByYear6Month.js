import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const VLSuppressionByYear6Month = ({ globalFilters }) => {
    const [vlSuppressionByYear6Month, setVLSuppressionByYear6Month] = useState({});

    const loadVLSuppressionByYear6Month = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const result = await getAll('care-treatment/vlSuppressionByYear', params);

        let year = [];
        let vlSuppressionByYear6Month = [];

        for(let i = 0; i < result.length; i++) {
            year.push(result[i].year);
            vlSuppressionByYear6Month.push(parseInt(result[i].retention6Months, 10));
        }

        setVLSuppressionByYear6Month({
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
                { name: 'Number of Patients', data: vlSuppressionByYear6Month, type: 'column', color: "#485969" },
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadVLSuppressionByYear6Month();
    }, [loadVLSuppressionByYear6Month]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        6 MONTH VIRAL SUPPRESSION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlSuppressionByYear6Month} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLSuppressionByYear6Month;
