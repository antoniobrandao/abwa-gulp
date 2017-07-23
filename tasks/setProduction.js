var gulp 		= require('gulp');
var fs 			= require('fs');

gulp.task('setProduction', function() 
{
	global.ENV		 		= 'production';
	global.outputDir 		= ABWA.config.builds_core + 'production';
	global.outputDirClient 	= ABWA.config.builds_client + 'production';

	var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8')); // get data from package.json
  	global.currentVersion = pkg.version; // determine current version
  	return;
});