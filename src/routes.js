import Home from './views/Home/Home';
import RR from './views/RR/RR';
import HTS from './views/HTS/HTS';
import CT from "./views/CT/CT";
import GIS from "./views/GIS/GIS";
import HRH from "./views/HRH/HRH";
import Resources from './views/Resources/Resources';

const routes = [
  { path: "/", exact: true, name: "Home", component: Home, private: false },
  { path: "/reporting-rates", exact: true, name: "Reporting Rates", component: RR, private: false },
  { path: "/hiv-testing", exact: true, name: 'HIV Testing & Prevention', component: HTS, private: false },
  { path: "/hiv-treatment", exact: true, name: "HIV Treatment", component: CT, private: false },
  { path: "/gis", exact: true, name: "GIS", component: GIS, private: false },
  { path: "/hrh", exact: true, name: "HRH", component: HRH, private: false },
  { path: "/resources", exact: true, name: "Resources", component: Resources, private: true }
];

export default routes;
