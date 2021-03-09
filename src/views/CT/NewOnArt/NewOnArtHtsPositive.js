import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as newOnArtTrendsSelectors from '../../../selectors/CT/NewOnArt/newOnArtTrends';
import * as linkagePositiveTrendsSelectors from '../../../selectors/HTS/Linkage/linkagePositiveTrends';

const NewOnArtHtsPositive = () => {
    const [newOnArtHtsPositive, setNewOnArtHtsPositive] = useState({});
    const newOnArtTrendsData = useSelector(newOnArtTrendsSelectors.getNewOnArtTrends);
    const linkagePositiveTrendsData = useSelector(linkagePositiveTrendsSelectors.getLinkagePositiveTrends);

    const loadNewOnArtHtsPositive = useCallback(async () => {
        setNewOnArtHtsPositive({
            title: { text: '' },
            xAxis: [{ categories: newOnArtTrendsData.months, title: { text: 'Months' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Total New on Treatment', type: 'column', data: newOnArtTrendsData.txNew, yAxis: 0, color: "#485969",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Total HTS Positives ', type: 'column', data: linkagePositiveTrendsData.positives, yAxis: 0, color: "#1AB394",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
            ],
        });
    }, [newOnArtTrendsData, linkagePositiveTrendsData]);

    useEffect(() => {
        loadNewOnArtHtsPositive();
    }, [loadNewOnArtHtsPositive]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                NEW ON TREATMENT COMPARED TO HTS POSITIVES
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={newOnArtHtsPositive} />
            </CardBody>
        </Card>
    );
};

export default NewOnArtHtsPositive;
