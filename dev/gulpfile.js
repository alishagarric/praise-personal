`use strict`;

const gulp = require(`gulp`);
const babel = require(`gulp-babel`);
const autoprefixer = require(`gulp-autoprefixer`);
const changed = require(`gulp-changed`);
const cleanCss = require(`gulp-clean-css`);
const concat = require(`gulp-concat`);
const rename = require(`gulp-rename`);
const replace = require(`gulp-replace`);
const postcss = require("gulp-postcss");
const sass = require(`gulp-sass`);
const uglify = require(`gulp-uglify`);
const scssLint = require(`gulp-scss-lint`);

/**
 * Asset paths.
 */
const srcSCSS = `scss/**/*.{scss,sass}`;
const srcJS = `js/*.js`;
const assetsDir = `../assets/`;

/**
 * Scss lint
 */
gulp.task(`scss-lint`, () => {
  return gulp.src(srcSCSS).pipe(scssLint());
});

/**
 * SCSS task
 */
gulp.task(
  `scss`,
  () => {
    return gulp
      .src(srcSCSS)
      .pipe(sass({ outputStyle: `expanded` }).on(`error`, sass.logError))
      .pipe(
        postcss([
          prefix({
            cascade: true,
            remove: true,
          }),
        ])
      )
      .pipe(gulp.dest(assetsDir))
      .pipe(rename({ suffix: ".min" }))
      .pipe(
        postcss([
          minify({
            discardComments: {
              removeAll: true,
            },
          }),
        ])
      )
      .pipe(gulp.dest(assetsDir));
  }

  /*
  gulp.series(`scss-lint`, () => {
    return gulp
   -   .src(`scss/*.scss.liquid`)
   -   .pipe(sass({ outputStyle: `expanded` }).on(`error`, sass.logError))
      .pipe(autoprefixer({ cascade: false }))
      .pipe(
        rename((path) => {
          path.basename = path.basename.replace(`.scss`, `.css`);
          path.extname = `.liquid`;
        })
      )
      .pipe(replace(`"{{`, "{{"))
      .pipe(replace(`}}"`, "}}"))
      .pipe(cleanCss())
      .pipe(gulp.dest(assetsDir));
  })*/
);

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
  gulp.watch(srcSCSS, gulp.series(`scss`));
  gulp.watch(srcJS, gulp.series(`js`));
});

/**
 * Default task
 */
gulp.task(`default`, gulp.series(`scss`, `js`));
