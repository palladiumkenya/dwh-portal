import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Loadable from 'react-loadable';

import { changeCtTab, changeCurrentPage } from '../../actions/Shared/uiActions';
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
    disablePopulationTypeFilter,
    enableAgencyFilter,
    enableDatimAgePopulationFilter,
    disableDatimAgePopulationFilter
} from '../../actions/Shared/filterActions';

import { loadLinkagePositiveTrends } from '../../actions/HTS/Linkage/linkagePositiveTrendsActions';

import { loadCurrentNewOnArtOverview } from '../../actions/CT/NewOnArt/currentNewOnArtOverviewActions';

import { loadNewOnArtOverview } from '../../actions/CT/NewOnArt/newOnArtOverviewActions';
import { loadNewOnArtTrends } from '../../actions/CT/NewOnArt/newOnArtTrendsActions';
import { loadNewOnArtByAgeSex } from '../../actions/CT/NewOnArt/newOnArtByAgeSexActions';
import { loadMedianTimeToArtStartByYear } from '../../actions/CT/NewOnArt/medianTimeToArtStartByYearActions';
import { loadMedianTimeToArtStartByCounty } from '../../actions/CT/NewOnArt/medianTimeToArtStartByCountyActions';
import { loadMedianTimeToArtStartByPartner } from '../../actions/CT/NewOnArt/medianTimeToArtStartByPartnerActions';
import { loadTimeFromDiagnosisToArtStart } from '../../actions/CT/NewOnArt/timeFromDiagnosisToArtStartActions';
import { loadMissingDiagnosisDateByFacility } from '../../actions/CT/NewOnArt/missingDiagnosisDateByFacilityActions';

import { loadCurrentOnArtOverview } from '../../actions/CT/CurrentOnArt/currentOnArtOverviewActions';
import { loadCurrentOnArtByAgeSex } from '../../actions/CT/CurrentOnArt/currentOnArtByAgeSexActions';
import { loadCurrentOnArtByCounty } from '../../actions/CT/CurrentOnArt/currentOnArtByCountyActions';
import { loadCurrentOnArtByPartner } from '../../actions/CT/CurrentOnArt/currentOnArtByPartnerActions';
import {
    loadCurrentOnArtDistributionByCounty
} from '../../actions/CT/CurrentOnArt/currentOnArtDistributionByCountyActions';
import {
    loadCurrentOnArtDistributionByPartner
} from '../../actions/CT/CurrentOnArt/currentOnArtDistributionByPartnerActions';

import { loadArtOptimizationOverview } from '../../actions/CT/ArtOptimization/artOptimizationOverviewActions';
import {
    loadArtOptimizationCurrentByRegimen
} from '../../actions/CT/ArtOptimization/artOptimizationCurrentByRegimenActions';
import {
    loadArtOptimizationCurrentByAgeSex
} from '../../actions/CT/ArtOptimization/artOptimizationCurrentByAgeSexActions';
import {
    loadArtOptimizationCurrentByCounty
} from '../../actions/CT/ArtOptimization/artOptimizationCurrentByCountyActions';
import {
    loadArtOptimizationCurrentByPartner
} from '../../actions/CT/ArtOptimization/artOptimizationCurrentByPartnerActions';
import { loadArtOptimizationNewByCounty } from '../../actions/CT/ArtOptimization/artOptimizationNewByCountyActions';
import { loadArtOptimizationNewByPartner } from '../../actions/CT/ArtOptimization/artOptimizationNewByPartnerActions';
import { loadArtOptimizationNewByYear } from '../../actions/CT/ArtOptimization/artOptimizationNewByYearActions';
import {
    loadRegimenDistributionByWeightBands
} from '../../actions/CT/ArtOptimization/artOptimizationRegimenDistributionByWeightBandsActions';
import {
    loadRegimenDistributionByAgeBands
} from '../../actions/CT/ArtOptimization/artOptimizationRegimenDistributionByAgeBandsActions';

import { loadAdverseEventsByAgeSex } from '../../actions/CT/AdverseEvents/adverseEventsByAgeSexActions';
import { loadAdverseEventsClientsByAgeSex } from '../../actions/CT/AdverseEvents/adverseEventsClientsByAgeSexActions';
import { loadAdverseEventsSeverityGrading } from '../../actions/CT/AdverseEvents/adverseEventsSeverityGradingActions';
import { loadAdverseEventsSeverityActions } from '../../actions/CT/AdverseEvents/adverseEventsSeverityActionsActions';
import {
    loadAdverseEventsReportedWithSeverityLevels
} from '../../actions/CT/AdverseEvents/adverseEventsReportedWithSeverityLevelsActions';
import { loadAdverseEventsActionsByDrugs } from '../../actions/CT/AdverseEvents/adverseEventsActionsByDrugsActions';
import {
    loadAdverseEventsActionsByDrugsNew
} from '../../actions/CT/AdverseEvents/adverseEventsActionsByDrugsNewActions';
import {
    loadAdverseEventsProportionOfPlHivWithAeByCausativeDrugs
} from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPlHivWithAeByCausativeDrugsActions';
import {
    loadAdverseEventsProportionOfPlHivAeRelatedToArt
} from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPlHivAeRelatedToArtActions';
import {
    loadAdverseEventsProportionOfPLHIVWithAeRegimenChanged
} from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenChangedActions';

import { loadDsdStabilityStatusByAgeSex } from '../../actions/CT/Dsd/dsdStabilityStatusByAgeSexActions';
import { loadDsdStabilityStatusByCounty } from '../../actions/CT/Dsd/dsdStabilityStatusByCountyActions';
import { loadDsdStabilityStatusByPartner } from '../../actions/CT/Dsd/dsdStabilityStatusByPartnerActions';
import { loadDsdUnstable } from '../../actions/CT/Dsd/dsdUnstableActions';
import { loadDsdStableMmdModels } from '../../actions/CT/Dsd/dsdStableMmdModelsActions';
import {
    loadDsdAppointmentDurationByStabilityStatus
} from '../../actions/CT/Dsd/dsdAppointmentDurationByStabilityStatusActions';
import { loadDsdAppointmentDurationBySex } from '../../actions/CT/Dsd/dsdAppointmentDurationBySexActions';
import { loadDsdAppointmentDurationByAge } from '../../actions/CT/Dsd/dsdAppointmentDurationByAgeActions';
import { loadDsdAppointmentDurationByCounty } from '../../actions/CT/Dsd/dsdAppointmentDurationByCountyActions';
import { loadDsdAppointmentDurationByPartner } from '../../actions/CT/Dsd/dsdAppointmentDurationByPartnerActions';
import { loadDsdUptakeOverall } from '../../actions/CT/Dsd/dsdUptakeOverallActions';
import { loadDsdStableOverall } from '../../actions/CT/Dsd/dsdStableOverallActions';
import { loadDsdUptakeOverallBySex } from '../../actions/CT/Dsd/dsdMmdUptakeOverallBySexActions';

import {
    loadViralLoadOverallUptakeSuppressionBySex
} from '../../actions/CT/ViralLoad/viralLoadOverallUptakeSuppressionBySexActions';
import { loadMedianTimeTo1stVlByYear } from '../../actions/CT/ViralLoad/medianTimeTo1stVlByYearActions';
import { loadMedianTimeTo1stVlByCounty } from '../../actions/CT/ViralLoad/medianTimeTo1stVlByCountyActions';
import { loadMedianTimeTo1stVlByPartner } from '../../actions/CT/ViralLoad/medianTimeTo1stVlByPartnerActions';
import { loadViralLoadUptakeBySex } from '../../actions/CT/ViralLoad/viralLoadUptakeBySexActions';
import { loadViralLoadOverallUptakeSuppressionLessIntense } from '../../actions/CT/ViralLoad/viralLoadOverallUptakeSuppressionReferredLessIntenseActions';
import { loadViralLoadOverallUptakeSuppressionBySexVlDone } from '../../actions/CT/ViralLoad/viralLoadOverallUptakeSuppressionBySexVlDoneActions';
import { loadViralLoadUptakeByAge } from '../../actions/CT/ViralLoad/viralLoadUptakeByAgeActions';
import { loadViralLoadUptakeByCounty } from '../../actions/CT/ViralLoad/viralLoadUptakeByCountyActions';
import { loadViralLoadUptakeByPartner } from '../../actions/CT/ViralLoad/viralLoadUptakeByPartnerActions';
import { loadViralLoadOutcomesBySex } from '../../actions/CT/ViralLoad/viralLoadOutcomesBySexActions';
import { loadViralLoadSuppressionByAge } from '../../actions/CT/ViralLoad/viralLoadSuppressionByAgeActions';
import { loadViralLoadSuppressionByYear } from '../../actions/CT/ViralLoad/viralLoadSuppressionByYearActions';
import { loadViralLoadSuppressionByRegimen } from '../../actions/CT/ViralLoad/viralLoadSuppressionByRegimenActions';
import {
    loadViralLoadOverallUptakeSuppressionByFacility
} from '../../actions/CT/ViralLoad/viralLoadOverallUptakeSuppressionByFacilityActions';
import {
    loadViralLoadSuppressionByYearAndSuppressionCategory
} from '../../actions/CT/ViralLoad/viralLoadSuppressionByYearAndSuppressionCategoryActions';

import {
    loadTreatmentOutcomesOverallLast12m
} from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesOverallLast12mActions';
import { loadTreatmentOutcomesBySex } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesBySexActions';
import {
    loadTreatmentOutcomesByPopulationType
} from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesByPopulationTypeActions';
import { loadTreatmentOutcomesByAge } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesByAgeActions';
import { loadTreatmentOutcomesByYear } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesByYearActions';
import { loadTreatmentOutcomesByFacility } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesByFacilityActions';
import { loadThreeMonthRetention } from '../../actions/CT/TreatmentOutcomes/threeMonthRetentionActions';
import { loadSixMonthRetention } from '../../actions/CT/TreatmentOutcomes/sixMonthRetentionActions';
import { loadTwelveMonthRetention } from '../../actions/CT/TreatmentOutcomes/twelveMonthRetentionActions';
import { loadTwentyFourMonthRetention } from '../../actions/CT/TreatmentOutcomes/twentyFourMonthRetentionActions';
import {
    loadTreatmentOutcomesUndocumentedByFacility
} from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesUndocumentedByFacilityActions';

import {
    loadAdverseEventsProportionOfPLHIVWithAeRegimenWasStopped
} from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenWasStoppedActions';
import {
    loadAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered
} from '../../actions/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenWasNotAlteredActions';
import {
    load6MonthSuppressionByYearOfArtStart
} from '../../actions/CT/ViralLoad/viralLoad6MonthSuppressionByYearOfArtStartActions';
import {
    load12MonthSuppressionByYearOfArtStart
} from '../../actions/CT/ViralLoad/viralLoad12MonthSuppressionByYearOfArtStartActions';
import {
    load24MonthSuppressionByYearOfArtStart
} from '../../actions/CT/ViralLoad/viralLoad24MonthSuppressionByYearOfArtStartActions';
import { loadViralLoadOutcomesHvlByFacility } from '../../actions/CT/ViralLoad/viralLoadOutcomesHvlByFacilityActions';

import { loadOtzEnrollmentAmongAlhivOnArtBySex } from '../../actions/CT/OTZ/OtzEnrollmentAmongAlhivOnArtBySexActions';
import { loadOtzEnrollmentAmongAlhivOnArtByAge } from '../../actions/CT/OTZ/OtzEnrollmentAmongAlhivOnArtByAgeActions';
import {
    loadOtzEnrollmentAmongAlhivOnArtByCounty
} from '../../actions/CT/OTZ/OtzEnrollmentAmongAlhivOnArtByCountyActions';
import {
    loadOtzEnrollmentAmongAlhivOnArtByPartner
} from '../../actions/CT/OTZ/OtzEnrollmentAmongAlhivOnArtByPartnerActions';
import {
    loadOtzVlUptakeAmongAlHivEnrolledInOtzBySex
} from '../../actions/CT/OTZ/OtzVlUptakeAmongAlHivEnrolledInOtzBySexActions';
import {
    loadOtzVlUptakeAmongAlHivEnrolledInOtzByAge
} from '../../actions/CT/OTZ/OtzVlUptakeAmongAlHivEnrolledInOtzByAgeActions';
import {
    loadOtzVlUptakeAmongAlHivEnrolledInOtzByCounty
} from '../../actions/CT/OTZ/OtzVlUptakeAmongAlHivEnrolledInOtzByCountyActions';
import {
    loadOtzVlUptakeAmongAlHivEnrolledInOtzByPartner
} from '../../actions/CT/OTZ/OtzVlUptakeAmongAlHivEnrolledInOtzByPartnerActions';
import {
    loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTraining
} from '../../actions/CT/OTZ/OtzProportionOfAlHivEnrolledInOtzWhoHaveCompletedOtzTrainingActions';
import {
    loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByCounty
} from '../../actions/CT/OTZ/OtzProportionOfAlHivEnrolledInOtzWhoHaveCompletedOtzTrainingByCountyActions';
import {
    loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner
} from '../../actions/CT/OTZ/OtzProportionOfAlHivEnrolledInOtzWhoHaveCompletedOtzTrainingByPartnerActions';
import {
    loadOtzOutcomesAmongAlHivWithBaselineVL
} from '../../actions/CT/OTZ/OtzOutcomesAmongAlHivWithBaselineVLActions';
import {
    loadOtzOutcomesAmongAlHivWithReSuppression
} from '../../actions/CT/OTZ/OtzOutcomesAmongAlHivWithReSuppressionActions';
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
import {
    loadOvcCareGiversRelationshipToOvcClient
} from '../../actions/CT/OVC/ovcCareGiversRelationshipToOvcClientActions';
import {
    loadOvcProportionOfClientsCpimsOverall
} from '../../actions/CT/OVC/ovcProportionOfClientsInCpimsOverallActions';
import {
    loadOvcProportionOfClientsCpimsByGender
} from '../../actions/CT/OVC/ovcProportionOfClientsInCpimsByGenderActions';
import { loadOvcServDistributionByPartner } from '../../actions/CT/OVC/ovcServDistributionByPartnerActions';
import { loadOvcServDistributionByCounty } from '../../actions/CT/OVC/ovcServDistributionByCountyActions';
import { loadOvcClientsExitReasons } from '../../actions/CT/OVC/ovcClientsExitReasonsActions';
import {
    loadOvcViralSuppressionAmongOvcPatientsOverall
} from '../../actions/CT/OVC/ovcViralSuppressionAmongOvcPatientsOverallActions';
import {
    loadOvcViralSuppressionAmongOvcPatientsByGender
} from '../../actions/CT/OVC/ovcViralSuppressionAmongOvcPatientsByGenderActions';
import { loadTreatmentOutcomesNetCohort } from '../../actions/CT/TreatmentOutcomes/treatmentOutcomesNetCohortActions';
import { loadOtzEnrolledAdolescentsByAgeGroup } from '../../actions/CT/OTZ/otzEnrolledAdolescentsByAgeGroupActions';
import { loadOtzEnrolledAdolescentsByCounty } from '../../actions/CT/OTZ/OtzEnrolledAdolescentsByCountyActions';
import { loadOtzEnrolledAdolescentsByPartner } from '../../actions/CT/OTZ/OtzEnrolledAdolescentsByPartnerActions';
import {
    loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingBySex
} from '../../actions/CT/OTZ/OtzProportionOfAlHivWhoHaveCompletedOtzTrainingBySexActions';
import { loadOtzOutcomesByAgeGroup } from '../../actions/CT/OTZ/OtzOutcomesByAgeGroupActions';
import { loadOtzVlSuppressionBySex } from '../../actions/CT/OTZ/OtzVlSuppressionBySexActions';
import { loadOtzVlSuppressionByAge } from '../../actions/CT/OTZ/OtzVlSuppressionByAgeActions';
import { loadOtzVlSuppressionByCounty } from '../../actions/CT/OTZ/OtzVlSuppressionByCountyActions';
import { loadOtzVlSuppressionByPartner } from '../../actions/CT/OTZ/OtzVlSuppressionByPartnerActions';

import { loadCovidAdultPLHIVCurrentOnTreatment } from '../../actions/CT/Covid/covidAdultPLHIVCurrentOnTreatmentActions';
import {
    loadCovidAdultPLHIVPartiallyVaccinated
} from '../../actions/CT/Covid/covidAdultPLHIVPartiallyVaccinatedActions';
import { loadCovidAdultPLHIVFullyVaccinated } from '../../actions/CT/Covid/covidAdultPLHIVFullyVaccinatedActions';
import {
    loadCovidAdultPLHIVVaccinatedByAgeGroup
} from '../../actions/CT/Covid/covidAdultPLHIVVaccinatedByAgeGroupActions';
import { loadCovidAdultPLHIVVaccinatedByGender } from '../../actions/CT/Covid/covidAdultPLHIVVaccinatedByGenderActions';
import { loadCovidAdultPLHIVVaccinatedByCounty } from '../../actions/CT/Covid/covidAdultPLHIVVaccinatedByCountyActions';
import {
    loadCovidAdultPLHIVVaccinatedByPartner
} from '../../actions/CT/Covid/covidAdultPLHIVVaccinatedByPartnerActions';
import {
    loadCovidAdultPLHIVCurrentOnTreatmentByGender
} from '../../actions/CT/Covid/covidAdultPLHIVCurrentOnTreatmentByGenderActions';
import {
    loadCovidAdultPLHIVCurrentOnTreatmentByPartner
} from '../../actions/CT/Covid/covidAdultPLHIVCurrentOnTreatmentByPartnerActions';
import {
    loadCovidAdultPLHIVCurrentOnTreatmentByCounty
} from '../../actions/CT/Covid/covidAdultPLHIVCurrentOnTreatmentByCountyActions';
import {
    loadCovidAdultPLHIVCurrentOnTreatmentByAgeGroup
} from '../../actions/CT/Covid/covidAdultPLHIVCurrentOnTreatmentByAgeGroupActions';
import { loadCovidPLHIVCurrentOnArt } from '../../actions/CT/Covid/covidPLHIVCurrentOnArtActions';
import { loadCovidSeverityByGender } from '../../actions/CT/Covid/covidSeverityByGenderActions';
import { loadCovidOverallAdmission } from '../../actions/CT/Covid/covidAdmissionOverallActions';
import { loadCovidOverallAdmissionMales } from '../../actions/CT/Covid/covidAdmissionOverallMaleActions';
import { loadCovidOverallAdmissionFemales } from '../../actions/CT/Covid/covidAdmissionOverallFemaleActions';
import { loadCovidEverHadInfection } from '../../actions/CT/Covid/covidEverHadInfectionActions';
import { loadCovidSymptomaticInfections } from '../../actions/CT/Covid/covidSymptomaticInfectionsActions';
import { loadCovidOverallMissedAppointment } from '../../actions/CT/Covid/covidOverallMissedAppointmentsActions';
import {
    loadCovidPercentageWhoMissedAppointmentsByAgeGroup
} from '../../actions/CT/Covid/covidPercentageWhoMissedAppointmentsByAgeGroupActions';
import {
    loadCovidPercentageWhoMissedAppointmentsByCounty
} from '../../actions/CT/Covid/covidPercentageWhoMissedAppointmentsByCountyActions';
import {
    loadCovidPercentageWhoMissedAppointmentsByPartner
} from '../../actions/CT/Covid/covidPercentageWhoMissedAppointmentsByPartnerActions';
import {
    loadCovidCumulativeWhoReceivedAtLeastOneDose
} from '../../actions/CT/Covid/covidCumulativeWhoReceivedAtLeastOneDoseActions';
import {
    loadCovidTrendsPLHIVVaccinationInTheLast12Months
} from '../../actions/CT/Covid/covidTrendsPLHIVVaccinationInTheLast12MonthsActions';

import { loadOvcOverallCalHIV } from '../../actions/CT/OVC/ovcOverallCalHIVActions';
import { loadOvcCalHIVByGender } from '../../actions/CT/OVC/ovcCALHIVByGenderActions';
import { loadOvcDistributionOfCALHIVByAgeSex } from '../../actions/CT/OVC/ovcDistributionOfCALHIVByAgeSexActions';
import { loadOvcDistributionOfPatientsByAgeSex } from '../../actions/CT/OVC/ovcDistributionOfPatientsByAgeSexActions';
import { loadCalHIVCurrentOnArt } from '../../actions/CT/OVC/CALHIVCurrentOnARTActions';
import { loadOvcCurrentOnArt } from '../../actions/CT/OVC/ovcCurrentOnArtActions';
import { loadOvcTotalOnTld } from '../../actions/CT/OVC/ovcTotalOnTldActions';
import { loadCALHIVTotalOnMMD } from '../../actions/CT/OVC/CALHIVTotalOnMMDActions';
import { loadOvcTotalOnMMD } from '../../actions/CT/OVC/ovcTotalOnMMDActions';
import { loadCalHIVIIT } from '../../actions/CT/OVC/CALHIVIITActions';
import { loadCalHIVDEAD } from '../../actions/CT/OVC/CALHIVDEADActions';
import { loadOVCIIT } from '../../actions/CT/OVC/ovcIITActions';
import { loadOVCDEAD } from '../../actions/CT/OVC/ovcDEADActions';
import { loadCalHIVEligibleVL } from '../../actions/CT/OVC/CALHIVEligibleVLActions';
import { loadCalHIVVLDone } from '../../actions/CT/OVC/CALHIVVLDoneActions';
import { loadCalHIVVLSuppressed } from '../../actions/CT/OVC/CALHIVVLSuppressedActions';
import { loadOVCEligibleVL } from '../../actions/CT/OVC/ovcEligibleVLActions';
import { loadOVCVLDone } from '../../actions/CT/OVC/ovcVLDoneActions';
import { loadOVCVLSuppressed } from '../../actions/CT/OVC/ovcVLSuppressedActions';
import { loadCovidNumberScreened } from '../../actions/CT/Covid/covidNumberScreenedActions';
import {
    loadCovidCumulativeWithMissingDateGivenFirstDose
} from '../../actions/CT/Covid/covidCumulativeWithMissingDateGivenFirstDoseActions';
import { loadCovidAdmissionSymptomaticByAge } from '../../actions/CT/Covid/covidAdmissionSymptomaticByAgeActions';
import { loadCovidManagementAdmitted } from '../../actions/CT/Covid/covidManagementAdmittedActions';

import { CT_TABS, PAGES, LOADING_DELAY } from '../../constants';

import Loading from './../Shared/Loading';
import { loadCalHIVOnDTG } from '../../actions/CT/OVC/CALHIVOnDTGActions';
import { useHistory, useParams } from 'react-router-dom';
import { loadCalHIVCurrentOnArtNotInOvc } from '../../actions/CT/OVC/CALHIVCurrentOnARTNotInOvcActions';
import { loadViralLoadOverallUptakeGt1000Copies } from '../../actions/CT/ViralLoad/viralLoadOverallUptakeGt1000Copies';
import { loadViralLoadOverallUptakeGt1000CopiesEac } from '../../actions/CT/ViralLoad/viralLoadOverallUptakeGt1000CopiesEac';
import {
    loadViralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll
} from '../../actions/CT/ViralLoad/viralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll';
import {
    loadViralLoadOverallUptakeGt1000CopiesReceivedFollowTests
} from '../../actions/CT/ViralLoad/viralLoadOverallUptakeGt1000CopiesReceivedFollowTests';
import {
    loadViralLoadOverallNumberGt1000CopiesSecondlineRegiment
} from '../../actions/CT/ViralLoad/viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment';
import { loadCurrentOnArtVerified } from './../../actions/CT/CurrentOnArt/currentOnArtVerifiedActions';
import { loadCurrentOnArtVerifiedByPartner } from './../../actions/CT/CurrentOnArt/currentOnArtVerifiedByPartnerActions';
import { loadCurrentOnArtVerifiedByCounty } from './../../actions/CT/CurrentOnArt/currentOnArtVerifiedByCountyActions';
import { loadCurrentOnArtVerifiedByAgeSex } from './../../actions/CT/CurrentOnArt/currentOnArtVerifiedByAgeSexActions';
import { loadOtzEnrollmentTrend } from '../../actions/CT/OTZ/OtzEnrollmentTrendsActions';
import { loadOtzEnrollmentByAgeSex } from '../../actions/CT/OTZ/OtzEnrollmentByAgeSexActions';
import { loadOtzNotEnrolledPartner } from '../../actions/CT/OTZ/OtzNotEnrolledByPartnerActions';
import { loadOtzNotEnrolledCounty } from './../../actions/CT/OTZ/OtzNotEnrolledByCountyActions';
import { loadAlHivWithReSuppression } from '../../actions/CT/OTZ/AlHivWithReSuppressionActions';
import { loadOtzVlSuppressionByAgeNotEnrolled } from '../../actions/CT/OTZ/OtzVlSuppressionByAgeNotEnrolledActions';
import { loadOtzVlSuppressionBySexNotEnrolled } from '../../actions/CT/OTZ/OtzVlSuppressionBySexNotEnrolledActions';
import { loadOtzVlSuppressionByPartnerNotEnrolled } from '../../actions/CT/OTZ/OtzVlSuppressionByPartnerNotEnrolledActions';
import { loadOtzVlSuppressionByCountyNotEnrolled } from '../../actions/CT/OTZ/OtzVlSuppressionByCountyNotEnrolledActions';
import { loadCurrentOnArtVerifiedByFacility } from '../../actions/CT/CurrentOnArt/currentOnArtVerifiedByFacilityActions';
import { loadCurrentOnArtByFacility } from '../../actions/CT/CurrentOnArt/currentOnArtByFacilityActions';
import { loadCurrentOnArt } from '../../actions/CT/CurrentOnArt/currentOnArtActions';
import { loadCurrOnARTKHIS } from '../../actions/Operational&HIS/Comparison/currOnArtKHISActions';
import { loadArtVerificationByCounty } from '../../actions/CT/ArtVerification/artVerificationByCountyActions';
import { loadArtVerificationByPartner } from './../../actions/CT/ArtVerification/artVerificationByPartnerActions';
import { loadArtVerificationReasons } from './../../actions/CT/ArtVerification/artVerificationReasonsActions';


const NewOnArt = Loadable({ loader: () => import('./NewOnArt/NewOnArt'), loading: Loading, delay: LOADING_DELAY });
const CurrentOnArt = Loadable({
    loader: () => import('./CurrentOnArt/CurrentOnArt'),
    loading: Loading,
    delay: LOADING_DELAY
});
const DSD = Loadable({ loader: () => import('./DSD/DSD'), loading: Loading, delay: LOADING_DELAY });
const TreatmentOutcomes = Loadable({
    loader: () => import('./TreatmentOutcomes/TreatmentOutcomes'),
    loading: Loading,
    delay: LOADING_DELAY
});
const ViralLoad = Loadable({ loader: () => import('./ViralLoad/ViralLoad'), loading: Loading, delay: LOADING_DELAY });
const AdverseEvents = Loadable({
    loader: () => import('./AdverseEvents/AdverseEvents'),
    loading: Loading,
    delay: LOADING_DELAY
});
const ArtOptimization = Loadable({
    loader: () => import('./ArtOptimization/ArtOptimization'),
    loading: Loading,
    delay: LOADING_DELAY
});
const OTZ = Loadable({ loader: () => import('./OTZ/OTZ'), loading: Loading, delay: LOADING_DELAY });
const OVC = Loadable({ loader: () => import('./OVC/OVC'), loading: Loading, delay: LOADING_DELAY });
const COVID = Loadable({ loader: () => import('./Covid/Covid'), loading: Loading, delay: LOADING_DELAY });
const ArtVerification = Loadable({
    loader: () => import('./ArtVerification/ArtVerification'),
    loading: Loading,
    delay: LOADING_DELAY,
});

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
    const datimAgePopulation = useSelector(state => state.filters.datimAgePopulation);
    const latestPregnancies = useSelector(state => state.filters.latestPregnancies);
    const populationTypes = useSelector(state => state.filters.populationTypes);
    const fromDate = useSelector(state => state.filters.fromDate);
    const toDate = useSelector(state => state.filters.toDate);

    const DEFAULT_ACTIVE_TAB = useSelector(state => state.ui.ctTab);
    const { active_tab } = useParams();
    const history = useHistory();


    const renderTabNavItems = () => {
        return (
            Object.keys(CT_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink
                            active={active_tab === value}
                            onClick={() => {
                                dispatch(changeCtTab(active_tab));
                                toggle(value);
                            }}
                        >
                            <div style={{ fontSize: '.78em' }}>
                                {CT_TABS[value]}
                            </div>
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
        };
    }, [dispatch]);

    useEffect(() => {
        if (
            active_tab === 'currentOnArt'
        ) {
            dispatch(enableDatimAgePopulationFilter());
        } else {
            dispatch(disableDatimAgePopulationFilter());
        }
        if (active_tab === 'newlyOnArt' || active_tab === "treatmentOutcomes") {
            dispatch(enableFromDateFilter());
        } else {
            dispatch(disableFromDateFilter());
        }
        if (active_tab === "treatmentOutcomes") {
            dispatch(enableToDateFilter());
        } else {
            dispatch(disableToDateFilter());
        }
        if (active_tab === "artOptimization") {
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
        if (active_tab === 'newlyOnArt'
            || active_tab === "currentOnArt"
            || active_tab === "artOptimization"
            || active_tab === "adverseEvent"
            || active_tab === 'dsd'
            || active_tab === 'vl'
            || active_tab === "treatmentOutcomes"
            || active_tab === 'otz'
            || active_tab === 'ovc'
            || active_tab === 'covid') {
            dispatch(enableAgencyFilter());
            dispatch(enableGenderFilter());
            dispatch(enableDatimAgeGroupFilter());
        }
    }, [dispatch, active_tab]);

    useEffect(() => {
        dispatch(loadCurrentOnArt());
        switch (active_tab) {
            case 'newlyOnArt':
                dispatch(loadLinkagePositiveTrends());
                dispatch(loadCurrentNewOnArtOverview());
                dispatch(loadNewOnArtOverview());
                dispatch(loadNewOnArtTrends());
                dispatch(loadNewOnArtByAgeSex());
                dispatch(loadMedianTimeToArtStartByYear());
                dispatch(loadMedianTimeToArtStartByCounty());
                dispatch(loadMedianTimeToArtStartByPartner());
                dispatch(loadTimeFromDiagnosisToArtStart());
                dispatch(loadMissingDiagnosisDateByFacility());
                dispatch(loadArtOptimizationCurrentByRegimen(active_tab));
                dispatch(loadArtOptimizationNewByYear(active_tab));
                break;
            case 'currentOnArt':
                dispatch(loadCurrentOnArtVerifiedByAgeSex(active_tab));
                dispatch(loadCurrentOnArtVerifiedByPartner(active_tab));
                dispatch(loadCurrentOnArtVerifiedByCounty(active_tab));
                dispatch(loadCurrentOnArtOverview(active_tab));
                dispatch(loadCurrentOnArtByAgeSex(active_tab));
                dispatch(loadCurrentOnArtByCounty(active_tab));
                dispatch(loadCurrentOnArtByPartner(active_tab));
                dispatch(loadCurrentOnArtDistributionByCounty(active_tab));
                dispatch(loadCurrentOnArtDistributionByPartner(active_tab));
                dispatch(loadArtOptimizationNewByYear(active_tab));
                dispatch(loadCurrentOnArtVerified(active_tab));
                dispatch(loadCurrentOnArtVerifiedByFacility(active_tab));
                dispatch(loadCurrentOnArtByFacility(active_tab));
                dispatch(loadCurrentOnArt());
                break;
            case 'artOptimization':
                dispatch(loadCurrentOnArtByAgeSex(active_tab));
                dispatch(loadCurrentOnArtByCounty(active_tab));
                dispatch(loadCurrentOnArtByPartner(active_tab));
                dispatch(loadArtOptimizationOverview(active_tab));
                dispatch(loadArtOptimizationCurrentByAgeSex(active_tab));
                dispatch(loadArtOptimizationCurrentByCounty(active_tab));
                dispatch(loadArtOptimizationCurrentByPartner(active_tab));
                dispatch(loadArtOptimizationNewByCounty(active_tab));
                dispatch(loadArtOptimizationNewByPartner(active_tab));
                dispatch(loadArtOptimizationNewByYear(active_tab));
                dispatch(loadRegimenDistributionByWeightBands(active_tab));
                dispatch(loadRegimenDistributionByAgeBands(active_tab));
                break;
            case 'adverseEvent':
                dispatch(loadCurrentOnArtByAgeSex(active_tab));
                dispatch(loadAdverseEventsByAgeSex(active_tab));
                dispatch(loadAdverseEventsClientsByAgeSex(active_tab));
                dispatch(loadAdverseEventsSeverityGrading(active_tab));
                dispatch(loadAdverseEventsSeverityActions(active_tab));
                dispatch(
                    loadAdverseEventsReportedWithSeverityLevels(active_tab)
                );
                dispatch(loadAdverseEventsActionsByDrugs(active_tab));
                dispatch(loadAdverseEventsActionsByDrugsNew(active_tab));
                dispatch(
                    loadAdverseEventsProportionOfPlHivWithAeByCausativeDrugs(
                        active_tab
                    )
                );
                dispatch(
                    loadAdverseEventsProportionOfPlHivAeRelatedToArt(active_tab)
                );
                dispatch(
                    loadAdverseEventsProportionOfPLHIVWithAeRegimenChanged(
                        active_tab
                    )
                );
                dispatch(
                    loadAdverseEventsProportionOfPLHIVWithAeRegimenWasStopped(
                        active_tab
                    )
                );
                dispatch(
                    loadAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered(
                        active_tab
                    )
                );
                break;
            case 'dsd':
                dispatch(loadCurrentOnArtOverview(active_tab));
                dispatch(loadDsdStabilityStatusByAgeSex(active_tab));
                dispatch(loadDsdStabilityStatusByCounty(active_tab));
                dispatch(loadDsdStabilityStatusByPartner(active_tab));
                dispatch(loadDsdUnstable(active_tab));
                dispatch(loadDsdStableMmdModels(active_tab));
                dispatch(
                    loadDsdAppointmentDurationByStabilityStatus(active_tab)
                );
                dispatch(loadDsdAppointmentDurationBySex(active_tab));
                dispatch(loadDsdAppointmentDurationByAge(active_tab));
                dispatch(loadDsdAppointmentDurationByCounty(active_tab));
                dispatch(loadDsdAppointmentDurationByPartner(active_tab));
                dispatch(loadDsdUptakeOverall(active_tab));
                dispatch(loadDsdStableOverall(active_tab));
                dispatch(loadDsdUptakeOverallBySex(active_tab));
                dispatch(loadCurrentOnArtByCounty(active_tab));
                dispatch(loadCurrentOnArtByPartner(active_tab));
                dispatch(loadCurrentOnArtDistributionByCounty(active_tab));
                dispatch(loadCurrentOnArtDistributionByPartner(active_tab));
                dispatch(loadCurrentOnArtByAgeSex(active_tab));
                break;
            case 'vl':
                dispatch(loadCurrentOnArtOverview(active_tab));
                dispatch(
                    loadViralLoadOverallUptakeSuppressionBySex(active_tab)
                );
                dispatch(loadMedianTimeTo1stVlByYear(active_tab));
                dispatch(loadMedianTimeTo1stVlByCounty(active_tab));
                dispatch(loadMedianTimeTo1stVlByPartner(active_tab));
                dispatch(loadViralLoadUptakeBySex(active_tab));
                dispatch(loadViralLoadUptakeByAge(active_tab));
                dispatch(loadViralLoadUptakeByCounty(active_tab));
                dispatch(loadViralLoadUptakeByPartner(active_tab));
                dispatch(loadViralLoadOutcomesBySex(active_tab));
                dispatch(loadViralLoadSuppressionByAge(active_tab));
                dispatch(loadViralLoadSuppressionByYear(active_tab));
                dispatch(loadViralLoadSuppressionByRegimen(active_tab));
                dispatch(
                    loadViralLoadSuppressionByYearAndSuppressionCategory(
                        active_tab
                    )
                );
                dispatch(
                    loadViralLoadOverallUptakeSuppressionByFacility(active_tab)
                );
                dispatch(load6MonthSuppressionByYearOfArtStart(active_tab));
                dispatch(load12MonthSuppressionByYearOfArtStart(active_tab));
                dispatch(load24MonthSuppressionByYearOfArtStart(active_tab));
                dispatch(loadViralLoadOutcomesHvlByFacility(active_tab));
                dispatch(
                    loadViralLoadOverallUptakeSuppressionBySexVlDone(active_tab)
                );
                dispatch(
                    loadViralLoadOverallUptakeSuppressionLessIntense(active_tab)
                );
                dispatch(loadViralLoadOverallUptakeGt1000Copies(active_tab));
                dispatch(loadViralLoadOverallUptakeGt1000CopiesEac(active_tab));
                dispatch(
                    loadViralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll(
                        active_tab
                    )
                );
                dispatch(
                    loadViralLoadOverallUptakeGt1000CopiesReceivedFollowTests(
                        active_tab
                    )
                );
                dispatch(
                    loadViralLoadOverallNumberGt1000CopiesSecondlineRegiment(
                        active_tab
                    )
                );
                break;
            case 'treatmentOutcomes':
                dispatch(loadNewOnArtOverview(active_tab));
                dispatch(loadTreatmentOutcomesOverallLast12m(active_tab));
                dispatch(loadNewOnArtTrends(active_tab));
                dispatch(loadTreatmentOutcomesBySex(active_tab));
                dispatch(loadTreatmentOutcomesByPopulationType(active_tab));
                dispatch(loadTreatmentOutcomesByAge(active_tab));
                dispatch(loadTreatmentOutcomesByYear(active_tab));
                dispatch(loadTreatmentOutcomesByFacility(active_tab));
                dispatch(loadThreeMonthRetention(active_tab));
                dispatch(loadSixMonthRetention(active_tab));
                dispatch(loadTwelveMonthRetention(active_tab));
                dispatch(loadTwentyFourMonthRetention(active_tab));
                dispatch(
                    loadTreatmentOutcomesUndocumentedByFacility(active_tab)
                );
                dispatch(loadTreatmentOutcomesNetCohort(active_tab));
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
                dispatch(
                    loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTraining()
                );
                dispatch(
                    loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByCounty()
                );
                dispatch(
                    loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner()
                );
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
                dispatch(loadOtzEnrolledAdolescentsByAgeGroup());
                dispatch(loadOtzEnrolledAdolescentsByCounty());
                dispatch(loadOtzEnrolledAdolescentsByPartner());
                dispatch(
                    loadProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingBySex()
                );
                dispatch(loadOtzOutcomesByAgeGroup());
                dispatch(loadOtzVlSuppressionBySex());
                dispatch(loadOtzVlSuppressionByAge());
                dispatch(loadOtzVlSuppressionByCounty());
                dispatch(loadOtzVlSuppressionByPartner());
                dispatch(loadOtzEnrollmentTrend());
                dispatch(loadOtzEnrollmentByAgeSex());
                dispatch(loadOvcDistributionOfCALHIVByAgeSex());
                dispatch(loadOtzNotEnrolledPartner());
                dispatch(loadOtzNotEnrolledCounty());
                dispatch(loadAlHivWithReSuppression());
                dispatch(loadOtzVlSuppressionByAgeNotEnrolled());
                dispatch(loadOtzVlSuppressionBySexNotEnrolled());
                dispatch(loadOtzVlSuppressionByPartnerNotEnrolled());
                dispatch(loadOtzVlSuppressionByCountyNotEnrolled());
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
                dispatch(loadOvcOverallCalHIV());
                dispatch(loadOvcCalHIVByGender());
                dispatch(loadOvcDistributionOfCALHIVByAgeSex());
                dispatch(loadOvcDistributionOfPatientsByAgeSex());
                dispatch(loadCalHIVCurrentOnArt());
                dispatch(loadCalHIVOnDTG());
                dispatch(loadOvcCurrentOnArt());
                dispatch(loadOvcTotalOnTld());
                dispatch(loadCALHIVTotalOnMMD());
                dispatch(loadOvcTotalOnMMD());
                dispatch(loadCalHIVIIT());
                dispatch(loadCalHIVDEAD());
                dispatch(loadOVCIIT());
                dispatch(loadOVCDEAD());
                dispatch(loadCalHIVEligibleVL());
                dispatch(loadCalHIVVLDone());
                dispatch(loadCalHIVVLSuppressed());
                dispatch(loadOVCEligibleVL());
                dispatch(loadOVCVLDone());
                dispatch(loadOVCVLSuppressed());
                dispatch(loadCalHIVCurrentOnArtNotInOvc());
                break;
            case 'covid':
                dispatch(loadCovidAdultPLHIVCurrentOnTreatment());
                dispatch(loadCovidAdultPLHIVPartiallyVaccinated());
                dispatch(loadCovidAdultPLHIVFullyVaccinated());
                dispatch(loadCovidAdultPLHIVVaccinatedByAgeGroup());
                dispatch(loadCovidAdultPLHIVVaccinatedByGender());
                dispatch(loadCovidAdultPLHIVVaccinatedByCounty());
                dispatch(loadCovidAdultPLHIVVaccinatedByPartner());
                dispatch(loadCovidAdultPLHIVCurrentOnTreatmentByGender());
                dispatch(loadCovidAdultPLHIVCurrentOnTreatmentByPartner());
                dispatch(loadCovidAdultPLHIVCurrentOnTreatmentByCounty());
                dispatch(loadCovidAdultPLHIVCurrentOnTreatmentByAgeGroup());
                dispatch(loadCovidPLHIVCurrentOnArt());
                dispatch(loadCovidSeverityByGender());
                dispatch(loadCovidOverallAdmission());
                dispatch(loadCovidOverallAdmissionMales());
                dispatch(loadCovidOverallAdmissionFemales());
                dispatch(loadCovidEverHadInfection());
                dispatch(loadCovidSymptomaticInfections());
                dispatch(loadCovidOverallMissedAppointment());
                dispatch(loadCovidPercentageWhoMissedAppointmentsByAgeGroup());
                dispatch(loadCovidPercentageWhoMissedAppointmentsByCounty());
                dispatch(loadCovidPercentageWhoMissedAppointmentsByPartner());
                dispatch(loadCovidCumulativeWhoReceivedAtLeastOneDose());
                dispatch(loadCovidCumulativeWithMissingDateGivenFirstDose());
                dispatch(loadCovidTrendsPLHIVVaccinationInTheLast12Months());
                dispatch(loadCovidNumberScreened());
                dispatch(loadCovidAdmissionSymptomaticByAge());
                dispatch(loadCovidManagementAdmitted());
                break;
            case 'artVerification':
                dispatch(loadCurrOnARTKHIS());
                dispatch(loadArtVerificationByCounty())
                dispatch(loadArtVerificationByPartner())
                dispatch(loadArtVerificationReasons())
                
                dispatch(loadCurrentOnArtVerifiedByCounty(active_tab));
                dispatch(loadCurrentOnArtVerifiedByPartner(active_tab));
                dispatch(loadCurrentOnArtByCounty(active_tab));
                dispatch(loadCurrentOnArtByPartner(active_tab));
                dispatch(loadCurrentOnArtVerified(active_tab));
                dispatch(loadCurrentOnArt());
                dispatch(loadCurrentOnArtOverview(active_tab));
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
        datimAgePopulation,
        latestPregnancies,
        populationTypes,
        active_tab,
        noCache
    ]);

    useEffect(() => {
        if (!active_tab) {
            history.push(`/hiv-treatment/${DEFAULT_ACTIVE_TAB}`);
        }
    }, []);

    if(!active_tab){
        history.push(`/hiv-treatment/${DEFAULT_ACTIVE_TAB}`);
    }

    const toggle = tab => {
        if (active_tab !== tab) {
            history.push(`/hiv-treatment/${tab}`);
        }
    };

    return (
        <div>
            <Nav tabs>{renderTabNavItems()}</Nav>
            <TabContent activeTab={active_tab}>
                <TabPane tabId="newlyOnArt">
                    {active_tab === 'newlyOnArt' ? <NewOnArt /> : null}
                </TabPane>
                <TabPane tabId="currentOnArt">
                    {active_tab === 'currentOnArt' ? <CurrentOnArt /> : null}
                </TabPane>
                <TabPane tabId="artOptimization">
                    {active_tab === 'artOptimization' ? (
                        <ArtOptimization />
                    ) : null}
                </TabPane>
                <TabPane tabId="adverseEvent">
                    {active_tab === 'adverseEvent' ? <AdverseEvents /> : null}
                </TabPane>
                <TabPane tabId="dsd">
                    {active_tab === 'dsd' ? <DSD /> : null}
                </TabPane>
                <TabPane tabId="vl">
                    {active_tab === 'vl' ? <ViralLoad /> : null}
                </TabPane>
                <TabPane tabId="treatmentOutcomes">
                    {active_tab === 'treatmentOutcomes' ? (
                        <TreatmentOutcomes />
                    ) : null}
                </TabPane>
                <TabPane tabId={'otz'}>
                    {active_tab === 'otz' ? <OTZ /> : null}
                </TabPane>
                <TabPane tabId={'ovc'}>
                    {active_tab === 'ovc' ? <OVC /> : null}
                </TabPane>
                <TabPane tabId={'covid'}>
                    {active_tab === 'covid' ? <COVID /> : null}
                </TabPane>
                <TabPane tabId={'artVerification'}>
                    {active_tab === 'artVerification' ? (
                        <ArtVerification />
                    ) : null}
                </TabPane>
            </TabContent>
            <p></p>
            <p></p>
        </div>
    );
};

export default CT;
