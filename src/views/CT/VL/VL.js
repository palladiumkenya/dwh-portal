import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import VLHeader from './VLHeader';
import VLFooter from './VLFooter';
import VLOverallUptakeAndSuppression from './VLOverallUptakeAndSuppression';
import MedianTimeTo1stVL from './MedianTimeTo1stVL';
import MedianTimeTo1stVLByCounty from './MedianTimeTo1stVLByCounty';
import MedianTimeTo1stVLByPartner from './MedianTimeTo1stVLByPartner';
import VLUptakeBySex from './VLUptakeBySex';
import VLUptakeByAge from './VLUptakeByAge';
import VLUptakeByCounty from './VLUptakeByCounty';
import VLUptakeByPartner from './VLUptakeByPartner';
import VLOutcomesOverall from './VLOutcomesOverall';
import VLOutcomesBySex from './VLOutcomesBySex';
import VLSuppressionByAge from './VLSuppressionByAge';
import VLSuppressionByRegimen from './VLSuppressionByRegimen';
import VLSuppressionByYear from './VLSuppressionByYear';
import VLSuppressionByCounty from './VLSuppressionByCounty';
import VLSuppressionByPartner from './VLSuppressionByPartner';
import VLSuppressionByYear6Month from './VLSuppressionByYear6Month';
import VLSuppressionByYear12Month from './VLSuppressionByYear12Month';
import VLSuppressionByYear24Month from './VLSuppressionByYear24Month';
import VLOverallUptakeAndSuppressionByFacility from './VLOverallUptakeAndSuppressionByFacility';

const VL = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.ctTab === 'vl') {
            onGlobalFiltersChange({
                ...globalFilters,
                stickyFilter: !isVisible,
                countyFilterEnabled: true,
                subCountyFilterEnabled: true,
                facilityFilterEnabled: true,
                partnerFilterEnabled: true,
                agencyFilterEnabled: false,
                fromDateFilterEnabled: true,
                toDateFilterEnabled: false,
            });
        }
    }, [globalFilters, onGlobalFiltersChange]);
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <VLHeader></VLHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <VLOverallUptakeAndSuppression globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <MedianTimeTo1stVL globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeTo1stVLByCounty globalFilters={globalFilters}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeTo1stVLByPartner globalFilters={globalFilters}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-4">
                    <VLUptakeBySex globalFilters={globalFilters}/>
                </div>
                <div className="col-8">
                    <VLUptakeByAge globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLUptakeByCounty globalFilters={globalFilters}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLUptakeByPartner globalFilters={globalFilters}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <div className="row">
                <div className="col-4">
                    <VLOutcomesOverall globalFilters={globalFilters}/>
                </div>
                <div className="col-8">
                    <VLOutcomesBySex globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByAge globalFilters={globalFilters}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <div className="row">
                <div className="col-4">
                    <VLSuppressionByRegimen globalFilters={globalFilters}/>
                </div>
                <div className="col-8">
                    <VLSuppressionByYear globalFilters={globalFilters}/>
                </div>
            </div>
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByCounty globalFilters={globalFilters}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByPartner globalFilters={globalFilters}/>
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByYear6Month globalFilters={globalFilters}/>
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByYear12Month globalFilters={globalFilters}/>
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByYear24Month globalFilters={globalFilters}/>
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLOverallUptakeAndSuppressionByFacility globalFilters={globalFilters}/>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default VL;
