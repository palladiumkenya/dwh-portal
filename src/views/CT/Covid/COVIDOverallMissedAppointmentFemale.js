import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useState } from 'react';

const COVIDOverallMissedAppointmentFemale = () => {
    const [overallMissedAppointmentFemale, setOverallMissedAppointmentFemale] = useState({});
    return (
        <HighchartsReact highcharts={Highcharts} options={overallMissedAppointmentFemale} />
    );
};

export default COVIDOverallMissedAppointmentFemale;
