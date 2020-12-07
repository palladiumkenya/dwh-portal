import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from '../../utils/highcharts';
import HighchartsReact from 'highcharts-react-official';

const CountiesMap = () => {

    const [counties, setCountiesMap] = useState({});

    const loadCounties = useCallback(async () => {
        setCountiesMap({
            chart: { map: 'custom/ke-county' },
            title: { text: '' },
            legend: { enabled: false },
            series: [{
                name: 'Counties',
                dataLabels: {
                    enabled: true,
                    format: '{point.properties.NAME_1}'
                }
            }]
        });
    }, []);

    useEffect(() => {
        loadCounties();
    }, [loadCounties]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        KENYA COUNTIES
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={counties} constructorType={'mapChart'}/>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CountiesMap;
