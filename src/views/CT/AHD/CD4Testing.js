import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as ahdSelectors from '../../../selectors/CT/AHD/ahdSelectors';

const AHDScreening = () => {
    const [cd4TestingChart, setCd4TestingChart] = useState({});
    const cd4TestingData = useSelector(ahdSelectors.getAHDIndicators);

    const loadCD4Testing = useCallback(async () => {
        setCd4TestingChart({
            title: { text: '' },
            xAxis: [{ categories: ['PATIENTS ON CARE(TREATMENT NEW/RTT/CTF)', 'DONE CD4 TEST', 'CD4 <200(OR <25%)'], title: { text: 'CD4' }, crosshair: true }],
            yAxis: [{ title: { text: '' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'CD4 TESTING', data: [cd4TestingData?.NewPatient, cd4TestingData?.DoneCD4Test, cd4TestingData?.less200CD4], type: 'column', color: "#142459" },
            ]
        });
    }, [cd4TestingData]);

    useEffect(() => {
        loadCD4Testing();
    }, [loadCD4Testing]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                CD4 TESTING
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={cd4TestingChart} />
                </div>
            </CardBody>
        </Card>
    );
};

export default AHDScreening;
