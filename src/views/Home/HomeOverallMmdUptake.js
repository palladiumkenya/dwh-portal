import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as dsdStabilityStatusByAgeSexSelectors from '../../selectors/CT/Dsd/dsdStabilityStatusByAgeSex';

const HomeOverallMmdUptake = () => {
    const [overallMmdUptake, setHomeOverallMmdUptake] = useState({});
    const mmd = useSelector(dsdStabilityStatusByAgeSexSelectors.getMmd);
    const nonMmd = useSelector(dsdStabilityStatusByAgeSexSelectors.getNonMmd);

    const loadHomeOverallMmdUptake = useCallback(async () => {
        setHomeOverallMmdUptake({
            chart: { type: 'pie' },
            title: { text: '' },
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.0f} %'
                    },
                    innerSize: '75%',
                }
            },
            series: [{
                name:"OVERALL MMD UPTAKE",
                colorByPoint: true,
                data: [
                    { name: 'NON MMD', y: nonMmd, color: "#142459" },
                    { name: 'MMD', y: mmd, color: "#1AB394" },
                ]
            }]
        });
    }, [mmd, nonMmd]);

    useEffect(() => {
        loadHomeOverallMmdUptake();
    }, [loadHomeOverallMmdUptake]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Overall MMD Uptake among patients currently on ART
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={overallMmdUptake} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HomeOverallMmdUptake;
