//
(function (global) {
    System.config({
        transpiler: 'ts',
        typescriptOptions: {
            //tsconfig: true
            allowJs: true,
            target: 'ES5',
            module: 'system'
        },
        meta: {
            'typescript': {
                "exports": "ts"
            },
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
            'typescript': 'npm:typescript/lib/typescript.js',
            'ts': 'npm:plugin-typescript/lib/plugin.js',
            'xmldom': 'npm:xmldom/dom-parser.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            '../../node_modules': {
                defaultExtension: 'js'
            },
            './': {
                defaultExtension: 'ts'
            }
        }
    });
})(this);
