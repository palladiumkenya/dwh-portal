import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLUptakeBySex = () => {
    const filters = useSelector(state => state.filters);
    const [vlUptakeBySex, setVLUptakeBySex] = useState({});

    const loadVLUptakeBySex = useCallback(async () => {
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
        const sexCategories = ['Male', 'Female'];
        const result = await getAll('care-treatment/vlUptakeBySex', params);
        let data = [];
        for(let i = 0; i < result.length; i++) {
            if(result[i].gender === 'Male') {
                data[0] = {
                    y: Number(((parseInt(result[i].vlDone)/parseInt(result[i].txCurr))*100).toFixed(1)),
                    absoluteY: result[i].vlDone.toLocaleString('en'),
                    color: "#14084D"
                };
            }
            if(result[i].gender === 'Female') {
                data[1] = {
                    y: Number(((parseInt(result[i].vlDone)/parseInt(result[i].txCurr))*100).toFixed(1)),
                    absoluteY: result[i].vlDone.toLocaleString('en'),
                    color: "#EA4C8B",
                };
            }
        }
        setVLUptakeBySex({
            title: { text: '' },
            xAxis: [{ categories: sexCategories, crosshair: true }],
            yAxis: [
                { title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}
            ],
            legend: { enabled: false },
            series: [
                { name: 'VL Uptake', data: data, type: 'column', tooltip: { valueSuffix: ' % ({point.absoluteY})' } },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadVLUptakeBySex();
    }, [loadVLUptakeBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG CURRENT ON ART PATIENTS BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlUptakeBySex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLUptakeBySex;
