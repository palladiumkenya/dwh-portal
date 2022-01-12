import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcServDistributionByCountySelector
    from '../../../selectors/CT/OVC/ovcServDistributionByCounty';

const OVCServDistributionByCounty = () => {
    const [ovcServDistributionByCounty, setOvcServDistributionByCounty] = useState({});
    const servDistributionByCounty = useSelector(ovcServDistributionByCountySelector.getOvcServDistributionByCounty);

    const loadOvcServDistributionByCounty = useCallback(async () => {
        setOvcServDistributionByCounty({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: servDistributionByCounty.map(obj => obj.County),
                crosshair: true
            },
            yAxis: {
                title: {
                    text: 'NUMBER OF PATIENTS'
                },
            },
            legend: {
                enabled: false
            },
            series: [
                {
                    name: 'OVC DISTRIBUTION BY COUNTY',
                    data: servDistributionByCounty,
                    color: '#14084D',
                }
            ]
        });
    }, [servDistributionByCounty]);

    useEffect(() => {
        loadOvcServDistributionByCounty();
    }, [loadOvcServDistributionByCounty]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OVC DISTRIBUTION BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcServDistributionByCounty} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCServDistributionByCounty;
