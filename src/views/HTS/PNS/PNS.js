import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import PNSHeader from './PNSHeader';
import PNSFooter from './PNSFooter';

const PNS = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.htsTab === 'pns') {
            onGlobalFiltersChange({ ...globalFilters, stickyFilter: !isVisible});
        }
    }, [globalFilters, onGlobalFiltersChange]);
    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>
            <h3 style={{color: '#ff0000', textAlign: 'center', padding: '1em'}}>Please note that the data on this page is dummy data</h3>
            <PNSHeader/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <hr/><PNSFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );
};

export default PNS;
