import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzDistributionOfCALHIVByAgeSexSelector from '../../../selectors/CT/OTZ/otzAlhivOnArtByAgeSex';

const OTZDistributionOfCALHIVByAgeSex = () => {
    const [ovcDistributionOfALHIVByAgeSex, setOvcDistributionOfALHIVByAgeSex] = useState({});
    const distributionOfALHIVByAgeSex = useSelector(otzDistributionOfCALHIVByAgeSexSelector.getOtzAlhivOnArtByAgeSex);

    const loadOvcDistributionOfALHIVByAgeSex = useCallback(async () => {
        setOvcDistributionOfALHIVByAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                {
                    categories: [
                        '15 to 19',
                        '10 to 14',
                    ],
                    title: { text: '' },
                    reversed: false,
                },
                {
                    categories: [
                        '15 to 19',
                        '10 to 14',
                    ],
                    title: { text: '' },
                    reversed: false,
                    linkedTo: 0,
                    opposite: true,
                },
            ],
            yAxis: [
                {
                    min: -distributionOfALHIVByAgeSex.max,
                    max: distributionOfALHIVByAgeSex.max,
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
                    data: distributionOfALHIVByAgeSex.distributionFemale.reverse(),
                    color: '#EA4C8B',
                },
                {
                    name: 'Male',
                    data: distributionOfALHIVByAgeSex.distributionMale.reverse(),
                    color: '#14084D',
                },
            ],
        });
    }, [distributionOfALHIVByAgeSex]);

    useEffect(() => {
        loadOvcDistributionOfALHIVByAgeSex();
    }, [loadOvcDistributionOfALHIVByAgeSex]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                DISTRIBUTION OF ALHIV PATIENTS BY AGE AND SEX
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcDistributionOfALHIVByAgeSex} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OTZDistributionOfCALHIVByAgeSex;
