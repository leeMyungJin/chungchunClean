(function (global) {
    System.config({
        transpiler: 'plugin-babel',
        babelOptions: {
            es2015: true
        },
        meta: {
            '*.css': { loader: 'css' }
        },
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            'jszip': 'npm:jszip/dist/jszip.js',
            '@grapecity/wijmo': 'npm:@grapecity/wijmo/index.js',
            '@grapecity/wijmo.input': 'npm:@grapecity/wijmo.input/index.js',
            '@grapecity/wijmo.styles': 'npm:@grapecity/wijmo.styles',
            '@grapecity/wijmo.cultures': 'npm:@grapecity/wijmo.cultures',
            '@grapecity/wijmo.chart': 'npm:@grapecity/wijmo.chart/index.js',
            '@grapecity/wijmo.chart.analytics': 'npm:@grapecity/wijmo.chart.analytics/index.js',
            '@grapecity/wijmo.chart.animation': 'npm:@grapecity/wijmo.chart.animation/index.js',
            '@grapecity/wijmo.chart.annotation': 'npm:@grapecity/wijmo.chart.annotation/index.js',
            '@grapecity/wijmo.chart.finance': 'npm:@grapecity/wijmo.chart.finance/index.js',
            '@grapecity/wijmo.chart.finance.analytics': 'npm:@grapecity/wijmo.chart.finance.analytics/index.js',
            '@grapecity/wijmo.chart.hierarchical': 'npm:@grapecity/wijmo.chart.hierarchical/index.js',
            '@grapecity/wijmo.chart.interaction': 'npm:@grapecity/wijmo.chart.interaction/index.js',
            '@grapecity/wijmo.chart.radar': 'npm:@grapecity/wijmo.chart.radar/index.js',
            '@grapecity/wijmo.chart.render': 'npm:@grapecity/wijmo.chart.render/index.js',
            '@grapecity/wijmo.gauge': 'npm:@grapecity/wijmo.gauge/index.js',
            '@grapecity/wijmo.grid': 'npm:@grapecity/wijmo.grid/index.js',
            '@grapecity/wijmo.grid.detail': 'npm:@grapecity/wijmo.grid.detail/index.js',
            '@grapecity/wijmo.grid.filter': 'npm:@grapecity/wijmo.grid.filter/index.js',
            '@grapecity/wijmo.grid.grouppanel': 'npm:@grapecity/wijmo.grid.grouppanel/index.js',
            '@grapecity/wijmo.grid.multirow': 'npm:@grapecity/wijmo.grid.multirow/index.js',
            '@grapecity/wijmo.grid.pdf': 'npm:@grapecity/wijmo.grid.pdf/index.js',
            '@grapecity/wijmo.grid.sheet': 'npm:@grapecity/wijmo.grid.sheet/index.js',
            '@grapecity/wijmo.grid.xlsx': 'npm:@grapecity/wijmo.grid.xlsx/index.js',
            '@grapecity/wijmo.nav': 'npm:@grapecity/wijmo.nav/index.js',
            '@grapecity/wijmo.odata': 'npm:@grapecity/wijmo.odata/index.js',
            '@grapecity/wijmo.olap': 'npm:@grapecity/wijmo.olap/index.js',
            '@grapecity/wijmo.pdf': 'npm:@grapecity/wijmo.pdf/index.js',
            '@grapecity/wijmo.viewer': 'npm:@grapecity/wijmo.viewer/index.js',
            '@grapecity/wijmo.xlsx': 'npm:@grapecity/wijmo.xlsx/index.js',
            '@grapecity/wijmo.meta': 'npm:@grapecity/wijmo.meta/index.js',
            '@grapecity/wijmo.webcomponents.base': 'npm:@grapecity/wijmo.webcomponents.base/index.js',
            '@grapecity/wijmo.webcomponents.input': 'npm:@grapecity/wijmo.webcomponents.input/index.js',
            '@grapecity/wijmo.webcomponents.chart': 'npm:@grapecity/wijmo.webcomponents.chart/index.js',
            '@grapecity/wijmo.webcomponents.chart.analytics': 'npm:@grapecity/wijmo.webcomponents.chart.analytics/index.js',
            '@grapecity/wijmo.webcomponents.chart.animation': 'npm:@grapecity/wijmo.webcomponents.chart.animation/index.js',
            '@grapecity/wijmo.webcomponents.chart.annotation': 'npm:@grapecity/wijmo.webcomponents.chart.annotation/index.js',
            '@grapecity/wijmo.webcomponents.chart.finance': 'npm:@grapecity/wijmo.webcomponents.chart.finance/index.js',
            '@grapecity/wijmo.webcomponents.chart.finance.analytics': 'npm:@grapecity/wijmo.webcomponents.chart.finance.analytics/index.js',
            '@grapecity/wijmo.webcomponents.chart.hierarchical': 'npm:@grapecity/wijmo.webcomponents.chart.hierarchical/index.js',
            '@grapecity/wijmo.webcomponents.chart.interaction': 'npm:@grapecity/wijmo.webcomponents.chart.interaction/index.js',
            '@grapecity/wijmo.webcomponents.chart.radar': 'npm:@grapecity/wijmo.webcomponents.chart.radar/index.js',
            '@grapecity/wijmo.webcomponents.chart.render': 'npm:@grapecity/wijmo.webcomponents.chart.render/index.js',
            '@grapecity/wijmo.webcomponents.gauge': 'npm:@grapecity/wijmo.webcomponents.gauge/index.js',
            '@grapecity/wijmo.webcomponents.grid': 'npm:@grapecity/wijmo.webcomponents.grid/index.js',
            '@grapecity/wijmo.webcomponents.grid.detail': 'npm:@grapecity/wijmo.webcomponents.grid.detail/index.js',
            '@grapecity/wijmo.webcomponents.grid.filter': 'npm:@grapecity/wijmo.webcomponents.grid.filter/index.js',
            '@grapecity/wijmo.webcomponents.grid.grouppanel': 'npm:@grapecity/wijmo.webcomponents.grid.grouppanel/index.js',
            '@grapecity/wijmo.webcomponents.grid.multirow': 'npm:@grapecity/wijmo.webcomponents.grid.multirow/index.js',
            '@grapecity/wijmo.webcomponents.grid.sheet': 'npm:@grapecity/wijmo.webcomponents.grid.sheet/index.js',
            '@grapecity/wijmo.webcomponents.grid.xlsx': 'npm:@grapecity/wijmo.webcomponents.grid.xlsx/index.js',
            '@grapecity/wijmo.webcomponents.nav': 'npm:@grapecity/wijmo.webcomponents.nav/index.js',
            '@grapecity/wijmo.webcomponents.odata': 'npm:@grapecity/wijmo.webcomponents.odata/index.js',
            '@grapecity/wijmo.webcomponents.olap': 'npm:@grapecity/wijmo.webcomponents.olap/index.js',
            '@grapecity/wijmo.webcomponents.viewer': 'npm:@grapecity/wijmo.webcomponents.viewer/index.js',
            'jszip': 'npm:jszip/dist/jszip.js',
            'bootstrap.css': 'npm:bootstrap/dist/css/bootstrap.min.css',
            'css': 'npm:systemjs-plugin-css/css.js',
            'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
            'systemjs-babel-build':'npm:systemjs-plugin-babel/systemjs-babel-browser.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            src: {
                defaultExtension: 'js'
            },
            "node_modules": {
                defaultExtension: 'js'
            }
        }
    });
})(this);
