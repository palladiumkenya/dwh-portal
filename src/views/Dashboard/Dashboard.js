import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import ActivePopulation from '../../assets/custom/ActivePopulation.PNG';
import AdultMan from '../../assets/custom/AdultMan.png';
import AdultWoman from '../../assets/custom/AdultWoman.png';

const options = {
  chart: {
    type: 'pie'
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: 'Ever on ART(n)=1,421,382',
    style: {
      fontSize: '10px',
    }
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    pie: {
      dataLabels: {
        format: '<strong> {point.name} </strong>: {point.percentage:.1f} % <br/> ({point.y})'
      },
      innerSize: '85%'
    }
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        title: {
          enabled: false
        }
      }
    }]
  },
  series: [{
    name: 'ART Outcomes',
    colorByPoint: true,
    data: [
      {
        name: 'Active ART',
        y: 662980,
        color: '#4E79A7'
      },
      {
        name: 'Undocumented Lost',
        y: 326041,
        color: '#EDC948'
      },
      {
        name: 'Transfer Out',
        y: 153791,
        color: '#59A14F'
      },
      {
        name: 'Stopped ART',
        y: 96,
        color: '#f1c40f'
      },
      {
        name: 'Lost to Follow Up',
        y: 158920,
        color: '#E15759'
      },
      {
        name: 'Dead',
        y: 57225,
        color: '#F28E2B'
      },
      {
        name: 'Defaulters',
        y: 61377,
        color: '#B07AA1'
      }
    ]
  }]
};

const stackedOptions = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Clients Ever on ART - By Age and Gender'
  },
  xAxis: {
    categories: ['Under 10 Years', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', 'Over 45']
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Ever on ART'
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
    shared: true
  },
  plotOptions: {
    column: {
      stacking: 'percent'
    }
  },
  credits: {
    enabled: false
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          enabled: false
        }
      }
    }]
  },
  series: [
      {
        name: 'Female',
        data: [31679, 20003, 27917, 72188, 119005, 155048, 144086, 129525, 250762],
        color: '#FC719E'
      },
      {
        name: 'Male',
        data: [30208, 18584, 16308, 14668, 26342, 49962, 64056, 70537, 180504],
        color: '#1F77B4'
      }
  ]
};

const divStyle = {
  textAlign: 'center',
  height: '50px',
  padding: '15px',
  fontSize: 16,
  color: 'blue'
};

const divAdultManStyle = {
  textAlign: 'center',
  padding: '15px',
  fontSize: 16,
  color: 'blue'
};

const marginTop = {
  marginTop: '10px'
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className={"col-6"}>
            <div className={"row"}>
              <div className={"col-12"}>
                <div className={"row"}>
                  <div className={"col-2 col-sm-2"}>
                    <img src={ActivePopulation} width={"auto"} height={"50"}  alt={"Active Population"} />
                  </div>
                  <div className={"col-10 col-sm-10"} style={divStyle}>
                    Ever on ART: 1,421,382
                  </div>
                </div>
              </div>
            </div>
            <div className={"row"} style={marginTop}>
              <div className={"col-6"}>
                <div className={"row"}>
                  <div className={"col-2 col-sm-2"}>
                    <img src={AdultMan} width={"auto"} height={"50"}  alt={"Adult Man"} />
                  </div>

                  <div className={"col-10 col-sm-10"} style={divAdultManStyle}>
                    Males: 442,770
                  </div>
                </div>
              </div>
              <div className={"col-6"}>
                <div className={"row"}>
                  <div className={"col-2 col-sm-2"}>
                    <img src={AdultWoman} width={"auto"} height={"50"}  alt={"Adult Woman"} />
                  </div>

                  <div className={"col-10 col-sm-10"} style={divAdultManStyle}>
                    Females: 897,127
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"col-6"}>
            <div className={"row"}>
              <div className={"col-6"}>
                <div className={"row"}>
                  <div className={"col-2 col-sm-2"}>
                    <img src={AdultWoman} width={"auto"} height={"50"}  alt={"Adult Woman"} />
                  </div>
                </div>
                Adults(15+):
              </div>
              <div className={"col-6"}>
                Children:
              </div>
            </div>
            <div className={"row"}>
              <div className={"col-12"}>
                Adolescents(10-19 yrs):
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>

          <div className="col-6">
            <HighchartsReact highcharts={Highcharts} options={stackedOptions} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
