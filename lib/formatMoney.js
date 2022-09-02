import React from 'react'

function formatMoney(amount = 0) {
    var Int1 = require('intl');
    const options = {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
    }
    
    if(amount % 100 === 0) {
        options.minimumFractionDigits = 0
    }

    const formatter = Intl.NumberFormat('en-US', options);
    return formatter.format(amount / 100)
}

export default formatMoney
