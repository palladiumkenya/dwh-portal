import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import TxNew from './TX_NEW/TxNew';
import TxCurr from './TX_CURR/TxCurr';
import HTSTested from './HTS_TESTED/HTSTested';
import HTSPOS from './HTS_POS/HTSPOS';

const Comparison = () => {
    const dispatch = useDispatch();
    const indicator = useSelector(state => state.filters.indicators);

    let selcetedIndicator = (i) => {
        if (i === 'Tx_New') {
            return <TxNew/>;
        } else if (i === 'Tx_Curr') {
            return <TxCurr/>;
        } else if (i === 'HTS_TESTED') {
            return <HTSTested/>;
        } else if (i === 'HTS_POS') {
            return <HTSPOS/>;
        } else {
            return <TxNew/>;
        }
    };

    return (
        <>{selcetedIndicator(indicator)}</>
    );
};


export default Comparison;
