
var gulp=require('gulp');
var sass=require('gulp-sass');

var browserSync=require('browser-sync');

var useref=require('gulp-useref');

var uglify=require('gulp-uglify');

var gulpif=require('gulp-if');

var cssnano=require('gulp-cssnano');

var minifyCss=require('gulp-minify-css');

var imagemin=require('gulp-imagemin');

var cache=require('gulp-cache');

var del=require('del');

var runSequence=require('run-sequence');



gulp.task('sass',function(){
    return gulp.src('app/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({
                stream:true
             }));
});

gulp.task('browserSync',function(){
    browserSync({
        server:{
            baseDir:'app'
        }
    });
});

gulp.task('images',function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
            .pipe(cache(imagemin({
                interlaced: true
            })))
            .pipe(gulp.dest('dist/images'));
});


gulp.task('fonts',function(){
   return gulp.src('app/fonts/**/*')
           .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch',function(){
   gulp.watch('app/scss/**/*.scss',['sass']); 
   gulp.watch('app/*.html',browserSync.reload());
   gulp.watch('app/js/**/*.js',browserSync.reload());
});

gulp.task('clean',function(callback){
    del('dist');
    return cache.clearAll(callback);
});

gulp.task('clean:dist',function(callback){
    del(['dist/**/*','!dist/images','!dist/images/**/*'],callback);
});

gulp.task('useref',function(){
    return gulp.src('app/*.html')
            .pipe(gulpif('app/js/**/*.js',uglify()))
            .pipe(gulpif('app/css/**/*.css',minifyCss()))
            .pipe(useref())
            .pipe(gulp.dest('dist'));
});

gulp.task('build',function(callback){
    runSequence(['clean:dist','useref','images','fonts'],callback);
    console.log('build completed');
});

gulp.task('default',function(callback){
    runSequence(['sass','browserSync','watch'],callback);
     
});

