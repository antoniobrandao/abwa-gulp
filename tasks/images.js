var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var print      = require('gulp-print');


gulp.task('images', ['environmentCheck'], function() {
	
	var dest = global.outputDir + ABWA.config.dataPath + '/img';

	return gulp.src( ABWA.config.imgSrcPath )
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
		.pipe(print())
		.pipe(gulp.dest(dest));
});


gulp.task('images_client', ['environmentCheck'], function() {

	var dest = global.outputDirClient + ABWA.config.dataPath + '/img';

	return gulp.src( ABWA.config.clientimgSrcPath )
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
		.pipe(print())
		.pipe(gulp.dest(dest));
});
