import React, { useCallback } from 'react';
import { CardColumns, Col, Row } from 'reactstrap';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import UniversalFilter from '../Shared/UniversalFilter';
import CTHomeTXNew from './CTHomeTXNew';
import CTHomeStabilityStatusAndTrendsInDSD from './CTHomeStabilityStatusAndTrendsInDsd';
import HomeVLCascade from './HomeVLCascade';
import HomeAgeDistribution from './HomeAgeDistribution';
import HomeOverview from './HomeOverview';
import VisibilitySensor from 'react-visibility-sensor';
import HomeMaps from './HomeMaps';

const Home = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        onGlobalFiltersChange({
            ...globalFilters,
            stickyFilter: !isVisible,
            countyFilterEnabled: true,
            subCountyFilterEnabled: true,
            facilityFilterEnabled: true,
            partnerFilterEnabled: true,
            agencyFilterEnabled: false,
            fromDateFilterEnabled: false,
            toDateFilterEnabled: false,
        });
    }, [globalFilters, onGlobalFiltersChange]);
    const onVisibilityChangeOnCTHomeTxNew = useCallback(async (isVisible) => {
        if (isVisible) {
            onGlobalFiltersChange({
                ...globalFilters,
                fromDateFilterEnabled: true,
            });
        } else {
            onGlobalFiltersChange({
                ...globalFilters,
                fromDateFilterEnabled: false,
            });
        }
    }, [globalFilters, onGlobalFiltersChange]);

    return (
        <div className="animated fadeIn">
            <br></br>
            <div className="strip"></div>
            <HomeHeader period={globalFilters?.year} />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters}  onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <HomeVLCascade globalFilters={globalFilters} />
            <Row>
                <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                    <HomeAgeDistribution globalFilters={globalFilters} />
                </Col>
                <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                    <HomeMaps globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                </Col>
                <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                    <HomeOverview />
                </Col>
            </Row>
            <hr />
            <HomeFooter />
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
            <VisibilitySensor onChange={onVisibilityChangeOnCTHomeTxNew}>
                <CTHomeTXNew globalFilters={globalFilters} />
            </VisibilitySensor>
            <hr />
            <HomeFooter />
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
            <CTHomeStabilityStatusAndTrendsInDSD globalFilters={globalFilters} />
            <hr />
            <HomeFooter />
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
        </div>
    );
};

export default Home;
