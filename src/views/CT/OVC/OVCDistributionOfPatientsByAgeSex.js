import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcDistributionOfPatientsByAgeSexSelector from '../../../selectors/CT/OVC/OVCDistributionOfPatientsByAgeSex';

const OVCDistributionOfPatientsByAgeSex = () => {
    const [ovcDistributionOfPatientsByAgeSex, setOvcDistributionOfPatientsByAgeSex] = useState({});
    const distributionOfPatientsByAgeSex = useSelector(ovcDistributionOfPatientsByAgeSexSelector.getOvcDistributionOfPatientsByAgeSex);

    const loadOvcDistributionOfPatientsByAgeSex = useCallback(async () => {
        setOvcDistributionOfPatientsByAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                { categories: distributionOfPatientsByAgeSex.ovcAgeGroups, title: { text: '' }, reversed: false },
                { categories: distributionOfPatientsByAgeSex.ovcAgeGroups, title: { text: '' }, reversed: false, linkedTo: 0, opposite: true }
            ],
            yAxis: [{ min: -(distributionOfPatientsByAgeSex.max), max: distributionOfPatientsByAgeSex.max, title: { text: 'Number Of Patients' }, labels: { formatter: function () {
                        return Math.abs(this.value);
                    }}}],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 18, } },
            tooltip: { formatter: function () {
                    return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                        'Number Of Patients: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }},
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Female', data: distributionOfPatientsByAgeSex.distributionFemale, color: "#EA4C8B" },
                { name: 'Male', data: distributionOfPatientsByAgeSex.distributionMale, color: "#14084D" }
            ]
        });
    }, [distributionOfPatientsByAgeSex]);

    useEffect(() => {
        loadOvcDistributionOfPatientsByAgeSex();
    }, [loadOvcDistributionOfPatientsByAgeSex]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                DISTRIBUTION OF OVC PATIENTS BY AGE AND SEX
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcDistributionOfPatientsByAgeSex} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCDistributionOfPatientsByAgeSex;
