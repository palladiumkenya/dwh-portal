import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzOutcomesByPopulationTypeSelector from '../../../selectors/CT/OTZ/otzOutcomesByPopulationType';

const OtzOutcomesByPopulationType = () => {
    const [otzOutcomesByPopulationType, setOtzOutcomesByPopulationType] = useState({});
    const outcomesByGender = useSelector(otzOutcomesByPopulationTypeSelector.getOtzOutcomesByPopulationType);

    const loadOtzOutcomesByPopulationType = useCallback(async () => {
        setOtzOutcomesByPopulationType({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['GENERAL POPULATION', 'KEY POPULATION']
            },
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, reversed: true },
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'percent' } },
            series: [{
                name: 'OPT OUT OF OTZ',
                color: '#28B294',
                data: outcomesByGender.ArrayValOptOut,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'LOST TO FOLLOW UP',
                color: '#FDC538',
                data: outcomesByGender.ArrayValLostToFollowUp,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'DEAD',
                color: '#FC2626',
                data: outcomesByGender.ArrayValDead,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'TRANSFER OUT',
                color: '#2D73F5',
                data: outcomesByGender.ArrayValTransferOut,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'TRANSITION TO ADULT CARE',
                color: '#142459',
                data: outcomesByGender.ArrayValTransitionToAdultCare,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }, {
                name: 'ACTIVE',
                color: '#AA46BE',
                data: outcomesByGender.ArrayValActive,
                tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' }
            }]
        });
    },[outcomesByGender]);

    useEffect(() => {
        loadOtzOutcomesByPopulationType();
    }, [loadOtzOutcomesByPopulationType]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ OUTCOMES BY POPULATION TYPE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzOutcomesByPopulationType} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzOutcomesByPopulationType;
