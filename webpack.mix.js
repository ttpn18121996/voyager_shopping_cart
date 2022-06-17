const mix = require("laravel-mix");
const path = require("path");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.jsx", "public/js")
    .react()
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
        require("autoprefixer"),
    ])
    .sass("resources/css/custom.scss", "public/css")
    .alias({
        "@": "resources/js",
        ziggy: path.resolve("vendor/tightenco/ziggy/dist"),
    });

if (mix.inProduction()) {
    mix.version();
}
