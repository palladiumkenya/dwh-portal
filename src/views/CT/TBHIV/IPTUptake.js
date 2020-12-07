import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const IPTUptake = () => {
    const filters = useSelector(state => state.filters);
    const [iptUptake, setIPTUptake] = useState({});

    const loadIPTUptake = useCallback(async () => {
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
        const sexCategories = ['CURRENT ON ART', 'NUMBER STARTED ON IPT'];
        const result = await getAll('care-treatment/vlUptakeBySex', params);
        let data = [];
        for(let i = 0; i < result.length; i++) {
            if(result[i].gender === 'Male') {
                data[0] = parseInt(result[i].vlDone);
            }
            if(result[i].gender === 'Female') {
                data[1] = parseInt(result[i].vlDone);
            }
        }
        setIPTUptake({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            xAxis: [{
                categories: sexCategories,
                crosshair: true
            }],
            yAxis: [{
                min: 0,
                title: { text: 'Number of Patients' },
            }],
            tooltip: { shared: true },
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Number of Patients', data: data, type: 'column', color: "#485969" },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadIPTUptake();
    }, [loadIPTUptake]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        IPT UPTAKE AMONG CURRENT ON ART PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={iptUptake} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default IPTUptake;
