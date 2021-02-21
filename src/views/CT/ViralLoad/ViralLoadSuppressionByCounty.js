import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadOverallUptakeSuppressionByFacilitySelectors from '../../../selectors/CT/ViralLoad/viralLoadOverallUptakeSuppressionByFacility';

const ViralLoadSuppressionByCounty = () => {
    const [vlSuppressionByCounty, setViralLoadSuppressionByCounty] = useState({});
    const viralLoadOverallUptakeSuppressionByCountyData = useSelector(viralLoadOverallUptakeSuppressionByFacilitySelectors.getViralLoadOverallUptakeSuppressionByCounty);
    
    const loadViralLoadSuppressionByCounty = useCallback(async () => {
        setViralLoadSuppressionByCounty({
            title: { text: '' },
            xAxis: [{ categories: viralLoadOverallUptakeSuppressionByCountyData.counties, crosshair: true, title: { text: 'County' } }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: viralLoadOverallUptakeSuppressionByCountyData.data, type: 'column', color: "#485969" },
            ]
        });
    }, [viralLoadOverallUptakeSuppressionByCountyData]);

    useEffect(() => {
        loadViralLoadSuppressionByCounty();
    }, [loadViralLoadSuppressionByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL SUPPRESSION AMONG CURRENT ON ART PATIENTS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlSuppressionByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByCounty;
