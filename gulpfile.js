const gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	runSequence = require('run-sequence'),
	asset = require('./config/assets/all');


gulp.task('env:development', () => {
	process.env.NODE_ENV = 'development';
});

gulp.task('env:debug', () => {
	process.env.NODE_ENV = 'debug';
});

gulp.task('env:production', () => {
	process.env.NODE_ENV = 'production';
});

// Start server with restart on file changes
gulp.task('server', () => {
	return nodemon({
		script: 'server',
		ext: 'js',
		verbose: true,
		watch: asset.allJS
	});
});

gulp.task('debugServer', () => {
	return nodemon({
		script: 'server',
		ext: 'js',
		verbose: true,
		watch: asset.allJS
	});
});


gulp.task('watch', () => {
	gulp.watch(asset.allJS);
});

// gulp dev for development
gulp.task('dev', (done) => runSequence('env:development', 'server', 'watch', done));

// gulp prod for production
gulp.task('debug', (done) => runSequence('env:debug', 'debugServer', 'watch', done));
