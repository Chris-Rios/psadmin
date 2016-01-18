"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //run a local dev server
var open = require('gulp-open'); //Open a url in a web browswer
var browserify = require('browserify'); // Bundles Js
var reactify = require('reactify'); //Transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with gulp
var concat = require('gulp-concat'); //Concats files
var lint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
          'node_modules/toastr/build/toastr.min.css'
        ],
        img: './src/images/*',
        mainJs: './src/main.js',
        dist:'./dist'
    }
}

//start a local dev server
gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//note that in the [] are the dependicies on other tasks
//go get index.html and open it
gulp.task('open', ['connect'],function(){
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}))
});


//get all files from the html config paths, and then put it int he dist folder,
//also reload.
gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

//transforms into jsx into js, using reactify, bundles everything, gives an
//error if there is one, pipes the bundle into the source streams
// defines what the bundle is
//and where to put it, also reload.
gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

//concat all css into css directory, save some http requests.
gulp.task('css',function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('img',function(){
  gulp.src(config.paths.img)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

    gulp.src('./src/favicon.ico')
      .pipe(gulp.dest(config.paths.dist));
});

//watch these files at these paths, and if something happens run the entered
//tasks
gulp.task('watch', function(){
  gulp.watch(config.paths.html,['html'])
  gulp.watch(config.paths.js,['js', 'lint'])
});

gulp.task('lint', function(){
  return gulp.src(config.paths.js)
          .pipe(lint({config: 'eslint.config.json'}))
          .pipe(lint.format());
})


//task that is run by default when we type in 'gulp' to the command line.
gulp.task('default',['html', 'js', 'css','img', 'lint', 'open','watch']);
