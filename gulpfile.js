/* global require */

var _ = require('lodash');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minify = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var wiredep = require('wiredep').stream;
var path = require('path');

/**
 * Tools
 */
gulp.task('browser-sync', ['build'], function() {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
});

/**
 * Assets
 */
var assets = {
  build: function() {
    gutil.log(gutil.colors.yellow('[?] Building Assets...'));
    return gulp.src('./src/assets/**/*')
      .pipe(gulp.dest('./dist/assets'))
      .on('end', function() {
        gutil.log(gutil.colors.green('[✔] Finished Assets'));
      });
  },
  reload: function() {
    return assets.build()
      .pipe(browserSync.stream());
  },
  watch: function() {
    return gulp.watch('src/assets/**/*', ['reload-assets'])
      .on('change', function(event) {
        if (event.type === 'deleted') {
          del(path.relative('./', event.path).replace('src/assets/', 'dist/assets/'));
          assets.reload();
        }
      });
  }
};

gulp.task('build-assets', ['clean'], assets.build);
gulp.task('watch-assets', ['browser-sync'], assets.watch);
gulp.task('reload-assets', assets.reload);

/**
 * Pages
 */
var pages = {
  build: function() {
    gutil.log(gutil.colors.yellow('[?] Building Pages...'));
    return gulp.src('./src/**/*.html')
      .pipe(wiredep({
        ignorePath: './dist'
      }))
      .pipe(gulp.dest('./dist'))
      .on('end', function() {
        gutil.log(gutil.colors.green('[✔] Finished Pages'));
      });
  },
  reload: function() {
    return pages.build()
      .pipe(browserSync.stream());
  },
  watch: function() {
    return gulp.watch('src/**/*.html', ['reload-pages']);
  }
};

gulp.task('build-pages', ['clean'], pages.build);
gulp.task('watch-pages', ['browser-sync'], pages.watch);
gulp.task('reload-pages', pages.reload);

/**
 * Styles
 */
var styles = {
  build: function() {
    gutil.log(gutil.colors.yellow('[?] Building Styles...'));
    return gulp.src('./src/index.css')
      .pipe(sourcemaps.init())
      .pipe(minify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist'))
      .on('end', function() {
        gutil.log(gutil.colors.green('[✔] Finished Styles'));
      });
  },
  reload: function() {
    return styles.build()
      .pipe(browserSync.stream());
  },
  watch: function() {
    return gulp.watch('src/**/*.css', ['reload-styles']);
  }
};

gulp.task('build-styles', ['clean'], styles.build);
gulp.task('watch-styles', ['browser-sync'], styles.watch);
gulp.task('reload-styles', styles.reload);

/**
 * Scripts
 */
var scripts = {
  b: browserify({
    entries: ['./src/index.js'],
    cache: {},
    packageCache: {}
  }),
  build: function() {
    gutil.log(gutil.colors.yellow('[?] Building Scripts...'));
    return scripts.b.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red('[✘] ' + err));
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist'));
  },
  reload: function() {
    return scripts.build()
      .pipe(browserSync.stream());
  },
  watch: function() {
    watchify(scripts.b)
      .on('update', scripts.reload)
      .on('time', function(time) {
        gutil.log(gutil.colors.green('[✔] Finished Scripts in:'), gutil.colors.cyan(time + 'ms'));
      });
    return scripts.reload();
  }
};

gulp.task('build-scripts', ['clean'], scripts.build);
gulp.task('watch-scripts', ['browser-sync'], scripts.watch);
gulp.task('reload-scripts', scripts.reload);

/**
 * Tasks
 */
gulp.task('clean', function(cb) {
  del([
    'dist/**/*',
    '!dist/bower/**'
  ]).then(function() {
    cb();
  });
});

gulp.task('build', [
  'build-assets',
  'build-pages',
  'build-styles',
  'build-scripts'
]);

gulp.task('watch', [
  'watch-assets',
  'watch-pages',
  'watch-styles',
  'watch-scripts'
]);

gulp.task('default', [
  'watch'
]);
