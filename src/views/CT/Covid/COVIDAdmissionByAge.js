import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

export const COVIDAdmissionByAge = () => {
    const [admissionOfSymptomaticByAge, setAdmissionOfSymptomaticByAge] = useState({});

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                ADMISSION OF COVID-19 SYMPTOMATIC PATIENTS BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={admissionOfSymptomaticByAge} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdmissionByAge;
