import { combineReducers } from 'redux';

import authReducer from './Shared/authReducer';
import ui from "./Shared/ui";
import filters from "./Shared/filters";
import rrSites from "./Shared/rrSites";
import htsSites from "./Shared/htsSites";
import ctSites from "./Shared/ctSites";

import gpsSites from "./Home/gpsSites";

import linkagePositiveTrends from "./HTS/Linkage/linkagePositiveTrends";
import linkageNumberNotLinkedByFacility from "./HTS/Linkage/linkageNumberNotLinkedByFacility";

import newOnPrep from './HTS/Prep/newOnPrep';

import currentNewOnArtOverview from "./CT/NewOnArt/currentNewOnArtOverview";

import newOnArtOverview from "./CT/NewOnArt/newOnArtOverview";
import newOnArtTrends from "./CT/NewOnArt/newOnArtTrends";
import newOnArtByAgeSex from "./CT/NewOnArt/newOnArtByAgeSex";
import medianTimeToArtStartByYear from "./CT/NewOnArt/medianTimeToArtStartByYear";
import medianTimeToArtStartByCounty from "./CT/NewOnArt/medianTimeToArtStartByCounty";
import medianTimeToArtStartByPartner from "./CT/NewOnArt/medianTimeToArtStartByPartner";
import timeFromDiagnosisToArtStart from "./CT/NewOnArt/timeFromDiagnosisToArtStart";
import missingDiagnosisDateByFacility from "./CT/NewOnArt/missingDiagnosisDateByFacility";

import currentOnArtOverview from "./CT/CurrentOnArt/currentOnArtOverview";
import currentOnArtByAgeSex from "./CT/CurrentOnArt/currentOnArtByAgeSex";
import currentOnArtByCounty from "./CT/CurrentOnArt/currentOnArtByCounty";
import currentOnArtByPartner from "./CT/CurrentOnArt/currentOnArtByPartner";
import currentOnArtDistributionByCounty from "./CT/CurrentOnArt/currentOnArtDistributionByCounty";
import currentOnArtDistributionByPartner from "./CT/CurrentOnArt/currentOnArtDistributionByPartner";

import artOptimizationOverview from "./CT/ArtOptimization/artOptimizationOverview";
import artOptimizationCurrentByRegimen from "./CT/ArtOptimization/artOptimizationCurrentByRegimen";
import artOptimizationCurrentByAgeSex from "./CT/ArtOptimization/artOptimizationCurrentByAgeSex";
import artOptimizationCurrentByCounty from "./CT/ArtOptimization/artOptimizationCurrentByCounty";
import artOptimizationCurrentByPartner from "./CT/ArtOptimization/artOptimizationCurrentByPartner";
import artOptimizationNewByYear from "./CT/ArtOptimization/artOptimizationNewByYear";
import artOptimizationNewByCounty from "./CT/ArtOptimization/artOptimizationNewByCounty";
import artOptimizationNewByPartner from "./CT/ArtOptimization/artOptimizationNewByPartner";
import artOptimizationRegimenDistributionByWeightBands
    from './CT/ArtOptimization/artOptimizationRegimenDistributionByWeightBands';
import artOptimizationRegimenDistributionByAgeBands
    from './CT/ArtOptimization/artOptimizationRegimenDistributionByAgeBands';

import adverseEventsByAgeSex from "./CT/AdverseEvents/adverseEventsByAgeSex";
import adverseEventsClientsByAgeSex from "./CT/AdverseEvents/adverseEventsClientsByAgeSex";
import adverseEventsSeverityGrading from "./CT/AdverseEvents/adverseEventsSeverityGrading";
import adverseEventsSeverityActions from "./CT/AdverseEvents/adverseEventsSeverityActions";
import adverseEventsReportedWithSeverityLevels from "./CT/AdverseEvents/adverseEventsReportedWithSeverityLevels";
import adverseEventsActionsByDrugs from "./CT/AdverseEvents/adverseEventsActionsByDrugs";
import adverseEventsActionsByDrugsNew from "./CT/AdverseEvents/adverseEventsActionsByDrugsNew";
import adverseEventsProportionOfPlHivWithAeByCausativeDrugs
    from './CT/AdverseEvents/adverseEventsProportionOfPlHivWithAeByCausativeDrugs';

import dsdStabilityStatusByAgeSex from "./CT/Dsd/dsdStabilityStatusByAgeSex";
import dsdStabilityStatusByCounty from "./CT/Dsd/dsdStabilityStatusByCounty";
import dsdStabilityStatusByPartner from "./CT/Dsd/dsdStabilityStatusByPartner";
import dsdUnstable from "./CT/Dsd/dsdUnstable";
import dsdStableMmdModels from "./CT/Dsd/dsdStableMmdModels";
import dsdAppointmentDurationBySex from "./CT/Dsd/dsdAppointmentDurationBySex";
import dsdAppointmentDurationByAge from "./CT/Dsd/dsdAppointmentDurationByAge";
import dsdAppointmentDurationByStabilityStatus from "./CT/Dsd/dsdAppointmentDurationByStabilityStatus";
import dsdAppointmentDurationByCounty from "./CT/Dsd/dsdAppointmentDurationByCounty";
import dsdAppointmentDurationByPartner from "./CT/Dsd/dsdAppointmentDurationByPartner";
import dsdUptakeOverall from './CT/Dsd/dsdUptakeOverall';
import dsdStableOverall from './CT/Dsd/dsdStableOverall';

import viralLoadOverallUptakeSuppressionBySex from "./CT/ViralLoad/viralLoadOverallUptakeSuppressionBySex";
import medianTimeTo1stVlByYear from "./CT/ViralLoad/medianTimeTo1stVlByYear";
import medianTimeTo1stVlByCounty from "./CT/ViralLoad/medianTimeTo1stVlByCounty";
import medianTimeTo1stVlByPartner from "./CT/ViralLoad/medianTimeTo1stVlByPartner";
import viralLoadUptakeBySex from "./CT/ViralLoad/viralLoadUptakeBySex";
import viralLoadUptakeByAge from "./CT/ViralLoad/viralLoadUptakeByAge";
import viralLoadUptakeByCounty from "./CT/ViralLoad/viralLoadUptakeByCounty";
import viralLoadUptakeByPartner from "./CT/ViralLoad/viralLoadUptakeByPartner";
import viralLoadOutcomesBySex from "./CT/ViralLoad/viralLoadOutcomesBySex";
import viralLoadSuppressionByAge from "./CT/ViralLoad/viralLoadSuppressionByAge";
import viralLoadSuppressionByYear from "./CT/ViralLoad/viralLoadSuppressionByYear";
import viralLoadSuppressionByRegimen from "./CT/ViralLoad/viralLoadSuppressionByRegimen";
import viralLoadOverallUptakeSuppressionByFacility from "./CT/ViralLoad/viralLoadOverallUptakeSuppressionByFacility";
import viralLoadSuppressionByYearAndSuppressionCategory
    from './CT/ViralLoad/viralLoadSuppressionByYearAndSuppressionCategory';
import viralLoadOutcomesHvlByFacility from "./CT/ViralLoad/viralLoadOutcomesHvlByFacility";

import treatmentOutcomesOverallLast12m from "./CT/TreatmentOutcomes/treatmentOutcomesOverallLast12m";
import treatmentOutcomesBySex from "./CT/TreatmentOutcomes/treatmentOutcomesBySex";
import treatmentOutcomesByPopulationType from "./CT/TreatmentOutcomes/treatmentOutcomesByPopulationType";
import treatmentOutcomesByAge from "./CT/TreatmentOutcomes/treatmentOutcomesByAge";
import treatmentOutcomesByYear from "./CT/TreatmentOutcomes/treatmentOutcomesByYear";
import treatmentOutcomesByFacility from "./CT/TreatmentOutcomes/treatmentOutcomesByFacility";
import threeMonthRetention from "./CT/TreatmentOutcomes/threeMonthRetention";
import sixMonthRetention from "./CT/TreatmentOutcomes/sixMonthRetention";
import twelveMonthRetention from "./CT/TreatmentOutcomes/twelveMonthRetention";
import twentyFourMonthRetention from "./CT/TreatmentOutcomes/twentyFourMonthRetention";
import treatmentOutcomesUndocumentedByFacility from "./CT/TreatmentOutcomes/treatmentOutcomesUndocumentedByFacility";

import dsdMmdUptakeOverallBySex from './CT/Dsd/dsdMmdUptakeOverallBySex';
import adverseEventsProportionOfPlHivAeRelatedToArtDrugs
    from './CT/AdverseEvents/adverseEventsProportionOfPlHivAeRelatedToArtDrugs';
import adverseEventsProportionOfPLHIVWithAeRegimenChanged
    from './CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenChanged';
import adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered
    from './CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered';
import adverseEventsProportionOfPLHIVWithAeRegimenWasStopped
    from './CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenWasStopped';
import viralLoad6MonthSuppressionByYearOfArtStart from './CT/ViralLoad/viralLoad6MonthSuppressionByYearOfArtStart';
import viralLoad12MonthSuppressionByYearOfArtStart from './CT/ViralLoad/viralLoad12MonthSuppressionByYearOfArtStart';
import viralLoad24MonthSuppressionByYearOfArtStart from './CT/ViralLoad/viralLoad24MonthSuppressionByYearOfArtStart';
import viralLoadOverallUptakeSuppressionBySexVlDone from './CT/ViralLoad/viralLoadOverallUptakeSuppressionBySexVlDone';

import practitionersCountByCountyQualification from './HRH/practitionersCountByCountyQualification';
import populationByCounty from './HRH/populationByCounty';

import uptakeBySex from './HTS/Uptake/uptakeBySex';
import uptakeByCounty from './HTS/Uptake/uptakeByCounty';

import overallReportingRatesByFacilityReported from './RR/overallReportingRatesByFacilityReported';
import overallReportingRatesByFacilityNotReported from './RR/overallReportingRatesByFacilityNotReported';

import consistencyByFacilityNotReported from './RR/consistencyByFacilityNotReported';

import otzEnrollmentAmongAlhivOnArtBySex from './CT/OTZ/otzEnrollmentAmongAlhivOnArtBySex';
import otzEnrollmentAmongAlhivOnArtByAge from './CT/OTZ/otzEnrollmentAmongAlhivOnArtByAge';
import otzEnrollmentAmongAlhivOnArtByCounty from './CT/OTZ/otzEnrollmentAmongAlhivOnArtByCounty';
import otzEnrollmentAmongAlhivOnArtByPartner from './CT/OTZ/otzEnrollmentAmongAlhivOnArtByPartner';
import otzVlUptakeAmongAlHivEnrolledInOtzBySex from './CT/OTZ/otzVlUptakeAmongAlHivEnrolledInOtzBySex';
import otzVlUptakeAmongAlHivEnrolledInOtzByAge from './CT/OTZ/otzVlUptakeAmongAlHivEnrolledInOtzByAge';
import otzVlUptakeAmongAlHivEnrolledInOtzByCounty from './CT/OTZ/otzVlUptakeAmongAlHivEnrolledInOtzByCounty';
import otzVlUptakeAmongAlHivEnrolledInOtzByPartner from './CT/OTZ/otzVlUptakeAmongAlHivEnrolledInOtzByPartner';
import otzProportionOfAlHivWhoHaveCompletedOtzTraining from './CT/OTZ/otzProportionOfAlHivWhoHaveCompletedOtzTraining';
import otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty from './CT/OTZ/otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty';
import otzProportionOfAlHivWhoHaveCompletedOtzTrainingByPartner from './CT/OTZ/otzProportionOfAlHivWhoHaveCompletedOtzTrainingByPartner';
import otzOutcomesAmongAlHivWithBaselineVL from './CT/OTZ/otzOutcomesAmongAlHivWithBaselineVL';
import otzOutcomesAmongAlHivWithReSuppression from './CT/OTZ/otzOutcomesAmongAlHivWithReSuppression';
import otzOutcomesByGender from './CT/OTZ/otzOutcomesByGender';
import otzOutcomesByPopulationType from './CT/OTZ/otzOutcomesByPopulationType';
import otzOutcomesByYearOfArtStart from './CT/OTZ/otzOutcomesByYearOfArtStart';
import otzOutcomesByCounty from './CT/OTZ/otzOutcomesByCounty';
import otzOutcomesByPartner from './CT/OTZ/otzOutcomesByPartner';
import otzTotalAdolescents from './CT/OTZ/otzTotalAdolescents';
import otzEnrolled from './CT/OTZ/otzEnrolled';
import otzTotalWithVlResults from './CT/OTZ/otzTotalWithVlResults';
import otzTotalWithWithResultsLessThan1000 from './CT/OTZ/otzTotalWithWithResultsLessThan1000';
import ovcOverallServ from './CT/OVC/ovcOverallServ';
import ovcServByGender from './CT/OVC/ovcServByGender';
import ovcCareGiversRelationshipToOvcClient from './CT/OVC/ovcCareGiversRelationshipToOvcClient';
import ovcProportionOfClientsInCpimsOverall from './CT/OVC/ovcProportionOfClientsInCpimsOverall';
import ovcProportionOfClientsInCpimsByGender from './CT/OVC/ovcProportionOfClientsInCpimsByGender';
import ovcServDistributionByCounty from './CT/OVC/ovcServDistributionByCounty';
import ovcServDistributionByPartner from './CT/OVC/ovcServDistributionByPartner';
import ovcClientsExitReasons from './CT/OVC/ovcClientsExitReasons';
import ovcViralSuppressionAmongOvcPatientsOverall from './CT/OVC/ovcViralSuppressionAmongOvcPatientsOverall';
import ovcViralSuppressionAmongOvcPatientsByGender from './CT/OVC/ovcViralSuppressionAmongOvcPatientsByGender';
import treatmentOutcomesNetCohort from './CT/TreatmentOutcomes/treatmentOutcomesNetCohort';
import otzEnrollmentAdolescentsByAgeGroup from './CT/OTZ/otzEnrollmentAdolescentsByAgeGroup';
import otzEnrolledAdolescentsByCounty from './CT/OTZ/otzEnrolledAdolescentsByCounty';
import otzEnrolledAdolescentsByPartner from './CT/OTZ/otzEnrolledAdolescentsByPartner';
import otzProportionOfAlHivWhoHaveCompletedOtzTrainingBySex from './CT/OTZ/otzProportionOfAlHivWhoHaveCompletedOtzTrainingBySex';
import otzOutcomesByAgeGroup from './CT/OTZ/otzOutcomesByAgeGroup';
import otzVlSuppressionBySex from './CT/OTZ/otzVlSuppressionBySex';
import otzVlSuppressionByAge from './CT/OTZ/otzVlSuppressionByAge';
import otzVlSuppressionByCounty from './CT/OTZ/otzVlSuppressionByCounty';
import otzVlSuppressionByPartner from './CT/OTZ/otzVlSuppressionByPartner';

import CovidAdultPLHIVCurrentOnTreatment from './CT/Covid/covidAdultPLHIVCurrentOnTreatment';
import CovidAdultPLHIVPartiallyVaccinated from './CT/Covid/covidAdultPLHIVPartiallyVaccinated';
import CovidAdultPLHIVFullyVaccinated from './CT/Covid/covidAdultPLHIVFullyVaccinated';
import CovidAdultPLHIVVaccinatedByAgeGroup from './CT/Covid/covidAdultPLHIVVaccinatedByAgeGroup';
import CovidAdultPLHIVVaccinatedByGender from './CT/Covid/covidAdultPLHIVVaccinatedByGender';
import CovidAdultPLHIVVaccinatedByCounty from './CT/Covid/covidAdultPLHIVVaccinatedByCounty';
import CovidAdultPLHIVVaccinatedByPartner from './CT/Covid/covidAdultPLHIVVaccinatedByPartner';
import CovidAdultPLHIVCurrentOnTreatmentByGender from './CT/Covid/covidAdultPLHIVCurrentOnTreatmentByGender';
import CovidAdultPLHIVCurrentOnTreatmentByCounty from './CT/Covid/covidAdultPLHIVCurrentOnTreatmentByCounty';
import CovidAdultPLHIVCurrentOnTreatmentByPartner from './CT/Covid/covidAdultPLHIVCurrentOnTreatmentByPartner';
import CovidAdultPLHIVCurrentOnTreatmentByAgeGroup from './CT/Covid/covidAdultPLHIVCurrentOnTreatmentByAgeGroup';
import CovidPLHIVCurrentOnArt from './CT/Covid/covidPLHIVCurrentOnArt';
import CovidSeverityByGender from './CT/Covid/covidSeverityByGender';
import CovidOverallAdmission from './CT/Covid/covidOverallAdmission';
import CovidOverallAdmissionFemale from './CT/Covid/covidOverallAdmissionFemale';
import CovidOverallAdmissionMale from './CT/Covid/covidOverallAdmissionMale';
import CovidEverHadInfection from './CT/Covid/covidEverHadInfection';
import CovidSymptomaticInfections from './CT/Covid/covidSymptomaticInfections';
import CovidOverallMissedAppointments from './CT/Covid/covidOverallMissedAppointments';
import CovidPercentageMissedAppointmentsByAgeGroup from './CT/Covid/covidPercentageMissedAppointmentsByAgeGroup';
import CovidPercentageMissedAppointmentsByCounty from './CT/Covid/covidPercentageMissedAppointmentsByCounty';
import CovidPercentageMissedAppointmentsByPartner from './CT/Covid/covidPercentageMissedAppointmentsByPartner';
import CovidCumulativeWhoReceivedAtLeastOneDose from './CT/Covid/covidCumulativeWhoReceivedAtLeastOneDose';
import CovidTrendsPLHIVVaccinationInTheLast12Months from './CT/Covid/covidTrendsPLHIVVaccinationInTheLast12Months';
import OvcOverallCALHIV from './CT/OVC/ovcOverallCALHIV';
import OvcCALHIVByGender from './CT/OVC/ovcCALHIVByGender';
import OvcDistributionOfCALHIVByAgeSex from './CT/OVC/ovcDistributionOfCALHIVByAgeSex';
import OvcDistributionOfPatientsByAgeSex from './CT/OVC/ovcDistributionOfPatientsByAgeSex';
import CALHIVCurrentOnArt from './CT/OVC/CALHIVCurrentOnArt';
import CALHIVCurrentOnArtNotInOvc from './CT/OVC/CALHIVCurrentOnArtNotInOvc';
import CALHIVOnDTG from './CT/OVC/CALHIVOnDTG';
import OvcCurrentOnArt from './CT/OVC/ovcCurrentOnArt';
import OvcTotalOnTld from './CT/OVC/ovcTotalOnTld';
import CALHIVTotalOnMMD from './CT/OVC/CALHIVTotalOnMMD';
import OvcTotalOnMMD from './CT/OVC/ovcTotalOnMMD';
import CALHIVIIT from './CT/OVC/CALHIVIIT';
import CALHIVDEAD from './CT/OVC/CALHIVDEAD';
import OvcIIT from './CT/OVC/ovcIIT';
import OvcDEAD from './CT/OVC/ovcDEAD';
import CALHIVEligibleVL from './CT/OVC/CALHIVEligibleVL';
import CALHIVVLDone from './CT/OVC/CALHIVVLDone';
import CALHIVVLSuppressed from './CT/OVC/CALHIVVLSuppressed';
import ovcEligibleVL from './CT/OVC/ovcEligibleVL';
import ovcVLDone from './CT/OVC/ovcVLDone';
import ovcVLSuppressed from './CT/OVC/ovcVLSuppressed';
import CovidNumberScreened from './CT/Covid/covidNumberScreened';
import CovidCumulativeWithMissingDateGivenFirstDose from './CT/Covid/covidCumulativeWithMissingDateGivenFirstDose';
import CovidAdmissionSymptomaticByAge from './CT/Covid/covidAdmissionSymptomaticByAge';
import CovidManagementAdmitted from './CT/Covid/covidManagementAdmitted';
import currentOnArtVerified from './CT/CurrentOnArt/currentOnArtVerified';
import currentOnArtVerifiedByAgeSex from './CT/CurrentOnArt/currentOnArtVerifiedByAgeSex';
import currentOnArtVerifiedByCounty from './CT/CurrentOnArt/currentOnArtVerifiedByCounty';
import currentOnArtVerifiedByPartner from './CT/CurrentOnArt/currentOnArtVerifiedByPartner';
import viralLoadOverallUptakeSuppressionReferredLessIntense
    from './CT/ViralLoad/viralLoadOverallUptakeSuppressionReferredLessIntense';
import viralLoadOverallUptakeGt1000Copies from './CT/ViralLoad/viralLoadOverallUptakeGt1000Copies';
import viralLoadOverallUptakeGt1000CopiesEac from './CT/ViralLoad/viralLoadOverallUptakeGt1000CopiesEac';
import viralLoadOverallUptakeGt1000CopiesReceivedFollowTests
    from './CT/ViralLoad/viralLoadOverallUptakeGt1000CopiesReceivedFollowTests';
import viralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll
    from './CT/ViralLoad/viralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll';
import viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment
    from './CT/ViralLoad/viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment';


import newlyStartedOnArtKHIS from './Operational&HIS/Comparison/newlyStartedOnArtKHIS';
import newlyStartedOnArtTrendsKHIS from './Operational&HIS/Comparison/newlyStartedOnArtTrendsKHIS';
import htsPositivesTrendsKHIS from './Operational&HIS/Comparison/htsPositivesTrendsKHIS';
import currOnArtKHIS from './Operational&HIS/Comparison/currOnArtKHIS';
import currOnArtKHISByCounty from './Operational&HIS/Comparison/currOnArtKHISByCounty';
import currOnArtDWHByCounty from './Operational&HIS/Comparison/currOnArtDWHByCounty';
import currOnArtKHISByPartner from './Operational&HIS/Comparison/currOnArtKHISByPartner';
import currOnArtByFacilityKHIS from './Operational&HIS/Comparison/currOnArtByFacilityKHIS';
import newOnArtByFacilityKHIS from './Operational&HIS/Comparison/newOnArtByFacilityKHIS';
import currOnArtByFacilityDWH from './Operational&HIS/Comparison/currOnArtByFacilityDWH';
import newOnArtByFacilityDWH from './Operational&HIS/Comparison/newOnArtByFacilityDWH';

export default combineReducers({
    auth: authReducer,

    ui,
    filters,
    rrSites,
    htsSites,
    ctSites,

    gpsSites,

    linkagePositiveTrends,
    linkageNumberNotLinkedByFacility,

    currentNewOnArtOverview,

    newOnArtOverview,
    newOnArtTrends,
    newOnArtByAgeSex,
    medianTimeToArtStartByYear,
    medianTimeToArtStartByCounty,
    medianTimeToArtStartByPartner,
    timeFromDiagnosisToArtStart,
    missingDiagnosisDateByFacility,

    currentOnArtOverview,
    currentOnArtByAgeSex,
    currentOnArtByCounty,
    currentOnArtByPartner,
    currentOnArtDistributionByCounty,
    currentOnArtDistributionByPartner,

    artOptimizationOverview,
    artOptimizationCurrentByRegimen,
    artOptimizationCurrentByAgeSex,
    artOptimizationCurrentByCounty,
    artOptimizationCurrentByPartner,
    artOptimizationNewByCounty,
    artOptimizationNewByPartner,
    artOptimizationNewByYear,
    artOptimizationRegimenDistributionByWeightBands,
    artOptimizationRegimenDistributionByAgeBands,

    adverseEventsByAgeSex,
    adverseEventsClientsByAgeSex,
    adverseEventsSeverityGrading,
    adverseEventsSeverityActions,
    adverseEventsReportedWithSeverityLevels,
    adverseEventsActionsByDrugs,
    adverseEventsActionsByDrugsNew,
    adverseEventsProportionOfPlHivWithAeByCausativeDrugs,
    adverseEventsProportionOfPlHivAeRelatedToArtDrugs,
    adverseEventsProportionOfPLHIVWithAeRegimenChanged,
    adverseEventsProportionOfPLHIVWithAeRegimenWasStopped,
    adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered,

    dsdStabilityStatusByAgeSex,
    dsdStabilityStatusByCounty,
    dsdStabilityStatusByPartner,
    dsdUnstable,
    dsdStableMmdModels,
    dsdAppointmentDurationBySex,
    dsdAppointmentDurationByAge,
    dsdAppointmentDurationByStabilityStatus,
    dsdAppointmentDurationByCounty,
    dsdAppointmentDurationByPartner,
    dsdUptakeOverall,
    dsdStableOverall,
    dsdMmdUptakeOverallBySex,

    viralLoadOverallUptakeSuppressionBySex,
    medianTimeTo1stVlByYear,
    medianTimeTo1stVlByCounty,
    medianTimeTo1stVlByPartner,
    viralLoadUptakeBySex,
    viralLoadUptakeByAge,
    viralLoadUptakeByCounty,
    viralLoadUptakeByPartner,
    viralLoadOutcomesBySex,
    viralLoadSuppressionByAge,
    viralLoadSuppressionByYear,
    viralLoadSuppressionByRegimen,
    viralLoadOverallUptakeSuppressionByFacility,
    viralLoadSuppressionByYearAndSuppressionCategory,
    viralLoad6MonthSuppressionByYearOfArtStart,
    viralLoad12MonthSuppressionByYearOfArtStart,
    viralLoad24MonthSuppressionByYearOfArtStart,
    viralLoadOutcomesHvlByFacility,
    viralLoadOverallUptakeSuppressionBySexVlDone,
    viralLoadOverallUptakeSuppressionReferredLessIntense,
    viralLoadOverallUptakeGt1000Copies,
    viralLoadOverallUptakeGt1000CopiesEac,
    viralLoadOverallUptakeGt1000CopiesReceivedFollowTests,
    viralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll,
    viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment,

    treatmentOutcomesOverallLast12m,
    treatmentOutcomesBySex,
    treatmentOutcomesByPopulationType,
    treatmentOutcomesByAge,
    treatmentOutcomesByYear,
    treatmentOutcomesByFacility,
    threeMonthRetention,
    sixMonthRetention,
    twelveMonthRetention,
    twentyFourMonthRetention,
    treatmentOutcomesUndocumentedByFacility,
    treatmentOutcomesNetCohort,

    practitionersCountByCountyQualification,
    populationByCounty,

    uptakeBySex,
    uptakeByCounty,

    overallReportingRatesByFacilityReported,
    overallReportingRatesByFacilityNotReported,

    consistencyByFacilityNotReported,

    otzEnrollmentAmongAlhivOnArtBySex,
    otzEnrollmentAmongAlhivOnArtByAge,
    otzEnrollmentAmongAlhivOnArtByCounty,
    otzEnrollmentAmongAlhivOnArtByPartner,
    otzVlUptakeAmongAlHivEnrolledInOtzBySex,
    otzVlUptakeAmongAlHivEnrolledInOtzByAge,
    otzVlUptakeAmongAlHivEnrolledInOtzByCounty,
    otzVlUptakeAmongAlHivEnrolledInOtzByPartner,
    otzProportionOfAlHivWhoHaveCompletedOtzTraining,
    otzProportionOfAlHivWhoHaveCompletedOtzTrainingByCounty,
    otzProportionOfAlHivWhoHaveCompletedOtzTrainingByPartner,
    otzOutcomesAmongAlHivWithReSuppression,
    otzOutcomesAmongAlHivWithBaselineVL,
    otzOutcomesByGender,
    otzOutcomesByPopulationType,
    otzOutcomesByYearOfArtStart,
    otzOutcomesByCounty,
    otzOutcomesByPartner,
    otzTotalAdolescents,
    otzEnrolled,
    otzTotalWithVlResults,
    otzTotalWithWithResultsLessThan1000,
    otzEnrollmentAdolescentsByAgeGroup,
    otzEnrolledAdolescentsByCounty,
    otzEnrolledAdolescentsByPartner,
    otzProportionOfAlHivWhoHaveCompletedOtzTrainingBySex,
    otzOutcomesByAgeGroup,
    otzVlSuppressionBySex,
    otzVlSuppressionByAge,
    otzVlSuppressionByCounty,
    otzVlSuppressionByPartner,

    ovcOverallServ,
    ovcServByGender,
    ovcCareGiversRelationshipToOvcClient,
    ovcProportionOfClientsInCpimsOverall,
    ovcProportionOfClientsInCpimsByGender,
    ovcServDistributionByCounty,
    ovcServDistributionByPartner,
    ovcClientsExitReasons,
    ovcViralSuppressionAmongOvcPatientsOverall,
    ovcViralSuppressionAmongOvcPatientsByGender,

    CovidAdultPLHIVCurrentOnTreatment,
    CovidAdultPLHIVPartiallyVaccinated,
    CovidAdultPLHIVFullyVaccinated,
    CovidAdultPLHIVVaccinatedByAgeGroup,
    CovidAdultPLHIVVaccinatedByGender,
    CovidAdultPLHIVVaccinatedByCounty,
    CovidAdultPLHIVVaccinatedByPartner,
    CovidAdultPLHIVCurrentOnTreatmentByGender,
    CovidAdultPLHIVCurrentOnTreatmentByCounty,
    CovidAdultPLHIVCurrentOnTreatmentByPartner,
    CovidAdultPLHIVCurrentOnTreatmentByAgeGroup,
    CovidPLHIVCurrentOnArt,
    CovidSeverityByGender,
    CovidOverallAdmission,
    CovidOverallAdmissionFemale,
    CovidOverallAdmissionMale,
    CovidEverHadInfection,
    CovidSymptomaticInfections,
    CovidOverallMissedAppointments,
    CovidPercentageMissedAppointmentsByAgeGroup,
    CovidPercentageMissedAppointmentsByCounty,
    CovidPercentageMissedAppointmentsByPartner,
    CovidCumulativeWhoReceivedAtLeastOneDose,
    CovidTrendsPLHIVVaccinationInTheLast12Months,
    CovidCumulativeWithMissingDateGivenFirstDose,
    CovidManagementAdmitted,
    CovidNumberScreened,
    CovidAdmissionSymptomaticByAge,

    OvcOverallCALHIV,
    OvcCALHIVByGender,
    OvcDistributionOfCALHIVByAgeSex,
    OvcDistributionOfPatientsByAgeSex,
    CALHIVCurrentOnArt,
    CALHIVCurrentOnArtNotInOvc,
    CALHIVOnDTG,
    OvcCurrentOnArt,
    OvcTotalOnTld,
    CALHIVTotalOnMMD,
    OvcTotalOnMMD,
    CALHIVIIT,
    CALHIVDEAD,
    OvcIIT,
    OvcDEAD,
    CALHIVEligibleVL,
    CALHIVVLDone,
    CALHIVVLSuppressed,
    ovcEligibleVL,
    ovcVLDone,
    ovcVLSuppressed,

    newlyStartedOnArtKHIS,
    newlyStartedOnArtTrendsKHIS,
    htsPositivesTrendsKHIS,
    currOnArtKHIS,
    currOnArtKHISByCounty,
    currOnArtKHISByPartner,
    currOnArtByFacilityKHIS,
    newOnArtByFacilityKHIS,
    currOnArtByFacilityDWH,
    newOnArtByFacilityDWH,
    currOnArtDWHByCounty,
    currentOnArtVerified,
    currentOnArtVerifiedByCounty,
    currentOnArtVerifiedByPartner,
    currentOnArtVerifiedByAgeSex,

    newOnPrep,
});
