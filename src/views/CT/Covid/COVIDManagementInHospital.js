import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDManagementInHospital = () => {
    const [admissionOfSymptomaticByAge, setAdmissionOfSymptomaticByAge] = useState({});

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                MANAGEMENT OF SYMPTOMATIC COVID-19 ADMITTED IN HOSPITAL
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={admissionOfSymptomaticByAge} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDManagementInHospital;
