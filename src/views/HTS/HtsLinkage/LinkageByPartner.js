import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const LinkageByPartner = ({ globalFilters }) => {
    const [uptakeByPartner, setLinkageByPartner] = useState({});

    const loadLinkageByPartner = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        const partners = [];
        let positive = [];
        let linkage = [];

        const result = await getAll('hts/linkageByPartner', params);
        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].Partner);
            positive.push(parseInt(result[i].positive, 10));
            linkage.push(Number(parseFloat(result[i].linkage).toFixed(1)));
        }

        setLinkageByPartner({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            xAxis: [{ categories: partners, crosshair: true, title: { text: 'Partners' } }],
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
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Number Positive', data: positive, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ' } },
                { name: 'Linkage', data: linkage, type: 'spline', color: "#E06F07", tooltip: { valueSuffix: '%' }, yAxis: 1 }
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadLinkageByPartner();
    }, [loadLinkageByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        LINKAGE BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByPartner} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default LinkageByPartner;
