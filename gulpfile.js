//Import

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');

//SCSS

function style() {
    return gulp.src('./assets/scss/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('./'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}

function views() {
    return gulp.src('views/**/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: false
    }))
    .pipe(gulp.dest('./'));
}

//Serve and watch

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        startPath: './index.html',
        ghostMode: false,
        notify: false
    });
    gulp.watch('./assets/scss/**/*.scss', style);
    gulp.watch('./views/**/*.pug', views);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./assets/js/*.js').on('change', browserSync.reload);

}

exports.style = style;
exports.watch = views;
exports.watch = watch;
