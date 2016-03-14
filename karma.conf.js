'use strict';

module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],

        files: [
            'node_modules/es6-shim/es6-shim.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/reflect-metadata/Reflect.js',
            {pattern: 'node_modules/angular2/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false, served: true},
            
            { pattern: 'dist/**/*.js', included: false, watched: true },
            'karma.runner.js' // main entry point
        ],
        exclude: [ 'node_modules/angular2/**/*_spec.js' ],

        preprocessors: {
            'dist/**/!(*.spec).js': [ 'coverage', 'sourcemap' ]
        },

        reporters: [ 'progress', 'coverage' ],
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'json', subdir: '.' }
            ]
        },
        
        autoWatch: false,
        restartOnFileChange: true,
        browsers: [ 'Chrome' ],
        logLevel: config.LOG_INFO,
        singleRun: true
    });
};