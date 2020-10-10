const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.(jsx|js|vue)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    exclude: /(node_modules)/,
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                    },
                },
            ],
        },
        resolve: {
            alias: {
                '@': __dirname + '/resources/js/src',
            },
        },
    })
    .react('resources/js/src/index.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')