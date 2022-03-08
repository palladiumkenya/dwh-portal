import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';

const AdultDistributionRegimenLines = () => {
    const [adultDistributionRegimenLines, setAdultDistributionRegimenLines] = useState({});
    const loading = useSelector(state => state.artOptimizationOverview.loading);
    const adultsOnFirstLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnFirstLine);
    const adultsOnSecondLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnSecondLine);
    const adultsOnThirdLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnThirdLine);
    const adultsOnUndocumentedLine = useSelector(artOptimizationOverviewSelectors.getAdultsOnUndocumentedLine);

    const loadAdultDistributionRegimenLines = useCallback(async () => {
        setAdultDistributionRegimenLines({
            chart: { type: 'pie' },
            title: { text: 'ADULTS', align: 'center', verticalAlign: 'middle'},
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
                name:"ADULT DISTRIBUTION OF REGIMEN LINES",
                colorByPoint: true,
                data: [
                    { name: 'FIRST LINE', y: adultsOnFirstLine ? adultsOnFirstLine: 0, color: "#142459" },
                    { name: 'SECOND LINE', y: adultsOnSecondLine ? adultsOnSecondLine: 0, color: "#1AB394" },
                    { name: 'THIRD LINE', y: adultsOnThirdLine ? adultsOnThirdLine: 0, color: "#BBE65F" },
                    { name: 'UNDOCUMENTED REG LINE', y: adultsOnUndocumentedLine ? adultsOnUndocumentedLine: 0, color: "#2D73F5" },
                ]
            }]
        });
    }, [adultsOnFirstLine, adultsOnSecondLine, adultsOnThirdLine, adultsOnUndocumentedLine]);

    useEffect(() => {
        loadAdultDistributionRegimenLines();
    }, [loadAdultDistributionRegimenLines]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ADULT DISTRIBUTION OF REGIMEN LINES
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            {
                                loading === true ?
                                <Spinner/> :
                                <HighchartsReact highcharts={Highcharts} options={adultDistributionRegimenLines} />
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AdultDistributionRegimenLines;
