var browserSync = require('browser-sync');
var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
var reload 		  = browserSync.reload;

// gulp.task('browserSync', ['environmentCheck'], function() 
// {
// 	browserSync.init([global.outputDir + '/**'], {
// 		open: false,
// 		server: {
// 			baseDir: global.outputDir
// 		}
// 	});
// });


// gulp.task('browserSync_express', ['environmentCheck'], function() 
// {
// 	browserSync.init([global.outputDir + '/**'], {
// 		open: false,
// 		port: 4000,
// 		proxy: "http://localhost:3000"
// 	});
// });

gulp.task('browserSync_express', ['nodemon'], function() {
  browserSync.init([global.outputDir + '/**'], {
	open: false,
    proxy: "localhost:8080",  // local node app address
    port: 3000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  console.log('__dirname: ' + __dirname);
  return nodemon({
    script: './node_modules/abwa/index.js',
    ignoreRoot: ['.git'],
    watch: [
      'node_modules/abwa/express/',
      'src_client_app/routes/',
    ],
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 3000);
  });
});

// gulp.task('default', ['browser-sync'], function () {
//   gulp.watch(['public/*.html'], reload);
// });
