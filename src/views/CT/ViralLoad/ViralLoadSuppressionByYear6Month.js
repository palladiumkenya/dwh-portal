import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash';
import * as viralLoadSuppressionByYearSelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByYear';
import * as viralLoadSuppressionByYearAndSuppressionCategorySelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByYearAndSuppressionCategory';

const ViralLoadSuppressionByYear6Month = () => {
    const [viralLoadSuppressionByYear6Month, setViralLoadSuppressionByYear6Month] = useState({});
    const viralLoadSuppressionByYearData = useSelector(viralLoadSuppressionByYearSelectors.getViralLoadSuppressionByYear);
    const viralLoadDoneByYearData = useSelector(viralLoadSuppressionByYearAndSuppressionCategorySelectors.getViralLoadDoneByYear);
    const suppression = _.zipWith(viralLoadSuppressionByYearData.yearCategories, viralLoadSuppressionByYearData.data[1], function (a, b) {
        return { year: a, suppression: b };
    });
    const combinedData = _.values(_.merge(_.keyBy(suppression, 'year'), _.keyBy(viralLoadDoneByYearData, 'year')));
    const data = combinedData.map(d => ({
        y: Number(((parseInt(d.suppression)/parseInt(d.vlDone))*100).toFixed(0)),
        absoluteY: d.suppression.toLocaleString('en'),
    }));
    const loadViralLoadSuppressionByYear6Month = useCallback(async () => {
        setViralLoadSuppressionByYear6Month({
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
        loadViralLoadSuppressionByYear6Month();
    }, [loadViralLoadSuppressionByYear6Month]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        6 MONTH VIRAL SUPPRESSION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByYear6Month} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByYear6Month;
