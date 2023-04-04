`use strict`;

const gulp = require(`gulp`);
const babel = require(`gulp-babel`);
const concat = require(`gulp-concat`);

/**
 * Asset paths.
 */
const srcJS = `js/*.js`;

/**
 * JS task
 *
 * Note: use npm to install libraries and add them below, like the babel-polyfill example
 */
const jsFiles = [`./node_modules/babel-polyfill/dist/polyfill.js`, srcJS];

gulp.task(`js`, () => {
  return (
    gulp
      .src(jsFiles)
      .pipe(
        babel({
          presets: [`@babel/preset-env`],
        })
      )
      .pipe(concat(`global.js`))
      // .pipe(uglify())
      .pipe(gulp.dest(assetsDir))
  );
});

/**
 * Watch task
 */
gulp.task(`watch`, () => {
  gulp.watch(srcJS, gulp.series(`js`));
});

/**
 * Default task
 */
gulp.task(`default`, gulp.series(`js`));
