var gulp = require('gulp');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');

var Files = {
    LIB: 'lib/**/*.js',
    UNIT: 'test/unit/**/*.js'
}

function mochaErrorHandler(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('mocha', function() {
    return gulp.src(Files.UNIT, { read: false })
        .pipe(mocha())
        .on("error", function (err) {
            console.log(err.toString());
            this.emit('end');
        });
});

gulp.task('mocha-coverage', function() {
    var coverageConfig = {pattern: [Files.LIB]};

    return gulp.src(Files.UNIT, { read: false })
        .pipe(cover.instrument(coverageConfig))
        .pipe(mocha())
        .on("error", function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});

gulp.task('watch-mocha', ['mocha'], function() {
    gulp.watch([Files.LIB, Files.UNIT], ['mocha']);
});

gulp.task('watch-coverage', ['mocha-coverage'], function() {
    gulp.watch([Files.LIB, Files.UNIT], ['mocha-coverage']);
});