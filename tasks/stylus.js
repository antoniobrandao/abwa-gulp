
var gulp         	= require('gulp');
var connect 	 	= require('gulp-connect');
var handleErrors 	= require('../util/handleErrors');
var changed		 	= require("gulp-changed");
var plumber		 	= require("gulp-plumber");
var	gulpif 		    = require('gulp-if');
var print           = require('gulp-print');
var rename      	= require('gulp-rename');


var stylus		 	= require("gulp-stylus");
var poststylus 		= require('poststylus');
var postcss       	= require('gulp-postcss');

var jeet          	= require("jeet");
var typographic   	= require("typographic");
var rupture       	= require("rupture");

var lost          	= require("lost");
var axis          	= require("axis");

var autoprefixer  	= require("autoprefixer");
var sourcemaps 	  	= require('gulp-sourcemaps');



gulp.task('stylus_client', ['environmentCheck'], function () 
{
	return gulp.src( ABWA.config.clientStylusPath )
	.pipe( plumber( handleErrors ) )
	.pipe(sourcemaps.init())
	.pipe(stylus({
		compress: global.ENV === 'production',
		use:[	
				jeet(),
				rupture(),
				// poststylus([ lost, autoprefixer ])
				// poststylus([ lost ])
				// typographic(), 
				// axis(), 
				// autoprefixer({ browsers: ['ie 7', 'ie 8'] })
			],
			// sourcemap: { inline: global.ENV === 'development' } 
	}))
	.pipe(rename('bundle_client.' + global.currentVersion + '.css'))
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
	.pipe(print())
	.pipe(gulp.dest(global.outputDirClient + ABWA.config.dataPath + '/css/'));
});




gulp.task('stylus_core', ['environmentCheck'], function () 
{  
	return gulp.src( ABWA.config.coreStylusPath )
	.pipe( plumber( handleErrors ) )
	.pipe(stylus({ 
		compress: global.ENV === 'production',
		use:[	
				jeet(),
				rupture(),
				// typographic(), 
				// axis(), 
				// autoprefixer({ browsers: ['ie 7', 'ie 8'] })
			],
			// sourcemap: { inline: global.ENV === 'development' } 
	}))
	.pipe(rename('bundle_core.' + ABWA.config.client_version + '.css'))
	.pipe(print())
	.pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/css'));
});

gulp.task('stylus_auth', ['environmentCheck'], function () 
{  
	return gulp.src( ABWA.config.authStylusPath )
	.pipe( plumber( handleErrors ) )
	.pipe(stylus({ 
		compress: global.ENV === 'production',
		use:[	
				jeet(),
				rupture(), 
				// typographic(), 
				// axis(), 
				// autoprefixer({ browsers: ['ie 7', 'ie 8'] })
			],
			// sourcemap: { inline: global.ENV === 'development' } 
	}))
	.pipe(rename('bundle_auth.' + ABWA.config.client_version + '.css'))
	.pipe(print())
	.pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/css'));
});

gulp.task('stylus_frontend', ['environmentCheck'], function () 
{
	return gulp.src( ABWA.config.frontendStylusPath )
	.pipe( plumber( handleErrors ) )
	.pipe(stylus({ 
		compress: global.ENV === 'production',
		use:[	
				jeet(),
				rupture(),
				typographic(), 
				axis(), 
				// autoprefixer({ browsers: ['ie 7', 'ie 8'] })
			],
			// sourcemap: { inline: global.ENV === 'development' } 
	}))
	.pipe(rename('bundle_frontend.' + ABWA.config.client_version + '.css'))
	.pipe(print())
	.pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/css/'));
});




	// var processors = [
	// 	lost(),
	// 	autoprefixer({browsers:['last 2 version']}),
	// ]
	// var stylus_options = {
	// 	compress: global.ENV === 'production',
	// 	use : [
	// 		rupture(),
	// 		axis(),
	// 	]
	// }

	// return gulp.src(ABWA.config.clientStylusPath)
	//     .pipe(sourcemaps.init())
	// 	.pipe(stylus(stylus_options))
	//     .pipe(postcss([
	//       lost(),
	//       autoprefixer()
	//     ]))
	//     .pipe(sourcemaps.write('./'))
	//     .pipe(rename('bundle_client.' + global.currentVersion + '.css'))
	// 	.pipe(print())
	//     .pipe(gulp.dest(global.outputDirClient + ABWA.config.dataPath + '/css/'));

	// return gulp.src( ABWA.config.clientStylusPath )
	// .pipe( plumber( handleErrors ) )
	// .pipe(stylus({ 
	// 	compress: global.ENV === 'production',
	// 	use:[	
	// 			// poststylus([
	// 			// 	'autoprefixer',
	// 			// 	'lost'
	// 			// ]),
	// 			// jeet(),
	// 			rupture(),
	// 			// typographic(), 
	// 			// axis(), 
	// 			// autoprefixer({ browsers: ['ie 7', 'ie 8'] })
	// 		],
	// 		// sourcemap: { inline: global.ENV === 'development' } 
	// }))
	// .pipe(rename('bundle_client.' + global.currentVersion + '.css'))
	// .pipe(print())
	// .pipe(gulp.dest(global.outputDirClient + ABWA.config.dataPath + '/css/'));