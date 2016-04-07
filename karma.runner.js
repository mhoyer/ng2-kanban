Error.stackTraceLimit = Infinity; // Turn on full stack traces in errors to help debugging
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
__karma__.loaded = () => {}; // Cancel Karma's synchronous start, we will call `__karma__.start()` later, once all the specs are loaded.

System.config({
    map: {
        // karma always hosts under '/base'
        '@ngrx/store': 'base/node_modules/@ngrx/store/dist',
        'redux-typed-ducks': 'base/node_modules/redux-typed-ducks/dist/index.js',
        'seamless-immutable': 'base/node_modules/seamless-immutable/seamless-immutable.development.js',
    },
    packages: {
        'base/dist': {
            format: 'register',
            defaultExtension: 'js',
            map: { 'base': '.' }
        },
        '@ngrx/store': {
            main: 'index.js',
            format: 'cjs'
        },
    }
});

bootstrapAngularTesting()
    .then(loadSpecFiles)
    .then(
        () => { __karma__.start(); },
        error => {
            console.error((error.stack || error).toString());
            __karma__.start();
        }
    );

function bootstrapAngularTesting() {
    return Promise.all([
        System.import('angular2/platform/testing/browser'),
        System.import('angular2/testing')
    ]).then(modules => {
        var providers = modules[0];
        var testing = modules[1];
        testing.setBaseTestProviders(
            providers.TEST_BROWSER_PLATFORM_PROVIDERS,
            providers.TEST_BROWSER_APPLICATION_PROVIDERS);
    });
}

function loadSpecFiles() {
    var specs = Object.keys(__karma__.files)  // all files served by karma
        .filter(f => /spec\.js$/.test(f))     // *.spec.js only
        .map(f => {
            f = f.replace(/\.js$/, ''); // drop .js extensions
            return System.import(f).then(module => {
                if (module.hasOwnProperty('main')) {
                    module.main();
                }
            });
        });

    return Promise.all(specs);
}
