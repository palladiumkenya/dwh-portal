import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as medianTimeToArtStartByPartnerSelectors from '../../../selectors/CT/NewOnArt/medianTimeToArtStartByPartner';

const MedianTimeToArtStartByPartner = () => {
    const [medianTimeToArtStartByPartnerChart, setMedianTimeToArtStartByPartnerChart] = useState({});
    const medianTimeToArtStartByPartnerData = useSelector(medianTimeToArtStartByPartnerSelectors.getMedianTimeToArtStartByPartner);

    const loadMedianTimeToArtStartByPartner = useCallback(async () => {
        setMedianTimeToArtStartByPartnerChart({
            title: { text: '' },
            xAxis: [{ categories: medianTimeToArtStartByPartnerData.partners, title: { text: 'Partners' }, crosshair: true }],
            yAxis: [{ title: { text: 'Time (Months)' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Time (Months)', data: medianTimeToArtStartByPartnerData.times, type: 'column', color: "#485969" },
            ]
        });
    }, [medianTimeToArtStartByPartnerData]);

    useEffect(() => {
        loadMedianTimeToArtStartByPartner();
    }, [loadMedianTimeToArtStartByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO ART START BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeToArtStartByPartnerChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeToArtStartByPartner;
