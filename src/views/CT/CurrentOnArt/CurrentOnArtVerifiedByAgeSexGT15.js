import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtVerifiedByAgeSex';
import { currentOnArtByAgeSexSelector } from '../../../atoms/CT/CurrOnART/currOnARTByAgeSexAtom';
import { useRecoilValue } from 'recoil';
import moment from 'moment';
import { formatNumber } from '../../../utils/utils';

const CurrentOnArtVerifiedByAgeSexGT15 = () => {
    const [currentOnArtByAgeSexChart, setCurrentOnArtByAgeSexChart] = useState(
        {}
    );
    const currentOnArtByAgeSexData = useSelector(
        currentOnArtByAgeSexSelectors.getCurrentOnArtByAgeSexGT15
    );

    const loadCurrentOnArtByAgeSexChart = useCallback(async () => {
        setCurrentOnArtByAgeSexChart({
            chart: { type: 'column' },
            title: { text: '' },
            xAxis: [
                {
                    categories: currentOnArtByAgeSexData.ageGroups,
                    title: { text: '' },
                    reversed: false,
                }
            ],
            yAxis: [
                {
                    title: { text: 'CURRENT ON ART & VERIFIED' },
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
                    name: 'Male',
                    data: currentOnArtByAgeSexData.currentOnArtMale,
                    color: '#14084D',
                },
                {
                    name: 'Female',
                    data: currentOnArtByAgeSexData.currentOnArtFemale,
                    color: '#EA4C8B',
                },
            ],
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
                        ADULTS 15+ ON ART AND VERIFIED (N =
                        {formatNumber(currentOnArtByAgeSexData.sum)})
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={currentOnArtByAgeSexChart}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CurrentOnArtVerifiedByAgeSexGT15;
