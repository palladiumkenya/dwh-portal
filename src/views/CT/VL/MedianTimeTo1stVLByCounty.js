import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const MedianTimeTo1stVLByCounty = () => {
    const filters = useSelector(state => state.filters);
    const [medianTimeTo1stVLByCounty, setMedianTimeTo1stVLByCounty] = useState({});

    const loadMedianTimeTo1stVLByCounty = useCallback(async () => {
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
        const result = await getAll('care-treatment/vlMedianTimeToFirstVlByCounty', params);

        let counties = [];
        let medianTimeTo1stVLByCounty = [];

        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].county);
            medianTimeTo1stVLByCounty.push(parseInt(result[i].time, 10));
        }

        setMedianTimeTo1stVLByCounty({
            title: { text: '' },
            xAxis: [{ categories: counties, crosshair: true, title: { text: 'County' } }],
            yAxis: [
                { title: { text: 'Time (Days)' } },
            ],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Time (Days)', data: medianTimeTo1stVLByCounty, type: 'spline', color: "#E06F07" },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadMedianTimeTo1stVLByCounty();
    }, [loadMedianTimeTo1stVLByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO 1ST VL AFTER ART INITIATION BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeTo1stVLByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeTo1stVLByCounty;
