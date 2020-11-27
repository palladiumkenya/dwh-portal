import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getAll } from '../Shared/Api';
import AdultMan from '../../assets/custom/AdultMan.png';
import AdultWoman from '../../assets/custom/AdultWoman.png';

const HomeSexDistribution = () => {
    const filters = useSelector(state => state.filters);
    const [ARTClientsByGender, setARTClientsByGender] = useState({
        ActiveARTFemale: '',
        ActiveARTMale: '',
        ViralSuppressionMale: 0,
        ViralSuppressionFemale: 0
    });
    
    const loadActiveOnARTByGender = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
        };
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
    }, [filters]);

    useEffect(() => {
        loadActiveOnARTByGender();
    }, [loadActiveOnARTByGender]);

    return (
        <div>
            <Row>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <Row>
                                <Col md={3} className="text-center">
                                    <img src={AdultMan} className="mt-2" width={"auto"} height={"100"}  alt={"Adult Man"} />
                                </Col>
                                <Col md={6}>
                                    <CardText className="primary-card-body-text text-center mb-2">{ARTClientsByGender.ActiveARTMale}</CardText>
                                    <CardTitle tag="h4" className="text-center mt-0 mb-2">Active on ART</CardTitle>
                                </Col>
                                <Col md={3}>
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{ARTClientsByGender.ViralSuppressionMale}%</CardSubtitle>
                                    <CardTitle tag="h5" className="text-right m-2">Of the males with a viral load are virally suppressed.</CardTitle>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="primary-card">
                        <CardBody className="primary-card-body">
                            <Row>
                                <Col md={3} className="text-center">
                                    <img src={AdultWoman} className="mt-2" width={"auto"} height={"100"} alt={"Adult Woman"} />
                                </Col>
                                <Col md={6}>
                                    <CardText className="primary-card-body-text text-center mb-2">{ARTClientsByGender.ActiveARTFemale}</CardText>
                                    <CardTitle tag="h4" className="text-center mt-0 mb-2">Active on ART</CardTitle>
                                </Col>
                                <Col md={3}>
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right">{ARTClientsByGender.ViralSuppressionFemale}%</CardSubtitle>
                                    <CardTitle tag="h5" className="text-right m-2">Of the females with a viral load are virally suppressed.</CardTitle>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HomeSexDistribution;
