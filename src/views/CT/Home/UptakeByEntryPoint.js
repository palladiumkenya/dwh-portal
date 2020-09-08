import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import AdultMan from '../../../assets/custom/AdultMan.png';
import AdultWoman from '../../../assets/custom/AdultWoman.png';
import { getAll } from '../../Shared/Api';

const UptakeByEntryPoint = ({ globalFilter }) => {
    const [uptakeByEntryPoint, setUptakeByEntryPoint] = useState({});
    const [ARTClients, setARTClients] = useState({
        activeARTClients: ''
    });
    const [ARTClientsChildren, setARTClientsChildren] = useState({
        ActiveARTChildren: ''
    });
    const [ARTClientsAdults, setARTClientsAdults] = useState({
        ActiveARTAdults: ''
    });
    const [ARTClientsAdolescents, setARTClientsAdolescents] = useState({
        ActiveARTAdolescents: ''
    });
    const [ARTClientsByGender, setARTClientsByGender] = useState({
        ActiveARTFemale: '',
        ActiveARTMale: '',
    });

    useEffect(() => {
        loadUptakeByEntryPoint();
        loadActiveOnART();
        loadActiveOnARTChildren();
        loadActiveOnARTAdults();
        loadActiveOnARTAdolescents();
        loadActiveOnARTByGender();
    }, [globalFilter]);

    const loadActiveOnART = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let ActiveART = 0;

        const result = await getAll('care-treatment/activeArt', params);
        if(result && result.length > 0) {
            ActiveART = result[0].ActiveART;
        }

        setARTClients({
            activeARTClients: ActiveART.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    };

    const loadActiveOnARTChildren = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let ActiveARTChildren = 0;

        const result = await getAll('care-treatment/activeArtChildren', params);
        if(result && result.length > 0) {
            ActiveARTChildren = result[0].ActiveARTChildren;
        }

        setARTClientsChildren({
            ActiveARTChildren: ActiveARTChildren.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    };

    const loadActiveOnARTAdults = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let ActiveARTAdults = 0;

        const result = await getAll('care-treatment/activeArtAdults', params);
        if(result && result.length > 0) {
            ActiveARTAdults = result[0].ActiveARTAdults;
        }

        setARTClientsAdults({
            ActiveARTAdults: ActiveARTAdults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }

    const loadActiveOnARTAdolescents = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let ActiveARTAdolescents = 0;

        const result = await getAll('care-treatment/activeArtAdolescents', params);
        if(result && result.length > 0) {
            ActiveARTAdolescents = result[0].ActiveARTAdolescents;
        }

        setARTClientsAdolescents({
            ActiveARTAdolescents: ActiveARTAdolescents.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    };

    const loadActiveOnARTByGender = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let ActiveARTMale = 0;
        let ActiveARTFemale = 0;

        const result = await getAll('care-treatment/activeArtByGender', params);
        for (let i = 0; i < result.length; i++) {
            if(result[i].Gender.toString().toLowerCase() == 'f' || result[i].Gender.toString().toLowerCase() == 'female') {
                ActiveARTFemale = result[i].ActiveART;
            }

            if(result[i].Gender.toString().toLowerCase() == 'm' || result[i].Gender.toString().toLowerCase() == 'male') {
                ActiveARTMale = result[i].ActiveART;
            }
        }

        setARTClientsByGender({
            ActiveARTMale: ActiveARTMale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            ActiveARTFemale: ActiveARTFemale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    };

    const loadUptakeByEntryPoint = async () => {
        setUptakeByEntryPoint({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'TX CURR',
                    'ELIGIBLE FOR VL',
                    'HAS VL AT 12 MONTHS',
                    'SUPPRESSED AT 12 MONTHS'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENT'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                data: [
                    {
                        y: 49.9,
                        color: "#3475B3",
                    },
                    {
                        y: 71.5,
                        color: "#F28E2B",
                    },
                    {
                        y:106.4,
                        color: "#0D5647",
                    },
                    {
                        y:129.2,
                        color: "#E15759",
                    }
                ]
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY ENTRY POINT
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={uptakeByEntryPoint} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <div className="hmis_statistics_separator">&nbsp;</div>

                <div className="row active_art">
                    <div className="col-12 active_art_number">
                        <strong>{ARTClients.activeARTClients}</strong>
                    </div>
                    <div className="col-12">
                        ACTIVE ON ART CLIENTS
                    </div>
                </div>

                <div className="hmis_statistics_separator">&nbsp;</div>

                <div className="row active_art">
                    <div className="col-6 active_art_number">
                        <strong>{ARTClientsChildren.ActiveARTChildren}</strong>
                    </div>
                    <div className="col-6 active_art_number">
                        <strong>{ARTClientsAdults.ActiveARTAdults}</strong>
                    </div>
                    <div className="col-6">
                        CHILDREN(0-14 YEARS)
                    </div>
                    <div className="col-6">
                        ADULTS(+15 YEARS)
                    </div>
                </div>

                <div className="hmis_statistics_separator">&nbsp;</div>

                <div className="row active_art">
                    <div className="col-12 active_art_number">
                        <strong>{ARTClientsAdolescents.ActiveARTAdolescents}</strong>
                    </div>
                    <div className="col-12">
                        ADOLESCENTS(10 -19 YEARS)
                    </div>
                </div>

                <div className="hmis_statistics_separator">&nbsp;</div>

                <div className="row active_art">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-1">
                                <img src={AdultMan} width={"auto"} height={"50"}  alt={"Adult Man"} />
                            </div>
                            <div className="col-11 active_art_gender">
                                {ARTClientsByGender.ActiveARTMale} males are active on ART. 93% of the males with a viral load in the last 12 months are virally suppressed.
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-1">
                                <img src={AdultWoman} width={"auto"} height={"50"}  alt={"Adult Woman"} />
                            </div>
                            <div className="col-11 active_art_gender">
                                {ARTClientsByGender.ActiveARTFemale} females are active on ART. 94% of the females with a viral load in the last 12 months are virally suppressed.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UptakeByEntryPoint;
