var gulp  		= require('gulp');
var print 		= require('gulp-print');
var rimraf      = require('rimraf');

gulp.task('root_files', ['environmentCheck'], function(cb) 
{
    return gulp.src(ABWA.config.rootfilesCorePath)
	.pipe(print())
	.pipe(gulp.dest(global.outputDir))
});

gulp.task('root_files_client', ['environmentCheck'], function(cb) 
{
    return gulp.src(ABWA.config.rootfilesClientPath)
	.pipe(print())
	.pipe(gulp.dest(global.outputDirClient))
});