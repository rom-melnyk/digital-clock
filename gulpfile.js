const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

const browserify = require('browserify');
const sass = require('gulp-sass');
const uglify = require('uglify-es');
const composer = require('gulp-uglify/composer');

const NAME = require('./package.json').name;
const DEST = 'bin/';
const minify = composer(uglify, console);


/** @subtasks-group clean */
gulp.task('clean:css', () => del([ `${DEST}${NAME}.min.css*` ]));
gulp.task('clean:js', () => del([ `${DEST}${NAME}.min.js*` ]));


/** @subtasks-group CSS */
gulp.task('css:dev', [ 'clean:css' ],  () => {
    gulp.src(`src/scss/${NAME}.scss`)
        .pipe(sourcemaps.init())
            .pipe( sass().on('error', sass.logError) )
        .pipe(sourcemaps.write())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST));
});

gulp.task('css:prod', [ 'clean:css' ],  () => {
    return gulp.src(`src/scss/${NAME}.scss`)
        .pipe( sass({ outputStyle: 'compressed' }).on('error', sass.logError) )
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST));
});


/** @subtasks-group JS */
gulp.task('js:dev', [ 'clean:js' ],  () => {
    const b = browserify({
        entries: `src/js/${NAME}.js`,
        debug: true
    });

    return b.bundle()
        .pipe(source(`${NAME}.min.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST));
});

gulp.task('js:prod', [ 'clean:js' ],  () => {
    const b = browserify({
        entries: `src/js/${NAME}.js`
    });

    return b.bundle()
            .on('error', gutil.log)
        .pipe(source(`${NAME}.min.js`))
        .pipe(buffer())
        .pipe(minify())
            .on('error', gutil.log)
        .pipe(gulp.dest(DEST));
});


/** @tasks-group */
gulp.task('dev', [ 'css:dev', 'js:dev' ], () => {
    gulp.watch('src/scss/**/*', [ 'css:dev' ]);
    gulp.watch('src/js/**/*', [ 'js:dev' ]);
});

gulp.task('prod', [ 'css:prod', 'js:prod' ]);

gulp.task('default', () => {
    console.log('\n\tUse `gulp dev` or `gulp prod`.\n');
});
