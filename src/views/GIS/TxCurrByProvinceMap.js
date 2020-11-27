import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getAll } from '../Shared/Api';
import mapKenyaByProvince from '../Shared/kenyaByProvince.json';

require('highcharts/modules/map')(Highcharts);
Highcharts.maps["custom/kenya"] = mapKenyaByProvince;

const TxCurrByProvinceMap = ({ globalFilters }) => {

    const [txCurrByProvinceMap, setTxCurrByProvinceMap] = useState({});

    const loadTxCurrByProvinceMap = useCallback(async () => {
        const data = [0,0,0,0,0,0,0,0];
        const mappedCounties = [
            { id:1, county: "Mombasa", province: "Coast", provinceCode: "ke-co" },
            { id:2, county: "Kwale", province: "Coast", provinceCode: "ke-co" },
            { id:3, county: "Kilifi", province: "Coast", provinceCode: "ke-co" },
            { id:4, county: "Tana River", province: "Coast", provinceCode: "ke-co" },
            { id:5, county: "Lamu", province: "Coast", provinceCode: "ke-co" },
            { id:6, county: "Taita-Taveta", province: "Coast", provinceCode: "ke-co" },
            { id:7, county: "Garissa", province: "North Eastern", provinceCode: "ke-ne" },
            { id:8, county: "Wajir", province: "North Eastern", provinceCode: "ke-ne" },
            { id:9, county: "Mandera", province: "North Eastern", provinceCode: "ke-ne" },
            { id:10, county: "Marsabit", province: "Eastern", provinceCode: "ke-565" },
            { id:11, county: "Isiolo", province: "Eastern", provinceCode: "ke-565" },
            { id:12, county: "Meru", province: "Eastern", provinceCode: "ke-565" },
            { id:13, county: "Tharaka-Nithi", province: "Eastern", provinceCode: "ke-565" },
            { id:14, county: "Embu", province: "Eastern", provinceCode: "ke-565" },
            { id:15, county: "Kitui", province: "Eastern", provinceCode: "ke-565" },
            { id:16, county: "Machakos", province: "Eastern", provinceCode: "ke-565" },
            { id:17, county: "Makueni", province: "Eastern", provinceCode: "ke-565" },
            { id:18, county: "Nyandarua", province: "Central", provinceCode: "ke-ce" },
            { id:19, county: "Nyeri", province: "Central", provinceCode: "ke-ce" },
            { id:20, county: "Kirinyaga", province: "Central", provinceCode: "ke-ce" },
            { id:21, county: "Murang'a", province: "Central", provinceCode: "ke-ce" },
            { id:22, county: "Kiambu", province: "Central", provinceCode: "ke-ce" },
            { id:23, county: "Turkana", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:24, county: "West Pokot", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:25, county: "Samburu", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:26, county: "Trans Nzoia", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:27, county: "Uasin Gishu", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:28, county: "Elgeyo-Marakwet", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:29, county: "Nandi", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:30, county: "Baringo", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:31, county: "Laikipia", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:32, county: "Nakuru", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:33, county: "Narok", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:34, county: "Kajiado", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:35, county: "Kericho", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:36, county: "Bomet", province: "Rift Valley", provinceCode: "ke-rv" },
            { id:37, county: "Kakamega", province: "Western", provinceCode: "ke-we" },
            { id:38, county: "Vihiga", province: "Western", provinceCode: "ke-we" },
            { id:39, county: "Bungoma", province: "Western", provinceCode: "ke-we" },
            { id:40, county: "Busia", province: "Western", provinceCode: "ke-we" },
            { id:41, county: "Siaya", province: "Nyanza", provinceCode: "ke-ny" },
            { id:42, county: "Kisumu", province: "Nyanza", provinceCode: "ke-ny" },
            { id:43, county: "Homa Bay", province: "Nyanza", provinceCode: "ke-ny" },
            { id:44, county: "Migori", province: "Nyanza", provinceCode: "ke-ny" },
            { id:45, county: "Kisii", province: "Nyanza", provinceCode: "ke-ny" },
            { id:46, county: "Nyamira", province: "Nyanza", provinceCode: "ke-ny" },
            { id:47, county: "Nairobi", province: "Nairobi", provinceCode: "ke-na" },
        ];

        const result = await getAll('care-treatment/txCurrDistributionByCounty', []);

        for (let i = 0; i < result.length; i++) {
            if (result[i].txCurr == null) {
                continue;
            }
            let resultCounty = result[i].County;
            resultCounty = resultCounty.toLowerCase();
            resultCounty = resultCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
            resultCounty = resultCounty.replace(' ', '');
            for (let j = 0; j < mappedCounties.length; j++) {
                let mappedCounty = mappedCounties[j].county;
                mappedCounty = mappedCounty.toLowerCase();
                mappedCounty = mappedCounty.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '');
                mappedCounty = mappedCounty.replace(' ', '');
                if ( mappedCounty === resultCounty) {
                    let index = 8;
                    if (mappedCounties[j].provinceCode === "ke-co") {
                        index = 0;
                    } else if (mappedCounties[j].provinceCode === "ke-ne") {
                        index = 1;
                    } else if (mappedCounties[j].provinceCode === "ke-565") {
                        index = 2;
                    } else if (mappedCounties[j].provinceCode === "ke-ce") {
                        index = 3;
                    } else if (mappedCounties[j].provinceCode === "ke-rv") {
                        index = 4;
                    } else if (mappedCounties[j].provinceCode === "ke-we") {
                        index = 5;
                    } else if (mappedCounties[j].provinceCode === "ke-ny") {
                        index = 6;
                    } else if (mappedCounties[j].provinceCode === "ke-na") {
                        index = 7;
                    }
                    data[index] = data[index] + parseInt(result[i].txCurr, 10);
                    continue;
                }
            }
        }
        const final = [
            {
                "code": "ke-co",
                "z": data[0]
            },
            {
                "code": "ke-ny",
                "z": data[6]
            },
            {
                "code": "ke-ce",
                "z": data[3]
            },
            {
                "code": "ke-na",
                "z": data[7]
            },
            {
                "code": "ke-565",
                "z": data[2]
            },
            {
                "code": "ke-rv",
                "z": data[4]
            },
            {
                "code": "ke-we",
                "z": data[5]
            },
            {
                "code": "ke-ne",
                "z": data[1]
            }
        ];
        
        setTxCurrByProvinceMap({
            chart: { borderWidth: 1, map: 'custom/kenya' },
            title: { text: ' ' },
            subtitle: { text: ' ' },
            legend: { enabled: false },
            mapNavigation: { enabled: true, buttonOptions: { verticalAlign: 'bottom' } },
            series: [{
                name: 'Countries',
                color: '#E0E0E0',
                enableMouseTracking: false
            }, {
                type: 'mapbubble',
                name: 'TX Curr',
                joinBy: ['hc-key', 'code'],
                data: final,
                minSize: 4,
                maxSize: '12%',
                tooltip: {
                    pointFormat: '{point.properties.name}: {point.z}'
                }
            }]
        });
    }, []);

    useEffect(() => {
        loadTxCurrByProvinceMap();
    }, [loadTxCurrByProvinceMap]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CURRENT ON ART BY PROVINCE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={txCurrByProvinceMap} constructorType={'mapChart'}/>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default TxCurrByProvinceMap;
