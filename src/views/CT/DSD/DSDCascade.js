import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const DSDCascade = () => {
    const filters = useSelector(state => state.filters);
    const [dsdCascade, setDSDCascade] = useState({});

    const loadDSDCascade = useCallback(async () => {
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
        let txCurr = 0;
        // let stable = 0;
        let mmd = 0;
        const result = await getAll('care-treatment/dsdCascade', params);
        if(result) {
            txCurr = result.txCurr;
            // stable = result.stable;
            mmd = result.mmd;
        }
        const categories = [
            "CURRENT ON ART",
            // "STABLE",
            "TOTAL ON MMD"
        ];
        const data = [
            txCurr,
            // stable,
            mmd
        ];
        setDSDCascade({
            title: { text: '' },
            xAxis: [{ categories: categories, crosshair: true }],
            yAxis: [
                { title: { text: 'Number of Patients' }}
            ],
            legend: { enabled: false },
            plotOptions: { column: { dataLabels: { enabled: true, format: '{point.y:,.0f}{point.text}' } } },
            series: [{ name: 'DSD Cascade', type: 'column', color: "#485969", tooltip: { valueSuffix: '{point.text}' }, data: [
                { name: categories[0], y: data[0] },
                { name: categories[1], y: data[1], text: ' (' + parseFloat(((data[1]/data[0])*100).toString()).toFixed(0) + '%)' },
            ]}]
        });
    }, [filters]);

    useEffect(() => {
        loadDSDCascade();
    }, [loadDSDCascade]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DSD CASCADE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={dsdCascade} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default DSDCascade;
