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
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y} %' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: threeMonthRetentionData.data, type: 'column', color: "#142459", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
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
                        3 MONTH RETENTION BY YEAR OF ART START*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={threeMonthRetention} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12">
                *This indicator is computed and displayed for the last completed month.
            </div>
        </div>
    );
};

export default ThreeMonthRetention;
