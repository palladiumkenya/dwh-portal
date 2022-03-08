import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';

const AdultOverallTldUptake = () => {
    const [adultOverallTldUptake, setAdultOverallTldUptake] = useState({});
    const adultsOnTld = useSelector(artOptimizationOverviewSelectors.getAdultsOnTld);
    const adultsOnNonTld = useSelector(artOptimizationOverviewSelectors.getAdultsOnNonTld);

    const loadAdultOverallTldUptake = useCallback(async () => {
        setAdultOverallTldUptake({
            chart: { type: 'pie' },
            title: { text: '', align: 'center', verticalAlign: 'middle'},
            subtitle: { text: '' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y:,.0f})'
                    },
                    innerSize: '75%',
                }
            },
            series: [{
                name:"OVERALL TLD UPTAKE",
                colorByPoint: true,
                data: [
                    { name: 'TLD', y: adultsOnTld ? adultsOnTld: 0, color: "#142459" },
                    { name: 'OTHER REGIMENS', y: adultsOnNonTld ? adultsOnNonTld: 0, color: "#1AB394" },
                ]
            }]
        });
    }, [adultsOnTld, adultsOnNonTld]);

    useEffect(() => {
        loadAdultOverallTldUptake();
    }, [loadAdultOverallTldUptake]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL TLD UPTAKE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={adultOverallTldUptake} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AdultOverallTldUptake;
