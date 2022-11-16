import React from 'react';

const DefaultFooter = () =>  {
    return (
        <>
            <span>
                <span className={'fa fa-envelope'}></span>{' '}
                help@palladiumgroup.on.spiceworks.com
            </span>
            <span className="ml-auto">
                <span className={'fa fa-phone'}> 0800-722440</span>
            </span>
            <span className="ml-auto">
                <span className={'fa fa-lock'}>
                    {' '}
                    <a href="https://thepalladiumgroup.com/privacy">
                        {' '}
                        Privacy Policy
                    </a>
                </span>
            </span>
        </>
    );
}

export default DefaultFooter;
