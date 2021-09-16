import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDTrendsOfSeverity = () => {
    const [trendsOfSeverity, setTrendsOfSeverity] = useState({});

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                TRENDS OF SEVERITY AMONG PLHIV WITH COVID -19 INFECTION
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={trendsOfSeverity} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDTrendsOfSeverity;
