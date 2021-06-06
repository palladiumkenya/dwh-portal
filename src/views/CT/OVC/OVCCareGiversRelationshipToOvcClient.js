import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as ovcCareGiversRelationshipToOvcClientSelector from '../../../selectors/CT/OVC/ovcCareGiversRelationshipToOvcClient';

const OVCCareGiversRelationshipToOvcClient = () => {
    const [ovcCareGiversRelationshipToClients, setOvcCareGiversRelationshipToClients] = useState({});
    const careGiversRelationshipToOvcClient = useSelector(ovcCareGiversRelationshipToOvcClientSelector.getOvcCareGiversRelationshipToOvcClient);

    const loadOvcCareGiversRelationshipToOvcClients = useCallback(async () => {
        setOvcCareGiversRelationshipToClients({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: careGiversRelationshipToOvcClient.map(obj => obj.RelationshipToClient),
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
                    name: 'CAREGIVERS’ RELATIONSHIP TO OVC CLIENT',
                    data: careGiversRelationshipToOvcClient,
                    color: '#14084D',
                }
            ]
        });
    }, [careGiversRelationshipToOvcClient]);

    useEffect(() => {
        loadOvcCareGiversRelationshipToOvcClients();
    }, [loadOvcCareGiversRelationshipToOvcClients]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                CAREGIVERS’ RELATIONSHIP TO OVC CLIENT
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcCareGiversRelationshipToClients} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCCareGiversRelationshipToOvcClient;
