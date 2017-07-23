var gulp          = require('gulp');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var gulpif        = require('gulp-if');
var connect       = require('gulp-connect');
var streamify     = require('gulp-streamify');
var uglify        = require('gulp-uglify');

var watchify      = require('watchify');
var bundleLogger  = require('../util/bundleLogger');
var handleErrors  = require('../util/handleErrors');
var strip         = require('gulp-strip-debug');
var print         = require("gulp-print");

var autoprefixer  = require("autoprefixer-stylus");
var jeet          = require("jeet");
var rupture       = require("rupture");
var axis          = require("axis-css");
var typographic   = require("typographic");
var stylify       = require("stylify");
var showProgress  = require('show-stream-progress')








////     ######  ##     ##  ######  
////    ##    ## ###   ### ##    ## 
////    ##       #### #### ##       
////    ##       ## ### ##  ######  
////    ##       ##     ##       ## 
////    ##    ## ##     ## ##    ## 
////     ######  ##     ##  ######  



gulp.task('js_watch', ['environmentCheck'], function()
{
  var bundle = function()
  {
    return bundler.bundle()
      .on('start', bundleLogger.start)
      .on('error', handleErrors)
      .pipe(source('bundle_core.' + ABWA.config.client_version + '.js'))
      .pipe(showProgress(process.stderr))
      // remove console.logs and such
      .pipe(gulpif( global.ENV === 'production', streamify( strip() )))
      // uglify JS and obfuscate in produciton mode only
      .pipe(gulpif( global.ENV === 'production', streamify(uglify({ mangle: global.ENV === 'production' }))))
      .pipe(print())
      .pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/js'))
      // .pipe(connect.reload())
      .on('end', bundleLogger.end);
  }

  var browserify_instance = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries:    [ABWA.config.coreJSPath],
    extensions: ['.jade', '.styl'],
    debug:      global.ENV === 'development'
  });

  browserify_instance.transform('stylify', {
    use :[ 
      jeet(),
      rupture(), 
      typographic(), 
      axis(), 
      autoprefixer({ browsers: ['ie 7', 'ie 8'] })
    ],
    set: {
      sourcemap: { inline: true },
      compress: global.ENV === 'production'
    },
    // sourcemap: { inline: global.ENV === 'development' },
    // compress: global.ENV === 'production',
  });

  browserify_instance.transform('jadeify');

  var bundler = watchify(browserify_instance);
  bundler.on('update', bundle); // on any dep update, runs the bundler

  bundle();
});



gulp.task('js_build', ['environmentCheck'], function() {

  console.log('GULP: Starting js task');
  
  var browserify_instance = browserify(
  {
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries:    [ABWA.config.coreJSPath],
    // extensions: ['.jade', '.styl'],
    debug:      global.ENV === 'development'
  });

  browserify_instance.transform('stylify', {
    use :[ 
      jeet(),
      rupture(), 
      typographic(), 
      axis(), 
      autoprefixer({ browsers: ['ie 7', 'ie 8'] })
    ],
    sourcemap: { inline: global.ENV === 'development' },
    compress: global.ENV === 'production',
  });

  browserify_instance.transform('jadeify');

  var bundle = function() 
  {
    bundleLogger.start();

    return browserify_instance
      .bundle()
      .on('error', handleErrors)
      .pipe(source('bundle_core.' + ABWA.config.client_version + '.js'))
      // remove console.logs and such
      .pipe(gulpif( global.ENV === 'production', streamify( strip() )))
      // uglify JS and obfuscate in produciton mode only
      .pipe(gulpif( global.ENV === 'production', streamify(uglify({ mangle: global.ENV === 'production' }))))
      .pipe(print())
      .pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/js'))
      // .pipe(connect.reload())
      .on('end', bundleLogger.end);
  };

  return bundle();
});

gulp.task('js_prod', ['setProduction'], function() 
{
  gulp.start('js_build');
});
















////    ######## ########   #######  ##    ## ######## ######## ##    ## ########  
////    ##       ##     ## ##     ## ###   ##    ##    ##       ###   ## ##     ## 
////    ##       ##     ## ##     ## ####  ##    ##    ##       ####  ## ##     ## 
////    ######   ########  ##     ## ## ## ##    ##    ######   ## ## ## ##     ## 
////    ##       ##   ##   ##     ## ##  ####    ##    ##       ##  #### ##     ## 
////    ##       ##    ##  ##     ## ##   ###    ##    ##       ##   ### ##     ## 
////    ##       ##     ##  #######  ##    ##    ##    ######## ##    ## ########  




gulp.task('js_watch_frontend', ['environmentCheck'], function()
{
  var bundle = function()
  {
    return bundler.bundle()
      .on('start', bundleLogger.start)
      .on('error', handleErrors)
      .pipe(source('bundle_frontend.' + ABWA.config.client_version + '.js'))
      .pipe(showProgress(process.stderr))
      // remove console.logs and such
      .pipe(gulpif( global.ENV === 'production', streamify( strip() )))
      // uglify JS and obfuscate in produciton mode only
      .pipe(gulpif( global.ENV === 'production', streamify(uglify({ mangle: global.ENV === 'production' }))))
      .pipe(print())
      .pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/js'))
      // .pipe(connect.reload())
      .on('end', bundleLogger.end);
  }

  var browserify_instance = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries:    [ABWA.config.frontendJSPath],
    extensions: ['.jade', '.styl'],
    debug:      global.ENV === 'development'
  });

  browserify_instance.transform('stylify', {
    use :[ 
      jeet(),
      rupture(), 
      typographic(), 
      axis(), 
      autoprefixer({ browsers: ['ie 7', 'ie 8'] })
    ],
    set: {
      sourcemap: { inline: true },
      compress: global.ENV === 'production'
    },
    // sourcemap: { inline: global.ENV === 'development' },
    // compress: global.ENV === 'production',
  });

  browserify_instance.transform('jadeify');

  var bundler = watchify(browserify_instance);
  bundler.on('update', bundle); // on any dep update, runs the bundler

  bundle();
});



gulp.task('js_build_frontend', ['environmentCheck'], function() {

  console.log('GULP: Starting js task');
  
  var browserify_instance = browserify(
  {
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries:    [ABWA.config.frontendJSPath],
    // extensions: ['.jade', '.styl'],
    debug:      global.ENV === 'development'
  });

  browserify_instance.transform('stylify', {
    use :[ 
      jeet(),
      rupture(), 
      typographic(), 
      axis(), 
      autoprefixer({ browsers: ['ie 7', 'ie 8'] })
    ],
    sourcemap: { inline: global.ENV === 'development' },
    compress: global.ENV === 'production',
  });

  browserify_instance.transform('jadeify');

  var bundle = function() 
  {
    bundleLogger.start();

    return browserify_instance
      .bundle()
      .on('error', handleErrors)
      .pipe(source('bundle_frontend.' + ABWA.config.client_version + '.js'))
      // remove console.logs and such
      .pipe(gulpif( global.ENV === 'production', streamify( strip() )))
      // uglify JS and obfuscate in produciton mode only
      .pipe(gulpif( global.ENV === 'production', streamify(uglify({ mangle: global.ENV === 'production' }))))
      .pipe(print())
      .pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/js'))
      // .pipe(connect.reload())
      .on('end', bundleLogger.end);
  };

  return bundle();
});
















////       ###    ##     ## ######## ##     ## 
////      ## ##   ##     ##    ##    ##     ## 
////     ##   ##  ##     ##    ##    ##     ## 
////    ##     ## ##     ##    ##    ######### 
////    ######### ##     ##    ##    ##     ## 
////    ##     ## ##     ##    ##    ##     ## 
////    ##     ##  #######     ##    ##     ## 




gulp.task('js_watch_auth', ['environmentCheck'], function()
{
  var bundle = function()
  {
    return bundler.bundle()
      .on('start', bundleLogger.start)
      .on('error', handleErrors)
      .pipe(source('bundle_auth.' + ABWA.config.client_version + '.js'))
      .pipe(showProgress(process.stderr))
      // remove console.logs and such
      .pipe(gulpif( global.ENV === 'production', streamify( strip() )))
      // uglify JS and obfuscate in produciton mode only
      .pipe(gulpif( global.ENV === 'production', streamify(uglify({ mangle: global.ENV === 'production' }))))
      .pipe(print())
      .pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/js'))
      // .pipe(connect.reload())
      .on('end', bundleLogger.end);
  }

  var browserify_instance = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries:    [ABWA.config.authJSPath],
    debug:      global.ENV === 'development'
  });

  var bundler = watchify(browserify_instance);
  bundler.on('update', bundle); // on any dep update, runs the bundler

  bundle();
});




gulp.task('js_build_auth', ['environmentCheck'], function() {

  console.log('GULP: Starting js_build_auth task');
  
  var browserify_instance = browserify(
  {
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries:    [ABWA.config.authJSPath],
    debug:      global.ENV === 'development'
  });

  var bundle = function() 
  {
    bundleLogger.start();

    return browserify_instance
      .bundle()
      .on('error', handleErrors)
      .pipe(source('bundle_auth.' + ABWA.config.client_version + '.js'))
      // remove console.logs and such
      .pipe(gulpif( global.ENV === 'production', streamify( strip() )))
      // uglify JS and obfuscate in produciton mode only
      .pipe(gulpif( global.ENV === 'production', streamify(uglify({ mangle: global.ENV === 'production' }))))
      .pipe(print())
      .pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/js'))
      // .pipe(connect.reload())
      .on('end', bundleLogger.end);
  };

  return bundle();
});

















////     ######  ##       #### ######## ##    ## ######## 
////    ##    ## ##        ##  ##       ###   ##    ##    
////    ##       ##        ##  ##       ####  ##    ##    
////    ##       ##        ##  ######   ## ## ##    ##    
////    ##       ##        ##  ##       ##  ####    ##    
////    ##    ## ##        ##  ##       ##   ###    ##    
////     ######  ######## #### ######## ##    ##    ##    






gulp.task('js_watch_client', ['environmentCheck'], function()
{
  var bundle = function()
  {
    return bundler.bundle()
      .on('start', bundleLogger.start)
      .on('error', handleErrors)
      .pipe(source('bundle_client.' + ABWA.config.client_version + '.js'))
      .pipe(showProgress(process.stderr))
      // remove console.logs and such
      .pipe(gulpif( global.ENV === 'production', streamify( strip() )))
      // uglify JS and obfuscate in produciton mode only
      .pipe(gulpif( global.ENV === 'production', streamify(uglify({ mangle: global.ENV === 'production' }))))
      .pipe(print())
      .pipe(gulp.dest(global.outputDirClient + ABWA.config.dataPath + '/js'))
      // .pipe(connect.reload())
      .on('end', bundleLogger.end);
  }

  var browserify_instance = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries:    [ABWA.config.clientJSPath],
    debug:      global.ENV === 'development'
  });

  var bundler = watchify(browserify_instance);
  bundler.on('update', bundle); // on any dep update, runs the bundler

  bundle();
});




gulp.task('js_build_client', ['environmentCheck'], function() {

  console.log('GULP: Starting js_build_auth task');
  
  var browserify_instance = browserify(
  {
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries:    [ABWA.config.clientJSPath],
    debug:      global.ENV === 'development'
  });

  var bundle = function() 
  {
    bundleLogger.start();

    return browserify_instance
      .bundle()
      .on('error', handleErrors)
      .pipe(source('bundle_client.' + ABWA.config.client_version + '.js'))
      // remove console.logs and such
      .pipe(gulpif( global.ENV === 'production', streamify( strip() )))
      // uglify JS and obfuscate in produciton mode only
      .pipe(gulpif( global.ENV === 'production', streamify(uglify({ mangle: global.ENV === 'production' }))))
      .pipe(print())
      .pipe(gulp.dest(global.outputDirClient + ABWA.config.dataPath + '/js'))
      // .pipe(connect.reload())
      .on('end', bundleLogger.end);
  };

  return bundle();
});




















