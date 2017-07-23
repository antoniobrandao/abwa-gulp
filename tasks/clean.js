var gulp         = require('gulp');
var del          = require('del');

gulp.task('clean', ['environmentCheck'], function ()
{
  	return del([
  		global.outputDir + '/resources/css',
  		global.outputDir + '/resources/fonts',
  		global.outputDir + '/resources/img',
  		global.outputDir + '/resources/js',
  		global.outputDir + '/resources/plugins',

  		global.outputDirClient + '/resources/css',
  		global.outputDirClient + '/resources/fonts',
  		global.outputDirClient + '/resources/img',
  		global.outputDirClient + '/resources/js',
  		global.outputDirClient + '/resources/plugins',
  	]);
});