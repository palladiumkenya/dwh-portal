import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as selectors from '../../../selectors/CT/ArtOptimization/artOptimizationCurrentByCounty';
import * as currentOnArtByCountySelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByCounty';

const AdultTldUptakeByCounty = () => {
    const [adultRegimenUptakeByCounty, setAdultTldUptakeByCounty] = useState({});
    const sexGroups = useSelector(selectors.getSexGroups);
    const counties = useSelector(selectors.getCounties);
    const adultsCurrentByCounty = useSelector(selectors.getCurrentTldByCounty);
    const currentOnArtByCountyData = useSelector(currentOnArtByCountySelectors.getCurrentOnArtByCounty);

    const loadAdultTldUptakeByCounty = useCallback(async () => {
        let data = [];
        for(let i = 0; i < adultsCurrentByCounty.length; i++) {
            data.push(
                {
                    Male: adultsCurrentByCounty[i].gender === "Male" ? adultsCurrentByCounty[i].txCurr : 0,
                    Female: adultsCurrentByCounty[i].gender === "Female" ? adultsCurrentByCounty[i].txCurr : 0,
                    County: adultsCurrentByCounty[i].county
                }
            );
        }
        const valChartData = [];
        counties.map(county => {
            const countyData = data.filter(x => x.County === county);
            let totalCountyTld = 0;
            if (countyData.length > 0) {
                for (const countyDatum of countyData) {
                    totalCountyTld = totalCountyTld + countyDatum.Female + countyDatum.Male;
                }

                const countyIndex = currentOnArtByCountyData.counties.indexOf(county);
                const countyTxcurr = parseInt(currentOnArtByCountyData.currentOnArt[countyIndex]);
                let percentage = totalCountyTld === 0 || countyTxcurr === 0 ? 0 : Number(((totalCountyTld/countyTxcurr)*100).toFixed(0));
                valChartData.push(
                    {
                        y: percentage > 100 ? 100: percentage,
                        absoluteY: totalCountyTld.toLocaleString('en'),
                        county: county,
                        text: (percentage > 100 ? 100: percentage) + '%',
                    }
                );
            }
        });

        valChartData.sort(function(a, b){
            return b.y - a.y;
        });

        setAdultTldUptakeByCounty({
            title: { text: '' },
            xAxis: { categories: valChartData.map(a => a.county.toUpperCase()), title: { text: 'COUNTY' }, crosshair: true },
            yAxis: { title: { text: 'PERCENT OF PATIENTS' }},
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            plotOptions: { column: { dataLabels: { enabled: true, formatter: function () { return '' + this.point.text; } } }},
            series: [
                { name: 'TLD UPTAKE', type: 'column', data: valChartData, color: "#485969", tooltip: { valueSuffix: '% ({point.absoluteY})'} },
            ],
        });
    }, [counties, sexGroups, adultsCurrentByCounty, currentOnArtByCountyData]);

    useEffect(() => {
        loadAdultTldUptakeByCounty();
    }, [loadAdultTldUptakeByCounty]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TLD UPTAKE AMONG PATIENTS CURRENT ON ART BY COUNTY
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={adultRegimenUptakeByCounty} />
            </CardBody>
        </Card>
    );
};

export default AdultTldUptakeByCounty;
