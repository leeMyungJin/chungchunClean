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
            'npm:': '../../node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            '@grapecity/wijmo': 'npm:@grapecity/wijmo/index.js',
            '@grapecity/wijmo.grid.pdf': 'npm:@grapecity/wijmo.grid.pdf/index.js',
            '@grapecity/wijmo.pdf': 'npm:@grapecity/wijmo.pdf/index.js',
            'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
            'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js',
            'xmldom': 'npm:xmldom/dom-parser.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            '../../node_modules': {
                defaultExtension: 'js'
            },
            './worker': {
                defaultExtension: 'js'
            }
        }
    });
})(this);
