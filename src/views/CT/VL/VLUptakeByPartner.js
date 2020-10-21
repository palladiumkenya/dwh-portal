import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const VLUptakeByPartner = () => {
    const [vlUptakeByPartner, setVLUptakeByPartner] = useState({});

    const loadVLUptakeByPartner = useCallback(async () => {
        const result = await getAll('care-treatment/vlUptakeByPartner');

        let partners = [];
        let vlUptakeByPartner = [];

        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].partner);
            vlUptakeByPartner.push(parseInt(result[i].vlDone, 10));
        }

        setVLUptakeByPartner({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: partners, crosshair: true, title: { text: 'Service Delivery Partner' } }],
            yAxis: [
                {
                    title: { text: 'Number of Patients', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Number of Patients', data: vlUptakeByPartner, type: 'column', color: "#485969" },
            ]
        });
    }, []);

    useEffect(() => {
        loadVLUptakeByPartner();
    }, [loadVLUptakeByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG TX CURR PATIENTS BY PARTNER (N =495)
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlUptakeByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLUptakeByPartner;
