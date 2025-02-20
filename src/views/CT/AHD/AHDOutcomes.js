import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as ahdSelectors from '../../../selectors/CT/AHD/ahdSelectors';

const AHDOutcomes = () => {
    const [ahdScreeningChart, setAhdScreeningChart] = useState({});
    const ahdScreeningData = useSelector(ahdSelectors.getAHDOutcomes);

    const loadAHDScreening = useCallback(async () => {
        setAhdScreeningChart({
            chart: { type: 'pie'},
            title: { text: '' },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [
                {
                    name: 'AHD Outcomes',
                    colorByPoint: true,
                    data: ahdScreeningData
                }
            ]
        });
    }, [ahdScreeningData]);

    useEffect(() => {
        loadAHDScreening();
    }, [loadAHDScreening]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                AHD OUTCOMES
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ahdScreeningChart} />
                </div>
            </CardBody>
        </Card>
    );
};

export default AHDOutcomes;
