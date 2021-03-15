import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as threeMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/threeMonthRetention';
import * as newOnArtByYearSelectors from '../../../selectors/CT/NewOnArt/newOnArtByYear';

const ThreeMonthRetention = () => {
    const [threeMonthRetention, setThreeMonthRetention] = useState({});
    const threeMonthRetentionData = useSelector(threeMonthRetentionSelectors.getThreeMonthRetention);
    const newOnArtByYearData = useSelector(newOnArtByYearSelectors.getNewOnArtByYear);

    const loadThreeMonthRetention = useCallback(async () => {
        let data = [];
        let dataNewOnArt = [];
        for(let i = 0; i < threeMonthRetentionData.yearCategories.length; i++) {
            dataNewOnArt[i] = 0;
            data[i] = {};
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
        setThreeMonthRetention({
            title: { text: '' },
            xAxis: [{ categories: threeMonthRetentionData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y} %' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: data, type: 'column', color: "#485969", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
            ]
        });
    }, [threeMonthRetentionData, newOnArtByYearData]);

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
