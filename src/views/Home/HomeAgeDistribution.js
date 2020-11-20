import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getAll } from '../Shared/Api';

const HomeAgeDistribution = ({ globalFilters }) => {
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
        <div>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-left m-2">ADULTS ON ART</CardTitle>
                            <CardSubtitle tag="h6" className="text-left m-2">15+ YEARS</CardSubtitle>
                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle>
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{ARTClientsAdults.ActiveARTAdults}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-left m-2">ADOLESCENTS ON ART</CardTitle>
                            <CardSubtitle tag="h6" className="text-left m-2">10-19 YEARS</CardSubtitle>
                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle>
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{ARTClientsAdolescents.ActiveARTAdolescents}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <CardTitle tag="h5" className="text-left m-2">CHILDREN ON ART</CardTitle>
                            <CardSubtitle tag="h6" className="text-left m-2">0-14 YEARS</CardSubtitle>
                            <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">95%</CardSubtitle>
                            <CardText className="primary-card-body-text text-right" style={{ color: '#F28E2B' }}>{ARTClientsChildren.ActiveARTChildren}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HomeAgeDistribution;
