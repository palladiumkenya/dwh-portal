import React, { useCallback } from 'react';
import { CardColumns } from 'reactstrap';
import CTHomeOverview from './CTHomeOverview';
import UniversalFilter from '../Shared/UniversalFilter';
import CTHomeFooter from './CTHomeFooter';
import CTHomeTXNew from './CTHomeTXNew';
import CTHomeStabilityStatusAndTrendsInDSD from './CTHomeStabilityStatusAndTrendsInDsd';
import VLCascade from './VLCascade';
import CTOverview from './CTOverview';
import VisibilitySensor from 'react-visibility-sensor';

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
            <CTHomeOverview period={globalFilters?.year} />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters}  onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <p>
                <strong>1223</strong> Health Facilities in 44 Countries in Kenya,
                supported by 44 SDPs have ever uploaded care & treatment data to the warehouse since it’s inception.
                As at July 2020,<strong>1035</strong> facilities had reported patients current on ART.
            </p>
            <CardColumns className="cols-2">
                <VLCascade globalFilters={globalFilters} />
                <CTOverview globalFilters={globalFilters} />
            </CardColumns>
            <hr />
            <CTHomeFooter />
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
            <VisibilitySensor onChange={onVisibilityChangeOnCTHomeTxNew}>
                <CTHomeTXNew globalFilters={globalFilters} />
            </VisibilitySensor>
            <hr />
            <CTHomeFooter />
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
            <CTHomeStabilityStatusAndTrendsInDSD globalFilters={globalFilters} />
            <hr />
            <CTHomeFooter />
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
        </div>
    );
};

export default Home;
