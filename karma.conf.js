'use strict';

module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        // files needed by angular js plus application and test files
        files: [
            {pattern: 'node_modules/angular2/**/*.js', included: false, watched: false},
            'node_modules/es6-shim/es6-shim.js',
            'node_modules/zone.js/dist/zone-microtask.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false, served: true},
            'node_modules/reflect-metadata/Reflect.js',
            {pattern: 'app/**/*.js', included: false, watched: true},
            {pattern: 'app/**/*.spec.js', included: false, watched: true},
            {pattern: 'app/**/*.ts', included: false, watched: false},
            {pattern: 'app/**/*.js.map', included: false, watched: false},
            // main entry point
            'test-main.js'
        ],
        // exclude angular 2 test files
        exclude: [
            'node_modules/angular2/**/*_spec.js'
        ],
        // enable coverage module
        reporters: ['progress', 'coverage'],
        // remove test files from coverage and add javascript files to source map module
        preprocessors: {
            'app/**/!(*.spec).js': ['coverage'],
            'app/**/*.js': ['sourcemap']
        },
        // generate coverage report in json format
        coverageReporter: {
            dir: 'report/',
            reporters: [
                {type: 'json', subdir: 'coverage'}
            ]
        },
        port: 9876,
        colors: true,
        autoWatch: false,
        // use Chrome to launch the tests
        browsers: [
            'Chrome'
        ],
        logLevel: config.LOG_INFO,
        singleRun: true
    });
};