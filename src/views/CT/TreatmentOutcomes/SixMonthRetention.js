import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as sixMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/sixMonthRetention';

const SixMonthRetention = () => {
    const [sixMonthRetention, setSixMonthRetention] = useState({});
    const sixMonthRetentionData = useSelector(sixMonthRetentionSelectors.getSixMonthRetention);

    const loadSixMonthRetention = useCallback(async () => {
        setSixMonthRetention({
            title: { text: '' },
            xAxis: [{ categories: sixMonthRetentionData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: sixMonthRetentionData.data, type: 'column', color: "#485969" },
            ]
        });
    }, [sixMonthRetentionData]);

    useEffect(() => {
        loadSixMonthRetention();
    }, [loadSixMonthRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        6 MONTH RETENTION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={sixMonthRetention} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default SixMonthRetention;
