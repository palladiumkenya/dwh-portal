import React, { useEffect, useState, useCallback } from 'react';
import { Col, Row } from 'reactstrap';
import AdultMan from '../../assets/custom/AdultMan.png';
import AdultWoman from '../../assets/custom/AdultWoman.png';
import { getAll } from '../Shared/Api';

const CTOverview = ({ globalFilters }) => {
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
        ViralSuppressionMale: 0,
        ViralSuppressionFemale: 0
    });

    const loadActiveOnART = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        let ActiveART = 0;

        const result = await getAll('care-treatment/activeArt', params);
        if(result && result.length > 0) {
            ActiveART = result[0].ActiveART;
        }

        setARTClients({
            activeARTClients: ActiveART.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [globalFilters]);

    const loadActiveOnARTChildren = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        let ActiveARTChildren = 0;

        const result = await getAll('care-treatment/activeArtChildren', params);
        if(result && result.length > 0) {
            ActiveARTChildren = result[0].ActiveARTChildren;
        }

        setARTClientsChildren({
            ActiveARTChildren: ActiveARTChildren.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [globalFilters]);

    const loadActiveOnARTAdults = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        let ActiveARTAdults = 0;

        const result = await getAll('care-treatment/activeArtAdults', params);
        if(result && result.length > 0) {
            ActiveARTAdults = result[0].ActiveARTAdults;
        }

        setARTClientsAdults({
            ActiveARTAdults: ActiveARTAdults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [globalFilters]);

    const loadActiveOnARTAdolescents = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        let ActiveARTAdolescents = 0;

        const result = await getAll('care-treatment/activeArtAdolescents', params);
        if(result && result.length > 0) {
            ActiveARTAdolescents = result[0].ActiveARTAdolescents;
        }

        setARTClientsAdolescents({
            ActiveARTAdolescents: ActiveARTAdolescents.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }, [globalFilters]);

    const loadActiveOnARTByGender = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        let ActiveARTMale = 0;
        let ActiveARTFemale = 0;
        let ViralSuppressionMale = 0
        let ViralSuppressionFemale = 0

        const result = await getAll('care-treatment/activeArtByGender', params);
        const viralLoadSuppression = await getAll('care-treatment/viralLoadSuppressionPercentageByGender', params);

        for (let i = 0; i < result.length; i++) {
            if(result[i].Gender.toString().toLowerCase() === 'f' || result[i].Gender.toString().toLowerCase() === 'female') {
                ActiveARTFemale = result[i].ActiveART;
            }

            if(result[i].Gender.toString().toLowerCase() === 'm' || result[i].Gender.toString().toLowerCase() === 'male') {
                ActiveARTMale = result[i].ActiveART;
            }
        }

        for (let i = 0; i < viralLoadSuppression.length; i++) {
            if(viralLoadSuppression[i].Gender.toString().toLowerCase() === 'f' || viralLoadSuppression[i].Gender.toString().toLowerCase() === 'female') {
                const Suppressed = viralLoadSuppression[i].Suppressed;
                const Last12MonthVL = viralLoadSuppression[i].Last12MonthVL;
                ViralSuppressionFemale = parseFloat(((Suppressed / Last12MonthVL) * 100).toString()).toFixed(0);
            }

            if(viralLoadSuppression[i].Gender.toString().toLowerCase() === 'm' || viralLoadSuppression[i].Gender.toString().toLowerCase() === 'male') {
                const Suppressed = viralLoadSuppression[i].Suppressed;
                const Last12MonthVL = viralLoadSuppression[i].Last12MonthVL;
                ViralSuppressionMale = parseFloat(((Suppressed / Last12MonthVL) * 100).toString()).toFixed(0);
            }
        }

        setARTClientsByGender({
            ActiveARTMale: ActiveARTMale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            ActiveARTFemale: ActiveARTFemale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            ViralSuppressionMale: ViralSuppressionMale,
            ViralSuppressionFemale: ViralSuppressionFemale
        });
    }, [globalFilters]);

    useEffect(() => {
        loadActiveOnART();
        loadActiveOnARTChildren();
        loadActiveOnARTAdults();
        loadActiveOnARTAdolescents();
        loadActiveOnARTByGender();
    }, [loadActiveOnART, loadActiveOnARTChildren, loadActiveOnARTAdults, loadActiveOnARTAdolescents, loadActiveOnARTByGender]);

    return (
        <Row>
            <Col lg={12}>
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
                                <strong>{ARTClientsByGender.ActiveARTMale}</strong> males are active on ART. <strong>{ARTClientsByGender.ViralSuppressionMale}%</strong> of the males with a viral load in the last 12 months are virally suppressed.
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-1">
                                <img src={AdultWoman} width={"auto"} height={"50"}  alt={"Adult Woman"} />
                            </div>
                            <div className="col-11 active_art_gender">
                                <strong>{ARTClientsByGender.ActiveARTFemale}</strong> females are active on ART. <strong>{ARTClientsByGender.ViralSuppressionFemale}%</strong> of the females with a viral load in the last 12 months are virally suppressed.
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default CTOverview;
