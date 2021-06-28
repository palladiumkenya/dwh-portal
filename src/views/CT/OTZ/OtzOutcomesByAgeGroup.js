import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzOutcomesByAgeGroupSelector from '../../../selectors/CT/OTZ/otzOutcomesByAgeGroup';

const OtzOutcomesByAgeGroup = () => {
    const [otzOutcomesByAgeGroup, setOtzOutcomesByAgeGroup] = useState({});
    const outcomesByAgeGroup = useSelector(otzOutcomesByAgeGroupSelector.getOtzOutcomesByAgeGroup);

    const loadOtzOutcomesByAgeGroup = useCallback(async () => {
        setOtzOutcomesByAgeGroup({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: outcomesByAgeGroup.catAgeGroups
            },
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, reversed: true },
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            series: [{
                name: 'OPT OUT OF OTZ',
                color: '#28B294',
                data: outcomesByAgeGroup.ArrayValOptOut,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'LOST TO FOLLOW UP',
                color: '#FDC538',
                data: outcomesByAgeGroup.ArrayValLostToFollowUp,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'DEAD',
                color: '#FC2626',
                data: outcomesByAgeGroup.ArrayValDead,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'TRANSFER OUT',
                color: '#2D73F5',
                data: outcomesByAgeGroup.ArrayValTransferOut,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'TRANSITION TO ADULT CARE',
                color: '#142459',
                data: outcomesByAgeGroup.ArrayValTransitionToAdultCare,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'ACTIVE',
                color: '#AA46BE',
                data: outcomesByAgeGroup.ArrayValActive,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }]
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
