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
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.text; } } }},
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: viralLoadOverallUptakeSuppressionByCountyData.data, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.absoluteY})' }}
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
