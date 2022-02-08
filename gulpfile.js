const {src, dest, watch, parallel, series}  = require('gulp');
const browserSync   = require('browser-sync').create();
const del = require('del');

//for scripts
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');

//for styles
const scss = require('gulp-sass')(require('node-sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

//for fonts
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

//for images
const imagemin = require('gulp-imagemin');










//Clean dist
const clean = () => {
    return del(['dist/*'])
}

const htmlBuild = () => {
    return src([
        'src/*.html'
    ], {base: './src'})
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
}


// Fonts
const fonts = () => {
    src('./src/fonts/**.ttf')
        .pipe(ttf2woff())
        .pipe(dest('./dist/fonts/'))
    return src('./src/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('./dist/fonts/'))
}

//Images
const images = () => {
    return src(['./src/images/**/*.jpg', './src/images/**/*.png', './src/images/**/*.jpeg'])
        .pipe(dest('./dist/images'))
}

//SVG
const imageSVG = () => {
    return src ('./src/icons/**/*.svg')
        .pipe (dest('./dist/icons'))
}

//Scripts
const scripts = () => {
    return src('./src/js/main.js')
        .pipe(webpackStream({
            mode: 'development',
            output: {
                filename: 'main.js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }]
            },
        }))
        .on('error', function (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end'); // Don't stop the rest of the task
        })

        .pipe(sourcemaps.init())
        .pipe(uglify().on("error", notify.onError()))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream());
}

// Styles

const stylesMin = () => {
    return src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({
            outputStyle: 'expanded'
        }).on('error', notify.onError()))
        .pipe(dest('./dist/css/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());
}

// Watching file on gulp default
const watching =() =>{
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    watch('src/*.html', htmlBuild);
    watch('./src/scss/**/*.scss', stylesMin);
    watch('./src/js/**/*.js', scripts);
    watch('./src/fonts/**.ttf', fonts);
    watch('./src/images/**/*.svg', imageSVG);
    watch('./src/images/**/*.jpg', images);
    watch('./src/images/**/*.png', images);
    watch('./src/images/**/*.jpeg', images);
}

exports.default = series(clean, parallel(htmlBuild, scripts, fonts, images, imageSVG), stylesMin, watching);

//Building Scripts

const imagesBuild = () => {
    return src('src/images/**/*')
        .pipe(imagemin(
            [
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
            ]
        ))
        .pipe(dest('./dist/images'))
}

const stylesBuild = () => {
    return src('./src/scss/**/*.scss')
        .pipe(scss({
            outputStyle: 'expanded'
        }).on('error', notify.onError()))
        .pipe(dest('./dist/css/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('./dist/css/'))
}

const scriptsBuild = () => {
    return src('./src/js/main.js')
        .pipe(webpackStream({
            mode: 'development',
            output: {
                filename: 'main.js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }]
            },
        }))
        .on('error', function (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end'); // Don't stop the rest of the task
        })
        .pipe(uglify().on("error", notify.onError()))
        .pipe(dest('./dist/js'))
}


exports.build = series(clean, parallel(htmlBuild, scriptsBuild, fonts, imagesBuild, imageSVG), stylesBuild);

