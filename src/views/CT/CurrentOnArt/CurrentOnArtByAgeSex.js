import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';

const CurrentOnArtByAgeSex = () => {
    const [currentOnArtByAgeSexChart, setCurrentOnArtByAgeSexChart] = useState({});
    const currentOnArtByAgeSexData = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtByAgeSex);

    const loadCurrentOnArtByAgeSexChart = useCallback(async () => {
        setCurrentOnArtByAgeSexChart({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                { categories: currentOnArtByAgeSexData.ageGroups, title: { text: '' }, reversed: false },
                { categories: currentOnArtByAgeSexData.ageGroups, title: { text: '' }, reversed: false, linkedTo: 0, opposite: true }
            ],
            yAxis: [{ min: -(currentOnArtByAgeSexData.max), max: currentOnArtByAgeSexData.max, title: { text: 'CURRENT ON ART' }, labels: { formatter: function () {
                return Math.abs(this.value);
            }}}],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 18, } },
            tooltip: { formatter: function () {
                return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                    'CURRENT ON ART: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
            }},
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Female', data: currentOnArtByAgeSexData.currentOnArtFemale, color: "#EA4C8B" },
                { name: 'Male', data: currentOnArtByAgeSexData.currentOnArtMale, color: "#14084D" }
            ]
        });
    }, [currentOnArtByAgeSexData]);

    useEffect(() => {
        loadCurrentOnArtByAgeSexChart();
    }, [loadCurrentOnArtByAgeSexChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CURRENT ON ART BY AGE GROUP AND SEX*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={currentOnArtByAgeSexChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12">
                *This indicator is computed and displayed for the last completed month.
            </div>
        </div>
    );
}

export default CurrentOnArtByAgeSex;
