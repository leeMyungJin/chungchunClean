'use strict';

import * as wjcCore from '@grapecity/wijmo';
import * as wjCGrid from '@grapecity/wijmo.grid';

const _products = ['Widget', 'Gadget', 'Doohickey'];
const _colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
const _musicians = 'Paul,Mark,Pete,Ringo,Luke,Jacob,John,Nate,Zym,George,Toom,Crash,Boom,Dewd'.split(',');
const _someCountries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
const _allCountries = [
    'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua', 'Argentina', 'Armenia',
    'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
    'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bonaire', 'Bosnia', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cambodia', 'Cameroon', 'Canada', 'Canary Islands', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Channel Islands',
    'Chile', 'China', 'Christmas Island', 'Cocos Island', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', "Cote D'Ivoire",
    'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland',
    'France', 'French Guiana', 'French Polynesia', 'French Southern Ter', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar',
    'Great Britain', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guyana', 'Haiti', 'Honduras',
    'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan',
    'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea North', 'Korea South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
    'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malaysia', 'Malawi', 'Maldives',
    'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Midway Islands', 'Moldova', 'Monaco',
    'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Nambia', 'Nauru', 'Nepal', 'Netherland Antilles', 'Netherlands', 'Nevis',
    'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Norway', 'Oman', 'Pakistan', 'Palau Island',
    'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Island', 'Poland', 'Portugal', 'Puerto Rico',
    'Qatar', 'Republic of Montenegro', 'Republic of Serbia', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'St Barthelemy', 'St Eustatius',
    'St Helena', 'St Kitts-Nevis', 'St Lucia', 'St Maarten', 'Saipan', 'Samoa', 'San Marino', 'Saudi Arabia', 'Scotland', 'Senegal', 'Serbia',
    'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka',
    'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Tahiti', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo',
    'Tokelau', 'Tonga', 'Trinidad Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks & Caicos Is', 'Tuvalu', 'Uganda', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City State',
    'Venezuela', 'Vietnam', 'Virgin Islands (British)', 'Virgin Islands (USA)', 'Wake Island', 'Yemen', 'Zaire', 'Zambia', 'Zimbabwe'
];
const _glyphs = ['asterisk', 'calendar', 'check', 'circle', 'clock', 'diamond', 'down',
    'down-left', 'down-right', 'file', 'filter', 'left', 'minus', 'pencil', 'plus', 'right',
    'square', 'step-backward', 'step-forward', 'up', 'up-left', 'up-right'];
const _cities = 'York,Paris,Rome,Cairo,Florence,Sidney,Hamburg,Vancouver'.split(',');

// Common data service
export const DataService = {
    // data used to generate random items
    getData(count, allCountries = false) {
        var countries = allCountries ? _allCountries : _someCountries,
            data = [];
        for (var i = 0; i < count; i++) {
            data.push({
                id: i,
                country: countries[Math.round(Math.random() * (countries.length - 1))],
                date: new Date(2014, i % 12, i % 28),
                downloads: Math.round(Math.random() * 10000),
                sales: +(Math.random() * 10000).toFixed(2),
                active: i % 4 == 0
            });
        }
        return data;
    },

    // Pie Data Source
    getPieData() {
        var names = ['Oranges', 'Apples', 'Pears', 'Bananas', 'Pineapples'],
            data = [];

        // populate itemsSource
        for (var i = 0; i < names.length; i++) {
            data.push({
                name: names[i],
                value: Math.round(Math.random() * 100)
            });
        }

        return data;
    },

    getSomeCountries() {
        return _someCountries;
    },

    getAllCountries() {
        return _allCountries;
    },

    getGlyphs() {
        return _glyphs;
    },

    getProducts() {
        return _products;
    },

    getColors() {
        return _colors;
    },

    getMusicians() {
        return _musicians;
    },

    getTreeData() {
        return [
            {
                header: 'Electronics', img: '../resources/electronics.png', items: [
                    { header: 'Trimmers/Shavers' },
                    { header: 'Tablets' },
                    {
                        header: 'Phones', img: 'resources/phones.png', items: [
                            { header: 'Apple' },
                            { header: 'Motorola', newItem: true },
                            { header: 'Nokia' },
                            { header: 'Samsung' }
                        ]
                    },
                    { header: 'Speakers', newItem: true },
                    { header: 'Monitors' }
                ]
            },
            {
                header: 'Toys', img: 'resources/toys.png', items: [
                    { header: 'Shopkins' },
                    { header: 'Train Sets' },
                    { header: 'Science Kit', newItem: true },
                    { header: 'Play-Doh' },
                    { header: 'Crayola' }
                ]
            },
            {
                header: 'Home', img: 'resources/home.png', items: [
                    { header: 'Coffeee Maker' },
                    { header: 'Breadmaker', newItem: true },
                    { header: 'Solar Panel', newItem: true },
                    { header: 'Work Table' },
                    { header: 'Propane Grill' }
                ]
            }
        ];
    },

    // gets a simple data set for basic demos
    getSimpleDataSet() {
        var dtOct = new Date(2015, 9, 1),
            dtDec = new Date(2015, 11, 1),
            data = [
                { product: 'Wijmo', country: 'USA', sales: 10, downloads: 100, date: dtOct, active: true },
                { product: 'Wijmo', country: 'Japan', sales: 10, downloads: 100, date: dtOct, active: false },
                { product: 'Aoba', country: 'USA', sales: 10, downloads: 100, date: dtDec, active: true },
                { product: 'Aoba', country: 'Japan', sales: 10, downloads: 100, date: dtDec, active: false }
            ];
        for (var i = 0; i < 100 - 4; i++) {
            data.push({
                product: DataService.randomInt(1) ? 'Wijmo' : 'Aoba',
                country: DataService.randomInt(1) ? 'USA' : 'Japan',
                active: i % 2 == 0,
                date: new Date(2015 + DataService.randomInt(2), DataService.randomInt(11), DataService.randomInt(27) + 1),
                sales: 10 + DataService.randomInt(20),
                downloads: 10 + DataService.randomInt(190)
            });
        }
        return new wjcCore.CollectionView(data);
    },

    getMultiRowData() {
        var orders = [],
            today = new Date(),
            customers = [],
            firstNames = 'Aaron,Paul,John,Mark,Sue,Tom,Bill,Joe,Tony,Brad,Frank,Chris,Pat'.split(','),
            lastNames = 'Smith,Johnson,Richards,Bannon,Wong,Peters,White,Brown,Adams,Jennings'.split(','),
            states = 'SP,RS,RN,SC,CS,RT,BC'.split(','),
            shippers = [
                { id: 0, name: 'Speedy Express', email: 'speedy@gmail.com', phone: '431-3234', express: true },
                { id: 1, name: 'Flash Delivery', email: 'flash@gmail.com', phone: '431-6563', express: true },
                { id: 2, name: 'Logitrax', email: 'logitrax@gmail.com', phone: '431-3981', express: false },
                { id: 3, name: 'Acme Inc', email: 'acme@gmail.com', phone: '431-3113', express: false }
            ];
        for (let i = 0; i < 50; i++) {
            var first = firstNames[DataService.randBetween(0, firstNames.length - 1)],
                last = lastNames[DataService.randBetween(0, lastNames.length - 1)];
            customers.push({
                id: i,
                name: first + ' ' + last,
                address: DataService.randBetween(100, 10000) + ' ' + lastNames[DataService.randBetween(0, lastNames.length - 1)] + ' St.',
                city: _cities[DataService.randBetween(0, _cities.length - 1)],
                state: states[DataService.randBetween(0, states.length - 1)],
                zip: wjcCore.format('{p1:d5}-{p2:d3}', {
                    p1: DataService.randBetween(10000, 99999),
                    p2: DataService.randBetween(100, 999)
                }),
                email: first + '.' + last + '@gmail.com',
                phone: wjcCore.format('{p1:d3}-{p2:d4}', {
                    p1: DataService.randBetween(100, 999),
                    p2: DataService.randBetween(1000, 9999)
                })
            });
        }
        for (let i = 0; i < 20; i++) {
            var shipped = wjcCore.DateTime.addDays(today, -DataService.randBetween(1, 3000));
            orders.push({
                id: i,
                date: wjcCore.DateTime.addDays(shipped, -DataService.randBetween(1, 5)),
                shippedDate: shipped,
                amount: DataService.randBetween(10000, 500000) / 100,
                customer: customers[DataService.randBetween(0, customers.length - 1)],
                shipper: shippers[DataService.randBetween(0, shippers.length - 1)]
            });
        }
        return orders;
    },

    getLayoutDefs() {
        // sample layout definitions
        var cityMap = new wjCGrid.DataMap(_cities);
        var ldOneLine = [
            { cells: [{ binding: 'id', header: 'ID', cssClass: 'id' }] },
            { cells: [{ binding: 'date', header: 'Ordered' }] },
            { cells: [{ binding: 'shippedDate', header: 'Shipped' }] },
            { cells: [{ binding: 'amount', header: 'Amount', format: 'c', cssClass: 'amount' }] },
            { cells: [{ binding: 'customer.name', header: 'Customer' }] },
            { cells: [{ binding: 'customer.address', header: 'Address' }] },
            { cells: [{ binding: 'customer.city', header: 'City', dataMap: cityMap }] },
            { cells: [{ binding: 'customer.state', header: 'State', width: 45 }] },
            { cells: [{ binding: 'customer.zip', header: 'Zip' }] },
            { cells: [{ binding: 'customer.email', header: 'Customer Email', cssClass: 'email' }] },
            { cells: [{ binding: 'customer.phone', header: 'Customer Phone' }] },
            { cells: [{ binding: 'shipper.name', header: 'Shipper' }] },
            { cells: [{ binding: 'shipper.email', header: 'Shipper Email', cssClass: 'email' }] },
            { cells: [{ binding: 'shipper.phone', header: 'Shipper Phone' }] },
            { cells: [{ binding: 'shipper.express', header: 'Express' }] }
        ],
            ldTwoLines = [
                {
                    header: 'Order', colspan: 2, cells: [
                        { binding: 'id', header: 'ID', cssClass: 'id' },
                        { binding: 'date', header: 'Ordered' },
                        { binding: 'amount', header: 'Amount', format: 'c', cssClass: 'amount' },
                        { binding: 'shippedDate', header: 'Shipped' }
                    ]
                },
                {
                    header: 'Customer', colspan: 3, cells: [
                        { binding: 'customer.name', header: 'Name' },
                        { binding: 'customer.email', header: 'EMail', colspan: 2, cssClass: 'email' },
                        { binding: 'customer.address', header: 'Address' },
                        { binding: 'customer.city', header: 'City', dataMap: cityMap },
                        { binding: 'customer.state', header: 'State', width: 45 }
                    ]
                },
                {
                    header: 'Shipper', cells: [
                        { binding: 'shipper.name', header: 'Shipper', colspan: 2 },
                        { binding: 'shipper.email', header: 'EMail', cssClass: 'email' },
                        { binding: 'shipper.express', header: 'Express' }
                    ]
                }
            ],
            ldThreeLines = [
                {
                    header: 'Order', colspan: 2, cells: [
                        { binding: 'id', header: 'ID', colspan: 2, cssClass: 'id' },
                        { binding: 'amount', header: 'Amount', format: 'c', colspan: 2, cssClass: 'amount' },
                        { binding: 'date', header: 'Ordered' },
                        { binding: 'shippedDate', header: 'Shipped' }
                    ]
                },
                {
                    header: 'Customer', colspan: 3, cells: [
                        { binding: 'customer.name', header: 'Name' },
                        { binding: 'customer.email', header: 'EMail', colspan: 2, cssClass: 'email' },
                        { binding: 'customer.address', header: 'Address', colspan: 2 },
                        { binding: 'customer.phone', header: 'Phone' },
                        { binding: 'customer.city', header: 'City', dataMap: cityMap },
                        { binding: 'customer.state', header: 'State', width: 45 },
                        { binding: 'customer.zip', header: 'Zip' },
                    ]
                },
                {
                    header: 'Shipper', cells: [
                        { binding: 'shipper.name', header: 'Shipper' },
                        { binding: 'shipper.email', header: 'EMail', cssClass: 'email' },
                        { binding: 'shipper.express', header: 'Express' }
                    ]
                }
            ];

        return new wjcCore.CollectionView([
            {
                name: 'Traditional',
                description: 'Traditional grid view, with one row per record. The user must scroll horizontally to see the whole record.',
                def: ldOneLine
            },
            {
                name: 'Compact',
                description: 'This view uses two rows per record. The layout is divided into three groups: order, customer, and shipper.',
                def: ldTwoLines
            },
            {
                name: 'Detailed',
                description: 'This view uses three rows per record. The layout is divided into three groups: order, customer, and shipper.',
                def: ldThreeLines
            }])
    },

    getFinanciaChartData() {
        return [
            { "date": "01/05/15", "open": 77.98, "high": 79.25, "low": 76.86, "close": 77.19, "volume": 26452191 },
            { "date": "01/06/15", "open": 77.23, "high": 77.59, "low": 75.36, "close": 76.15, "volume": 27399288 },
            { "date": "01/07/15", "open": 76.76, "high": 77.36, "low": 75.82, "close": 76.15, "volume": 22045333 },
            { "date": "01/08/15", "open": 76.74, "high": 78.23, "low": 76.08, "close": 78.18, "volume": 23960953 },
            { "date": "01/09/15", "open": 78.2, "high": 78.62, "low": 77.2, "close": 77.74, "volume": 21157007 },
            { "date": "01/12/15", "open": 77.84, "high": 78, "low": 76.21, "close": 76.72, "volume": 19190194 },
            { "date": "01/13/15", "open": 77.23, "high": 78.08, "low": 75.85, "close": 76.45, "volume": 25179561 },
            { "date": "01/14/15", "open": 76.42, "high": 77.2, "low": 76.03, "close": 76.28, "volume": 25918564 },
            { "date": "01/15/15", "open": 76.4, "high": 76.57, "low": 73.54, "close": 74.05, "volume": 34133974 },
            { "date": "01/16/15", "open": 74.04, "high": 75.32, "low": 73.84, "close": 75.18, "volume": 21791529 },
            { "date": "01/20/15", "open": 75.72, "high": 76.31, "low": 74.82, "close": 76.24, "volume": 22821614 },
            { "date": "01/21/15", "open": 76.16, "high": 77.3, "low": 75.85, "close": 76.74, "volume": 25096737 },
            { "date": "01/22/15", "open": 77.17, "high": 77.75, "low": 76.68, "close": 77.65, "volume": 19519458 },
            { "date": "01/23/15", "open": 77.65, "high": 78.19, "low": 77.04, "close": 77.83, "volume": 16746503 },
            { "date": "01/26/15", "open": 77.98, "high": 78.47, "low": 77.29, "close": 77.5, "volume": 19260820 },
            { "date": "01/27/15", "open": 76.71, "high": 76.88, "low": 75.63, "close": 75.78, "volume": 20109977 },
            { "date": "01/28/15", "open": 76.9, "high": 77.64, "low": 76, "close": 76.24, "volume": 53306422 },
            { "date": "01/29/15", "open": 76.85, "high": 78.02, "low": 74.21, "close": 78, "volume": 61293468 },
            { "date": "01/30/15", "open": 78, "high": 78.16, "low": 75.75, "close": 75.91, "volume": 42649491 },
            { "date": "02/02/15", "open": 76.11, "high": 76.14, "low": 73.75, "close": 74.99, "volume": 41955258 },
            { "date": "02/03/15", "open": 75.19, "high": 75.58, "low": 73.86, "close": 75.4, "volume": 26957714 },
            { "date": "02/04/15", "open": 75.09, "high": 76.35, "low": 75.01, "close": 75.63, "volume": 20277368 },
            { "date": "02/05/15", "open": 75.71, "high": 75.98, "low": 75.21, "close": 75.62, "volume": 15062573 },
            { "date": "02/06/15", "open": 75.68, "high": 75.7, "low": 74.25, "close": 74.47, "volume": 21210994 },
            { "date": "02/09/15", "open": 74.05, "high": 74.83, "low": 73.45, "close": 74.44, "volume": 16194322 },
            { "date": "02/10/15", "open": 74.85, "high": 75.34, "low": 74.5, "close": 75.19, "volume": 15811344 },
            { "date": "02/11/15", "open": 75.09, "high": 76.75, "low": 75.03, "close": 76.51, "volume": 20877427 },
            { "date": "02/12/15", "open": 76.86, "high": 76.87, "low": 75.89, "close": 76.23, "volume": 17234976 },
            { "date": "02/13/15", "open": 76.46, "high": 76.48, "low": 75.5, "close": 75.74, "volume": 18621860 },
            { "date": "02/17/15", "open": 75.3, "high": 76.91, "low": 75.08, "close": 75.6, "volume": 25254400 },
            { "date": "02/18/15", "open": 75.94, "high": 76.9, "low": 75.45, "close": 76.71, "volume": 22426421 },
            { "date": "02/19/15", "open": 76.99, "high": 79.84, "low": 76.95, "close": 79.42, "volume": 45851177 },
            { "date": "02/20/15", "open": 79.55, "high": 80.34, "low": 79.2, "close": 79.9, "volume": 36931698 },
            { "date": "02/23/15", "open": 79.96, "high": 80.19, "low": 78.38, "close": 78.84, "volume": 24139056 },
            { "date": "02/24/15", "open": 78.5, "high": 79.48, "low": 78.1, "close": 78.45, "volume": 18897133 },
            { "date": "02/25/15", "open": 78.5, "high": 80.2, "low": 78.5, "close": 79.56, "volume": 25593800 },
            { "date": "02/26/15", "open": 79.88, "high": 81.37, "low": 79.72, "close": 80.41, "volume": 31111891 },
            { "date": "02/27/15", "open": 80.68, "high": 81.23, "low": 78.62, "close": 78.97, "volume": 30739197 },
            { "date": "03/02/15", "open": 79, "high": 79.86, "low": 78.52, "close": 79.75, "volume": 21662537 },
            { "date": "03/03/15", "open": 79.61, "high": 79.7, "low": 78.52, "close": 79.6, "volume": 18634973 },
            { "date": "03/04/15", "open": 79.3, "high": 81.15, "low": 78.85, "close": 80.9, "volume": 28126686 },
            { "date": "03/05/15", "open": 81.23, "high": 81.99, "low": 81.05, "close": 81.21, "volume": 27825733 },
            { "date": "03/06/15", "open": 80.9, "high": 81.33, "low": 79.83, "close": 80, "volume": 24488581 },
            { "date": "03/09/15", "open": 79.68, "high": 79.91, "low": 78.63, "close": 79.44, "volume": 18925097 },
            { "date": "03/10/15", "open": 78.5, "high": 79.26, "low": 77.55, "close": 77.55, "volume": 23067057 },
            { "date": "03/11/15", "open": 77.8, "high": 78.43, "low": 77.26, "close": 77.57, "volume": 20215704 },
            { "date": "03/12/15", "open": 78.1, "high": 79.05, "low": 77.91, "close": 78.93, "volume": 16093319 },
            { "date": "03/13/15", "open": 78.6, "high": 79.38, "low": 77.68, "close": 78.05, "volume": 18557296 },
            { "date": "03/16/15", "open": 77.96, "high": 78.12, "low": 77.36, "close": 78.07, "volume": 19305406 },
            { "date": "03/17/15", "open": 78.36, "high": 79.78, "low": 78.34, "close": 79.36, "volume": 22169969 },
            { "date": "03/18/15", "open": 79.25, "high": 81.24, "low": 79.17, "close": 80.91, "volume": 36912446 },
            { "date": "03/19/15", "open": 81.12, "high": 83, "low": 81, "close": 82.75, "volume": 42099523 },
            { "date": "03/20/15", "open": 83.39, "high": 84.6, "low": 83.07, "close": 83.8, "volume": 44466323 },
            { "date": "03/23/15", "open": 83.92, "high": 84.96, "low": 83.3, "close": 84.43, "volume": 27357333 },
            { "date": "03/24/15", "open": 84.71, "high": 86.07, "low": 84.52, "close": 85.31, "volume": 32576522 },
            { "date": "03/25/15", "open": 85.5, "high": 85.52, "low": 82.92, "close": 82.92, "volume": 37436147 },
            { "date": "03/26/15", "open": 82.72, "high": 83.77, "low": 82.14, "close": 83.01, "volume": 32794800 },
            { "date": "03/27/15", "open": 83.38, "high": 83.95, "low": 82.88, "close": 83.3, "volume": 18372582 },
            { "date": "03/30/15", "open": 83.81, "high": 84.34, "low": 82.41, "close": 83.2, "volume": 24527686 },
            { "date": "03/31/15", "open": 82.9, "high": 83.5, "low": 82.21, "close": 82.22, "volume": 19734277 },
            { "date": "04/01/15", "open": 82.5, "high": 82.72, "low": 80.87, "close": 81.66, "volume": 22058167 },
            { "date": "04/02/15", "open": 82.25, "high": 82.56, "low": 81.44, "close": 81.56, "volume": 19664053 },
            { "date": "04/06/15", "open": 80.8, "high": 82.81, "low": 80.8, "close": 82.44, "volume": 19062934 },
            { "date": "04/07/15", "open": 82.65, "high": 83.42, "low": 82.22, "close": 82.32, "volume": 17467042 },
            { "date": "04/08/15", "open": 82.63, "high": 83.1, "low": 81.84, "close": 82.28, "volume": 18966732 },
            { "date": "04/09/15", "open": 82.5, "high": 82.8, "low": 81.71, "close": 82.17, "volume": 15927281 },
            { "date": "04/10/15", "open": 82.21, "high": 82.61, "low": 81.91, "close": 82.04, "volume": 12529738 },
            { "date": "04/13/15", "open": 81.93, "high": 83.94, "low": 81.92, "close": 83.01, "volume": 26883100 },
            { "date": "04/14/15", "open": 83.17, "high": 83.69, "low": 82.44, "close": 83.52, "volume": 19634200 },
            { "date": "04/15/15", "open": 83.55, "high": 83.66, "low": 82.27, "close": 82.71, "volume": 22390900 },
            { "date": "04/16/15", "open": 82.47, "high": 83.07, "low": 82.15, "close": 82.31, "volume": 13769700 },
            { "date": "04/17/15", "open": 81.48, "high": 82.11, "low": 80.37, "close": 80.78, "volume": 24076300 },
            { "date": "04/20/15", "open": 81.54, "high": 83.15, "low": 81.24, "close": 83.09, "volume": 28796800 },
            { "date": "04/21/15", "open": 84, "high": 84.49, "low": 83.54, "close": 83.62, "volume": 27171900 },
            { "date": "04/22/15", "open": 84.32, "high": 84.74, "low": 83.65, "close": 84.63, "volume": 45548000 },
            { "date": "04/23/15", "open": 84.1, "high": 85.59, "low": 82.41, "close": 82.41, "volume": 73728100 },
            { "date": "04/24/15", "open": 82.77, "high": 82.94, "low": 81.48, "close": 81.53, "volume": 29660400 },
            { "date": "04/27/15", "open": 81.87, "high": 82.93, "low": 81.63, "close": 81.91, "volume": 25446000 },
            { "date": "04/28/15", "open": 81.83, "high": 81.9, "low": 80.23, "close": 80.68, "volume": 23775300 }
        ]
    },

    getFinanciaChartType() {
        return 'Area,Line,Column,Candlestick,HighLowOpenClose,HeikinAshi,LineBreak,Renko,Kagi,ColumnVolume,EquiVolume,CandleVolume,ArmsCandleVolume'.split(',');
    },

    getBindingYs() {
        return {
            0: 'close',
            1: 'close',
            2: 'close',
            3: 'high,low,open,close',
            4: 'high,low,open,close',
            5: 'high,low,open,close',
            6: 'high,low,open,close',
            7: 'high,low,open,close',
            8: 'high,low,open,close',
            9: 'close,volume',
            10: 'high,low,open,close,volume',
            11: 'high,low,open,close,volume',
            12: 'high,low,open,close,volume'
        }
    },

    getGroupCVData() {
        var data = [{
            type: 'Music',
            items: [{
                type: 'Country',
                items: [{
                    type: 'Classic Country',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Cowboy Country',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Outlaw Country',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Western Swing',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Roadhouse Country',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Rock',
                items: [{
                    type: 'Hard Rock',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Blues Rock',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Funk Rock',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Rap Rock',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Guitar Rock',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Progressive Rock',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Classical',
                items: [{
                    type: 'Symphonies',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Chamber Music',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Soundtracks',
                items: [{
                    type: 'Movie Soundtracks',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Musical Soundtracks',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Jazz',
                items: [{
                    type: 'Smooth Jazz',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Vocal Jazz',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Jazz Fusion',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Swing Jazz',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Cool Jazz',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Traditional Jazz',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Electronic',
                items: [{
                    type: 'Electronica',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Disco',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'House',
                    sales: DataService.randomInt(100)
                }]
            }]
        }, {
            type: 'Video',
            items: [{
                type: 'Movie',
                items: [{
                    type: 'Kid & Family',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Action & Adventure',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Animation',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Comedy',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Drama',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Romance',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'TV',
                items: [{
                    type: 'Science Fiction',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Documentary',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Fantasy',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Military & War',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Horror',
                    sales: DataService.randomInt(100)
                }]
            }]
        }, {
            type: 'Books',
            items: [{
                type: 'Arts & Photography',
                items: [{
                    type: 'Architecture',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Graphic Design',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Drawing',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Photography',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Performing Arts',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: "Children's Books",
                items: [{
                    type: 'Beginning Readers',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Board Books',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Chapter Books',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Coloring Books',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Picture Books',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Sound Books',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'History',
                items: [{
                    type: 'Ancient',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Medieval',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Renaissance',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Mystery',
                items: [{
                    type: 'Mystery',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Thriller & Suspense',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Romance',
                items: [{
                    type: 'Action & Adventure',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Holidays',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Romantic Comedy',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Romantic Suspense',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Western',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Historical',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Sci-Fi & Fantasy',
                items: [{
                    type: 'Fantasy',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Gaming',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Science Fiction',
                    sales: DataService.randomInt(100)
                }]
            }]
        }, {
            type: 'Electronics',
            items: [{
                type: 'Camera',
                items: [{
                    type: 'Digital Cameras',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Film Photography',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Lenses',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Video',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Accessories',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Headphones',
                items: [{
                    type: 'Earbud headphones',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Over-ear headphones',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'On-ear headphones',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Bluetooth headphones',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Noise-cancelling headphones',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Audiophile headphones',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Cell Phones',
                items: [{
                    type: 'Cell Phones',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Accessories',
                    items: [{
                        type: 'Batteries',
                        sales: DataService.randomInt(100)
                    }, {
                        type: 'Bluetooth Headsets',
                        sales: DataService.randomInt(100)
                    }, {
                        type: 'Bluetooth Speakers',
                        sales: DataService.randomInt(100)
                    }, {
                        type: 'Chargers',
                        sales: DataService.randomInt(100)
                    }, {
                        type: 'Screen Protectors',
                        sales: DataService.randomInt(100)
                    }]
                }]
            }, {
                type: 'Wearable Technology',
                items: [{
                    type: 'Activity Trackers',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Smart Watches',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Sports & GPS Watches',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Virtual Reality Headsets',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Wearable Cameras',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Smart Glasses',
                    sales: DataService.randomInt(100)
                }]
            }]
        }, {
            type: 'Computers & Tablets',
            items: [{
                type: 'Desktops',
                items: [{
                    type: 'All-in-ones',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Minis',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Towers',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Laptops',
                items: [{
                    type: '2 in 1 laptops',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Traditional laptops',
                    sales: DataService.randomInt(100)
                }]
            }, {
                type: 'Tablets',
                items: [{
                    type: 'iOS',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Andriod',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Fire os',
                    sales: DataService.randomInt(100)
                }, {
                    type: 'Windows',
                    sales: DataService.randomInt(100)
                }]
            }]
        }];
        return data;
    },

    getHierarchicalData() {
        var data = [],
            quarters = ['Q1', 'Q2', 'Q3', 'Q4'],
            months = [[{
                name: 'Jan',
                value: 1
            }, {
                name: 'Feb',
                value: 2
            }, {
                name: 'Mar',
                value: 3
            }], [{
                name: 'Apr',
                value: 4
            }, {
                name: 'May',
                value: 5
            }, {
                name: 'June',
                value: 6
            }], [{
                name: 'Jul',
                value: 7
            }, {
                name: 'Aug',
                value: 8
            }, {
                name: 'Sep',
                value: 9
            }], [{
                name: 'Oct',
                value: 10
            }, {
                name: 'Nov',
                value: 11
            }, {
                name: 'Dec',
                value: 12
            }]],
            years = [], year = new Date().getFullYear(), yearLen, i, len = 100;

        yearLen = 3;
        for (i = yearLen; i > 0; i--) {
            years.push(year - i);
        }

        var y, q, m;

        for (i = 0; i < len; i++) {
            y = Math.floor(Math.random() * yearLen);
            q = Math.floor(Math.random() * 4);
            m = Math.floor(Math.random() * 3);

            data.push({
                year: years[y],
                quarter: quarters[q],
                month: months[q][m].name,
                monthVal: months[q][m].value,
                value: Math.round(Math.random() * 100)
            });
        }

        var cv = new wjcCore.CollectionView(data);


        cv.sortDescriptions.push(new wjcCore.SortDescription('year', false));
        cv.sortDescriptions.push(new wjcCore.SortDescription('quarter', false));
        cv.sortDescriptions.push(new wjcCore.SortDescription('monthVal', false));
        cv.groupDescriptions.push(new wjcCore.PropertyGroupDescription('year'));
        cv.groupDescriptions.push(new wjcCore.PropertyGroupDescription('quarter'));
        cv.groupDescriptions.push(new wjcCore.PropertyGroupDescription('month'));
        return cv;
    },

    getRadarData() {
        var data = [],
            countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');

        // populate itemsSource
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.ceil(Math.random() * 80) + 20,
                sales: Math.ceil(Math.random() * 80) + 20
            });
        }
        return data;
    },

    randBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    randomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    },
}

