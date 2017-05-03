module.exports = function(){

    var root = './';

    var nodeModules = root + 'node_modules/';
    var build = root + 'dist/';
    var index = 'index.html';
    var render= 'renderer.js';
    var src = root + 'src/';
    var temp = root + 'temp/';    

    var config = {
        //general configs
        root: root,
        temp: temp,        
        env: 'dev',

        srcs: {
            root: src,
            index: src + index,
            render: src + render,
            css: src + 'css/**/*.scss',
            ts: src + '**/*.ts',
            cssInject: [
                nodeModules + 'bootstrap/dist/css/bootstrap.css',
                temp + '**/*.css'
            ],
            fonts: {
                lib: nodeModules + 'font-awesome/fonts/**/*.*',
                css: nodeModules + 'font-awesome/css/**/*.min.css',
                src: src + 'fonts/'
            },
            js: src + 'js/**/*.js',
            jsLibInject: [
                nodeModules + 'angular*/**/angular.min.js',
                nodeModules + 'angular*/**/angular*min.js',
                nodeModules + 'jquery/dist/jquery.min.js'
                //nodeModules + 'bootstrap/dist/js/bootstrap.js'
            ],
            jsAppInject: [
                src + 'js/**/app.module.js',
                src + 'js/**/*.module.js',
                src + 'js/**/*.js'
            ]
        },

        libs: {
            node: nodeModules,
            angular: nodeModules + 'angular*/**/angular*.js',
            bootstrap: nodeModules + 'bootstrap/dist/css/bootstrap.css',
        }
    }

    return config;
}