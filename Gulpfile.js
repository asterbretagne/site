"use strict";

var gulp, sass, bourbon, neat, browserSync, minify, 
    js_src, js_dist;

gulp        = require("gulp");
sass        = require("gulp-sass");
bourbon     = require("node-bourbon");
neat        = require("node-neat").includePaths;
browserSync = require("browser-sync");
minify      = require('gulp-minify');

js_src  = './src/assets/js';
js_dist = './dist/assets/js';


// Compile SASS files
gulp.task("sass", function() {
  gulp.src("src/assets/css/**/*.scss")
      .pipe(sass({
        includePaths: [].concat("node_modules/normalize-scss/sass", neat)
      }))
      .pipe(gulp.dest("dist/assets/css"))
      .pipe(browserSync.reload({
        stream: true
      }))
});

// Prepare image assets
gulp.task("img", function() {
  gulp.src("src/assets/img/**/*.*")
      .pipe(gulp.dest("dist/assets/img"))
});

// Copy fonts
gulp.task('fonts', function() {
    gulp.src("src/assets/fonts/**/*.*")
          .pipe(gulp.dest("dist/assets/fonts"))
});

// Prepare HTML files
gulp.task("html", function() {
  gulp.src("src/**/*.html")
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
    }
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
