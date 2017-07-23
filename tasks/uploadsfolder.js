// var gulp  		= require('gulp');
// var print 		= require('gulp-print');
// var rimraf      = require('rimraf');

// gulp.task('uploadsfolder', ['environmentCheck', 'clean_uploads'], function(cb) 
// {
//     return gulp.src('./abwa/src/files/uploads_folder/**/*.*')
// 	.pipe(print())
// 	.pipe(gulp.dest(global.outputDir + ABWA.config.dataPath))
// });

// gulp.task('clean_uploads', function (cb) 
// {
//   	rimraf(global.outputDir + ABWA.config.dataPath + '/upload', cb);
//   	console.log('cleaning uploadsfolder...');
// });