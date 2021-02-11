import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as twentyFourMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/twentyFourMonthRetention';
import * as newOnArtByYearSelectors from '../../../selectors/CT/NewOnArt/newOnArtByYear';

const TwentyFourMonthRetention = () => {
    const [twentyFourMonthRetention, setTwentyFourMonthRetention] = useState({});
    const twentyFourMonthRetentionData = useSelector(twentyFourMonthRetentionSelectors.getTwentyFourMonthRetention);
    const newOnArtByYearData = useSelector(newOnArtByYearSelectors.getNewOnArtByYear);

    const loadTwentyFourMonthRetention = useCallback(async () => {
        let data = [];
        let dataNewOnArt = [];
        for(let i = 0; i < twentyFourMonthRetentionData.yearCategories.length; i++) {
            dataNewOnArt[i] = 0;
            data[i] = {};
        }
        for(let i = 0; i < newOnArtByYearData.txNew.length; i++) {
            let index = twentyFourMonthRetentionData.yearCategories.indexOf(newOnArtByYearData.years[i]);
            if(index === -1) {
                continue;
            }
            dataNewOnArt[index] = dataNewOnArt[index] + parseInt(newOnArtByYearData.txNew[i]);
        }
        for(let i = 0; i < twentyFourMonthRetentionData.yearCategories.length; i++) {
            let percentage = Number(((twentyFourMonthRetentionData.data[i]/dataNewOnArt[i])*100).toFixed(0));
            data[i] = {
                y:  percentage > 100 ? 100: percentage,
                absoluteY: twentyFourMonthRetentionData.data[i].toLocaleString('en'),
            };
        }
        setTwentyFourMonthRetention({
            title: { text: '' },
            xAxis: [{ categories: twentyFourMonthRetentionData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y} %' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: data, type: 'column', color: "#485969", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
            ]
        });
    }, [twentyFourMonthRetentionData, newOnArtByYearData]);

    useEffect(() => {
        loadTwentyFourMonthRetention();
    }, [loadTwentyFourMonthRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        24 MONTH RETENTION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={twentyFourMonthRetention} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TwentyFourMonthRetention;
