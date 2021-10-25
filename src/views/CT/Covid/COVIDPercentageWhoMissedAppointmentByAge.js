import { Card, CardBody, CardHeader } from 'reactstrap';
import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const COVIDPercentageWhoMissedAppointmentByAge = () => {
    const [missedAppointmentsByAge, setMissedAppointmentsByAge] = useState({});

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PERCENTAGE OF PLHIV WHO MISSED APPOINTMENT DUE TO COVID -19 INFECTION BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className={"row"}>
                    <div className={"col-12"}>
                        <HighchartsReact highcharts={Highcharts} options={missedAppointmentsByAge} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDPercentageWhoMissedAppointmentByAge;
