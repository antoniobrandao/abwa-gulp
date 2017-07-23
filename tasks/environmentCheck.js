var gulp 		= require('gulp');
var fs 			= require('fs');

// this task checks if no environment has been set - and defaults environment variables to 'development' 

gulp.task('environmentCheck', function() 
{
	if (!global.ENV) {
		global.ENV 		 		= 'development';
		global.outputDir 		= ABWA.config.builds_core + 'development';
		global.outputDirClient 	= ABWA.config.builds_client + 'development';
	}

	if (!global.currentVersion) {
		
		var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8')); // get data from package.json
	  	global.currentVersion = pkg.version; // determine current version
	  	
	  	console.log('global.currentVersion: ' + global.currentVersion);
	  	console.log('global.currentVersion: ' + global.currentVersion);
	  	console.log('global.currentVersion: ' + global.currentVersion);
	  	console.log('global.currentVersion: ' + global.currentVersion);
	  	console.log('global.currentVersion: ' + global.currentVersion);
	}

  	return;
});