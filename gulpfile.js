/*******************************
 *                             *
 * 			Gulpfile           *
 *                             *
 * *****************************
 * @name: GulpFile
 * @desc: GulpFile js
 * @version: 1.0.0
 * 
 * @author: Paulo Monteiro 
 * @date: 23/04/2017 
 * ****************************/ 

/*******************************
 *                             *
 * 			Declarations       *
 *                             *
 * ****************************/ 
const gulp = require('gulp');
const args = require('yargs').argv;
const del = require('del');
const vinyPaths = require('vinyl-paths');

const electronServe = require('electron-connect').server.create({
    stopOnClose: true,
    // logLevel: 2
});

//load plugins
const $ = require('gulp-load-plugins')({ lazy: true });

//load configs files
const config = require('./gulp.config.js')();

/*******************************
 *                             *
 * 			Tasks              *
 *                             *
 * ****************************/
/**
 * Default task and simple Tasks
 * 
 * the help task listing all task avalible
 */
gulp.task('default', ['help']);
gulp.task('help', $.taskListing);

/** compile tasks */
gulp.task('compile:ts', function(){
    console.log('Compile TS');

    /** solve de problem A project cannot be used in two compilations at the same time */
    var tsProject = $.typescript.createProject('tsconfig.json');

    return gulp.src(config.srcs.ts)
        .pipe($.print())
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject()))
        .pipe(
            $.sourcemaps.write('.', {
                includeContent: false, 
                sourceRoot: '../src' //its necessary to put map files into relative folders
            })
        )
        .pipe(gulp.dest(config.srcs.root));
});

/**injects files to index.html */
gulp.task('inject:css', function(){
    console.log('Inject CSS into HTML');

    return gulp
        .src(config.srcs.index)
        .pipe($.inject(
            gulp.src(config.libs.bootstrap).pipe($.print()),
            { 
                addRootSlash: false,
                starttag: '<!-- inject:lib:{{ext}} -->'
            })
        )
        .pipe(gulp.dest(config.root));
});

/** watch tasks*/
gulp.task('watcher:ts', ['compile:ts'], function(){
    console.log('Watch TypeScript - Start');

    gulp.watch(config.srcs.ts, ['compile:ts']);
});

/** server tasks*/
gulp.task('server', function(){
    // Start browser process
    electronServe.start('--dev=true', serverProcess);

    gulp.watch(config.srcs.ts, ['compile:ts', 'server:restart']);
    // Reload renderer process
    gulp.watch([config.srcs.render, config.srcs.index], 'server:reload');
});

gulp.task('server:restart', function(done){
    electronServe.restart(serverProcess);

    done();
});

gulp.task('server:reload', function(done){
    electronServe.reload(serverProcess);

    setTimeout(function() {
       electronServe.broadcast('Reload');
       done();
    });
});

/** functions */
function serverProcess(electronProcState){
    console.log('electron process state: ' + electronProcState);

    if (electronProcState == 'stopped') {
        process.exit();
    }
}