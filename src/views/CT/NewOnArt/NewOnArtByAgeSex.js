import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as newOnArtByAgeSexSelectors from '../../../selectors/CT/NewOnArt/newOnArtByAgeSex';

const NewOnArtByAgeSex = () => {
    const [newOnArtByAgeSexChart, setNewOnArtByAgeSexChart] = useState({});
    const newOnArtByAgeSexData = useSelector(newOnArtByAgeSexSelectors.getNewOnArtByAgeSex);

    const loadNewOnArtByAgeSexChart = useCallback(async () => {
        setNewOnArtByAgeSexChart({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                { categories: newOnArtByAgeSexData.ageGroups, title: { text: '' }, reversed: false },
                { categories: newOnArtByAgeSexData.ageGroups, title: { text: '' }, reversed: false, linkedTo: 0, opposite: true }
            ],
            yAxis: [{ min: -(newOnArtByAgeSexData.max), max: newOnArtByAgeSexData.max, title: { text: 'Number Positive' }, labels: { formatter: function () {
                return Math.abs(this.value);
            }}}],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 18, } },
            tooltip: { formatter: function () {
                return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                    'Number Positive: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
            }},
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Female', data: newOnArtByAgeSexData.newOnArtFemale, color: "#EA4C8B" },
                { name: 'Male', data: newOnArtByAgeSexData.newOnArtMale, color: "#14084D" }
            ]
        });
    }, [newOnArtByAgeSexData]);

    useEffect(() => {
        loadNewOnArtByAgeSexChart();
    }, [loadNewOnArtByAgeSexChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF PATIENTS NEWLY STARTED ON ART BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={newOnArtByAgeSexChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NewOnArtByAgeSex;
