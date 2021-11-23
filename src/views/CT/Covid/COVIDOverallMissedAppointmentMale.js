import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useState } from 'react';

const COVIDOverallMissedAppointmentMale = () => {
    const [overallMissedAppointmentMale, setOverallMissedAppointmentMale] = useState({});
    return (
        <HighchartsReact highcharts={Highcharts} options={overallMissedAppointmentMale} />
    );
};

export default COVIDOverallMissedAppointmentMale;

