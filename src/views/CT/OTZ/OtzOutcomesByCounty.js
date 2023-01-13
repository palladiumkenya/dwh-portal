import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzOutcomesByCountySelector from '../../../selectors/CT/OTZ/otzOutcomesByCounty';

const OtzOutcomesByCounty = () => {
    const [otzOutcomesByCounty, setOtzOutcomesByCounty] = useState({});
    const outcomesCounty = useSelector(otzOutcomesByCountySelector.getOtzOutcomesByCounty);

    const loadOtzOutcomesByCounty = useCallback(async () => {
        setOtzOutcomesByCounty({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: outcomesCounty.catCounties,
            },
            yAxis: [{ title: { text: 'Percentage of Patients' } }],
            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
                reversed: true,
            },
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            series: [
                {
                    name: 'ACTIVE',
                    color: '#28B294',
                    data: outcomesCounty.ArrayValActive,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'TRANSFER OUT',
                    color: '#FDC538',
                    data: outcomesCounty.ArrayValTransferOut,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'LOST TO FOLLOW UP',
                    color: '#808080',
                    data: outcomesCounty.ArrayValLostToFollowUp,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'TRANSITION TO ADULT CARE',
                    color: '#142459',
                    data: outcomesCounty.ArrayValTransitionToAdultCare,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'DEAD',
                    color: '#FC2626',
                    data: outcomesCounty.ArrayValDead,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'OPT OUT OF OTZ',
                    color: '#F08532',
                    data: outcomesCounty.ArrayValOptOut,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
            ].reverse(),
        });
    },[outcomesCounty]);

    useEffect(() => {
        loadOtzOutcomesByCounty();
    }, [loadOtzOutcomesByCounty]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ OUTCOMES BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzOutcomesByCounty} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzOutcomesByCounty;
