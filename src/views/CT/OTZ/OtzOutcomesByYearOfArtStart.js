import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzOutcomesByYearOfArtStartSelector from '../../../selectors/CT/OTZ/otzOutcomesByYearOfArtStart';

const OtzOutcomesByYearOfArtStart = () => {
    const [otzOutcomesByYearOfArtStart, setOtzOutcomesByYearOfArtStart] = useState({});
    const outcomesYearOfArtStart = useSelector(otzOutcomesByYearOfArtStartSelector.getOtzOutcomesByYearOfArtStart);

    const loadOtzOutcomesByYearOfArtStart = useCallback(async () => {
        setOtzOutcomesByYearOfArtStart({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: outcomesYearOfArtStart.catYears
            },
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, reversed: true },
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            series: [{
                name: 'OPT OUT OF OTZ',
                color: '#28B294',
                data: outcomesYearOfArtStart.ArrayValOptOut,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'LOST TO FOLLOW UP',
                color: '#FDC538',
                data: outcomesYearOfArtStart.ArrayValLostToFollowUp,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'DEAD',
                color: '#FC2626',
                data: outcomesYearOfArtStart.ArrayValDead,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'TRANSFER OUT',
                color: '#2D73F5',
                data: outcomesYearOfArtStart.ArrayValTransferOut,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'TRANSITION TO ADULT CARE',
                color: '#142459',
                data: outcomesYearOfArtStart.ArrayValTransitionToAdultCare,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }]
        });
    },[outcomesYearOfArtStart]);

    useEffect(() => {
        loadOtzOutcomesByYearOfArtStart();
    }, [loadOtzOutcomesByYearOfArtStart]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ OUTCOMES BY YEAR OF ART START
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzOutcomesByYearOfArtStart} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzOutcomesByYearOfArtStart;
