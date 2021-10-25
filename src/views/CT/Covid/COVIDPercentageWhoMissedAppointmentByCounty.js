import { Card, CardBody, CardHeader } from 'reactstrap';
import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const COVIDPercentageWhoMissedAppointmentByCounty = () => {
    const [missedAppointmentsByCounty, setMissedAppointmentsByCounty] = useState({});

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PERCENTAGE OF PLHIV WHO MISSED APPOINTMENTS DUE TO COVID-19 INFECTION BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className={"row"}>
                    <div className={"col-12"}>
                        <HighchartsReact highcharts={Highcharts} options={missedAppointmentsByCounty} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDPercentageWhoMissedAppointmentByCounty;

