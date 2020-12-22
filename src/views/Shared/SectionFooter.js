import React from 'react';

const SectionFooter = ({ overview }) => {
    return (
        <>
            <hr />
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <span className="reporting-rates-overview-text">
                                {overview}
                            </span>
                        </div>
                        <div className="col-6">
                            <div className="reporting-rates-overview-copyright">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
        </>
    );
};

export default SectionFooter;
