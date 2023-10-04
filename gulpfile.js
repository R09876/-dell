const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const groupCssMediaQueries = require('gulp-group-css-media-queries');
const svgstore = require('gulp-svgstore');
const webp = require('gulp-webp');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

// Компиляция Sass в CSS, добавление префиксов, минификация и сохранение в dist/css
function compileSass() {
  return gulp
    .src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(groupCssMediaQueries())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// Объединение и минификация JS файлов в один файл, сохранение в dist/js
function concatAndMinifyJS() {
  return gulp
    .src('src/js/main/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

// Копирование
function copy() {
  return gulp
    .src(['src/fonts/*','src/*.html', 'src/js/vendor/*.js','src/img/**/*', '!src/img/sprite'], {
      base: 'src',
    })
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
};

// Конвертация изображений в WebP
function convertToWebp() {
  return gulp
    .src('src/img/**/*.{jpg,jpeg,png}')
    .pipe(webp())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
}

// Создание SVG-спрайта
function createSvgSprite() {
  return gulp
    .src('src/img/sprite/*.svg')
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
}


// Очистка папки dist
function cleanDist() {
  return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean());
}

// Запуск сервера BrowserSync
function startServer() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch('src/*.html', copy);
  gulp.watch('src/sass/**/*.scss', compileSass);
  gulp.watch('src/js/**/*.js', concatAndMinifyJS);
  gulp.watch('src/svg/*.svg', createSvgSprite);
  gulp.watch('src/img/**/*.{jpg,jpeg,png}', convertToWebp);
}

// Задача для запуска сборки
const build = gulp.series(cleanDist,gulp.parallel(compileSass, copy, concatAndMinifyJS, createSvgSprite, convertToWebp));

// Задача запуск сборки и сервера
const start = gulp.series(build, startServer);


exports.build = build;
exports.start = start;