import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as medianTimeTo1stVlByPartnerSelectors from '../../../selectors/CT/ViralLoad/medianTimeTo1stVlByPartner';

const MedianTimeTo1stVlByPartner = () => {
    const [medianTimeTo1stVlByPartner, setMedianTimeTo1stVlByPartner] = useState({});
    const medianTimeTo1stVlByPartnerData = useSelector(medianTimeTo1stVlByPartnerSelectors.getMedianTimeTo1stVlByPartner);

    const loadMedianTimeTo1stVlByPartner = useCallback(async () => {
        setMedianTimeTo1stVlByPartner({
            title: { text: '' },
            xAxis: [{ categories: medianTimeTo1stVlByPartnerData.partners.map(name=>name.toUpperCase()), crosshair: true, title: { text: 'Partner'.toUpperCase() } }],
            yAxis: [{ title: { text: 'Time (Months)'.toUpperCase() }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Time (Months)', data: medianTimeTo1stVlByPartnerData.times, type: 'spline', color: "#E06F07" },
            ]
        });
    }, [medianTimeTo1stVlByPartnerData]);

    useEffect(() => {
        loadMedianTimeTo1stVlByPartner();
    }, [loadMedianTimeTo1stVlByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO 1ST VL AFTER ART INITIATION BY PARTNER*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeTo1stVlByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12">
                *Among those who started ART in the last 12 months.
            </div>
        </div>
    );
};

export default MedianTimeTo1stVlByPartner;
