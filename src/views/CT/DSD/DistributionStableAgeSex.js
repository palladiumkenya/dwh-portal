import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as dsdStabilityStatusByAgeSexSelectors from '../../../selectors/CT/Dsd/dsdStabilityStatusByAgeSex';

const DistributionStableAgeSex = () => {
    const [distributionStableAgeSex, setDistributionStableAgeSex] = useState({});
    const stabilityStatusByAgeSex = useSelector(dsdStabilityStatusByAgeSexSelectors.getStabilityStatusByAgeSex);

    const loadDistributionStableAgeSex = useCallback(async () => {
        setDistributionStableAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                { categories: stabilityStatusByAgeSex.ageGroups, title: { text: '' }, reversed: false },
                { categories: stabilityStatusByAgeSex.ageGroups, title: { text: '' }, linkedTo: 0, reversed: false, opposite: true }
            ],
            yAxis: [{ min: -(stabilityStatusByAgeSex.max), max: stabilityStatusByAgeSex.max, title: { text: 'Number Stable' }, labels: { formatter: function () {
                return Math.abs(this.value);
            }}}],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 18 }},
            tooltip: { formatter: function () {
                return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                    'Number Stable: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Female', data: stabilityStatusByAgeSex.stableFemale, color: "#EA4C8B" },
                { name: 'Male', data: stabilityStatusByAgeSex.stableMale, color: "#14084D" }
            ]
        });
    }, [stabilityStatusByAgeSex]);

    useEffect(() => {
        loadDistributionStableAgeSex();
    }, [loadDistributionStableAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY AGE GROUP AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={distributionStableAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DistributionStableAgeSex;
