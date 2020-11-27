import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const HIVNegativeTB = () => {
    const filters = useSelector(state => state.filters);
    const [hivNegativeTB, setHIVNegativeTB] = useState({});

    const loadHIVNegativeTB = useCallback(async () => {
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
        let highVl = 0;
        let onArtLessThan12Months = 0;
        let ageLessThan20Years = 0;
        let poorAdherence = 0;
        let bmiLessThan18 = 0;
        const result = await getAll('care-treatment/dsdUnstable', params);
        if(result) {
            highVl = result.highVl;
            onArtLessThan12Months = result.onArtLessThan12Months;
            ageLessThan20Years = result.ageLessThan20Years;
            poorAdherence = result.poorAdherence;
            bmiLessThan18 = result.bmiLessThan18;
        }
        const categories = ["RX COMPLETED", "DEAD", "LTFU", "NOT COMPLETED", "TO"];
        const data = [highVl, onArtLessThan12Months, ageLessThan20Years, poorAdherence, bmiLessThan18];
        setHIVNegativeTB({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            plotOptions: { series: { colorByPoint: true, colors: ['#28B294','#135647','#BCE468','#62A6E4','#30404F',] } },
            xAxis: [{ categories: categories, crosshair: true }],
            yAxis: [
                {
                    title: { text: 'Number of Patients', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Number of Patients', data: data, type: 'bar', color: "#1AB394" },
            ],
        });
    }, [filters]);

    useEffect(() => {
        loadHIVNegativeTB();
    }, [loadHIVNegativeTB]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HIV NEGATIVE TB PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={hivNegativeTB} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HIVNegativeTB;
