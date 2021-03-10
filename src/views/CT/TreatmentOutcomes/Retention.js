import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as threeMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/threeMonthRetention';
import * as sixMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/sixMonthRetention';
import * as twelveMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/twelveMonthRetention';
import * as twentyFourMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/twentyFourMonthRetention';
import * as newOnArtByYearSelectors from '../../../selectors/CT/NewOnArt/newOnArtByYear';

const Retention = () => {
    const [retention, setRetention] = useState({});
    const threeMonthRetentionData = useSelector(threeMonthRetentionSelectors.getThreeMonthRetention);
    const sixMonthRetentionData = useSelector(sixMonthRetentionSelectors.getSixMonthRetention);
    const twelveMonthRetentionData = useSelector(twelveMonthRetentionSelectors.getTwelveMonthRetention);
    const twentyFourMonthRetentionData = useSelector(twentyFourMonthRetentionSelectors.getTwentyFourMonthRetention);
    const newOnArtByYearData = useSelector(newOnArtByYearSelectors.getNewOnArtByYear);

    const loadRetention = useCallback(async () => {
        let data = [];
        let data2 = [];
        let data3 = [];
        let data4 = [];
        let dataNewOnArt = [];
        for(let i = 0; i < threeMonthRetentionData.yearCategories.length; i++) {
            dataNewOnArt[i] = 0;
            data[i] = {};
            data2[i] = {};
            data3[i] = {};
            data4[i] = {};
        }
        for(let i = 0; i < newOnArtByYearData.txNew.length; i++) {
            let index = threeMonthRetentionData.yearCategories.indexOf(newOnArtByYearData.years[i]);
            if(index === -1) {
                continue;
            }
            dataNewOnArt[index] = dataNewOnArt[index] + parseInt(newOnArtByYearData.txNew[i]);
        }
        for(let i = 0; i < threeMonthRetentionData.yearCategories.length; i++) {
            let percentage = Number(((threeMonthRetentionData.data[i]/dataNewOnArt[i])*100).toFixed(0));
            data[i] = {
                y:  percentage > 100 ? 100: percentage,
                absoluteY: threeMonthRetentionData.data[i].toLocaleString('en'),
            };
        }
        for(let i = 0; i < sixMonthRetentionData.yearCategories.length; i++) {
            let percentage = Number(((sixMonthRetentionData.data[i]/dataNewOnArt[i])*100).toFixed(0));
            data2[i] = {
                y:  percentage > 100 ? 100: percentage,
                absoluteY: sixMonthRetentionData.data[i].toLocaleString('en'),
            };
        }
        for(let i = 0; i < twelveMonthRetentionData.yearCategories.length; i++) {
            let percentage = Number(((twelveMonthRetentionData.data[i]/dataNewOnArt[i])*100).toFixed(0));
            data3[i] = {
                y:  percentage > 100 ? 100: percentage,
                absoluteY: twelveMonthRetentionData.data[i].toLocaleString('en'),
            };
        }
        for(let i = 0; i < twentyFourMonthRetentionData.yearCategories.length; i++) {
            let percentage = Number(((twentyFourMonthRetentionData.data[i]/dataNewOnArt[i])*100).toFixed(0));
            data4[i] = {
                y:  percentage > 100 ? 100: percentage,
                absoluteY: twentyFourMonthRetentionData.data[i].toLocaleString('en'),
            };
        }

        data = data.map(d => parseInt(d.y) === 0 ? null : d);
        data2 = data2.map(d => parseInt(d.y) === 0 ? null : d);
        data3 = data3.map(d => parseInt(d.y) === 0 ? null : d);
        data4 = data4.map(d => parseInt(d.y) === 0 ? null : d);

        setRetention({
            title: { text: '' },
            xAxis: [{ categories: threeMonthRetentionData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y} %' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: '3 MONTH RETENTION', data: data, type: 'spline', color: "#E15759", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
                { name: '6 MONTH RETENTION', data: data2, type: 'spline', color: "#F28E2B", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
                { name: '12 MONTH RETENTION', data: data3, type: 'spline', color: "#60A6E5", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
                { name: '24 MONTH RETENTION', data: data4, type: 'spline', color: "#1AB394", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
            ]
        });
    }, [threeMonthRetentionData, sixMonthRetentionData, twelveMonthRetentionData, twentyFourMonthRetentionData, newOnArtByYearData]);

    useEffect(() => {
        loadRetention();
    }, [loadRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        RETENTION BY YEAR OF ART START*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={retention} />
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

export default Retention;
