import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Loadable from 'react-loadable';

import { changeCtTab, changeCurrentPage } from "../../actions/Shared/uiActions";
import {
    enableFromDateFilter,
    disableFromDateFilter,
    enableToDateFilter,
    disableToDateFilter,
    enableGenderFilter,
    disableGenderFilter,
    enableDatimAgeGroupFilter,
    disableDatimAgeGroupFilter,
    enableLatestPregnancyFilter,
    disableLatestPregnancyFilter,
    enablePopulationTypeFilter,
    disablePopulationTypeFilter
} from "../../actions/Shared/filterActions";

import { loadLinkagePositiveTrends } from '../../actions/HTS/Linkage/linkagePositiveTrendsActions';

import { loadCurrentNewOnArtOverview } from '../../actions/CT/NewOnArt/currentNewOnArtOverviewActions';

import { loadNewOnArtOverview } from '../../actions/CT/NewOnArt/newOnArtOverviewActions';
import { loadNewOnArtTrends } from '../../actions/CT/NewOnArt/newOnArtTrendsActions';
import { loadNewOnArtByAgeSex } from '../../actions/CT/NewOnArt/newOnArtByAgeSexActions';
import { loadMedianTimeToArtStartByYear } from '../../actions/CT/NewOnArt/medianTimeToArtStartByYearActions';
import { loadMedianTimeToArtStartByCounty } from '../../actions/CT/NewOnArt/medianTimeToArtStartByCountyActions';
import { loadMedianTimeToArtStartByPartner } from '../../actions/CT/NewOnArt/medianTimeToArtStartByPartnerActions';
import { loadTimeFromDiagnosisToArtStart } from '../../actions/CT/NewOnArt/timeFromDiagnosisToArtStartActions';

import { loadCurrentOnArtOverview } from '../../actions/CT/CurrentOnArt/currentOnArtOverviewActions';
import { loadCurrentOnArtByAgeSex } from '../../actions/CT/CurrentOnArt/currentOnArtByAgeSexActions';
import { loadCurrentOnArtByCounty } from '../../actions/CT/CurrentOnArt/currentOnArtByCountyActions';
import { loadCurrentOnArtByPartner } from '../../actions/CT/CurrentOnArt/currentOnArtByPartnerActions';
import { loadCurrentOnArtDistributionByCounty } from '../../actions/CT/CurrentOnArt/currentOnArtDistributionByCountyActions';
import { loadCurrentOnArtDistributionByPartner } from '../../actions/CT/CurrentOnArt/currentOnArtDistributionByPartnerActions';

import { loadArtOptimizationOverview } from '../../actions/CT/ArtOptimization/artOptimizationOverviewActions';
import { loadArtOptimizationCurrentByRegimen } from '../../actions/CT/ArtOptimization/artOptimizationCurrentByRegimenActions';
import { loadArtOptimizationCurrentByAgeSex } from '../../actions/CT/ArtOptimization/artOptimizationCurrentByAgeSexActions';
import { loadArtOptimizationCurrentByCounty } from '../../actions/CT/ArtOptimization/artOptimizationCurrentByCountyActions';
import { loadArtOptimizationCurrentByPartner } from '../../actions/CT/ArtOptimization/artOptimizationCurrentByPartnerActions';
import { loadArtOptimizationNewByCounty } from '../../actions/CT/ArtOptimization/artOptimizationNewByCountyActions';
import { loadArtOptimizationNewByPartner } from '../../actions/CT/ArtOptimization/artOptimizationNewByPartnerActions';
import { loadArtOptimizationNewByYear } from '../../actions/CT/ArtOptimization/artOptimizationNewByYearActions';
import { loadRegimenDistributionByWeightBands } from '../../actions/CT/ArtOptimization/artOptimizationRegimenDistributionByWeightBandsActions';
import { loadRegimenDistributionByAgeBands } from '../../actions/CT/ArtOptimization/artOptimizationRegimenDistributionByAgeBandsActions';

import { loadAdverseEventsByAgeSex } from '../../actions/CT/AdverseEvents/adverseEventsByAgeSexActions';
import { loadAdverseEventsClientsByAgeSex } from '../../actions/CT/AdverseEvents/adverseEventsClientsByAgeSexActions';
import { loadAdverseEventsSeverityGrading } from '../../actions/CT/AdverseEvents/adverseEventsSeverityGradingActions';
import { loadAdverseEventsSeverityActions } from '../../actions/CT/AdverseEvents/adverseEventsSeverityActionsActions';
import { loadAdverseEventsReportedWithSeverityLevels } from '../../actions/CT/AdverseEvents/adverseEventsReportedWithSeverityLevelsActions';
import { loadAdverseEventsActionsByDrugs }  from '../../actions/CT/AdverseEvents/adverseEventsActionsByDrugsActions';
import { loadAdverseEventsActionsByDrugsNew }  from '../../actions/CT/AdverseEvents/adverseEventsActionsByDrugsNewActions';
import { loadAdverseEventsProportionOfPlHivWithAeByCausativeDrugs } from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPlHivWithAeByCausativeDrugsActions';
import { loadAdverseEventsProportionOfPlHivAeRelatedToArt } from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPlHivAeRelatedToArtActions';
import { loadAdverseEventsProportionOfPLHIVWithAeRegimenChanged } from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenChangedActions';

import { loadDsdStabilityStatusByAgeSex } from '../../actions/CT/Dsd/dsdStabilityStatusByAgeSexActions';
import { loadDsdStabilityStatusByCounty } from '../../actions/CT/Dsd/dsdStabilityStatusByCountyActions';
import { loadDsdStabilityStatusByPartner } from '../../actions/CT/Dsd/dsdStabilityStatusByPartnerActions';
import { loadDsdUnstable } from '../../actions/CT/Dsd/dsdUnstableActions';
import { loadDsdStableMmdModels } from '../../actions/CT/Dsd/dsdStableMmdModelsActions';
import { loadDsdAppointmentDurationByStabilityStatus } from '../../actions/CT/Dsd/dsdAppointmentDurationByStabilityStatusActions';
import { loadDsdAppointmentDurationBySex } from '../../actions/CT/Dsd/dsdAppointmentDurationBySexActions';
import { loadDsdAppointmentDurationByAge } from '../../actions/CT/Dsd/dsdAppointmentDurationByAgeActions';
import { loadDsdAppointmentDurationByCounty } from '../../actions/CT/Dsd/dsdAppointmentDurationByCountyActions';
import { loadDsdAppointmentDurationByPartner } from '../../actions/CT/Dsd/dsdAppointmentDurationByPartnerActions';
import { loadDsdUptakeOverall } from '../../actions/CT/Dsd/dsdUptakeOverallActions';
import { loadDsdStableOverall } from '../../actions/CT/Dsd/dsdStableOverallActions';
import { loadDsdUptakeOverallBySex } from '../../actions/CT/Dsd/dsdMmdUptakeOverallBySexActions';

import { loadViralLoadOverallUptakeSuppressionBySex } from '../../actions/CT/ViralLoad/viralLoadOverallUptakeSuppressionBySexActions';
import { loadMedianTimeTo1stVlByYear } from '../../actions/CT/ViralLoad/medianTimeTo1stVlByYearActions';
import { loadMedianTimeTo1stVlByCounty } from '../../actions/CT/ViralLoad/medianTimeTo1stVlByCountyActions';
import { loadMedianTimeTo1stVlByPartner } from '../../actions/CT/ViralLoad/medianTimeTo1stVlByPartnerActions';
import { loadViralLoadUptakeBySex } from '../../actions/CT/ViralLoad/viralLoadUptakeBySexActions';
import { loadViralLoadUptakeByAge } from '../../actions/CT/ViralLoad/viralLoadUptakeByAgeActions';
import { loadViralLoadUptakeByCounty } from '../../actions/CT/ViralLoad/viralLoadUptakeByCountyActions';
import { loadViralLoadUptakeByPartner } from '../../actions/CT/ViralLoad/viralLoadUptakeByPartnerActions';
import { loadViralLoadOutcomesBySex } from '../../actions/CT/ViralLoad/viralLoadOutcomesBySexActions';
import { loadViralLoadSuppressionByAge } from '../../actions/CT/ViralLoad/viralLoadSuppressionByAgeActions';
import { loadViralLoadSuppressionByYear } from '../../actions/CT/ViralLoad/viralLoadSuppressionByYearActions';
import { loadViralLoadSuppressionByRegimen } from '../../actions/CT/ViralLoad/viralLoadSuppressionByRegimenActions';
import { loadViralLoadOverallUptakeSuppressionByFacility } from '../../actions/CT/ViralLoad/viralLoadOverallUptakeSuppressionByFacilityActions';
import { loadViralLoadSuppressionByYearAndSuppressionCategory } from '../../actions/CT/ViralLoad/viralLoadSuppressionByYearAndSuppressionCategoryActions';

import { loadTreatmentOutcomesOverallLast12m } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesOverallLast12mActions';
import { loadTreatmentOutcomesBySex } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesBySexActions';
import { loadTreatmentOutcomesByPopulationType } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesByPopulationTypeActions';
import { loadTreatmentOutcomesByAge } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesByAgeActions';
import { loadTreatmentOutcomesByYear } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesByYearActions';
import { loadTreatmentOutcomesByFacility } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesByFacilityActions';
import { loadThreeMonthRetention } from '../../actions/CT/TreatmentOutcomes/threeMonthRetentionActions';
import { loadSixMonthRetention } from '../../actions/CT/TreatmentOutcomes/sixMonthRetentionActions';
import { loadTwelveMonthRetention } from '../../actions/CT/TreatmentOutcomes/twelveMonthRetentionActions';
import { loadTwentyFourMonthRetention } from '../../actions/CT/TreatmentOutcomes/twentyFourMonthRetentionActions';
import { loadTreatmentOutcomesUndocumentedByFacility } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesUndocumentedByFacilityActions';

import { loadAdverseEventsProportionOfPLHIVWithAeRegimenWasStopped } from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenWasStoppedActions';
import { loadAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered } from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenWasNotAlteredActions';
import { load6MonthSuppressionByYearOfArtStart } from '../../actions/CT/ViralLoad/viralLoad6MonthSuppressionByYearOfArtStartActions';
import { load12MonthSuppressionByYearOfArtStart } from '../../actions/CT/ViralLoad/viralLoad12MonthSuppressionByYearOfArtStartActions';
import { load24MonthSuppressionByYearOfArtStart } from '../../actions/CT/ViralLoad/viralLoad24MonthSuppressionByYearOfArtStartActions';
import { loadViralLoadOutcomesHvlByFacility } from '../../actions/CT/ViralLoad/viralLoadOutcomesHvlByFacilityActions';

import { loadOtzEnrollmentAmongAlhivOnArtBySex } from '../../actions/CT/OTZ/OtzEnrollmentAmongAlhivOnArtBySexActions';
import { loadOtzEnrollmentAmongAlhivOnArtByAge } from '../../actions/CT/OTZ/OtzEnrollmentAmongAlhivOnArtByAgeActions';
import { loadOtzEnrollmentAmongAlhivOnArtByCounty } from '../../actions/CT/OTZ/OtzEnrollmentAmongAlhivOnArtByCountyActions';
import { loadOtzEnrollmentAmongAlhivOnArtByPartner } from '../../actions/CT/OTZ/OtzEnrollmentAmongAlhivOnArtByPartnerActions';
import { loadOtzVlUptakeAmongAlHivEnrolledInOtzBySex } from '../../actions/CT/OTZ/OtzVlUptakeAmongAlHivEnrolledInOtzBySexActions';
import { loadOtzVlUptakeAmongAlHivEnrolledInOtzByAge } from '../../actions/CT/OTZ/OtzVlUptakeAmongAlHivEnrolledInOtzByAgeActions';
import { loadOtzVlUptakeAmongAlHivEnrolledInOtzByCounty } from '../../actions/CT/OTZ/OtzVlUptakeAmongAlHivEnrolledInOtzByCountyActions';
import { loadOtzVlUptakeAmongAlHivEnrolledInOtzByPartner } from '../../actions/CT/OTZ/OtzVlUptakeAmongAlHivEnrolledInOtzByPartnerActions';
import { loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTraining } from '../../actions/CT/OTZ/OtzProportionOfAlHivEnrolledInOtzWhoHaveCompletedOtzTrainingActions';
import { loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByCounty } from '../../actions/CT/OTZ/OtzProportionOfAlHivEnrolledInOtzWhoHaveCompletedOtzTrainingByCountyActions';
import { loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner } from '../../actions/CT/OTZ/OtzProportionOfAlHivEnrolledInOtzWhoHaveCompletedOtzTrainingByPartnerActions';
import { loadOtzOutcomesAmongAlHivWithBaselineVL } from '../../actions/CT/OTZ/OtzOutcomesAmongAlHivWithBaselineVLActions';
import { loadOtzOutcomesAmongAlHivWithReSuppression } from '../../actions/CT/OTZ/OtzOutcomesAmongAlHivWithReSuppressionActions';
import { loadOtzOutcomesByGender } from '../../actions/CT/OTZ/OtzOutcomesByGenderActions';
import { loadOtzOutcomesByPopulationType } from '../../actions/CT/OTZ/OtzOutcomesByPopulationTypeActions';
import { loadOtzOutcomesByYearOfArtStart } from '../../actions/CT/OTZ/OtzOutcomesByYearOfArtStartActions';
import { loadOtzOutcomesByCounty } from '../../actions/CT/OTZ/OtzOutcomesByCountyActions';
import { loadOtzOutcomesByPartner } from '../../actions/CT/OTZ/OtzOutcomesByPartnerActions';
import { loadOtzTotalAdolescents } from '../../actions/CT/OTZ/OtzTotalAdolescentsActions';
import { loadOtzEnrolled } from '../../actions/CT/OTZ/OtzEnrolledActions';
import { loadOtzTotalWithVLResults } from '../../actions/CT/OTZ/OtzTotalWithVlResultsActions';
import { loadOtzTotalWithVLResultsLessThan1000 } from '../../actions/CT/OTZ/OtzTotalWithWithResultsLessThan1000Actions';
import { loadOvcOverallServ } from '../../actions/CT/OVC/ovcOverallServActions';
import { loadOvcServBySex } from '../../actions/CT/OVC/ovcServByGenderActions';
import { loadOvcCareGiversRelationshipToOvcClient } from '../../actions/CT/OVC/ovcCareGiversRelationshipToOvcClientActions';
import { loadOvcProportionOfClientsCpimsOverall } from '../../actions/CT/OVC/ovcProportionOfClientsInCpimsOverallActions';
import { loadOvcProportionOfClientsCpimsByGender } from '../../actions/CT/OVC/ovcProportionOfClientsInCpimsByGenderActions';
import { loadOvcServDistributionByPartner } from '../../actions/CT/OVC/ovcServDistributionByPartnerActions';
import { loadOvcServDistributionByCounty } from '../../actions/CT/OVC/ovcServDistributionByCountyActions';
import { loadOvcClientsExitReasons } from '../../actions/CT/OVC/ovcClientsExitReasonsActions';
import { loadOvcViralSuppressionAmongOvcPatientsOverall } from '../../actions/CT/OVC/ovcViralSuppressionAmongOvcPatientsOverallActions';
import { loadOvcViralSuppressionAmongOvcPatientsByGender } from '../../actions/CT/OVC/ovcViralSuppressionAmongOvcPatientsByGenderActions';

import { CT_TABS, PAGES, LOADING_DELAY } from "../../constants";

import Loading from './../Shared/Loading';

const NewOnArt = Loadable({ loader: () => import('./NewOnArt/NewOnArt'), loading: Loading, delay: LOADING_DELAY });
const CurrentOnArt = Loadable({ loader: () => import('./CurrentOnArt/CurrentOnArt'), loading: Loading, delay: LOADING_DELAY });
const DSD = Loadable({ loader: () => import('./DSD/DSD'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomes = Loadable({ loader: () => import('./TreatmentOutcomes/TreatmentOutcomes'), loading: Loading, delay: LOADING_DELAY });
const ViralLoad = Loadable({ loader: () => import('./ViralLoad/ViralLoad'), loading: Loading, delay: LOADING_DELAY });
const AdverseEvents = Loadable({ loader: () => import('./AdverseEvents/AdverseEvents'), loading: Loading, delay: LOADING_DELAY });
const ArtOptimization = Loadable({ loader: () => import('./ArtOptimization/ArtOptimization'), loading: Loading, delay: LOADING_DELAY });
const OTZ = Loadable({ loader: () => import('./OTZ/OTZ'), loading: Loading, delay: LOADING_DELAY });
const OVC = Loadable({ loader: () => import('./OVC/OVC'), loading: Loading, delay: LOADING_DELAY });

const CT = () => {
    const dispatch = useDispatch();
    const ctTab = useSelector(state => state.ui.ctTab);
    const noCache = useSelector(state => state.filters.noCache);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);
    const genders = useSelector(state => state.filters.genders);
    const datimAgeGroups = useSelector(state => state.filters.datimAgeGroups);
    const latestPregnancies = useSelector(state => state.filters.latestPregnancies);
    const populationTypes = useSelector(state => state.filters.populationTypes);
    const fromDate = useSelector(state => state.filters.fromDate);
    const toDate = useSelector(state => state.filters.toDate);

    const renderTabNavItems = () => {
        return (
            Object.keys(CT_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={ctTab === value} onClick={() => {
                                dispatch(changeCtTab(value));
                            }} >
                            {CT_TABS[value]}
                        </NavLink>
                    </NavItem>
                );
            })
        );
    };

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.ct));
        return () => {
            dispatch(disableFromDateFilter());
            dispatch(disableToDateFilter());
        }
    }, [dispatch]);

    useEffect(() => {
        if (ctTab === 'txNew' || ctTab === 'tOut') {
            dispatch(enableFromDateFilter());
        } else {
            dispatch(disableFromDateFilter());
        }
        if (ctTab === 'tOut') {
            dispatch(enableToDateFilter());
        } else {
            dispatch(disableToDateFilter());
        }
        if (ctTab === 'txOpt') {
            dispatch(enableGenderFilter());
            dispatch(enableDatimAgeGroupFilter());
            dispatch(enableLatestPregnancyFilter());
            dispatch(enablePopulationTypeFilter());
        } else {
            dispatch(disableGenderFilter());
            dispatch(disableDatimAgeGroupFilter());
            dispatch(disableLatestPregnancyFilter());
            dispatch(disablePopulationTypeFilter());
        }
    }, [dispatch, ctTab]);

    useEffect(() => {
        switch (ctTab) {
            case 'txNew':
                dispatch(loadLinkagePositiveTrends());
                dispatch(loadCurrentNewOnArtOverview());
                dispatch(loadNewOnArtOverview());
                dispatch(loadNewOnArtTrends());
                dispatch(loadNewOnArtByAgeSex());
                dispatch(loadMedianTimeToArtStartByYear());
                dispatch(loadMedianTimeToArtStartByCounty());
                dispatch(loadMedianTimeToArtStartByPartner());
                dispatch(loadTimeFromDiagnosisToArtStart());
                break;
            case 'txCurr':
                dispatch(loadCurrentOnArtOverview());
                dispatch(loadCurrentOnArtByAgeSex());
                dispatch(loadCurrentOnArtByCounty());
                dispatch(loadCurrentOnArtByPartner());
                dispatch(loadCurrentOnArtDistributionByCounty());
                dispatch(loadCurrentOnArtDistributionByPartner());
                break;
            case 'txOpt':
                dispatch(loadCurrentOnArtByAgeSex());
                dispatch(loadCurrentOnArtByCounty());
                dispatch(loadCurrentOnArtByPartner());
                dispatch(loadArtOptimizationOverview());
                dispatch(loadArtOptimizationCurrentByRegimen());
                dispatch(loadArtOptimizationCurrentByAgeSex());
                dispatch(loadArtOptimizationCurrentByCounty());
                dispatch(loadArtOptimizationCurrentByPartner());
                dispatch(loadArtOptimizationNewByCounty());
                dispatch(loadArtOptimizationNewByPartner());
                dispatch(loadArtOptimizationNewByYear());
                dispatch(loadRegimenDistributionByWeightBands());
                dispatch(loadRegimenDistributionByAgeBands());
                break;
            case 'advEv':
                dispatch(loadCurrentOnArtByAgeSex());
                dispatch(loadAdverseEventsByAgeSex());
                dispatch(loadAdverseEventsClientsByAgeSex());
                dispatch(loadAdverseEventsSeverityGrading());
                dispatch(loadAdverseEventsSeverityActions());
                dispatch(loadAdverseEventsReportedWithSeverityLevels());
                dispatch(loadAdverseEventsActionsByDrugs());
                dispatch(loadAdverseEventsActionsByDrugsNew());
                dispatch(loadAdverseEventsProportionOfPlHivWithAeByCausativeDrugs());
                dispatch(loadAdverseEventsProportionOfPlHivAeRelatedToArt());
                dispatch(loadAdverseEventsProportionOfPLHIVWithAeRegimenChanged());
                dispatch(loadAdverseEventsProportionOfPLHIVWithAeRegimenWasStopped());
                dispatch(loadAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered());
                break;
            case 'dsd':
                dispatch(loadCurrentOnArtOverview());
                dispatch(loadDsdStabilityStatusByAgeSex());
                dispatch(loadDsdStabilityStatusByCounty());
                dispatch(loadDsdStabilityStatusByPartner());
                dispatch(loadDsdUnstable());
                dispatch(loadDsdStableMmdModels());
                dispatch(loadDsdAppointmentDurationByStabilityStatus());
                dispatch(loadDsdAppointmentDurationBySex());
                dispatch(loadDsdAppointmentDurationByAge());
                dispatch(loadDsdAppointmentDurationByCounty());
                dispatch(loadDsdAppointmentDurationByPartner());
                dispatch(loadDsdUptakeOverall());
                dispatch(loadDsdStableOverall());
                dispatch(loadDsdUptakeOverallBySex());
                dispatch(loadCurrentOnArtByCounty());
                dispatch(loadCurrentOnArtByPartner());
                dispatch(loadCurrentOnArtDistributionByCounty());
                dispatch(loadCurrentOnArtDistributionByPartner());
                dispatch(loadCurrentOnArtByAgeSex());
                break;
            case 'vl':
                dispatch(loadCurrentOnArtOverview());
                dispatch(loadViralLoadOverallUptakeSuppressionBySex());
                dispatch(loadMedianTimeTo1stVlByYear());
                dispatch(loadMedianTimeTo1stVlByCounty());
                dispatch(loadMedianTimeTo1stVlByPartner());
                dispatch(loadViralLoadUptakeBySex());
                dispatch(loadViralLoadUptakeByAge());
                dispatch(loadViralLoadUptakeByCounty());
                dispatch(loadViralLoadUptakeByPartner());
                dispatch(loadViralLoadOutcomesBySex());
                dispatch(loadViralLoadSuppressionByAge());
                dispatch(loadViralLoadSuppressionByYear());
                dispatch(loadViralLoadSuppressionByRegimen());
                dispatch(loadViralLoadSuppressionByYearAndSuppressionCategory());
                dispatch(loadViralLoadOverallUptakeSuppressionByFacility());
                dispatch(load6MonthSuppressionByYearOfArtStart());
                dispatch(load12MonthSuppressionByYearOfArtStart());
                dispatch(load24MonthSuppressionByYearOfArtStart());
                dispatch(loadViralLoadOutcomesHvlByFacility());
                break;
            case 'tOut':
                dispatch(loadNewOnArtOverview());
                dispatch(loadTreatmentOutcomesOverallLast12m());
                dispatch(loadNewOnArtTrends());
                dispatch(loadTreatmentOutcomesBySex());
                dispatch(loadTreatmentOutcomesByPopulationType());
                dispatch(loadTreatmentOutcomesByAge());
                dispatch(loadTreatmentOutcomesByYear());
                dispatch(loadTreatmentOutcomesByFacility());
                dispatch(loadThreeMonthRetention());
                dispatch(loadSixMonthRetention());
                dispatch(loadTwelveMonthRetention());
                dispatch(loadTwentyFourMonthRetention());
                dispatch(loadTreatmentOutcomesUndocumentedByFacility());
                break;
            case 'otz':
                dispatch(loadOtzEnrollmentAmongAlhivOnArtBySex());
                dispatch(loadOtzEnrollmentAmongAlhivOnArtByAge());
                dispatch(loadOtzEnrollmentAmongAlhivOnArtByCounty());
                dispatch(loadOtzEnrollmentAmongAlhivOnArtByPartner());
                dispatch(loadOtzVlUptakeAmongAlHivEnrolledInOtzBySex());
                dispatch(loadOtzVlUptakeAmongAlHivEnrolledInOtzByAge());
                dispatch(loadOtzVlUptakeAmongAlHivEnrolledInOtzByCounty());
                dispatch(loadOtzVlUptakeAmongAlHivEnrolledInOtzByPartner());
                dispatch(loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTraining());
                dispatch(loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByCounty());
                dispatch(loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner());
                dispatch(loadOtzOutcomesAmongAlHivWithBaselineVL());
                dispatch(loadOtzOutcomesAmongAlHivWithReSuppression());
                dispatch(loadOtzOutcomesByGender());
                dispatch(loadOtzOutcomesByPopulationType());
                dispatch(loadOtzOutcomesByYearOfArtStart());
                dispatch(loadOtzOutcomesByCounty());
                dispatch(loadOtzOutcomesByPartner());
                dispatch(loadOtzTotalAdolescents());
                dispatch(loadOtzEnrolled());
                dispatch(loadOtzTotalWithVLResults());
                dispatch(loadOtzTotalWithVLResultsLessThan1000());
                break;
            case 'ovc':
                dispatch(loadOvcOverallServ());
                dispatch(loadOvcServBySex());
                dispatch(loadOvcCareGiversRelationshipToOvcClient());
                dispatch(loadOvcProportionOfClientsCpimsOverall());
                dispatch(loadOvcProportionOfClientsCpimsByGender());
                dispatch(loadOvcServDistributionByCounty());
                dispatch(loadOvcServDistributionByPartner());
                dispatch(loadOvcClientsExitReasons());
                dispatch(loadOvcViralSuppressionAmongOvcPatientsOverall());
                dispatch(loadOvcViralSuppressionAmongOvcPatientsByGender());
                break;
            default:
                break;
        }
    }, [
        dispatch,
        counties,
        subCounties,
        facilities,
        partners,
        agencies,
        projects,
        fromDate,
        toDate,
        genders,
        datimAgeGroups,
        latestPregnancies,
        populationTypes,
        ctTab,
        noCache
    ]);

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={ctTab}>
                <TabPane tabId="txNew">
                    { ctTab === 'txNew' ? <NewOnArt/>: null }
                </TabPane>
                <TabPane tabId="txCurr">
                    { ctTab === 'txCurr' ? <CurrentOnArt/>: null }
                </TabPane>
                <TabPane tabId="txOpt">
                    { ctTab === 'txOpt' ? <ArtOptimization/>: null }
                </TabPane>
                <TabPane tabId="advEv">
                    { ctTab === 'advEv' ? <AdverseEvents/>: null }
                </TabPane>
                <TabPane tabId="dsd">
                    { ctTab === 'dsd' ? <DSD/>: null }
                </TabPane>
                <TabPane tabId="vl">
                    { ctTab === 'vl' ? <ViralLoad/>: null }
                </TabPane>
                <TabPane tabId="tOut">
                    { ctTab === 'tOut' ? <TreatmentOutcomes/>: null }
                </TabPane>
                <TabPane tabId={"otz"}>
                    { ctTab === 'otz' ? <OTZ /> : null }
                </TabPane>
                <TabPane tabId={"ovc"}>
                    { ctTab === 'ovc'? <OVC /> : null }
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );
};

export default CT;
