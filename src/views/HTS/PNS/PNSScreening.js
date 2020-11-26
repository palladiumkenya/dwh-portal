import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const PNSScreening = ({ globalFilters }) => {
    const [pnsScreening, setPNSScreening] = useState({});
    const [pnsSexualContactsCascade, setPNSSexualContactsCascade] = useState({
        elicited: 0,
        tested: 0,
        positive: 0,
        linked: 0,
        knownPositive: 0
    });
    const [pnsChildrenCascade, setPNSChildrenCascade] = useState({
        elicited: 0,
        tested: 0,
        positive: 0,
        linked: 0,
        knownPositive: 0
    });
    const loadPNSSexualContactsCascade = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            year: globalFilters.year,
            month: globalFilters.month
        };
        const data = await getAll('hts/pnsSexualContactsCascade', params);
        setPNSSexualContactsCascade({
            elicited: data.elicited ? data.elicited:0,
            tested: data.tested ? data.tested:0,
            positive: data.positive ? data.positive:0,
            linked: data.linked ? data.linked:0,
            knownPositive: data.knownPositive ? data.knownPositive:0
        });
    }, [globalFilters]);
    const loadPNSChildrenCascade = useCallback(async () => {
        let params = {
            county: globalFilters.county,
            subCounty: globalFilters.subCounty,
            partner: globalFilters.partner,
            agency: globalFilters.agency,
            year: globalFilters.year,
            month: globalFilters.month
        };
        const data = await getAll('hts/pnsChildrenCascade', params);
        setPNSChildrenCascade({
            elicited: data.elicited ? data.elicited:0,
            tested: data.tested ? data.tested:0,
            positive: data.positive ? data.positive:0,
            linked: data.linked ? data.linked:0,
            knownPositive: data.knownPositive ? data.knownPositive:0
        });
    }, [globalFilters]);

    const loadPNSScreening = useCallback(async () => {
        const categories = ['Index', 'Contact Elicited', 'Known positive'];
        let data = [];
        data[0] = [Number(pnsSexualContactsCascade.positive), Number(pnsSexualContactsCascade.elicited), Number(pnsSexualContactsCascade.knownPositive)];
        data[1] = [Number(pnsChildrenCascade.positive), Number(pnsChildrenCascade.elicited), Number(pnsChildrenCascade.knownPositive)];
        console.log(data)
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
    }, [pnsSexualContactsCascade, pnsChildrenCascade]);

    useEffect(() => {
        loadPNSSexualContactsCascade();
        loadPNSChildrenCascade();
        loadPNSScreening();
    }, [loadPNSSexualContactsCascade, loadPNSChildrenCascade, loadPNSScreening]);

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
