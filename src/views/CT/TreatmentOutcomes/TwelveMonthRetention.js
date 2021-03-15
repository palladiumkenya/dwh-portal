import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as twelveMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/twelveMonthRetention';
import * as newOnArtByYearSelectors from '../../../selectors/CT/NewOnArt/newOnArtByYear';

const TwelveMonthRetention = () => {
    const [twelveMonthRetention, setTwelveMonthRetention] = useState({});
    const twelveMonthRetentionData = useSelector(twelveMonthRetentionSelectors.getTwelveMonthRetention);
    const newOnArtByYearData = useSelector(newOnArtByYearSelectors.getNewOnArtByYear);

    const loadTwelveMonthRetention = useCallback(async () => {
        let data = [];
        let dataNewOnArt = [];
        for(let i = 0; i < twelveMonthRetentionData.yearCategories.length; i++) {
            dataNewOnArt[i] = 0;
            data[i] = {};
        }
        for(let i = 0; i < newOnArtByYearData.txNew.length; i++) {
            let index = twelveMonthRetentionData.yearCategories.indexOf(newOnArtByYearData.years[i]);
            if(index === -1) {
                continue;
            }
            dataNewOnArt[index] = dataNewOnArt[index] + parseInt(newOnArtByYearData.txNew[i]);
        }
        for(let i = 0; i < twelveMonthRetentionData.yearCategories.length; i++) {
            let percentage = Number(((twelveMonthRetentionData.data[i]/dataNewOnArt[i])*100).toFixed(0));
            data[i] = {
                y:  percentage > 100 ? 100: percentage,
                absoluteY: twelveMonthRetentionData.data[i].toLocaleString('en'),
            };
        }
        setTwelveMonthRetention({
            title: { text: '' },
            xAxis: [{ categories: twelveMonthRetentionData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y} %' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: data, type: 'column', color: "#485969", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
            ]
        });
    }, [twelveMonthRetentionData, newOnArtByYearData]);

    useEffect(() => {
        loadTwelveMonthRetention();
    }, [loadTwelveMonthRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        12 MONTH RETENTION BY YEAR OF ART START*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={twelveMonthRetention} />
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

export default TwelveMonthRetention;
