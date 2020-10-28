import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const TBActiveCaseFindingAdults = ({ globalFilter }) => {
    const [tbActiveCaseFindingAdults, setTBActiveCaseFindingAdults] = useState({});

    const loadTBActiveCaseFindingAdults = useCallback(async () => {
        let params = null;
        if (globalFilter) {
            params = { ...globalFilter };
        }
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
        const categories = ["TX CURR", "SCREENED FOR TB", "PRESUMPTIVE TB", "CONFIRMED TB", "STARTED TB RX"];
        const data = [highVl, onArtLessThan12Months, ageLessThan20Years, poorAdherence, bmiLessThan18];
        setTBActiveCaseFindingAdults({
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
    }, [globalFilter]);

    useEffect(() => {
        loadTBActiveCaseFindingAdults();
    }, [loadTBActiveCaseFindingAdults]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TB ACTIVE CASE FINDING FOR ADULTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={tbActiveCaseFindingAdults} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TBActiveCaseFindingAdults;
