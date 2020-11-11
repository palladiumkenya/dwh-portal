import Home from './views/Home/Home';
import ReportingRates from './views/ReportingRates/ReportingRates';
import HTS from './views/HTS/HTS';
import CT from "./views/CT/CT";
import GIS from "./views/GIS/GIS";
import HRH from "./views/HRH/HRH";

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/reporting-rates", exact: true, name: "Reporting Rates", component: ReportingRates },
  { path: "/hiv-testing", exact: true, name: 'HIV Testing & Prevention', component: HTS },
  { path: "/hiv-treatment", exact: true, name: "HIV Treatment", component: CT },
  { path: "/gis", exact: true, name: "GIS", component: GIS },
  { path: "/hrh", exact: true, name: "HRH", component: HRH }
];

export default routes;
