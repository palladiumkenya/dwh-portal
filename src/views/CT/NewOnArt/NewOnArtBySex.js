import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as newOnArtByAgeSexSelectors from '../../../selectors/CT/NewOnArt/newOnArtByAgeSex';

const NewOnArtBySex = () => {
    const [newOnArtBySex, setNewOnArtBySex] = useState({});
    const newOnArtBySexData = useSelector(newOnArtByAgeSexSelectors.getNewOnArtBySex);

    const loadNewOnArtBySex = useCallback(async () => {
        setNewOnArtBySex({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: { text: '' },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
            accessibility: { point: { valueSuffix: '%' } },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name:"New on ART",
                colorByPoint: true,
                data: [
                    { name: 'Female', y: newOnArtBySexData.newOnArtFemale, color: "#EA4C8B" },
                    { name: 'Male', y: newOnArtBySexData.newOnArtMale, sliced: true, selected: true, color: "#14084D" },
                ]
            }]
        });
    }, [newOnArtBySexData]);

    useEffect(() => {
        loadNewOnArtBySex();
    }, [loadNewOnArtBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        NEWLY STARTED ON ART BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={newOnArtBySex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NewOnArtBySex;
