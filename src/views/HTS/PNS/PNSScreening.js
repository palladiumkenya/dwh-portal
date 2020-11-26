import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const PNSScreening = ({ globalFilters }) => {
    const [pnsScreening, setPNSScreening] = useState({});
    const loadPNSScreening = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            year: globalFilters.year,
            month: globalFilters.month
        };
        const data1 = await getAll('hts/pnsSexualContactsCascade', params);
        let pnsSexualContactsCascade = {
            elicited: data1.elicited ? data1.elicited:0,
            tested: data1.tested ? data1.tested:0,
            positive: data1.positive ? data1.positive:0,
            linked: data1.linked ? data1.linked:0,
            knownPositive: data1.knownPositive ? data1.knownPositive:0
        };
        const data2 = await getAll('hts/pnsChildrenCascade', params);
        let pnsChildrenCascade = {
            elicited: data2.elicited ? data2.elicited:0,
            tested: data2.tested ? data2.tested:0,
            positive: data2.positive ? data2.positive:0,
            linked: data2.linked ? data2.linked:0,
            knownPositive: data2.knownPositive ? data2.knownPositive:0
        };
        const data3 = await getAll('hts/pnsIndex', params);
        const categories = ['Index', 'Contacts Elicited', 'Known positive'];
        let data = [];
        data[0] = [Number(data3.indexClients), Number(pnsSexualContactsCascade.elicited), Number(pnsSexualContactsCascade.knownPositive)];
        data[1] = [0, Number(pnsChildrenCascade.elicited), Number(pnsChildrenCascade.knownPositive)];
        setPNSScreening({
            title: { text: '' },
            xAxis: [{ categories: categories, crosshair: true }],
            yAxis: [{ title: { text: '' } }],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal', dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Children', data: data[1], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'Adult', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadPNSScreening();
    }, [loadPNSScreening]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="cardTitle">SCREENING</CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={pnsScreening} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default PNSScreening;
