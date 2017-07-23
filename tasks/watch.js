var gulp 		= require('gulp');
var reload 		= require('browser-sync').reload;
var runSequence = require('run-sequence');

gulp.task('watch', ['setDevelopment'], function() 
{
	switch(ABWA.config.mode)
	{
		case 'core':
			runSequence(
				'clean',
				'images',
				'fonts',
				'stylus_auth',
				'stylus_core',
				'stylus_frontend',
				'plugins',
				// 'uploadsfolder',
                'root_files',
				'js_watch',
				'js_watch_auth',
				'js_watch_frontend',
				'browserSync_express');
		    
			gulp.watch(ABWA.config.coreStylusWatchPath, ['stylus_core']);
			gulp.watch(ABWA.config.authStylusWatchPath, ['stylus_auth']);
			gulp.watch(ABWA.config.frontendStylusPath, ['stylus_frontend']);
		break;
		default:
			runSequence(
				'clean',
				'images',
				'images_client',
				'fonts',
				'fonts_client',
				'stylus_auth',
				'stylus_core',
				'stylus_frontend',
				'stylus_client',
				'plugins',
				'plugins_client',
                'root_files',
				'root_files_client',
				// 'uploadsfolder',
				'js_watch',
				'js_watch_auth',
				'js_watch_frontend',
				'js_watch_client',
				'browserSync_express');
		    
			gulp.watch(ABWA.config.coreStylusWatchPath, ['stylus_core']);
			gulp.watch(ABWA.config.authStylusWatchPath, ['stylus_auth']);
			gulp.watch(ABWA.config.frontendStylusPath, ['stylus_frontend']);
			gulp.watch(ABWA.config.clientStylusWatchPath, ['stylus_client']);
			
		break;
	}
});

// gulp.task('watch_nm', ['setDevelopment'], function() 
// {
//     // runSequence('watch_files_express', 'nodemon');
//     runSequence('js_watch', 'nodemon');
//     // runSequence('watch_files_express', 'js_watch', 'nodemon');
// });

// gulp.task('watch_files', ['setWatch'], function()
// {
// 	gulp.watch('src/jade/**/*.*', 	['jade']);
// 	gulp.watch('src/js/**/*.*', 	['js']);
// 	gulp.watch('src/stylus/pages/*.*', ['stylus']);
// 	// gulp.watch('core/jade/**/*.*', 	['jade']);
// 	// gulp.watch('core/js/**/*.*', 	['js']);
// 	// gulp.watch('core/stylus/**/*.*', ['stylus']);
// 	// gulp.watch('core/stylus/pages/*.*', ['stylus']);
// });