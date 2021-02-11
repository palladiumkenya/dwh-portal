import { combineReducers } from 'redux';

import authReducer from './Shared/authReducer';
import ui from "./Shared/ui";
import filters from "./Shared/filters";
import rrSites from "./Shared/rrSites";
import htsSites from "./Shared/htsSites";
import ctSites from "./Shared/ctSites";

import gpsSites from "./Home/gpsSites";

import newOnArtOverview from "./CT/NewOnArt/newOnArtOverview";
import newOnArtTrends from "./CT/NewOnArt/newOnArtTrends";
import newOnArtByAgeSex from "./CT/NewOnArt/newOnArtByAgeSex";
import medianTimeToArtStartByYear from "./CT/NewOnArt/medianTimeToArtStartByYear";
import medianTimeToArtStartByCounty from "./CT/NewOnArt/medianTimeToArtStartByCounty";
import medianTimeToArtStartByPartner from "./CT/NewOnArt/medianTimeToArtStartByPartner";
import timeFromDiagnosisToArtStart from "./CT/NewOnArt/timeFromDiagnosisToArtStart";

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

import viralLoadOverallUptakeSuppressionBySex from "./CT/ViralLoad/viralLoadOverallUptakeSuppressionBySex";
import medianTimeTo1stVlByYear from "./CT/ViralLoad/medianTimeTo1stVlByYear";
import medianTimeTo1stVlByCounty from "./CT/ViralLoad/medianTimeTo1stVlByCounty";
import medianTimeTo1stVlByPartner from "./CT/ViralLoad/medianTimeTo1stVlByPartner";
import viralLoadOverallUptakeSuppressionByFacility from "./CT/ViralLoad/viralLoadOverallUptakeSuppressionByFacility";

import treatmentOutcomesBySex from "./CT/TreatmentOutcomes/treatmentOutcomesBySex";
import treatmentOutcomesByAge from "./CT/TreatmentOutcomes/treatmentOutcomesByAge";
import treatmentOutcomesByYear from "./CT/TreatmentOutcomes/treatmentOutcomesByYear";
import treatmentOutcomesByFacility from "./CT/TreatmentOutcomes/treatmentOutcomesByFacility";
import threeMonthRetention from "./CT/TreatmentOutcomes/threeMonthRetention";
import sixMonthRetention from "./CT/TreatmentOutcomes/sixMonthRetention";
import twelveMonthRetention from "./CT/TreatmentOutcomes/twelveMonthRetention";
import twentyFourMonthRetention from "./CT/TreatmentOutcomes/twentyFourMonthRetention";

export default combineReducers({
    auth: authReducer,

    ui,
    filters,
    rrSites,
    htsSites,
    ctSites,

    gpsSites,
    
    newOnArtOverview,
    newOnArtTrends,
    newOnArtByAgeSex,
    medianTimeToArtStartByYear,
    medianTimeToArtStartByCounty,
    medianTimeToArtStartByPartner,
    timeFromDiagnosisToArtStart,

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

    viralLoadOverallUptakeSuppressionBySex,
    medianTimeTo1stVlByYear,
    medianTimeTo1stVlByCounty,
    medianTimeTo1stVlByPartner,
    viralLoadOverallUptakeSuppressionByFacility,

    treatmentOutcomesBySex,
    treatmentOutcomesByAge,
    treatmentOutcomesByYear,
    treatmentOutcomesByFacility,
    threeMonthRetention,
    sixMonthRetention,
    twelveMonthRetention,
    twentyFourMonthRetention,
});
