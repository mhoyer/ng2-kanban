Error.stackTraceLimit = Infinity; // Turn on full stack traces in errors to help debugging
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
__karma__.loaded = () => {}; // Cancel Karma's synchronous start, we will call `__karma__.start()` later, once all the specs are loaded.

System.config({
    baseURL: '/base', // always '/base' - set by karma
    defaultJSExtensions: true,
    paths: {
        'angular2/*': 'node_modules/angular2/*.js',
        'rxjs/*': 'node_modules/rxjs/*.js'
    },
    packages: {        
        'dist': {
            format: 'register',
            defaultExtension: 'js'
        }
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
        System.import('node_modules/angular2/src/platform/browser/browser_adapter'),
        System.import('node_modules/angular2/platform/testing/browser'),
        System.import('node_modules/angular2/testing')
    ]).then(modules => {
        var browser_adapter = modules[0];
        var providers = modules[1];
        var testing = modules[2];
        testing.setBaseTestProviders(
            providers.TEST_BROWSER_PLATFORM_PROVIDERS,
            providers.TEST_BROWSER_APPLICATION_PROVIDERS);

        browser_adapter.BrowserDomAdapter.makeCurrent();
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
