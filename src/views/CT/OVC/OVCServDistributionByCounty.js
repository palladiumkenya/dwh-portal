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
                min: 0,
                max: 100,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
                },
                labels: { format: '{value} %' }
            },
            legend: {
                enabled: false
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.y + '%'; } }, tooltip: { valueSuffix: '% ({point.text:.0f})' }, }},
            series: [
                {
                    name: 'OVC_SERV DISTRIBUTION BY COUNTY',
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
                OVC_SERV DISTRIBUTION BY COUNTY
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
