import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const LinkageByCounty = ({ globalFilter }) => {
    const [uptakeByCounty, setLinkageByCounty] = useState({});

    useEffect(() => {
        loadLinkageByCounty();
    }, [globalFilter]);

    const loadLinkageByCounty = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const counties = [];
        let tested = [];
        let linkage = [];

        const result = await getAll('hts/linkageByCounty', params);
        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].County);
            tested.push(parseInt(result[i].tested, 10));
            linkage.push(parseFloat(result[i].linkage));
        }

        setLinkageByCounty({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            xAxis: [{ categories: counties, crosshair: true }],
            yAxis: [
                {
                    title: { text: 'TESTS', style: { color: "#252525" } },
                    labels: { format: '{value}', style: { color: "#252525" } },
                    min: 0,
                },
                {
                    title: { text: 'LINKAGE (%)', style: { color: "#252525" } },
                    labels: { format: '{value} %', style: { color: "#252525" } },
                    min: 0,
                    max: 100,
                    opposite: true
                }
            ],
            tooltip: { shared: true },
            legend:{ enabled:false },
            series: [
                { name: 'TESTED', data: tested, type: 'column', color: "#2F4050", tooltip: { valueSuffix: ' ' } },
                { name: 'LINKAGE', data: linkage, type: 'spline', color: "#1AB394", tooltip: { valueSuffix: '%' }, dashStyle: 'ShortDot', yAxis: 1 }
            ]
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        LINKAGE BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByCounty} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default LinkageByCounty;
