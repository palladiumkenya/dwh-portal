import { Card, CardBody, CardHeader } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import * as covidPercentageWhoMissedAppointmentsByPartnerSelectors
    from '../../../selectors/CT/Covid/covidPercentageWhoMissedAppointmentsByPartner';

const COVIDPercentageWhoMissedAppointmentByPartner = () => {
    const [missedAppointmentsByPartner, setMissedAppointmentsByPartner] = useState({});
    const percentageOfMissedAppointmentsByPartner = useSelector(covidPercentageWhoMissedAppointmentsByPartnerSelectors.getPercentageWhoMissedAppointmentsByPartner);

    const loadMissedAppointmentsByPartner = useCallback(async () => {
        setMissedAppointmentsByPartner({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: percentageOfMissedAppointmentsByPartner.length > 0 ? percentageOfMissedAppointmentsByPartner.map(obj => obj.partner) : [],
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
                },
                labels: { format: '{value} %' }
            },
            legend: {
                enabled: false
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.y + '%'; } }, tooltip: { valueSuffix: '% ({point.text:.0f})' }, }},
            series: [
                {
                    name: 'PERCENTAGE OF MISSED APPOINTMENT DUE TO COVID BY PARTNER',
                    data: percentageOfMissedAppointmentsByPartner.length > 0 ? percentageOfMissedAppointmentsByPartner : [],
                    color: '#14084D',
                }
            ]
        });
    }, [percentageOfMissedAppointmentsByPartner]);

    useEffect(() => {
        loadMissedAppointmentsByPartner();
    }, [loadMissedAppointmentsByPartner]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PERCENTAGE OF PLHIV WHO MISSED APPOINTMENTS DUE TO COVID-19 INFECTION BY PARTNER
            </CardHeader>
            <CardBody className="trends-body">
                <div className={"row"}>
                    <div className={"col-12"}>
                        <HighchartsReact highcharts={Highcharts} options={missedAppointmentsByPartner} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDPercentageWhoMissedAppointmentByPartner;

