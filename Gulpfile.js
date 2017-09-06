"use strict";

var gulp, sass, postcss, autoprefixer, bourbon, neat, browserSync, imagemin, minify, 
    nunjucksRender, js_src, js_dist;

gulp        = require("gulp");
sass        = require("gulp-sass");
postcss     = require("gulp-postcss");
autoprefixer= require("autoprefixer");
bourbon     = require("node-bourbon");
neat        = require("node-neat").includePaths;
browserSync = require("browser-sync");
imagemin    = require("gulp-imagemin");
minify      = require('gulp-minify');
nunjucksRender = require('gulp-nunjucks-render');

js_src  = './src/assets/js';
js_dist = './dist/assets/js';

// console.log([].concat("node_modules/normalize-scss/sass", bourbon.includePaths, neat));


// Compile SASS files
gulp.task("sass", function() {
  gulp.src("src/assets/css/**/*.scss")
      .pipe(sass({
        includePaths: [].concat("node_modules/normalize-scss/sass", bourbon.includePaths, neat)
      }))
      .pipe(postcss([ autoprefixer() ]))
      .pipe(gulp.dest("dist/assets/css"))
      .pipe(browserSync.reload({
        stream: true
      }))
});

// Prepare image assets
gulp.task("img", function() {
  gulp.src("src/assets/img/**/*.*")
      .pipe(imagemin())
      .pipe(gulp.dest("dist/assets/img"))
});

// Copy fonts
gulp.task('fonts', function() {
    gulp.src("src/assets/fonts/**/*.*")
          .pipe(gulp.dest("dist/assets/fonts"))
});

// Prepare HTML files
gulp.task("html", function() {
  return gulp.src("src/pages/**/*.html")
             .pipe(nunjucksRender({
               path: ['src/partials']
             }))
             .pipe(gulp.dest("dist"))
});

// Prepare JS files
//gulp.task('jsmin', function () {
//  gulp.src(js_src + '/**/*.js')
//    .pipe(minify({
//        ext: {
//            src:'.js',
//            min:'.min.js'
//        }
//    }))
//    .pipe(gulp.dest(js_dist));
//});

// Spin up a server
gulp.task("browserSync", function() {
  browserSync({
    server: {
      baseDir: "./dist"
    },
    browser: "chromium"
  })
});

// Live reload anytime a file changes
gulp.task("watch", ["browserSync", "html", "sass", "fonts", "img"], function() {
    gulp.watch("src/**/*.html", ["html"]);
    gulp.watch("src/assets/css/**/*.scss", ["sass"]);
    gulp.watch("src/assets/fonts/**/*.*", ["fonts"]);
    gulp.watch("src/assets/img/**/*.*", ["img"]);
    // gulp.watch(js_src + '/*.js', ["jsmin"]);
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
});

// Compiles all gulp tasks
// gulp.task("default", ["sass", "img", "fonts", "html", "slim", "jsmin"]);
gulp.task("default", ["html", "sass", "img", "fonts"]);
