var gulp  		= require('gulp');
var print 		= require('gulp-print');
var rimraf      = require('rimraf');

// gulp.task('plugins', ['environmentCheck', 'clean_plugins'], function(cb) 

gulp.task('plugins', ['environmentCheck'], function(cb) 
{
    return gulp.src(ABWA.config.corepluginsSrcPath)
	.pipe(print())
	.pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/plugins'))
});

gulp.task('plugins_client', ['environmentCheck'], function(cb) 
{
    return gulp.src(ABWA.config.clientpluginsSrcPath)
	.pipe(print())
	.pipe(gulp.dest(global.outputDirClient + ABWA.config.dataPath + '/plugins'))
});


// gulp.task('clean_plugins', function (cb) 
// {
//   	rimraf(global.outputDir + ABWA.config.dataPath + '/plugins', cb);
//   	console.log('cleaning plugins...');
// });

// gulp.task('clean_plugins_client', function (cb) 
// {
//   	rimraf(global.outputDirClient + ABWA.config.dataPath + '/plugins', cb);
//   	console.log('cleaning plugins...');
// });