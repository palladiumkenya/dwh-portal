import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzOutcomesByAgeGroupSelector from '../../../selectors/CT/OTZ/otzOutcomesByAgeGroup';
import { roundNumber } from './../../../utils/utils';

const OtzOutcomesByAgeGroup = () => {
    const [otzOutcomesByAgeGroup, setOtzOutcomesByAgeGroup] = useState({});
    const outcomesByAgeGroup = useSelector(otzOutcomesByAgeGroupSelector.getOtzOutcomesByAgeGroup);

    const loadOtzOutcomesByAgeGroup = useCallback(async () => {
        setOtzOutcomesByAgeGroup({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: outcomesByAgeGroup.catAgeGroups,
            },
            yAxis: [{ title: { text: 'PERCENTAGE OF PATIENTS' } }],
            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
                reversed: true,
            },
            tooltip: { shared: true },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '' + roundNumber(this.point.percentage) + '%';
                        },
                    },
                },
            },
            series: [
                {
                    name: 'ACTIVE',
                    color: '#28B294',
                    data: outcomesByAgeGroup.ArrayValActive,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'TRANSFER OUT',
                    color: '#FDC538',
                    data: outcomesByAgeGroup.ArrayValTransferOut,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'LOST TO FOLLOW UP',
                    color: '#808080',
                    data: outcomesByAgeGroup.ArrayValLostToFollowUp,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'TRANSITION TO ADULT CARE',
                    color: '#142459',
                    data: outcomesByAgeGroup.ArrayValTransitionToAdultCare,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'DEAD',
                    color: '#FC2626',
                    data: outcomesByAgeGroup.ArrayValDead,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'OPT OUT OF OTZ',
                    color: '#F08532',
                    data: outcomesByAgeGroup.ArrayValOptOut,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
            ].reverse(),
        });
    },[outcomesByAgeGroup]);

    useEffect(() => {
        loadOtzOutcomesByAgeGroup();
    }, [loadOtzOutcomesByAgeGroup]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ OUTCOMES BY AGE GROUP
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzOutcomesByAgeGroup} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzOutcomesByAgeGroup;
