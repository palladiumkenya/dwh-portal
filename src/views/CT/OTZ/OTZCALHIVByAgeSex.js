import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';

const OTZCALHIVByAgeSex = () => {
    const [otzCalhivByAgeSex, setOtzCalhivByAgeSex] = useState(
        {}
    );
    const male = [123, 232, 553, 634, 2242];
    const female = [-223, -232, -553, -634, -2242];

    const loadOtzCalhivByAgeSex = useCallback(async () => {
        setOtzCalhivByAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                {
                    categories: [
                        '10-12 YRS',
                        '13-15 YRS',
                        '16-18 YRS',
                        '19-21 YRS',
                        '22-24 YRS',
                    ],
                    title: { text: '' },
                    reversed: true,
                },
                {
                    categories: [
                        '10-12 YRS',
                        '13-15 YRS',
                        '16-18 YRS',
                        '19-21 YRS',
                        '22-24 YRS',
                    ],
                    title: { text: '' },
                    reversed: true,
                    linkedTo: 0,
                    opposite: true,
                },
            ],
            yAxis: [
                {
                    // min: -currentOnArtByAgeSexData.max,
                    // max: currentOnArtByAgeSexData.max,
                    title: { text: 'CURRENT ON ART' },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        },
                    },
                },
            ],
            plotOptions: {
                series: { stacking: 'normal' },
                bar: { pointWidth: 18 },
            },
            tooltip: {
                formatter: function () {
                    return (
                        '<b>' +
                        this.series.name +
                        ', Age Group ' +
                        this.point.category +
                        '</b><br/>' +
                        'CURRENT ON ART: ' +
                        Highcharts.numberFormat(Math.abs(this.point.y), 1)
                    );
                },
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'Female',
                    data: female,
                    color: '#EA4C8B',
                },
                {
                    name: 'Male',
                    data: male,
                    color: '#14084D',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadOtzCalhivByAgeSex();
    }, [loadOtzCalhivByAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF CALHIV BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={otzCalhivByAgeSex}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
            
        </div>
    );
};

export default OTZCALHIVByAgeSex;
