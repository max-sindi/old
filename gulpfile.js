var postcss = require('gulp-postcss');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var nsg = require('node-sprite-generator');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    multipipe = require('multipipe');

const imagemin = require('gulp-imagemin');

var bld_rep = './docs';

/* css prefixer, minifier */
gulp.task('css', function () {

	var plugins = [
		autoprefixer( {browsers: ['last 10 versions']} )
		, cssnano()
	];
	return gulp.src(`${bld_rep}/css/main.css`)
	.pipe(postcss(plugins))
  .pipe(rename('main.min.css'))
	.pipe(gulp.dest(`${bld_rep}/css`));

});



/* sprite generate */
nsg = ({
    src: [
        './app/img/sprite/*.png'
    ],
    spritePath: './app/img/sprite.png',
    stylesheetPath: './app/img/sprite/sprite.css',
    stylesheet: 'scss'
}, function (err) {
    console.log('Sprite generated!');
});

gulp.task('sprite', nsg);
//


/* compile sass */
gulp.task('sass', function () {

 return gulp.src('./app/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('./app/css/main.css.map'))
    .pipe(gulp.dest('./app/css')); 

});

/*autoreload, watching */
gulp.task('watch', function () {
      browserSync.init({
        server: {
            baseDir: "./app/"
        }
      });
  gulp.watch('./app/sass/**/*.scss', ['sass', 'css']);
  gulp.watch('./app/js/modules/*.js', ['concat:js']);
  gulp.watch('./app/js/all.js', ['compress-js']);
  gulp.watch('./app/*.html').on('change', browserSync.reload);
  gulp.watch('./app/css/*.css').on('change', browserSync.reload);
  gulp.watch('./app/js/all.min.js').on('change', browserSync.reload);

});

gulp.task('sass:watch', function () {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});


gulp.task('js:concat', function () {
  return gulp.src([
        './app/libs/jquery.UISlider/jquery.ui-slider.js',
        './app/libs/owl-carousel/owl.carousel.min.js',
        './app/js/modules/jscript.js',
        './app/js/modules/jquery.formstyler.min.js',
        ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/js/'));
});


gulp.task('js:compress', function () {
  pump([
        gulp.src('./app/js/all.js')
        .pipe(rename("all.min.js")),
        uglify(),
        gulp.dest('./app/js/')
    ]);
});

/*minify img*/
gulp.task('min-img', () =>
  gulp.src(`${bld_rep}/img_uncompressed/**/*.png`)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 10})]
      , {
        verbose: true
      }))
    .pipe(gulp.dest('./app/img'))
);

gulp.task('img', function() {
  return multipipe(
          gulp.src ([`${bld_rep}/img/themes/main-top-banner-1.png`,
                    `${bld_rep}/img/themes/main-top-banner-2.png`,
                    `${bld_rep}/img/themes/main-top-banner-3.png`,
                    `${bld_rep}/img/themes/main-top-banner-4.png`,
                    `${bld_rep}/img/themes/main-top-banner-5.png`,
                    `${bld_rep}/img/themes/main-top-banner-6.png`]),
          gulp.dest(`${bld_rep}/img_uncompressed`),
          imagemin([
            imagemin.optipng({optimizationLevel: 10})]
            ,
             {     verbose: true
            }),
          gulp.dest(`${bld_rep}/img`)
        ).on( 'error', notify.onError() )
})