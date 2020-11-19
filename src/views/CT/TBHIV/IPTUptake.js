import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const IPTUptake = ({ globalFilters }) => {
    const [iptUptake, setIPTUptake] = useState({});

    const loadIPTUptake = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const sexCategories = ['TX CURR', 'NUMBER STARTED ON IPT'];
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
    }, [globalFilters]);

    useEffect(() => {
        loadIPTUptake();
    }, [loadIPTUptake]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        IPT UPTAKE AMONG TX CURR PATIENTS (N =495)
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
