import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const NewOnArtTrends = ({ globalFilters }) => {
    const [newOnArt, setNewOnArt] = useState({});

    const loadNewOnArt = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const result = await getAll('care-treatment/txNewTrends', params);
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };
        let months = [];
        let txNew = [];

        for(let i = 0; i < result.length; i++) {
            months.push(monthNames[result[i].month] + ' ' + result[i].year.toString());
            txNew.push(parseInt(result[i].txNew, 10));
        }

        months = months.slice(Math.max(months.length - 12, 0));
        txNew = txNew.slice(Math.max(txNew.length - 12, 0));

        setNewOnArt({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: months, crosshair: true, title: { text: 'Months' } }],
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
                { name: 'Number of Patients', data: txNew, type: 'spline', color: "#E06F07" },
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadNewOnArt();
    }, [loadNewOnArt]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TRENDS IN TX NEW - NUMBER STARTED ART BY MONTH
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={newOnArt} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NewOnArtTrends;
