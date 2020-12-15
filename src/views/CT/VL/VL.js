import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import VLHeader from './VLHeader';
import VLFooter from './VLFooter';
import VLOverview from './VLOverview';
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
import { enableStickyFilter, disableStickyFilter } from "../../../actions/shared/uiActions";

const VL = () => {
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'vl') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <VLHeader></VLHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <p></p>
            <div className="row">
                <div className="col-12">
                    <VLOverview />
                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <VLOverallUptakeAndSuppression />
                </div>
                <div className="col-6">
                    <MedianTimeTo1stVL />
                </div>
            </div>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeTo1stVLByCounty />
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeTo1stVLByPartner />
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-4">
                    <VLUptakeBySex />
                </div>
                <div className="col-8">
                    <VLUptakeByAge />
                </div>
            </div>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLUptakeByCounty />
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLUptakeByPartner />
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <div className="row">
                <div className="col-4">
                    <VLOutcomesOverall />
                </div>
                <div className="col-8">
                    <VLOutcomesBySex />
                </div>
            </div>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByAge />
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <div className="row">
                <div className="col-4">
                    <VLSuppressionByRegimen />
                </div>
                <div className="col-8">
                    <VLSuppressionByYear />
                </div>
            </div>
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByCounty />
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByPartner />
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByYear6Month />
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByYear12Month />
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLSuppressionByYear24Month />
            <p></p>
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
            <p></p><VLOverallUptakeAndSuppressionByFacility />
            <hr/><VLFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default VL;
