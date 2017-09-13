"use strict";
/*****************************************
    Variables
******************************************/

// Project-Specific
// var serverProjectFolder = "server/BlueBasis.web";
// var distFolderName = "dist";

// Standard Folders
var frontEndFolder = "./";
var frontEndPathJS = frontEndFolder + "js";
var frontEndPathSCSS = frontEndFolder + "style/scss";
var frontEndPathCSS = frontEndFolder + "style/css";
var frontEndPathPUG = frontEndFolder + "pug";

// var serverPathRoot = serverProjectFolder + "/";
// var serverPathJS = serverPathRoot + "/" + distFolderName + "/js";
// var serverPathCSS = serverPathRoot + "/" + distFolderName + "/css";
// var serverPathImg = serverPathRoot + "img";
// var serverPathFonts = serverPathRoot + "fonts";

//Dependency Variables
var autoprefixer = require("gulp-autoprefixer"),
   base64 = require("gulp-css-base64"),
   bs = require("browser-sync").create(),
   cached = require("gulp-cached"),
   changed = require("gulp-changed"),
   concat = require("gulp-concat"),
   del = require("del"),
   gulp = require("gulp"),
   gulpif = require("gulp-if"),
   include = require("gulp-include"),
   minify = require("gulp-minify"),
   notify = require("gulp-notify"),
   plumber = require("gulp-plumber"),
   pug = require("gulp-pug"),
   pugInheritance = require("gulp-pug-inheritance"),
   sass = require("gulp-sass"),
   sourcemaps = require("gulp-sourcemaps");

//Browsersync Variables
var sitePort = Math.floor(Math.random() * (49150 - 1024 + 1)) + 1024;
var uiPort = sitePort + 1;




/*****************************************
Static Assets Tasks
******************************************/
// gulp.task("copy-static-assets", function() {
//     gulp.src([frontEndFolder + "img/**/*"]).pipe(gulp.dest(serverPathImg));
//     gulp.src([frontEndFolder + "fonts/**/*"]).pipe(gulp.dest(serverPathFonts));
// });


/*****************************************
JavaScript Tasks
******************************************/
//Delete old compiled JS
gulp.task("js-clean", function() {
  // del(serverPathJS + "/frontEnd*.js");
  del(frontEndPathJS + "/frontEnd*.js");
});

//Create Temp Compiled JS file
gulp.task("js-imports", ["js-clean"], function() {
   return gulp.src(frontEndPathJS + "/custom/imports.js")
      .pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
      .pipe(include({
         extensions: "js",
         hardFail: false,
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(frontEndPathJS + "/"));
});

//Concatenate JS
gulp.task("js-concat", ["js-imports"], function() {
   return gulp.src([frontEndFolder + "js/front-end/jquery*.js",
         frontEndPathJS + "/vendor/jquery.min.js",
         frontEndPathJS + "/vendor/bootstrap.min.js",
         frontEndPathJS + "/vendor/*.js",
         frontEndPathJS + "/imports.js",
      ])
      .pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
      .pipe(concat("frontEnd.js"))
      .on("error", function(err) {
         new Error(err);
      })
      .pipe(plumber.stop())
      .pipe(gulp.dest(frontEndPathJS + "/"))
      // .pipe(gulp.dest(serverPathJS));
});

gulp.task("js-delete-temp-import", ["js-concat"], function() {
   del(frontEndPathJS + "/imports.js");
});

//Minify JS
gulp.task("js-minify", ["js-delete-temp-import"], function() {
   return gulp.src(frontEndPathJS + "/frontEnd.js")
      .pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
      .pipe(minify({
         noSource: true,
         mangle: false
      }))
      .on("error", function(err) {
         new Error(err);
      })
      .pipe(plumber.stop())
      .pipe(gulp.dest(frontEndPathJS + "/"))
      // .pipe(gulp.dest(serverPathJS))
      .pipe(bs.stream());
});

/*****************************************
    SCSS/CSS Tasks
******************************************/
// Delete old compiled CSS
gulp.task("css-clean", function() {
   del(frontEndPathCSS + "/**");
   // del(serverPathCSS + "/**");
});
// Compile SCSS, Prefix, Write Sourcemap
gulp.task("css-compile", ["css-clean"], function() {
   return gulp.src([frontEndPathSCSS + "/**/*.scss"])
      .pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: "compressed" }).on("error", function(err) {
         new Error(err);
      }))
      .pipe(autoprefixer({
         browsers: ["last 2 versions"],
         cascade: false
      }))
      .pipe(sourcemaps.write())
      .pipe(plumber.stop())
      .pipe(gulp.dest(frontEndPathCSS))
      // .pipe(gulp.dest(serverPathCSS))
      .pipe(bs.stream({ match: "**/*.css" }));
});

/*****************************************
    PUG Tasks
******************************************/
//Compile changed PUG files to and push to browser
gulp.task("pug-compile-changed", function() {
   return gulp.src([frontEndPathPUG + "/**/*.pug"])
      .pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
      //this doesnt seem to compile the main files when includes are modified
      //.pipe(changed(frontEndFolder, { extension: ".html" }))
      // this does but have to watch for any negative ramifications of this change
      .pipe(changed(frontEndFolder))
      .pipe(gulpif(global.isWatching, cached("pug")))
      .pipe(pugInheritance({ basedir: frontEndPathPUG, skip: "node_modules" }))
      .pipe(pug({
         pretty: true,
         notify: false
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(frontEndFolder));
});
/**
 * Important!!
 * Separate task for the reaction to `.pug` files to call reload only after all pug files have
 * been compiled
 */
gulp.task("pug-push", ["pug-compile-changed"], function() {
   return gulp.src([frontEndPathPUG + "/**/*.pug"])
      .pipe(bs.stream({
         once: true
      }));
});

//set global watching variable
gulp.task("setWatch", function() {
   global.isWatching = true;
});

//Delete old compiled HTML files
gulp.task("pug-clean", function() {
   //return del([frontEndFolder + "/*.html", frontEndFolder + "/includes/*.html", frontEndFolder + "/includes/header-components/*.html"]);
});
//Compile Remaining PUG files to HTML
gulp.task("pug-compile-all", ["pug-clean"], function() {
   return gulp.src([frontEndPathPUG + "/**/*.pug"])
      .pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
      .pipe(pug({
         pretty: true,
         notify: false
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(frontEndFolder))
});

// gulp.task("build-dev", ["css-compile"], function() {
//    return;
// });

// gulp.task("build-prod", ["css-compile", "pug-compile-all", "js-minify"], function() {
//    return;
// });

// gulp.task("clean", ["js-clean", "css-clean", "pug-clean"], function() {
// return;
// });

/*****************************************
    BrowserSync & Watch Tasks
******************************************/
//Browsersync watch and serve changes
gulp.task("default", ["css-compile", "setWatch", "pug-compile-all", "js-minify"], function() {
   bs.init({
      notify: false,
      server: {
         baseDir: frontEndFolder
      },
      port: sitePort,
      ui: {
         port: uiPort
      }
   })
   gulp.watch([frontEndPathSCSS + "/**/*.scss"], ["css-compile"]);
   gulp.watch([frontEndPathJS + "/custom/**/*.js"], ["js-minify"]);
   gulp.watch([frontEndPathJS + "/vendor/**/*.js"], ["js-minify"]);
   gulp.watch([frontEndPathPUG + "/**/*.pug"], ["pug-push"]);
});

