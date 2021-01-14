import React from 'react';
import { Col, Row } from 'reactstrap';
import SectionHeader from '../Shared/SectionHeader';
import SectionFooter from '../Shared/SectionFooter';
import DsdStabilityStatusByCountyMap from './DsdStabilityStatusByCountyMap';
import CountiesMap from './CountiesMap';
import TxCurrByProvinceMap from './TxCurrByProvinceMap';

const GIS = () => {
    const branding = { title: "GIS", description: "OVERVIEW", overview: "GIS" };
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <Row>
                <Col>
                    <DsdStabilityStatusByCountyMap/>
                </Col>
                <Col>
                    <CountiesMap/>
                </Col>
                <Col>
                    <TxCurrByProvinceMap/>
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default GIS;
