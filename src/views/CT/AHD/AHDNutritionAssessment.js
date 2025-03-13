import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as ahdSelectors from '../../../selectors/CT/AHD/ahdSelectors';

const AHDNutritionAssessment = () => {
    const [ahdScreeningChart, setAhdScreeningChart] = useState({});
    const ahdScreeningData = useSelector(ahdSelectors.getAHDNutritionAssessment);

    const loadAHDScreening = useCallback(async () => {
        setAhdScreeningChart({
            title: { text: '' },
            xAxis: [{ categories: [
                    'CHILDREN WITH AHD',
                    'SCREENED FOR MALNUTRITION',
                    'NO. WITH SAM',
                    'NO. WITH MAM',
                    // 'NO. WITH NUTRITIONAL ',
                ], title: { text: 'AHD NUTRITION ASSESSMENT & MANAGEMENT' }, crosshair: true }],
            yAxis: [{ title: { text: '' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'AHD SCREENED', data: [
                        ahdScreeningData?.ChildrenWithAHD,
                        ahdScreeningData?.ScreenedForMalnutrition,
                        ahdScreeningData?.NumberWithSAM,
                        ahdScreeningData?.NumberWithMAM,
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
                NUTRITION ASSESSMENT & MANAGEMENT
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ahdScreeningChart} />
                </div>
            </CardBody>
        </Card>
    );
};

export default AHDNutritionAssessment;
