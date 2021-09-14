import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDAdultPLHIVVaccinatedByAge = () => {
    const [covidVaccinatedByAge, setCovidVaccinatedByAge] = useState({});

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                ADULT PLHIV VACCINATED AGAINST COVID-19 BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={covidVaccinatedByAge} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdultPLHIVVaccinatedByAge;
