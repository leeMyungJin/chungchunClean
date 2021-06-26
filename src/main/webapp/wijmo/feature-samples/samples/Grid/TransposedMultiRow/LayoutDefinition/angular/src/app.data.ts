import { Injectable } from '@angular/core';

import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';

interface Cell {
    binding: string;
    header: string;
    cssClass?: string;
    format?: string;
    isReadOnly?: boolean;
    wordWrap?: boolean;
    width: number;
}
interface Line {
    Cells: Cell[];
    header?: string;
    colspan?: number;
}
export interface AppData {
    orders: wjCore.CollectionView;
    groupedOrders: wjCore.CollectionView;
    pagedOrders: wjCore.CollectionView;
    addNewOrders: wjCore.CollectionView;
    ldOneLine: Cell[];
    ldTwoLines: Line[];
    ldThreeLines: Line[];
    layoutDefs: wjCore.CollectionView;
}

@Injectable()
export class DataService {
    getData(): AppData {
        // create some data
        let appData: any = {},
            customers = [],
            firstNames = 'Aaron,Paul,John,Mark,Sue,Tom,Bill,Joe,Tony,Brad,Frank,Chris,Pat'.split(','),
            lastNames = 'Smith,Johnson,Richards,Bannon,Wong,Peters,White,Brown,Adams,Jennings'.split(','),
            cities = 'York,Paris,Rome,Cairo,Florence,Sidney,Hamburg,Vancouver'.split(','),
            states = 'SP,RS,RN,SC,CS,RT,BC'.split(',');
        for (let i = 0; i < 50; i++) {
            let first = randArray(firstNames),
                last = randArray(lastNames);
            customers.push({
                id: i,
                name: first + ' ' + last,
                address: randBetween(100, 10000) + ' ' + randArray(lastNames) + ' St.',
                city: randArray(cities),
                state: randArray(states),
                zip: wjCore.format('{p1:d5}-{p2:d3}', {
                    p1: randBetween(10000, 99999),
                    p2: randBetween(100, 999)
                }),
                email: first + '.' + last + '@gmail.com',
                phone: wjCore.format('{p1:d3}-{p2:d4}', {
                    p1: randBetween(100, 999),
                    p2: randBetween(1000, 9999)
                })
            });
        }
        let cityMap = new wjGrid.DataMap(cities);
        let shippers = [
            { id: 0, name: 'Speedy Express', email: 'speedy@gmail.com', phone: '431-3234', express: true },
            { id: 1, name: 'Flash Delivery', email: 'flash@gmail.com', phone: '431-6563', express: true },
            { id: 2, name: 'Logitrax', email: 'logitrax@gmail.com', phone: '431-3981', express: false },
            { id: 3, name: 'Acme Inc', email: 'acme@gmail.com', phone: '431-3113', express: false }
        ];
        let orders = [];
        let today = new Date();
        for (let i = 0; i < 20; i++) {
            let shipped = wjCore.DateTime.addDays(today, -randBetween(1, 3000));
            orders.push({
                id: i,
                date: wjCore.DateTime.addDays(shipped, -randBetween(1, 5)),
                shippedDate: shipped,
                amount: randBetween(10000, 500000) / 100,
                customer: clone(randArray(customers)),
                shipper: clone(randArray(shippers))
            });
        }
        function randBetween(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        function randArray(arr: any[]) {
            return arr[randBetween(0, arr.length - 1)];
        }
    
        // shallow copy
        function clone(obj: any) {
            if (wjCore.isFunction(Object.assign)) { // IE does not support it
                return Object.assign({}, obj);
            }
            let clone = {};
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    clone[prop] = obj[prop];
                }
            }
            return clone;
        }

        // expose orders CollectionView to the app
        appData.orders = new wjCore.CollectionView(orders);

        // expose grouped orders CollectionView to the app
        appData.groupedOrders = new wjCore.CollectionView(orders, {
            groupDescriptions: [
                'customer.city'
            ]
        });

        // expose paged orders CollectionView to the app
        appData.pagedOrders = new wjCore.CollectionView(orders, {
            pageSize: 4
        });

        // expose addNew oders CollectionView to the app
        appData.addNewOrders = new wjCore.CollectionView(orders, {
            newItemCreator: function () {
                return { // add empty customer and shipper objects to new orders
                    customer: {},
                    shipper: {}
                }
            },
        });
        appData.addNewOrders.moveCurrentToLast();

        // refresh views when data source changes
        let ordersRefreshing = false;
        appData.orders.collectionChanged.addHandler(function () {
            ordersRefreshing = true;
            if (!pagedOrdersRefreshing) {
                appData.pagedOrders.refresh();
            }
            if (!groupedOrdersRefreshing) {
                appData.groupedOrders.refresh();
            }
            if (!addNewOrdersRefreshing) {
                appData.addNewOrders.refresh();
            }
            ordersRefreshing = false;
        });

        // addNew orders
        let addNewOrdersRefreshing = false;
        appData.addNewOrders.collectionChanged.addHandler(function () {
            addNewOrdersRefreshing = true;
            if (!ordersRefreshing) {
                appData.orders.refresh();
            }
            if (!pagedOrdersRefreshing) {
                appData.pagedOrders.refresh();
            }
            if (!groupedOrdersRefreshing) {
                appData.groupedOrders.refresh();
            }
            addNewOrdersRefreshing = false;
        });

        // grouped orders
        let groupedOrdersRefreshing = false;
        appData.groupedOrders.collectionChanged.addHandler(function () {
            groupedOrdersRefreshing = true;
            if (!ordersRefreshing) {
                appData.orders.refresh();
            }
            if (!pagedOrdersRefreshing) {
                appData.pagedOrders.refresh();
            }
            if (!addNewOrdersRefreshing) {
                appData.addNewOrders.refresh();
            }
            groupedOrdersRefreshing = false;
        });

        // paged orders
        let pagedOrdersRefreshing = false;
        appData.pagedOrders.collectionChanged.addHandler(function () {
            pagedOrdersRefreshing = true;
            if (!ordersRefreshing) {
                appData.orders.refresh();
            }
            if (!addNewOrdersRefreshing) {
                appData.addNewOrders.refresh();
            }
            if (!groupedOrdersRefreshing) {
                appData.groupedOrders.refresh();
            }
            pagedOrdersRefreshing = false;
        });

        // sample layout definitions
        appData.ldOneLine = [
            { cells: [{ binding: 'id', header: 'ID', cssClass: 'id', isReadOnly: true }] },
            { cells: [{ binding: 'date', header: 'Ordered' }] },
            { cells: [{ binding: 'shippedDate', header: 'Shipped' }] },
            { cells: [{ binding: 'amount', header: 'Amount', format: 'c', cssClass: 'amount' }] },
            { cells: [{ binding: 'customer.name', header: 'Customer' }] },
            { cells: [{ binding: 'customer.address', header: 'Address', wordWrap: true }] },
            { cells: [{ binding: 'customer.city', header: 'City', dataMap: cityMap }] },
            { cells: [{ binding: 'customer.state', header: 'State', width: 45 }] },
            { cells: [{ binding: 'customer.zip', header: 'Zip' }] },
            { cells: [{ binding: 'customer.email', header: 'Customer Email', cssClass: 'email' }] },
            { cells: [{ binding: 'customer.phone', header: 'Customer Phone' }] },
            { cells: [{ binding: 'shipper.name', header: 'Shipper' }] },
            { cells: [{ binding: 'shipper.email', header: 'Shipper Email', cssClass: 'email' }] },
            { cells: [{ binding: 'shipper.phone', header: 'Shipper Phone' }] },
            { cells: [{ binding: 'shipper.express', header: 'Express' }] }
        ];
        appData.ldThreeLines = [
            {
                header: 'Order', colspan: 3, cells: [
                    { binding: 'id', header: 'ID', rowspan: 2, cssClass: 'id' },
                    { binding: 'amount', header: 'Amount', format: 'c', rowspan: 2, cssClass: 'amount' },
                    { binding: 'date', header: 'Ordered' },
                    { binding: 'shippedDate', header: 'Shipped' }
                ]
            },
            {
                header: 'Customer', colspan: 3, cells: [
                    { binding: 'customer.name', header: 'Name' },
                    { binding: 'customer.address', header: 'Address', rowspan: 2 },
                    { binding: 'customer.city', header: 'City', dataMap: cityMap },
                    { binding: 'customer.email', header: 'EMail', rowspan: 2, cssClass: 'email' },
                    { binding: 'customer.state', header: 'State', width: 45 },
                    { binding: 'customer.phone', header: 'Phone' },
                    { binding: 'customer.zip', header: 'Zip' },
                ]
            },
            {
                header: 'Shipper', colspan: 3, cells: [
                    { binding: 'shipper.name', header: 'Shipper' },
                    { binding: 'shipper.email', header: 'EMail', cssClass: 'email' },
                    { binding: 'shipper.express', header: 'Express' }
                ]
            }
        ];
        appData.layoutDefs = new wjCore.CollectionView([
            {
                name: 'Basic layout',
                descriptions: {
                    main: 'This layout is divided into three groups: order, customer, and shipper. Each group consists of multiple properties and spans three columns.',
                    transposedView: 'This view uses three columns per record, and different number of rows per group.',
                    ordinaryView: 'This view uses the same number of rows per record, and three columns per group.'
                },
                def: appData.ldThreeLines
            },
            {
                name: 'Grid layout',
                descriptions: {
                    main: 'This layout is like a grid view. Each group consists of single property and spans one column.',
                    transposedView: 'This view corresponds to transposed grid view in which columns represent records.',
                    ordinaryView: 'This view corresponds to traditional grid view in which rows represent records.'
                },
                def: appData.ldOneLine
            }
        ]);

        return appData;
    }
}