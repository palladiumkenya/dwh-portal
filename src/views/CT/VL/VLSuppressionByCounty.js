import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLSuppressionByCounty = () => {
    const filters = useSelector(state => state.filters);
    const [vlSuppressionByCounty, setVLSuppressionByCounty] = useState({});

    const loadVLSuppressionByCounty = useCallback(async () => {
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
        const result = await getAll('care-treatment/vlSuppressionByCounty', params);

        let counties = [];
        let vlSuppressionByCounty = [];

        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].county);
            vlSuppressionByCounty.push(parseInt(result[i].suppressed, 10));
        }

        setVLSuppressionByCounty({
            title: { text: '' },
            xAxis: [{ categories: counties, crosshair: true, title: { text: 'County' } }],
            yAxis: [
                { title: { text: 'Number of Patients' } },
            ],
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: vlSuppressionByCounty, type: 'column', color: "#485969" },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadVLSuppressionByCounty();
    }, [loadVLSuppressionByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL SUPPRESSION AMONG CURRENT ON ART PATIENTS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlSuppressionByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLSuppressionByCounty;
