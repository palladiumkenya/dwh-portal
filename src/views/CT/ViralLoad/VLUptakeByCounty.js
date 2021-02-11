import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLUptakeByCounty = () => {
    const filters = useSelector(state => state.filters);
    const [vlUptakeByCounty, setVLUptakeByCounty] = useState({});

    const loadVLUptakeByCounty = useCallback(async () => {
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
        const result = await getAll('care-treatment/vlUptakeByCounty', params);

        let counties = [];
        let vlUptakeByCounty = [];

        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].county);
            vlUptakeByCounty.push({
                y: Number(((parseInt(result[i].vlDone)/parseInt(result[i].txCurr))*100).toFixed(0)),
                absoluteY: result[i].vlDone.toLocaleString('en'),
            });
        }

        setVLUptakeByCounty({
            title: { text: '' },
            xAxis: [{ categories: counties, title: { text: 'County' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y} %' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: vlUptakeByCounty, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.absoluteY})'} },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadVLUptakeByCounty();
    }, [loadVLUptakeByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG CURRENT ON ART PATIENTS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlUptakeByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLUptakeByCounty;
