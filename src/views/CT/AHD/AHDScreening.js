import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as ahdSelectors from '../../../selectors/CT/AHD/ahdSelectors';

const AHDScreening = () => {
    const [ahdScreeningChart, setAhdScreeningChart] = useState({});
    const ahdScreeningData = useSelector(ahdSelectors.getAHDIndicators);

    const loadAHDScreening = useCallback(async () => {
        setAhdScreeningChart({
            title: { text: '' },
            xAxis: [{ categories: [
                    'PLHIV AT RISK OF AHD',
                    'NO. SCREENED',
                    'NO. WITH AHD'
                ], title: { text: 'AHD SCREENING' }, crosshair: true }],
            yAxis: [{ title: { text: '' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{point.y:,.0f}{point.text}' } } },
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'AHD SCREENED', data: [
                        { y: ahdScreeningData?.NewPatient },
                        { y: ahdScreeningData?.AHDScreened, text: ' (' + parseFloat(((ahdScreeningData?.AHDScreened/ahdScreeningData?.NewPatient)*100).toString()).toFixed(0) + '%)' },
                        { y: ahdScreeningData?.AHD, text: ' (' + parseFloat(((ahdScreeningData?.AHD/ahdScreeningData?.AHDScreened)*100).toString()).toFixed(0) + '%)' },
                    ], type: 'column', color: "#142459" },
            ]
        });
    }, [ahdScreeningData]);

    useEffect(() => {
        loadAHDScreening();
    }, [loadAHDScreening]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                AHD SCREENING
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ahdScreeningChart} />
                </div>
            </CardBody>
        </Card>
    );
};

export default AHDScreening;
