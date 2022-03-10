import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as currentOnArtOverviewSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as dsdStabilityStatusByAgeSexSelectors from '../../../selectors/CT/Dsd/dsdStabilityStatusByAgeSex';

const DSDCascade = () => {
    const [dsdCascade, setDSDCascade] = useState({});
    const currentOnArt = useSelector(currentOnArtOverviewSelectors.getCurrentOnArt);
    const mmd = useSelector(dsdStabilityStatusByAgeSexSelectors.getMmd);

    const loadDSDCascade = useCallback(async () => {
        const categories = ["CURRENT ON ART", "TOTAL ON MMD"];
        const data = [currentOnArt, mmd];
        setDSDCascade({
            title: { text: '' },
            xAxis: [{ categories: categories, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients'.toUpperCase() }}],
            legend: { enabled: false },
            plotOptions: { column: { dataLabels: { enabled: true, format: '{point.y:,.0f}{point.text}' } } },
            series: [{ name: 'DSD Cascade', type: 'column', color: "#142459", tooltip: { valueSuffix: '{point.text}' }, data: [
                { name: categories[0], y: data[0] },
                { name: categories[1], y: data[1], text: ' (' + parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%)' },
            ]}]
        });
    }, [currentOnArt, mmd]);

    useEffect(() => {
        loadDSDCascade();
    }, [loadDSDCascade]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DSD CASCADE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={dsdCascade} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DSDCascade;
