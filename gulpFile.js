/*
Okay so this is our gulpfile. Gulp is something
I use during development. Its just a utility
for when one is making software. Gulp isnt
a part of whatever final software prduct 
one uses gulp to make.

If you look below, we are just defining
Gulp tasks, and then we are telling Gulp
when to run those tasks. Read the comments
*/

var gulp = require('gulp');
var autowatch = require('gulp-autowatch');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

const paths = {
  public: './public',
  js:     './src/js/*.js'
};

/* So this is a task called js */
gulp.task('js', function() {
  var bCache = {};
  /* 
  It grabs app.js from the src/js folder
  and then bundles it up with all its packages.

  During development Ill have maybe 100 js
  files in that directory and in subdirectories
  of src/js. Browserify bundles them all into
  one file.
  */
  var b = browserify('./src/js/app.js', {
    debug: true,
    interestGlobals: false,
    cache: bCache,
    extentions: [ '.js' ]
  });
  /*
  Once its bundled up, It saves it as a
  new file called 'app.js' in ./public
  */
  b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.public))
})


/*
So this task 'watch', just watches
the files, and triggers other tasks
when those files change.

So in this watch task, it says

if an html file in ./public changes,
run the server task. And if a 
javascript file changes in src/js, 
run the js task.
*/
gulp.task('watch', function() {
  autowatch(gulp, {
    server: './public/*.html',
    js: paths.js
  });
})

/*
This is our server task, it just 
runs server.js
*/
gulp.task('server', function(){
  require('./server');
})


/*
The default task is just what
gulp should do when if first starts up
*/
gulp.task('default', ['js', 'watch', 'server']);