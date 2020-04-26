import React, { Component } from "react";
import { Form } from "reactstrap";
import axios from "axios";

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counties: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:7000/api/reportingrates/getcounties`)
      .then((res) => {
        const counties = res.data.map((county) => {
          return { value: county.County, display: county.County };
        });
        this.setState({
          counties: [{ value: "", display: "(Select your county)" }].concat(
            counties
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Form>
        <div className="row">
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="county">County</label>
              <select className="form-control" id="county">
                {this.state.counties.map((county) => (
                  <option key={county.value} value={county.value}>
                    {county.display}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="agency">Agency</label>
              <select className="form-control" id="agency">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="serviceDeliveryPartner">
                Service Delivery Partner
              </label>
              <select className="form-control" id="serviceDeliveryPartner">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="uploadMonthYear">Upload Month/Year</label>
              <select className="form-control" id="uploadMonthYear">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

export default Filter;
