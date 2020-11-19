import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const DSDCascade = ({ globalFilters }) => {
    const [dsdCascade, setDSDCascade] = useState({});

    const loadDSDCascade = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        let txCurr = 0;
        let stable = 0;
        let mmd = 0;
        const result = await getAll('care-treatment/dsdCascade', params);
        if(result) {
            txCurr = result.txCurr;
            stable = result.stable;
            mmd = result.mmd;
        }
        const categories = ["TX CURR", "STABLE", "TOTAL ON MMD"];
        const data = [txCurr, stable, mmd];
        setDSDCascade({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: categories, crosshair: true }],
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
                { name: 'Number of Patients', data: data, type: 'column', color: "#485969" },
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadDSDCascade();
    }, [loadDSDCascade]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DSD CASCADE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={dsdCascade} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DSDCascade;
