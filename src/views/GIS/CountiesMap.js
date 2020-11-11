import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import mapKenyaByCounty from './../Shared/kenyaByCounty.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenya-county"] = mapKenyaByCounty;

const CountiesMap = ({}) => {

    const [counties, setCountiesMap] = useState({});

    const loadCounties = useCallback(async () => {
        setCountiesMap({
            chart: { map: 'custom/kenya-county' },
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
