
var gulp=require('gulp');
var sass=require('gulp-sass');

gulp.task('hello',function(){
    console.log('Hello Simon');
});

gulp.task('sass',function(){
    return gulp.src('app/scss/styles.scss')
            .pipe(sass())
            .pipe(gulp.dest('app/css'));
});


