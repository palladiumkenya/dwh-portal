import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from './../Shared/Api';
import mapKenyaByCounty from './../Shared/kenyaByCounty.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenya-county"] = mapKenyaByCounty;

const DsdStabilityStatusByCountyMap = ({ globalFilters }) => {

    const [dsdStabilityStatusByCounty, setDsdStabilityStatusByCountyMap] = useState({});

    const loadDsdStabilityStatusByCounty = useCallback(async () => {
        const data = [];
        const mappedCounties = [
            { id: 38, name: "Vihiga" },
            { id: 8, name: "Wajir" },
            { id: 23, name: "Turkana" },
            { id: 27, name: "Uasin Gishu" },
            { id: 13, name: "Tharaka-Nithi" },
            { id: 26, name: "Trans Nzoia" },
            { id: 7, name: "Garissa" },
            { id: 43, name: "Homa Bay" },
            { id: 28, name: "Elgeyo-Marakwet" },
            { id: 14, name: "Embu" },
            { id: 39, name: "Bungoma" },
            { id: 40, name: "Busia" },
            { id: 30, name: "Baringo" },
            { id: 36, name: "Bomet" },
            { id: 20, name: "Kirinyaga" },
            { id: 45, name: "Kisii" },
            { id: 22, name: "Kiambu" },
            { id: 3, name: "Kilifi" },
            { id: 37, name: "Kakamega" },
            { id: 35, name: "Kericho" },
            { id: 11, name: "Isiolo" },
            { id: 34, name: "Kajiado" },
            { id: 17, name: "Makueni" },
            { id: 9, name: "Mandera" },
            { id: 5, name: "Lamu" },
            { id: 16, name: "Machakos" },
            { id: 2, name: "Kwale" },
            { id: 31, name: "Laikipia" },
            { id: 42, name: "Kisumu" },
            { id: 15, name: "Kitui" },
            { id: 32, name: "Nakuru" },
            { id: 29, name: "Nandi" },
            { id: 21, name: "Murang'a" },
            { id: 47, name: "Nairobi" },
            { id: 44, name: "Migori" },
            { id: 1, name: "Mombasa" },
            { id: 10, name: "Marsabit" },
            { id: 12, name: "Meru" },
            { id: 6, name: "Taita Taveta" },
            { id: 4, name: "Tana River" },
            { id: 25, name: "Samburu" },
            { id: 41, name: "Siaya" },
            { id: 18, name: "Nyandarua" },
            { id: 19, name: "Nyeri" },
            { id: 33, name: "Narok" },
            { id: 46, name: "Nyamira" },
            { id: 24, name: "West Pokot" },
        ];

        const result = await getAll('care-treatment/dsdStabilityStatusByCounty', []);

        for (let i = 0; i < result.length; i++) {
            if (result[i].stable == null) {
                continue;
            }
            let resultCounty = result[i].county;
            resultCounty = resultCounty.toLowerCase();
            resultCounty = resultCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
            resultCounty = resultCounty.replace(' ', '');
            for (let j = 0; j < mappedCounties.length; j++) {
                let mappedCounty = mappedCounties[j].name;
                mappedCounty = mappedCounty.toLowerCase();
                mappedCounty = mappedCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
                mappedCounty = mappedCounty.replace(' ', '');
                if ( mappedCounty === resultCounty) {
                    data.push({
                        id: mappedCounties[j].id,
                        value: result[i].stable === null ? 0:result[i].stable
                    });
                    continue;
                }
            }
        }
        
        setDsdStabilityStatusByCountyMap({
            chart: { map: 'custom/kenya-county' },
            title: { text: '' },
            colorAxis: { min: 0 },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.properties.NAME_1 + '</b><br>' +
                        this.series.name + ': ' + this.point.value;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },
            series: [{
                data: data,
                joinBy: ['CC_1', 'id'],
                name: 'Stable Patients',
                states: { hover: { color: '#1ab394' } },
            }]
        });
    }, []);

    useEffect(() => {
        loadDsdStabilityStatusByCounty();
    }, [loadDsdStabilityStatusByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={dsdStabilityStatusByCounty} constructorType={'mapChart'}/>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DsdStabilityStatusByCountyMap;
