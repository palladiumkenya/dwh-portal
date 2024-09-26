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
            xAxis: [{ categories: ['PATIENTS WITH AHD', 'DONE TB LAM TEST', 'TB LAM POS', 'INITIATED ON TB TREATMENT'], title: { text: 'TB SCREENING & MANAGEMENT' }, crosshair: true }],
            yAxis: [{ title: { text: '' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PATIENTS', data: [tbScreeningAndManagementData?.AHD, tbScreeningAndManagementData?.DoneTBLamTest, tbScreeningAndManagementData?.TBLamPositive, tbScreeningAndManagementData?.tbInitiated ], type: 'column', color: "#142459" },
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
