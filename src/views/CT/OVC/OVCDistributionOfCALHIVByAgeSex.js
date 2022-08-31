import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcDistributionOfCALHIVByAgeSexSelector from '../../../selectors/CT/OVC/OVCDistributionOfCALHIVByAgeSex';

const OVCDistributionOfCALHIVByAgeSex = () => {
    const [ovcDistributionOfCALHIVByAgeSex, setOvcDistributionOfCALHIVByAgeSex] = useState({});
    const distributionOfCALHIVByAgeSex = useSelector(ovcDistributionOfCALHIVByAgeSexSelector.getOvcDistributionOfCALHIVByAgeSex);

    const loadOvcDistributionOfCALHIVByAgeSex = useCallback(async () => {
        setOvcDistributionOfCALHIVByAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                {
                    categories: [
                        'Under 1',
                        '1 to 4',
                        '5 to 9',
                        '10 to 14',
                        '15 to 17',
                    ],
                    title: { text: '' },
                    reversed: false,
                },
                {
                    categories: [
                        'Under 1',
                        '1 to 4',
                        '5 to 9',
                        '10 to 14',
                        '15 to 17',
                    ],
                    title: { text: '' },
                    reversed: false,
                    linkedTo: 0,
                    opposite: true,
                },
            ],
            yAxis: [
                {
                    min: -distributionOfCALHIVByAgeSex.max,
                    max: distributionOfCALHIVByAgeSex.max,
                    title: { text: 'Number Of Patients' },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        },
                    },
                },
            ],
            plotOptions: {
                series: { stacking: 'normal' },
                bar: { pointWidth: 18 },
            },
            tooltip: {
                formatter: function () {
                    return (
                        '<b>' +
                        this.series.name +
                        ', Age Group ' +
                        this.point.category +
                        '</b><br/>' +
                        'Number Of Patients: ' +
                        Highcharts.numberFormat(Math.abs(this.point.y), 1)
                    );
                },
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'Female',
                    data: distributionOfCALHIVByAgeSex.distributionFemale,
                    color: '#EA4C8B',
                },
                {
                    name: 'Male',
                    data: distributionOfCALHIVByAgeSex.distributionMale,
                    color: '#14084D',
                },
            ],
        });
    }, [distributionOfCALHIVByAgeSex]);

    useEffect(() => {
        loadOvcDistributionOfCALHIVByAgeSex();
    }, [loadOvcDistributionOfCALHIVByAgeSex]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                DISTRIBUTION OF CALHIV PATIENTS BY AGE AND SEX
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcDistributionOfCALHIVByAgeSex} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCDistributionOfCALHIVByAgeSex;
