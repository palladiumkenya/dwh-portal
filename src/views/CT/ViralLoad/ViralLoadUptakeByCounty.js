import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadUptakeByCountySelectors from '../../../selectors/CT/ViralLoad/viralLoadUptakeByCounty';

const ViralLoadUptakeByCounty = () => {
    const [viralLoadUptakeByCounty, setViralLoadUptakeByCounty] = useState({});
    const viralLoadUptakeByCountyData = useSelector(viralLoadUptakeByCountySelectors.getViralLoadUptakeByCounty);

    const loadViralLoadUptakeByCounty = useCallback(async () => {
        setViralLoadUptakeByCounty({
            title: { text: '' },
            xAxis: [{ categories: viralLoadUptakeByCountyData.data.map(function(d) { return d['c']; }), title: { text: 'County' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y}%' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: viralLoadUptakeByCountyData.data, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.absoluteY})'} },
            ]
        });
    }, [viralLoadUptakeByCountyData]);

    useEffect(() => {
        loadViralLoadUptakeByCounty();
    }, [loadViralLoadUptakeByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG CURRENT ON ART PATIENTS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadUptakeByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadUptakeByCounty;
