'use strict';

//Loading Dependences
var paths,
    env         = require( 'minimist' )( process.argv.slice( 2 ) ),
    gulp        = require( 'gulp' ),
    plugins     = require( 'gulp-load-plugins' )(),
    del         = require( 'del' ),
    runSequence = require( 'run-sequence' ),
    browserSync = require( 'browser-sync' ).create(),
    reload      = browserSync.reload,
    deploy      = 'deploy';

//Config Paths
paths = {
  dir: './',
  assets: 'assets/',
  appDir: 'app/'
};

// Static Server + watching styl/scritps/html files
gulp.task( 'server', [ 'styles', 'scripts', 'templates' ], function() {
  browserSync.init({
    server: 'app',
    open: false,
    port: 3000
  });

  gulp.watch( paths.assets + 'styles/**/*.scss', [ 'styles' ] ).on( 'change', reload );
  gulp.watch( paths.assets + 'scripts/**/*.js', [ 'scripts' ] ).on( 'change', reload );
  gulp.watch( paths.assets + 'templates/**/*.jade', [ 'templates' ] ).on( 'change', reload );
  gulp.watch( paths.appDir + '*.html' ).on( 'change', reload );
});

// Compile stylus into CSS & auto-inject into browsers
gulp.task( 'styles', function() {
  return gulp.src( 'assets/styles/*.scss' )
    .pipe( plugins.plumber() )
    .pipe( plugins.sourcemaps.init( { loadMaps: true } ) )
    .pipe( plugins.sass() )
    .pipe( plugins.autoprefixer() )
    .pipe( plugins.cssmin() )
    .pipe( plugins.if(
      !env.p, plugins.sourcemaps.write( './maps/' )
     ) )
    .pipe( plugins.rename( { suffix: '.min' } ) )
    .pipe( gulp.dest('app/css') )
    .pipe( browserSync.stream() );
});

// Browserify, concat, generate sourcemaps and uglify scripts
gulp.task( 'scripts', function() {
  return gulp.src( 'assets/scripts/**/*.js' )
    .pipe( plugins.plumber() )
    .pipe( plugins.sourcemaps.init() )
    .pipe( plugins.browserify ( {
      insertGlobals: true,
      debug: !env.p
    } ) )
    .pipe( plugins.if (
      env.p, plugins.uglify()
    ) )
    .pipe( plugins.concat( 'main.js' ) )
    .pipe( plugins.if(
      !env.p, plugins.sourcemaps.write( './maps/' )
     ) )
    .pipe( plugins.rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( 'app/js' ) )
    .pipe( browserSync.stream() );
} );

// Templates -> Will generate static html files with Jade engine templates
gulp.task( 'templates', function() {
  return gulp.src( 'assets/templates/pages/*.jade' )
    .pipe( plugins.plumber() )
    .pipe( plugins.jade( {
      pretty: true
    } ) )
    .pipe( gulp.dest ( paths.appDir ) )
    .pipe( browserSync.stream() );
} );

// Images -> Will compress jpg and png files
gulp.task( 'images', function() {
  return gulp.src( 'assets/images/**/*{jpg,png}' )
    .pipe( plugins.imagemin( {
      progressive: true
    } ) )
    .pipe( gulp.dest( 'app/images' ) );
} );

// Svgs -> will generate a svg sprite with Svgtore plugin
gulp.task( 'svgs', function(){
  return gulp.src( 'assets/images/svgs/*.svg' )
    .pipe( plugins.plumber() )
    .pipe( plugins.svgstore( {
      inlineSvg: true
    } ) )
    .pipe( gulp.dest( 'app/images/svgs' ) );
} );

// Stylint -> will lint all the stylus files
gulp.task( 'stylint', function() {
  return gulp.src( 'assets/styles/**/*.styl' )
    .pipe( plugins.plumber() )
    .pipe( plugins.stylint( {
      config: '.stylintrc'
    } ) )
    .pipe( plugins.stylint.reporter() );
} );

//Web Standards - will help to make a good code and follow the modern web standards
gulp.task( 'webstandards', function () {
  return gulp.src( 'app/**/*' )
    .pipe( plugins.webstandards() );
} );

// Clean -> it will clean the app dir
gulp.task( 'clean:appDir', function() {
  return del( './app' );
} );

// Data Copy -> it will copy the data directory
gulp.task( 'data:copy', function() {
  return gulp.src( './data/*.js' )
    .pipe( gulp.dest( './app/data/' ) );
} );

// Vendor Copy -> it will copy the vendor directory
gulp.task( 'vendor:copy', function() {
  return gulp.src( paths.assets + '/vendor/**/*' )
    .pipe( gulp.dest( './app/vendor' ) );
} );

//Deploy - will deploy application to production
gulp.task( deploy, function(){
  return gulp.src( './app' )
    .pipe( plugins.rsync( {
      root: 'app',
      hostname: 'user@server',
      destination: '~/path/www',
      port: 2222,
      recursive: true
    } ) );
} );

//Call for Clean Task
gulp.task( 'clean', [ 'clean:appDir' ] );

//Call for JsHint and Stylint
gulp.task( 'lint', function () {
  runSequence( 'stylint', 'webstandards' );
} );

//Call for Build Task
gulp.task( 'build', function() {
  runSequence(
    [ 'svgs', 'images' ],
    [ 'data:copy', 'vendor:copy' ],
    [ 'styles', 'scripts', 'templates' ]
  );
} );

//Call for Default tasks
gulp.task( 'default', function() {
  runSequence( 'build', 'server' );
} );

//Call for Dev tasks
gulp.task( 'dev', [ 'default' ] );

//Call for Deploy
gulp.task( 'prod', function() {
  runSequence( 'build', deploy );
} );
