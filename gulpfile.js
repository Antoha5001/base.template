const { src, dest, parallel, watch, series } = require('gulp');  // инициализация, подключение модуля
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const pug = require('gulp-pug');
const gulpSass = require('gulp-sass');
gulpSass.compiler = require('node-sass');
const browserSync = require('browser-sync').create();

const cssFiles = [
    "./node_modules/normalize.css/normalize.css",
    "./src/css/some.css",
    "./src/css/other.css"];

const scssFiles = [
    "./node_modules/normalize.scss/sass/normalize.scss",
    "./src/scss/style.scss"];

const jsFiles = [
    // "./src/js/style.js",
    // "./src/js/other.js"
];

function html() {
  return src('*.pug')
    .pipe(pug({
      pretty:true
    }))
    .pipe(dest('.'))
    .pipe(browserSync.stream());
}
config = {
    shape: {
        dest: '.'
    },
    mode: {
     
    }
  };
function svg(){
    console.log(123)
    return src('./src/img/logo-02.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./build/img'))
}

function cssBuild() {
    return src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({level: 2}))
        .pipe(dest('./build/css/'))
        .pipe(browserSync.stream());
 }

 function css() {
    return src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(dest('./build/css/'))
        .pipe(browserSync.stream());
 }
 function gulp_sass() {
    return src("./src/scss/style.scss")
        .pipe(gulpSass())
        // .pipe(concat('style.css'))
        .pipe(dest('./build/css/'))
        .pipe(browserSync.stream());
 }

function scripts() {
    return src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify({toplevel: true}))
        .pipe(dest('./build/js/'))
        .pipe(browserSync.stream());
}

function watchAll(){

    browserSync.init({
            proxy: "base.template"
    });

    watch('./src/css/**/*.css', css);
    watch('./src/pug/**/*.pug', html);
    watch('./src/scss/**/*.scss', gulp_sass);
    watch('./src/js/**/*.js', scripts);
    // gulp.watch('./*.php').on('change', browserSync.reload);
    watch('./*.html').on('change', browserSync.reload);
}

function clean(){
    return del(['build/*']);
}

exports.css = css;
exports.svg = svg;
exports.html = html;
exports.gulp_sass = gulp_sass;
exports.scripts = scripts;
exports.watch = watchAll;
exports.build = series(clean, parallel(gulp_sass));

// gulp.task('dev', gulp.series('build', 'watch') );


exports.default = watchAll;

