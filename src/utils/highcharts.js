import './proj4';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import ke from './map-ke.json';
import keAll from './map-ke-all.json';
import keCounty from './map-ke-county.json';
import keProvince from './map-ke-province.json';

if (typeof window !== 'undefined') {
    HighchartsMap(Highcharts);
    Highcharts.maps["custom/ke"] = ke;
    Highcharts.maps["custom/ke-all"] = keAll;
    Highcharts.maps["custom/ke-county"] = keCounty;
    Highcharts.maps["custom/ke-province"] = keProvince;
}

export default Highcharts;