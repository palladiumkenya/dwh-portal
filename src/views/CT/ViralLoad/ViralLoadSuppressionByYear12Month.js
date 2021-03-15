import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash';
import * as viralLoadSuppressionByYearSelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByYear';
import * as viralLoadSuppressionByYearAndSuppressionCategorySelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByYearAndSuppressionCategory';

const ViralLoadSuppressionByYear12Month = () => {
    const [viralLoadSuppressionByYear12Month, setViralLoadSuppressionByYear12Month] = useState({});
    const viralLoadSuppressionByYearData = useSelector(viralLoadSuppressionByYearSelectors.getViralLoadSuppressionByYear);
    const viralLoadDoneByYearData = useSelector(viralLoadSuppressionByYearAndSuppressionCategorySelectors.getViralLoadDoneByYear);
    const suppression = _.zipWith(viralLoadSuppressionByYearData.yearCategories, viralLoadSuppressionByYearData.data[2], function (a, b) {
        return { year: a, suppression: b };
    });
    const combinedData = _.values(_.merge(_.keyBy(suppression, 'year'), _.keyBy(viralLoadDoneByYearData, 'year')));
    const data = combinedData.map(d => ({
        y: Number(((parseInt(d.suppression)/parseInt(d.vlDone))*100).toFixed(0)),
        absoluteY: d.suppression.toLocaleString('en'),
    }));
    const loadViralLoadSuppressionByYear12Month = useCallback(async () => {
        setViralLoadSuppressionByYear12Month({
            title: { text: '' },
            xAxis: [{ categories: viralLoadSuppressionByYearData.yearCategories, crosshair: true, title: { text: 'Year of Start' } }],
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y}%' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: data, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.absoluteY})'} },
            ]
        });
    }, [viralLoadSuppressionByYearData]);

    useEffect(() => {
        loadViralLoadSuppressionByYear12Month();
    }, [loadViralLoadSuppressionByYear12Month]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        12 MONTH VIRAL SUPPRESSION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByYear12Month} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByYear12Month;
