import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
    render() {
        const current_date = new Date();

        return (
            <React.Fragment>
                <span><a href="https://thepalladiumgroup.com">Palladium</a> &copy; {current_date.getFullYear() } KeHMIS.</span>
                <span className="ml-auto"><span className={"fa fa-envelope"}></span>help@palladiumgroup.on.spiceworks.com &nbsp;&nbsp; <span className={"fa fa-phone"}> 0800-722440</span></span>
            </React.Fragment>
        );
    }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
