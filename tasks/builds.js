var gulp 		= require('gulp');
var runSequence = require('run-sequence');
var inject      = require('gulp-inject-string');


var getSequence = function getSequence()
{
    switch(ABWA.config.mode)
    {
        case 'core':
            return runSequence(
                'clean',
                'images',
                'fonts',
                'stylus_auth',
                'stylus_core',
                'stylus_frontend',
                'plugins',
                'root_files',
                // 'uploadsfolder',
                'js_build',
                'js_build_auth',
                'js_build_frontend');
        break;
        default:
            return runSequence(
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
                'root_files_client',//
                // 'uploadsfolder',
                'js_build',
                'js_build_auth',
                'js_build_client',
                'js_build_frontend');
        break;
    }

    
    
}

gulp.task('build_dev', ['setDevelopment'], function() {
    getSequence();
});

gulp.task('build', ['setProduction'], function() {
    getSequence();
});