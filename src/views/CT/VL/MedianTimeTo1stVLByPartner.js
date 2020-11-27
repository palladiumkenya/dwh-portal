import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const MedianTimeTo1stVLByPartner = () => {
    const filters = useSelector(state => state.filters);
    const [medianTimeTo1stVLByPartner, setMedianTimeTo1stVLByPartner] = useState({});

    const loadMedianTimeTo1stVLByPartner = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('care-treatment/vlMedianTimeToFirstVlByPartner', params);

        let partners = [];
        let medianTimeTo1stVLByPartner = [];

        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].partner);
            medianTimeTo1stVLByPartner.push(parseInt(result[i].time, 10));
        }

        setMedianTimeTo1stVLByPartner({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: partners, crosshair: true, title: { text: 'Partner' } }],
            yAxis: [
                {
                    title: { text: 'Time (Days)', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Time (Days)', data: medianTimeTo1stVLByPartner, type: 'column', color: "#E06F07" },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadMedianTimeTo1stVLByPartner();
    }, [loadMedianTimeTo1stVLByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO 1ST VL AFTER ART INITIATION BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeTo1stVLByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeTo1stVLByPartner;
