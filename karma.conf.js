'use strict';

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'sinon'],

        files: [
            { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: false },
            { pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false },
            { pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false },
            { pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: false },
            { pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: false },
            { pattern: 'node_modules/angular2/bundles/angular2.js', included: true, watched: false },
            { pattern: 'node_modules/angular2/bundles/http.dev.js', included: true, watched: false },
            { pattern: 'node_modules/angular2/bundles/router.dev.js', included: true, watched: false },
            { pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: false },

            { pattern: 'node_modules/@ngrx/store/dist/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/redux-typed-ducks/dist/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/seamless-immutable/*.js', included: false, watched: false },

            { pattern: 'karma.runner.js', included: true, watched: false }, // main entry point (or so-called shim)
            { pattern: 'dist/**/*.js', included: false, watched: true },
        ],
        exclude: ['node_modules/angular2/**/*_spec.js'],

        preprocessors: {
            'dist/**/!(*.spec).js': ['coverage', 'sourcemap']
        },

        reporters: [ 'mocha', 'coverage' ],
        coverageReporter: {
            dir: 'coverage/',
            include: 'dist/**/!(*.spec).js',
            reporters: [
                { type: 'json', subdir: '.' },
                { type: 'text-summary' }
            ]
        },

        autoWatch: false,
        autoWatchBatchDelay: 500,
        browsers: ['Chrome'],
        logLevel: config.LOG_WARN,
        singleRun: true
    });
};
