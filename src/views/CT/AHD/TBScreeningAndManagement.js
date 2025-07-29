import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as ahdSelectors from '../../../selectors/CT/AHD/ahdSelectors';

const TBScreeningAndManagement = () => {
    const [tbScreeningAndManagementChart, setTbScreeningAndManagementChart] = useState({});
    const tbScreeningAndManagementData = useSelector(ahdSelectors.getAHDIndicators);

    const loadTBScreeningAndManagement = useCallback(async () => {
        setTbScreeningAndManagementChart({
            title: { text: '' },
            xAxis: [{ categories: ['PATIENTS WITH AHD', 'DONE LF LAM TEST', 'LF LAM POS', 'INITIATED ON TB TREATMENT'], title: { text: 'TB SCREENING & MANAGEMENT' }, crosshair: true }],
            yAxis: [{ title: { text: '' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{point.y:,.0f}{point.text}' } } },
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PATIENTS', data: [
                        { y: tbScreeningAndManagementData?.AHD },
                        { y: tbScreeningAndManagementData?.DoneTBLamTest, text: ' (' + parseFloat(((tbScreeningAndManagementData?.DoneTBLamTest/tbScreeningAndManagementData?.AHD)*100).toString()).toFixed(0) + '%)' },
                        { y: tbScreeningAndManagementData?.TBLamPositive, text: ' (' + parseFloat(((tbScreeningAndManagementData?.TBLamPositive/tbScreeningAndManagementData?.DoneTBLamTest)*100).toString()).toFixed(0) + '%)' },
                        { y: tbScreeningAndManagementData?.tbInitiated, text: ' (' + parseFloat(((tbScreeningAndManagementData?.tbInitiated/tbScreeningAndManagementData?.TBLamPositive)*100).toString()).toFixed(0) + '%)' } ], type: 'column', color: "#142459" },
            ]
        });
    }, [tbScreeningAndManagementData]);

    useEffect(() => {
        loadTBScreeningAndManagement();
    }, [loadTBScreeningAndManagement]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                TB SCREENING & MANAGEMENT
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={tbScreeningAndManagementChart} />
                </div>
            </CardBody>
        </Card>
    );
};

export default TBScreeningAndManagement;
