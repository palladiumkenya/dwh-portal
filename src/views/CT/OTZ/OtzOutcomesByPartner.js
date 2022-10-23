import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzOutcomesByPartnerSelector from '../../../selectors/CT/OTZ/otzOutcomesByPartner';

const OtzOutcomesByPartner = () => {
    const [otzOutcomesByPartner, setOtzOutcomesByPartner] = useState({});
    const outcomesPartners = useSelector(otzOutcomesByPartnerSelector.getOtzOutcomesByPartner);

    const loadOtzOutcomesByPartner = useCallback(async () => {
        setOtzOutcomesByPartner({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: outcomesPartners.catPartners,
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
                    data: outcomesPartners.ArrayValActive,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'TRANSFER OUT',
                    color: '#FDC538',
                    data: outcomesPartners.ArrayValTransferOut,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'LOST TO FOLLOW UP',
                    color: '#808080',
                    data: outcomesPartners.ArrayValLostToFollowUp,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'TRANSITION TO ADULT CARE',
                    color: '#142459',
                    data: outcomesPartners.ArrayValTransitionToAdultCare,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'DEAD',
                    color: '#FC2626',
                    data: outcomesPartners.ArrayValDead,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'OPT OUT OF OTZ',
                    color: '#F08532',
                    data: outcomesPartners.ArrayValOptOut,
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
            ].reverse(),
        });
    },[outcomesPartners]);

    useEffect(() => {
        loadOtzOutcomesByPartner();
    }, [loadOtzOutcomesByPartner]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ OUTCOMES BY PARTNER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzOutcomesByPartner} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzOutcomesByPartner;
