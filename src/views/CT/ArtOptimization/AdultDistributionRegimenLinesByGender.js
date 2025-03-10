import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as artOptimizationOverviewSelectors from '../../../selectors/CT/ArtOptimization/artOptimizationOverview';

const AdultDistributionRegimenLinesByGender = () => {
    const [adultDistributionRegimenLinesMale, setAdultDistributionRegimenLinesMale] = useState({});
    const [adultDistributionRegimenLinesFemale, setAdultDistributionRegimenLinesFemale] = useState({});

    const loading = useSelector(state => state.artOptimizationOverview.loading);

    const maleAdultsOnFirstLine = useSelector(artOptimizationOverviewSelectors.getMaleAdultsOnFirstLine);
    const maleAdultsOnSecondLine = useSelector(artOptimizationOverviewSelectors.getMaleAdultsOnSecondLine);
    const maleAdultsOnThirdLine = useSelector(artOptimizationOverviewSelectors.getMaleAdultsOnThirdLine);
    const maleAdultsOnUndocumentedLine = useSelector(artOptimizationOverviewSelectors.getMaleAdultsOnUndocumentedLine);

    const femaleAdultsOnFirstLine = useSelector(artOptimizationOverviewSelectors.getFemaleAdultsOnFirstLine);
    const femaleAdultsOnSecondLine = useSelector(artOptimizationOverviewSelectors.getFemaleAdultsOnSecondLine);
    const femaleAdultsOnThirdLine = useSelector(artOptimizationOverviewSelectors.getFemaleAdultsOnThirdLine);
    const femaleAdultsOnUndocumentedLine = useSelector(artOptimizationOverviewSelectors.getFemaleAdultsOnUndocumentedLine);

    const loadAdultDistributionRegimenLinesMale = useCallback(async () => {
        setAdultDistributionRegimenLinesMale({
            chart: { type: 'pie' },
            title: { text: 'MALE', align: 'center', verticalAlign: 'middle'},
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
                    { name: 'FIRST LINE', y: maleAdultsOnFirstLine ? maleAdultsOnFirstLine: 0, color: "#142459" },
                    { name: 'SECOND LINE', y: maleAdultsOnSecondLine ? maleAdultsOnSecondLine: 0, color: "#1AB394" },
                    { name: 'THIRD LINE', y: maleAdultsOnThirdLine ? maleAdultsOnThirdLine: 0, color: "#BBE65F" },
                    { name: 'UNDOCUMENTED REG LINE', y: maleAdultsOnUndocumentedLine ? maleAdultsOnUndocumentedLine: 0, color: "#2D73F5" },
                ]
            }]
        });
    }, [maleAdultsOnFirstLine, maleAdultsOnSecondLine, maleAdultsOnThirdLine, maleAdultsOnUndocumentedLine]);

    const loadAdultDistributionRegimenLinesFemale = useCallback(async () => {
        setAdultDistributionRegimenLinesFemale({
            chart: { type: 'pie' },
            title: { text: 'FEMALE', align: 'center', verticalAlign: 'middle'},
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
                    { name: 'FIRST LINE', y: femaleAdultsOnFirstLine ? femaleAdultsOnFirstLine: 0, color: "#142459" },
                    { name: 'SECOND LINE', y: femaleAdultsOnSecondLine ? femaleAdultsOnSecondLine: 0, color: "#1AB394" },
                    { name: 'THIRD LINE', y: femaleAdultsOnThirdLine ? femaleAdultsOnThirdLine: 0, color: "#BBE65F" },
                    { name: 'UNDOCUMENTED REG LINE', y: femaleAdultsOnUndocumentedLine ? femaleAdultsOnUndocumentedLine: 0, color: "#2D73F5" },
                ]
            }]
        });
    }, [femaleAdultsOnFirstLine, femaleAdultsOnSecondLine, femaleAdultsOnThirdLine, femaleAdultsOnUndocumentedLine]);

    useEffect(() => {
        loadAdultDistributionRegimenLinesMale();
        loadAdultDistributionRegimenLinesFemale();
    }, [loadAdultDistributionRegimenLinesMale, loadAdultDistributionRegimenLinesFemale]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                DISTRIBUTION OF REGIMEN LINES - ADULTS BY SEX
            </CardHeader>
            <CardBody className="trends-body">
                <Row>
                    <Col>
                        {
                            loading === true ?
                            <Spinner/> :
                            <HighchartsReact highcharts={Highcharts} options={adultDistributionRegimenLinesMale} />
                        }
                    </Col>
                    <Col>
                        {
                            loading === true ?
                            <Spinner/> :
                            <HighchartsReact highcharts={Highcharts} options={adultDistributionRegimenLinesFemale} />
                        }
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default AdultDistributionRegimenLinesByGender;
