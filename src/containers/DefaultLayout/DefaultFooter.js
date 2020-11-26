import React from 'react';

const DefaultFooter = () =>  {
    const current_date = new Date();
    return (
        <>
            <span><a href="https://thepalladiumgroup.com">Palladium</a> &copy; {current_date.getFullYear() } KeHMIS.</span>
            <span className="ml-auto"><span className={"fa fa-envelope"}></span>help@palladiumgroup.on.spiceworks.com &nbsp;&nbsp; <span className={"fa fa-phone"}> 0800-722440</span></span>
        </>
    );
}

export default DefaultFooter;
