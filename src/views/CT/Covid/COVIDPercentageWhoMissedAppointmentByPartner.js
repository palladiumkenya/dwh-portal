import { Card, CardBody, CardHeader } from 'reactstrap';
import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const COVIDPercentageWhoMissedAppointmentByPartner = () => {
    const [missedAppointmentsByPartner, setMissedAppointmentsByPartner] = useState({});

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

