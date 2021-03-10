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
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: stabilityStatusByAgeSex.ageGroups,
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'PERCENT OF PATIENTS'
                }
            },
            tooltip: {
                shared: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'MALE',
                data: stabilityStatusByAgeSex.stableMale,
                color: "#14084D",
                tooltip: { valueSuffix: '{point.percentage:.0f}%' + '({point.text})' }
            }, {
                name: 'FEMALE',
                data: stabilityStatusByAgeSex.stableFemale,
                color: "#EA4C8B",
                tooltip: { valueSuffix: '{point.percentage:.0f}%' + '({point.text})' }
            }]
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
