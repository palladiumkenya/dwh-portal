import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const LinkageByCounty = ({ globalFilter }) => {
    const [uptakeByCounty, setLinkageByCounty] = useState({});

    const loadLinkageByCounty = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const counties = [];
        let positive = [];
        let linkage = [];

        const result = await getAll('hts/linkageByCounty', params);
        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].County);
            positive.push(parseInt(result[i].positive, 10));
            linkage.push(Number(parseFloat(result[i].linkage).toFixed(1)));
        }

        setLinkageByCounty({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            xAxis: [{ categories: counties, crosshair: true, title: { text: 'Counties' } }],
            yAxis: [
                {
                    title: { text: 'Number Positive', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                },
                {
                    title: { text: 'Linkage (%)', style: { color: Highcharts.getOptions().colors[0] } },
                    labels: { format: '{value} %', style: { color: Highcharts.getOptions().colors[0] } },
                    min: 0,
                    max: 100,
                    opposite: true
                }
            ],
            tooltip: { shared: true },
            legend:{ enabled:false },
            series: [
                { name: 'Number Positive', data: positive, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ' } },
                { name: 'Linkage', data: linkage, type: 'spline', color: "#E06F07", tooltip: { valueSuffix: '%' }, yAxis: 1 }
            ]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadLinkageByCounty();
    }, [loadLinkageByCounty]);

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
