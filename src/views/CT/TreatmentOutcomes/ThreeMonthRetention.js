import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as threeMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/threeMonthRetention';

const ThreeMonthRetention = () => {
    const [threeMonthRetention, setThreeMonthRetention] = useState({});
    const threeMonthRetentionData = useSelector(threeMonthRetentionSelectors.getThreeMonthRetention);

    const loadThreeMonthRetention = useCallback(async () => {
        setThreeMonthRetention({
            title: { text: '' },
            xAxis: [{ categories: threeMonthRetentionData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: threeMonthRetentionData.data, type: 'column', color: "#485969" },
            ]
        });
    }, [threeMonthRetentionData]);

    useEffect(() => {
        loadThreeMonthRetention();
    }, [loadThreeMonthRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        3 MONTH RETENTION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={threeMonthRetention} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ThreeMonthRetention;
