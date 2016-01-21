var gulp = require('gulp');
var serve = require('gulp-serve');
var react = require('gulp-react');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var inject = require('gulp-inject');

var options = {
    dir: {
        src: './src',
        app: './src/app',
        dist: './dist',
        build: './build'
    },
    sources: {
        html: ['./src/*.html'],
        css: ['./src/assets/*.css'],
        jsx: ['./src/app/**/*.jsx'],
        js: ['./src/app/**/*.js']
    },
    distSources: {
        html: ['./dist/*.html'],
        js: ['./dist/app/**/*.js']
    }
};

function getAllAsArray(obj, options) {
    var ret = [];
    Object.keys(obj).forEach(function(key){
        if(options && options.exclude && options.exclude.indexOf(key) > -1) {
            // skip
        }
        else {
            if(Object.prototype.toString.call( obj[key] ) === '[object Array]') {
                obj[key].forEach(function(val){
                    ret.push(val);
                });
            }
            else {
                ret.push(obj[key]);
            }
        }
    });
    return ret;
}


// jsx to js

gulp.task('jsx', function () {
    console.log('jsx to js working...');
    gulp.src(options.sources.jsx)
        .pipe(react())
        .pipe(gulp.dest(options.dir.app));
});

// clean tasks

//gulp.task('clean-dist', function () {
//    return gulp.src(options.dir.dist, {read: false})
//        .pipe(clean());
//});

// copy tasks

//gulp.task('copy-dist', ['clean-dist'],  function () {
//    gulp.src(getAllAsArray(options.sources, {exclude: ['jsx']}))
//        .pipe(gulp.dest('dist'));
//});

// watch

gulp.task('watch-jsx', function () {
    gulp.watch(options.sources.jsx, ['jsx']);
});

// inject

gulp.task('injectIndex', function () {
    var sources = options.sources.js.concat(options.sources.css);
    gulp.src(options.dir.src + '/index.html')
        .pipe(inject(gulp.src(sources, {read: false}), {ignorePath: 'src'}))
            .pipe(gulp.dest(options.dir.src));
});

// serve

gulp.task('serve', serve({
    root: './src',
    port: 4000
}));

gulp.task("build", ['jsx', 'injectIndex']);

gulp.task("default", ['build', 'watch-jsx', 'serve']);