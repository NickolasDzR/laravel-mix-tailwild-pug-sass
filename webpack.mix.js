let mix = require("laravel-mix");
mix.pug = require("laravel-mix-pug");
const path = require("path");
require('laravel-mix-copy-watched');

if (process.env.section) {
    require(`${__dirname}/webpack.mix.${process.env.section}.js`);
} else {
    mix.alias({
        "%modules%": path.join(__dirname, "src/blocks/modules"),
        "%components%": path.join(__dirname, "src/blocks/components")
    })
        .js("src/js/index.js", "js").version()
        .extract()
        .sass("src/styles/main.scss", "css/main.css").version()
        .options({
            processCssUrls: false,
            postCss: [
                require("css-mqpacker"),
                require("tailwindcss")
            ]
        })
        .pug("src/views/index.pug", "../../dist")
        .copyDirectoryWatched("./src/fonts", "./dist/fonts")
        .setPublicPath("dist")
        .disableNotifications()
        .browserSync({
            server: "./dist/",
            port: 4000,
            watch: true,
        });
}
