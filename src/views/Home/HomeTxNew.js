import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../Shared/Api';
import moment from "moment";

const HomeTxNew = () => {
    const filters = useSelector(state => state.filters);
    const [txNew, setTxNew] = useState({});

    const loadTxNew = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY")
        };
        const result = await getAll('care-treatment/txNew', params);
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };
        const today = new Date();
        const today_lastyear = new Date();
        const lastYear = new Date(today_lastyear.setFullYear(today.getFullYear() - 1));
        const lastFullYear = lastYear.getFullYear();
        const lastYearMonth = lastYear.getMonth() + 1;
        const fullYear = today.getFullYear();
        const year = params.year;
        let months = [];
        let cumulative = [];
        let male = [];
        let female = [];
        for(let i = 0; i < result.length; i++) {
            const result_month = result[i].month;
            const result_year = result[i].year.toString();

            if((year.toString() === fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() === lastFullYear.toString())) {
                continue;
            }

            if(result[i].Gender.toLowerCase() === 'M'.toLowerCase() || result[i].Gender.toLowerCase() === 'Male'.toLowerCase()) {
                male.push(parseInt(result[i].tx_new, 10));
                months.push(monthNames[result[i].month] + ' ' + result_year.toString());
            } else if(result[i].Gender.toLowerCase() === 'F'.toLowerCase() || result[i].Gender.toLowerCase() === 'Female'.toLowerCase()) {
                female.push(parseInt(result[i].tx_new, 10));
            }
        }
        for(let i = 0; i < male.length; i++) {
            let month_value = 0;
            month_value = male[i] + female[i];

            if(cumulative.length > 0) {
                const addition = cumulative[i-1] + month_value;
                cumulative.push(addition);
            } else {
                cumulative.push(month_value);
            }
        }
        setTxNew({
            title: { text: '', },
            xAxis: [{ categories: months, crosshair: true, }],
            yAxis: [
                { title: { text: 'Number of Patients' } },
                { title: { text: 'Cummulative New on ART'}, opposite: true }
            ],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Male', type: 'column', color: "#1AB394", data: male },
                { name: 'Female', type: 'column', color: "#485969", data: female },
                { name: 'Cumulative New on ART', type: 'spline', yAxis: 1, data: cumulative, color: "#E06F07"}
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadTxNew();
    }, [loadTxNew]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader  className="cardTitle">New on ART: Distribution of PLHIV newly started on ART</CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={txNew} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HomeTxNew;
