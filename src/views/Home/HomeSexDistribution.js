import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getAll } from '../Shared/Api';
import AdultMan from '../../assets/custom/AdultMan.png';
import AdultWoman from '../../assets/custom/AdultWoman.png';
import * as currentOnArtByAgeSexSelectors from '../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import { formatNumber, roundNumber } from '../../utils/utils';

const HomeSexDistribution = () => {
    const filters = useSelector(state => state.filters);
    const currentOnArtBySex = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtBySex);
    const [ARTClientsByGender, setARTClientsByGender] = useState({
        ViralSuppressionMale: 0,
        ViralSuppressionFemale: 0
    });

    const loadActiveOnARTByGender = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
        };
        let ViralSuppressionMale = 0
        let ViralSuppressionFemale = 0
        const viralLoadSuppression = await getAll('care-treatment/viralLoadSuppressionPercentageByGender', params);
        for (let i = 0; i < viralLoadSuppression.length; i++) {
            if(viralLoadSuppression[i].Gender.toString().toLowerCase() === 'f' || viralLoadSuppression[i].Gender.toString().toLowerCase() === 'female') {
                const Suppressed = viralLoadSuppression[i].Suppressed;
                const Last12MonthVL = viralLoadSuppression[i].Last12MonthVL;
                ViralSuppressionFemale = typeof Suppressed !== 'undefined' && typeof Last12MonthVL !== 'undefined' ? roundNumber((Suppressed / Last12MonthVL) * 100) : 0;
            }
            if(viralLoadSuppression[i].Gender.toString().toLowerCase() === 'm' || viralLoadSuppression[i].Gender.toString().toLowerCase() === 'male') {
                const Suppressed = viralLoadSuppression[i].Suppressed;
                const Last12MonthVL = viralLoadSuppression[i].Last12MonthVL;
                ViralSuppressionMale = typeof Suppressed !== 'undefined' && typeof Last12MonthVL !== 'undefined' ? roundNumber((Suppressed / Last12MonthVL) * 100) : 0;
            }
        }
        setARTClientsByGender({
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
                                    <CardText className="primary-card-body-text text-center mb-2">{formatNumber(currentOnArtBySex.currentOnArtMale)}</CardText>
                                    <CardTitle tag="h4" className="text-center mt-0 mb-2">Active on ART</CardTitle>
                                </Col>
                                <Col md={3}>
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right bigger-subtitle">{ARTClientsByGender.ViralSuppressionMale}%</CardSubtitle>
                                    <CardTitle tag="h5" className="text-right m-2">viral suppression among males</CardTitle>
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
                                    <CardText className="primary-card-body-text text-center mb-2">{formatNumber(currentOnArtBySex.currentOnArtFemale)}</CardText>
                                    <CardTitle tag="h4" className="text-center mt-0 mb-2">Active on ART</CardTitle>
                                </Col>
                                <Col md={3}>
                                    <CardSubtitle tag="h5" className="primary-card-body-subtitle text-right bigger-subtitle">{ARTClientsByGender.ViralSuppressionFemale}%</CardSubtitle>
                                    <CardTitle tag="h5" className="text-right m-2">viral suppression among females</CardTitle>
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
