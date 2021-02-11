import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadUptakeBySexSelectors from '../../../selectors/CT/ViralLoad/viralLoadUptakeBySex';

const ViralLoadUptakeBySex = () => {
    const [viralLoadUptakeBySex, setViralLoadUptakeBySex] = useState({});
    const viralLoadUptakeBySexData = useSelector(viralLoadUptakeBySexSelectors.getViralLoadUptakeBySex);
    console.log(viralLoadUptakeBySexData.data);

    const loadViralLoadUptakeBySex = useCallback(async () => {
        setViralLoadUptakeBySex({
            title: { text: '' },
            xAxis: [{ categories: viralLoadUptakeBySexData.sexCategories, crosshair: true }],
            yAxis: [
                { title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}
            ],
            legend: { enabled: false },
            series: [
                { name: 'VL Uptake', data: viralLoadUptakeBySexData.data, type: 'column', tooltip: { valueSuffix: ' % ({point.absoluteY})' } },
            ]
        });
    }, [viralLoadUptakeBySexData]);

    useEffect(() => {
        loadViralLoadUptakeBySex();
    }, [loadViralLoadUptakeBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG CURRENT ON ART PATIENTS BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadUptakeBySex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadUptakeBySex;
