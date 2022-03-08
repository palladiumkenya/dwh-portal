import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as newOnArtHtsPositiveSelectors from '../../../selectors/CT/NewOnArt/newOnArtHtsPositive';

const NewOnArtHtsPositive = () => {
    const [newOnArtHtsPositive, setNewOnArtHtsPositive] = useState({});
    const newOnArtHtsPositiveData = useSelector(newOnArtHtsPositiveSelectors.getNewOnArtHtsPositive);

    const loadNewOnArtHtsPositive = useCallback(async () => {
        setNewOnArtHtsPositive({
            title: { text: '' },
            xAxis: [{ categories: newOnArtHtsPositiveData.months, title: { text: 'Months' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Total New on Treatment', type: 'column', data: newOnArtHtsPositiveData.txNew, yAxis: 0, color: "#142459",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
                { name: 'Total HTS Positives ', type: 'column', data: newOnArtHtsPositiveData.positives, yAxis: 0, color: "#1AB394",  dataLabels: { enabled: true }, tooltip: { valueSuffix: ' ' } },
            ],
        });
    }, [newOnArtHtsPositiveData]);

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
