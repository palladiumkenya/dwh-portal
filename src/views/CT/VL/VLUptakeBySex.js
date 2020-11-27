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
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const sexCategories = ['Male', 'Female'];
        const result = await getAll('care-treatment/vlUptakeBySex', params);
        let data = [];
        for(let i = 0; i < result.length; i++) {
            if(result[i].gender === 'Male') {
                data[0] = Number((parseInt(result[i].vlDone)/parseInt(result[i].eligible))*100).toFixed(0);
                data[0] = parseInt(result[i].vlDone);
            }
            if(result[i].gender === 'Female') {
                data[1] = Number((parseInt(result[i].vlDone)/parseInt(result[i].eligible))*100).toFixed(0);
                data[1] = parseInt(result[i].vlDone);
            }
        }
        setVLUptakeBySex({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            xAxis: [{
                categories: sexCategories,
                crosshair: true
            }],
            yAxis: [{
                min: 0,
                title: { text: 'VL Uptake' },
            }],
            tooltip: { shared: true },
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'VL Uptake', data: data, type: 'column', color: "#485969" },
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
