import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as ovcDistributionOVCByAgeSexSelector from '../../../selectors/CT/OTZ/otzDistributionOfPatientsByAgeSex';


const OTZByAgeSex = () => {
    const [otzByAgeSex, setOtzByAgeSex] = useState(
        {}
    );
    let ovcAgeSex = useSelector(ovcDistributionOVCByAgeSexSelector.getOtzDistributionOfPatientsByAgeSex)
    const male = ovcAgeSex.distributionMale;
    const female = ovcAgeSex.distributionFemale;

    const loadOtzByAgeSex = useCallback(async () => {
        setOtzByAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                {
                    categories: ovcAgeSex.otzAgeGroups,
                    title: { text: '' },
                    reversed: true,
                },
                {
                    categories: ovcAgeSex.otzAgeGroups,
                    title: { text: '' },
                    reversed: true,
                    linkedTo: 0,
                    opposite: true,
                },
            ],
            yAxis: [
                {
                    // min: -ovcAgeSex.distributionMale.max,
                    // max: ovcAgeSex.distributionFemale.max,
                    title: { text: 'CURRENT ON ART OTZ' },
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
                        'CURRENT ON ART OTZ: ' +
                        Highcharts.numberFormat(Math.abs(this.point.y), 1)
                    );
                },
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'Female',
                    data: female,
                    color: '#EA4C8B',
                },
                {
                    name: 'Male',
                    data: male,
                    color: '#14084D',
                },
            ],
        });
    }, [ovcAgeSex]);

    useEffect(() => {
        loadOtzByAgeSex();
    }, [loadOtzByAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF OTZ PATIENTS BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={otzByAgeSex}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>

        </div>
    );
};

export default OTZByAgeSex;
