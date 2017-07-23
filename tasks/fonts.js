var gulp 		= require('gulp');
var print 		= require('gulp-print');
var rimraf      = require('rimraf');

gulp.task('fonts', ['environmentCheck'], function() 
{
    return gulp.src(ABWA.config.fntSrcPath)
	.pipe(print())
	.pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/fonts'))
});

// gulp.task('fonts', ['environmentCheck', 'clean_fonts'], function() 
// {
//     return gulp.src(ABWA.config.fntSrcPath)
// 	.pipe(print())
// 	.pipe(gulp.dest(global.outputDir + ABWA.config.dataPath + '/fonts'))
// });

gulp.task('fonts_client', ['environmentCheck'], function() 
{
    return gulp.src(ABWA.config.clientfntSrcPath)
	.pipe(print())
	.pipe(gulp.dest(global.outputDirClient + ABWA.config.dataPath + '/fonts'))
});

gulp.task('clean_fonts', function (cb) 
{
  	rimraf(global.outputDir + ABWA.config.dataPath + '/fonts', cb);
  	console.log('cleaning fonts...');
});