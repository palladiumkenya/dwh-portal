import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';

const ChildDistributionRegimenLines = () => {
    const [childrenDistributionRegimenLines, setChildDistributionRegimenLines] = useState({});
    const loading = useSelector(state => state.artOptimizationOverview.loading);
    const childrenOnFirstLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnFirstLine);
    const childrenOnSecondLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnSecondLine);
    const childrenOnThirdLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnThirdLine);
    const childrenOnUndocumentedLine = useSelector(artOptimizationOverviewSelectors.getChildrenOnUndocumentedLine);

    const loadChildDistributionRegimenLines = useCallback(async () => {
        setChildDistributionRegimenLines({
            chart: { type: 'pie' },
            title: { text: 'CHILDREN', align: 'center', verticalAlign: 'middle'},
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
                    { name: 'FIRST LINE', y: childrenOnFirstLine ? childrenOnFirstLine: 0, color: "#142459" },
                    { name: 'SECOND LINE', y: childrenOnSecondLine ? childrenOnSecondLine: 0, color: "#1AB394" },
                    { name: 'THIRD LINE', y: childrenOnThirdLine ? childrenOnThirdLine: 0, color: "#BBE65F" },
                    { name: 'UNDOCUMENTED REG LINE', y: childrenOnUndocumentedLine ? childrenOnUndocumentedLine: 0, color: "#2D73F5" },
                ]
            }]
        });
    }, [childrenOnFirstLine, childrenOnSecondLine, childrenOnThirdLine, childrenOnUndocumentedLine]);

    useEffect(() => {
        loadChildDistributionRegimenLines();
    }, [loadChildDistributionRegimenLines]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CALHIV DISTRIBUTION OF REGIMEN LINES
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            {
                                loading === true ?
                                <Spinner/> :
                                <HighchartsReact highcharts={Highcharts} options={childrenDistributionRegimenLines} />
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ChildDistributionRegimenLines;
