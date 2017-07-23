
var gulp         	= require('gulp');
var connect 	 	= require('gulp-connect');
var handleErrors 	= require('../util/handleErrors');
var changed		 	= require("gulp-changed");
var plumber		 	= require("gulp-plumber");
var	gulpif 		    = require('gulp-if');
var print           = require('gulp-print');
var rename      	= require('gulp-rename');

var stylus		 	= require("gulp-stylus");
var autoprefixer 	= require("autoprefixer-stylus");
var jeet		 	= require("jeet");
var rupture	 	 	= require("rupture");
var axis	 		= require("axis-css");
var typographic	 	= require("typographic");

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

gulp.task('stylus_client', ['environmentCheck'], function () 
{  
	return gulp.src( ABWA.config.clientStylusPath )
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
	.pipe(rename('bundle_client.' + global.currentVersion + '.css'))
	.pipe(print())
	.pipe(gulp.dest(global.outputDirClient + ABWA.config.dataPath + '/css/'));
});