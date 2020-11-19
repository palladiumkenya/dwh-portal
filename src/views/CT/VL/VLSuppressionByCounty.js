import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const VLSuppressionByCounty = ({ globalFilters }) => {
    const [vlSuppressionByCounty, setVLSuppressionByCounty] = useState({});

    const loadVLSuppressionByCounty = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const result = await getAll('care-treatment/vlSuppressionByCounty', params);

        let counties = [];
        let vlSuppressionByCounty = [];

        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].county);
            vlSuppressionByCounty.push(parseInt(result[i].suppressed, 10));
        }

        setVLSuppressionByCounty({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: counties, crosshair: true, title: { text: 'County' } }],
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
                { name: 'Number of Patients', data: vlSuppressionByCounty, type: 'column', color: "#485969" },
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadVLSuppressionByCounty();
    }, [loadVLSuppressionByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL SUPPRESSION AMONG TX CURR PATIENTS BY COUNTY (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlSuppressionByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLSuppressionByCounty;
