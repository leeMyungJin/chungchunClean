// get an array with hierarchical row definitions
// the 'rows' property of the objects contain child rows
// the 'collapseTo' property specifies the binding of their child row that 
// should remain visible when the group is collapsed.
export function getRowGroups(): any[] {
    const allocTemplate = '<span class=${value > .2 ? "big-val" : "small-val"}>${value}:${col.format}</span>';
    const amountTemplate = '<span class=${value > 50000 ? "big-val" : "small-val"}>${value}:${col.format}</span>';
    return [
        { binding: 'name', header: 'Name', height: 50 },
        { binding: 'currency', header: 'Curr', height: 50, align: 'center' },
        {
            header: 'Perf', width: 100, align: 'center', collapseTo: 'perf.ytd', rows: [
                { binding: 'perf.ytd', header: 'YTD', format: 'p2', width: 80, cssClass: 'main-row' },
                { binding: 'perf.m1', header: '1 M', format: 'p2', width: 60 },
                { binding: 'perf.m6', header: '6 M', format: 'p2', width: 60 },
                { binding: 'perf.m12', header: '12 M', format: 'p2', width: 60 },
            ]
        },
        {
            header: 'Allocation', width: 100, align: 'center', collapseTo: 'alloc.amount', rows: [
                { binding: 'alloc.stock', header: 'Stocks', format: 'p0', width: 80, cellTemplate: allocTemplate },
                { binding: 'alloc.bond', header: 'Bonds', format: 'p0', width: 80, cellTemplate: allocTemplate },
                { binding: 'alloc.cash', header: 'Cash', format: 'p0', width: 80, cellTemplate: allocTemplate },
                { binding: 'alloc.other', header: 'Other', format: 'p0', width: 80, cellTemplate: allocTemplate },
                { binding: 'alloc.amount', header: 'Amount', format: 'c0', width: 80, cssClass: 'main-row', cellTemplate: amountTemplate }
            ]
        }
    ];
}

export function getDeeperRowGroups(): any[] {
    return [
        { binding: 'name', header: 'Name', height: 50 },
        { binding: 'currency', header: 'Curr', height: 50, align: 'center' },
        {
            header: 'Allocation', width: 100, align: 'center', collapseTo: 'alloc.amount', rows: [
                { binding: 'alloc.stock', header: 'Stocks', format: 'p0' },
                { binding: 'alloc.bond', header: 'Bonds', format: 'p0' },
                {
                    header: 'Detail', width: 80, align: 'center', rows: [
                        { binding: 'alloc.cash', header: 'Cash', format: 'p0', width: 60 },
                        { binding: 'alloc.other', header: 'Other', format: 'p0', width: 60 },
                    ]
                },
                { binding: 'alloc.amount', header: 'Amount', format: 'c0', cssClassAll: 'highlight' },
            ]
        },
        {
            header: 'Perf', width: 100, align: 'center', rows: [
                {
                    header: 'Short', width: 80, align: 'center', collapseTo: 'perf.ytd', isCollapsed: true, rows: [
                        { binding: 'perf.ytd', header: 'YTD', format: 'p2', width: 60, cssClassAll: 'highlight' },
                        { binding: 'perf.m1', header: '1 M', format: 'p2', width: 60 },
                    ]
                },
                {
                    header: 'Long', width: 80, align: 'center', collapseTo: 'perf.m12', isCollapsed: true, rows: [
                        { binding: 'perf.m6', header: '6 M', format: 'p2', width: 60 },
                        { binding: 'perf.m12', header: '12 M', format: 'p2', width: 60, cssClassAll: 'highlight' }
                    ]
                },
            ]
        },
    ];
}

// get some sample data
export function getData(): any[] {
    return [{
        name: 'Constant Growth',
        currency: 'USD',
        perf: {
            ytd: .0523,
            m1: 0.0142,
            m6: 0.0443,
            m12: 0.0743
        },
        alloc: {
            stock: 0.17,
            bond: 0.32,
            cash: 0.36,
            other: 0.15,
            amount: 23432
        }
    }, {
        name: 'Optimus Prime',
        currency: 'EUR',
        perf: {
            ytd: .0343,
            m1: 0.043,
            m6: 0.0244,
            m12: 0.0543
        },
        alloc: {
            stock: 0.61,
            bond: 0.8,
            cash: 0.9,
            other: 0.22,
            amount: 43223
        }
    }, {
        name: 'Crypto Planet',
        currency: 'BTC',
        perf: {
            ytd: .0343,
            m1: 0.014,
            m6: 0.034,
            m12: 0.01243
        },
        alloc: {
            stock: 0.1,
            bond: 0,
            cash: 0,
            other: 0.9,
            amount: 2234
        }
    }, {
        name: 'MegaZone',
        currency: 'EUR',
        perf: {
            ytd: .0443,
            m1: 0.034,
            m6: 0.0424,
            m12: 0.0343
        },
        alloc: {
            stock: 0.51,
            bond: 0.9,
            cash: 0.8,
            other: 0.12,
            amount: 32234
        }
    }, {
        name: 'Serenity',
        currency: 'YEN',
        perf: {
            ytd: .0522,
            m1: 0.0143,
            m6: 0.0458,
            m12: 0.0732
        },
        alloc: {
            stock: 0.66,
            bond: 0.09,
            cash: 0.19,
            other: 0.06,
            amount: 65624
        }
    }];
}