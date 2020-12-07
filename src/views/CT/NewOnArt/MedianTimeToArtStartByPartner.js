import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const MedianTimeToArtStartByPartner = () => {
    const filters = useSelector(state => state.filters);
    const [medianTimeToArtStartByPartner, setMedianTimeToArtStartByPartner] = useState({});

    const loadMedianTimeToArtStartByPartner = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):'',
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('care-treatment/medianTimeToArtByPartner', params);

        let partners = [];
        let medianTimeToArtStartByPartner = [];

        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].partner);
            medianTimeToArtStartByPartner.push(parseInt(result[i].time, 10));
        }

        setMedianTimeToArtStartByPartner({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: partners, crosshair: true, title: { text: 'Partners' } }],
            yAxis: [
                {
                    title: { text: 'Time (Days)', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            tooltip: { shared: true },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Time (Days)', data: medianTimeToArtStartByPartner, type: 'column', color: "#485969" },
            ]
        });
    }, [filters]);

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
                            <HighchartsReact highcharts={Highcharts} options={medianTimeToArtStartByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeToArtStartByPartner;
