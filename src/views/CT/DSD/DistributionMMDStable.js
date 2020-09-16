import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const DistributionMMDStable = ({ globalFilter }) => {
    const [distributionMMDStable, setDistributionMMDStable] = useState({});

    const loadDistributionMMDStable = useCallback(async () => {
        let params = null;
        if (globalFilter) {
            params = { ...globalFilter };
        }
        const categories = ["STANDARD CARE", "FAST TRACK", "COMMUNITY ART DISTRIBUTION HCW LED", "COMMUNITY ART DISTRIBUTION PEER LED", "FACILITY ART DISTRIBUTION GROUP"];
        const data = [40, 85, 63, 100, 60];
        setDistributionMMDStable({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: categories, crosshair: true }],
            yAxis: [
                {
                    title: { text: 'Percentage of Patients', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Percentage of Patients', data: data, type: 'bar', color: "#485969" },
            ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadDistributionMMDStable();
    }, [loadDistributionMMDStable]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF MMD MODELS AMONG STABLE TX CURR PATIENTS (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={distributionMMDStable} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionMMDStable;
