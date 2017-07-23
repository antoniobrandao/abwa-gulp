var gulp 		= require('gulp');
var fs 			= require('fs');

gulp.task('setDevelopment', function() 
{
	global.ENV 		 		= 'development';
	global.outputDir 		= ABWA.config.builds_core + 'development';
	global.outputDirClient 	= ABWA.config.builds_client + 'development';

	var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8')); // get data from package.json
  	global.currentVersion = pkg.version; // determine current version
  	return;
});