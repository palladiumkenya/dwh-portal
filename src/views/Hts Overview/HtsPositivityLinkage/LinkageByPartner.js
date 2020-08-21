import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const LinkageByPartner = ({ globalFilter }) => {
    const [uptakeByPartner, setLinkageByPartner] = useState({});

    useEffect(() => {
        loadLinkageByPartner();
    }, [globalFilter]);

    const loadLinkageByPartner = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const partners = [];
        let positive = [];
        let linkage = [];

        const result = await getAll('hts/linkageByPartner', params);
        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].Partner);
            positive.push(parseInt(result[i].positive, 10));
            linkage.push(parseFloat(result[i].linkage).toFixed(1));
        }

        setLinkageByPartner({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            xAxis: [{ categories: partners, crosshair: true }],
            yAxis: [
                {
                    title: { text: 'POSITIVE', style: { color: "#252525" } },
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
                { name: 'POSITIVE', data: positive, type: 'column', color: "#2F4050", tooltip: { valueSuffix: ' ' } },
                { name: 'LINKAGE', data: linkage, type: 'spline', color: "#1AB394", tooltip: { valueSuffix: '%' }, dashStyle: 'ShortDot', yAxis: 1 }
            ]
        });
    };

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
