/**********************************************************************************
 **********************************************************************************
 * Gulp Build Design.
 * ****
 * => [build:hugo:<env>] The hugo build is done and its results sits in the './public/' folder.
 * hugoClean
 * hugoProdBuild
 * cleanRubbishContentPublic
 * # here i should run image processing tasks
 * # finally I copy all from ./public/ to ./docs/
 * copyToDocs
 * 
 **********************************************************************************
 * Global Processes List.
 * ****
 * ****
 * [Dev] Process list :
 * - [gulp build:hugo:clean:dev] : delete and recreate empty hugo build folder : [public/]
 * - [gulp build:hugo:dev] : run hugo build
 * - [gulp build:hugo:watch] : run hugo build in watch mode
 * - build sequences as gulp series : 
 *    => [gulp dev] : 
 *        - [gulp build:hugo:clean:dev] : delete and recreate empty hugo build folder : [public/]
 *        - [gulp build:hugo:watch] : run hugo build in watch mode
 * ***
 * [Prod] Process list :
 * - [gulp build:hugo:clean:prod] : delete and recreate empty folders : [public/] [docs/]
 * - [gulp build:hugo:prod] : run hugo build
 * - [gulp build:rubbish:clean:prod] : If necessary, clean all the rubbish unwanted assets that were generated in the [./public/] folder (by the hugo build, or any task)
 * - [gulp build:docs:prod] : copy everything from the [./public/] folder, to the [./docs/] folder 
 * - build sequences as gulp series : 
 *    => [gulp build:prod] : 
 *        - [gulp build:hugo:clean:prod]
 *        - [gulp build:hugo:prod]
 *        - [gulp build:rubbish:clean:prod]
 *        - [gulp build:docs:prod]
 * 
 **********************************************************************************
 * 
 * [Gulp Debug] Process list :
 * - [gulp build:debug] : alias for [gulp build:debug:dev].
 * - [gulp watch:debug:dev] : watch dev build gulp tasks debugging. Uses the BrowserSync.
 * 
 **********************************************************************************
 **********************************************************************************
 * https://medium.com/dwarves-foundation/automatically-lint-prettify-your-javascript-project-using-husky-lint-staged-cae8e685bb06
 * https://codeburst.io/continuous-integration-lint-staged-husky-pre-commit-hook-test-setup-47f8172924fc
 **********************************************************************************
 */

 /***************************************************************
  ***************************************************************
  *  ==>>>   | beautify the HTML/JS/CSS produced by hugo in public/ folder
  ***************************************************************
  ***************************************************************
  **/
  import dotenvModule from 'dotenv';
  const dotenv = dotenvModule.config();
  
  import gulp from 'gulp';
    
  import browserSyncModule from 'browser-sync';
  const browserSync = browserSyncModule.create();
  
  import nodeSassModule from 'node-sass';
  import sassModule from 'gulp-sass';
  const sassCompiler = sassModule(nodeSassModule);
  
  import pug from 'gulp-pug';
  
  import purgecss from 'gulp-purgecss';
  
  import gutil from 'gulp-util';
  
  import del from 'del';
  import fs from 'fs';
  
  import shell from 'shelljs';
  // const fs   = require('fs');
  // const fs   = require('fs');
  
  /// export PATH=$PATH:/usr/local/go/bin
  const hugoDeploymentDomain = `${process.env.HUGO_DEPLOYMENT_DOMAIN}`; /// export DEPLOYMENT_DOMAIN="croutenard.com"
  const hugoBaseURL = `${process.env.HUGO_BASE_URL}`; /// export HUGO_BASE_URL=http://${HUGO_HOST}:${HUGO_PORT}/ /// same as // export DEPLOYMENT_BASE_URL="https://${DEPLOYMENT_DOMAIN}"
  const hugoHost = `${process.env.HUGO_HOST}`; /// export HUGO_HOST=127.0.0.1
  const hugoPort = `${process.env.HUGO_PORT}`; /// export HUGO_PORT=4545


  gulp.task('build:env', () => {
    gutil.log(`// >>>>>>>>>>>> >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> + //`)
    gutil.log(` >>>>>>>>>>>> build:env() >> {hugoDeploymentDomain|HUGO_DEPLOYMENT_DOMAIN}=[${hugoDeploymentDomain}]`)
    gutil.log(` >>>>>>>>>>>> build:env() >> {hugoBaseURL|HUGO_BASE_URL}=[${hugoBaseURL}]`)
    gutil.log(` >>>>>>>>>>>> build:env() >> {hugoHost|HUGO_HOST}=[${hugoBaseURL}]`)
    gutil.log(` >>>>>>>>>>>> build:env() >> {hugoPort|HUGO_PORT}=[${hugoBaseURL}]`)
    gutil.log(`// >>>>>>>>>>>> >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> + //`)
    gutil.log(`// >>>>>>>>>>>> >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> + //`)
    // return gulp.pipe(browserSync.stream());
  })
  
  
  /***************************************************************
   *  ==>>>   | Clean (public folder)
   *  ==>>>   | Clean (docs folder)
   **/
  import clean from 'gulp-dest-clean';
  /// https://www.npmjs.com/package/gulp-clean
  import cclean from 'gulp-clean';
  import newer from 'gulp-newer';
   
  var hugoPrjFolder = './';
  var hugoPublicFolder = 'public';
  var hugoDocsFolder= './docs/';
  
  gulp.task('clean:hugo:dev', function () {
    return gulp.src(hugoPublicFolder, {read: false, allowEmpty: true})
          .pipe(cclean())
          .pipe(gulp.dest('./'))
          .pipe(browserSync.stream());
  });
  gulp.task('clean:hugo:prod', function () {
    return gulp.src(hugoPublicFolder, {read: false, allowEmpty: true})
          .pipe(cclean())
          .pipe(gulp.dest('./'))
          .pipe(browserSync.stream());
  });
  gulp.task('clean:docs:dev', function () {
    return gulp.src(hugoDocsFolder, {read: false, allowEmpty: true})
          .pipe(cclean())
          .pipe(gulp.dest('./'))
          .pipe(browserSync.stream());
  });
  gulp.task('clean:docs:prod', function () {
    return gulp.src(hugoDocsFolder, {read: false, allowEmpty: true})
          .pipe(cclean())
          .pipe(gulp.dest('./'))
          .pipe(browserSync.stream());
  });
  // ---------------
  gulp.task('clean:dev', gulp.series('clean:hugo:dev', 'clean:docs:dev'));
  gulp.task('clean:prod', gulp.series('clean:hugo:prod', 'clean:docs:prod'));
  
  /***************************************************************
   *  ==>>>   | Excute hugo build (will generate the website in public)
   **/
  
  import child_process from 'child_process';
  // Run Hugo to copy finished files over to public folder
  
  
  gulp.task("build:hugo:prod", (done) => {
  
   let hugo = child_process.spawn(`hugo`, [`-b`, `${hugoBaseURL}`]) // https://nodejs.org/api/child_process.html
  
   let hugoLogger = function (buffer) {
       buffer.toString()
       .split(/\n/)
       .forEach(function (message) {
           if (message) {
               gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> >> {hugoBaseURL|HUGO_BASE_URL}=[${hugoBaseURL}]`);
               gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> ${message}`);
           }
       });
   };
  
   hugo.stdout.on("data", hugoLogger);
   hugo.stderr.on("data", hugoLogger);
   hugo.on("close", (hugoExitCode) => { // exact same pattern as described at https://nodejs.org/api/child_process.html
                   gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> Hugo process exited with exite code ${hugoExitCode}`);
                   done(); // let gulp know the task has completed (before or after throwing an Error ?)
                   if ( hugoExitCode != 0 ) { // If hugo build fails, throw an error with appropriate error message
                     // https://github.com/gulpjs/gulp/discussions/2601#discussioncomment-2473502
                     let errorMessage = `An error occured during the  hugo build !! Hugo process exited with exite code ${hugoExitCode}`;
                     gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> ${errorMessage}`);
                     throw new Error(errorMessage)
                   }
               }
          );
  });
  
  
  gulp.task("build:hugo:dev", (done) => {
  
    // Run hugo cli synchronously
    /*
    shell.echo(`===========================================================`)
    shell.echo(`Wil execute hugo build command : [hugo -b ${hugoBaseURL}]`)
    let hugoBuildCmd = shell.exec(`hugo -b ${hugoBaseURL}`);
    shell.echo (hugoBuildCmd.stdout)
    if (hugoBuildCmd.code !== 0) {
      shell.echo (hugoBuildCmd.stderr)
      shell.echo('Error: hugo Build failed');
      shell.exit(1);
    } else {
      done()
    }
    */
   let hugoProcess = child_process.spawn(`hugo`, [`-b`, `${hugoBaseURL}`])
               .on("close", () => {
                   done(); // let gulp know the task has completed
               });
   let hugoLogger = function (buffer) {
       buffer.toString()
       .split(/\n/)
       .forEach(function (message) {
           if (message) {
               gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> [build:hugo:dev] >> {hugoBaseURL|HUGO_BASE_URL}=[${hugoBaseURL}]`);
               gutil.log("GoHugo.io: " + message);
               gutil.log("GoHugo.io: " + message);
           }
       });
   };
  
   hugoProcess.stdout.on("data", hugoLogger);
   hugoProcess.stderr.on("data", hugoLogger)
  
  
  });
  
  

  /***************************************************************
   ***************************************************************
   *  ==>>>   | PUBLIC TO DOCS : all copy tasks from public to docs folder
   ***************************************************************
   ***************************************************************
   **/
  
  
  
  // ------- //
  // Moves the HTML files from ./public into our ./docs folder
  //
  gulp.task('build:docs:html:dev', function () {
    return gulp.src('public/**/*.html')
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
  gulp.task('build:docs:html:prod', function () {
      return gulp.src('public/**/*.html')
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
    
  gulp.task('build:docs:img:dev', function () {
    return gulp
        .src([
          './**/*.png',
          './**/*.jpg',
          './**/*.gif'
        ],{
        "base" : "./public"
        })
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
  gulp.task('build:docs:img:prod', function () {
    return gulp
        .src([
          './**/*.png',
          './**/*.jpg',
          './**/*.gif'
        ],{
        "base" : "./public"
        })
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
    
  gulp.task('build:docs:js:dev', function () {
  ///   return gulp
  ///       .src([
  ///         '*.js',
  ///         '**/*.js',
  ///         '**/**/*.js',
  ///         '**/**/**/*.js'
  ///       ],{
  ///       "base" : "./public"
  ///       })
    return gulp.src('public/**/*.js')
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
  gulp.task('build:docs:js:prod', function () {
  ///  return gulp
  ///      .src([
  ///        '*.js',
  ///        '**/*.js',
  ///        '**/**/*.js',
  ///        '**/**/**/*.js'
  ///      ],{
  ///      "base" : "./public"
  ///      })
    return gulp.src('public/**/*.js')
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
  gulp.task('build:docs:css:dev', function () {
  ///  return gulp
  ///      .src([
  ///        '*.css',
  ///        '**/*.css',
  ///        '**/**/*.css',
  ///        '**/**/**/*.css'
  ///      ],{
  ///      "base" : "./public"
  ///      })
    return gulp.src('public/**/*.css')
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
  gulp.task('build:docs:css:prod', function () {
  ///  return gulp
  ///      .src([
  ///        '*.css',
  ///        '**/*.css',
  ///        '**/**/*.css',
  ///        '**/**/**/*.css'
  ///      ],{
  ///      "base" : "./public"
  ///      })
    return gulp.src('public/**/*.css')
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
  gulp.task('build:docs:vendor:dev', function () {
    return gulp
        .src(['public/vendor/*'])
        .pipe(gulp.dest("docs/vendor")).pipe(browserSync.stream());
  });
  gulp.task('build:docs:vendor:prod', function () {
    return gulp
        .src(['public/vendor/*'])
        .pipe(gulp.dest("docs/vendor")).pipe(browserSync.stream());
  });
  
  gulp.task('build:docs:dev', gulp.series('build:docs:css:dev', 'build:docs:js:dev', 'build:docs:html:dev', 'build:docs:vendor:dev', 'build:docs:img:dev'));
  gulp.task('build:docs:prod', gulp.series('build:docs:css:prod', 'build:docs:js:prod', 'build:docs:html:prod', 'build:docs:vendor:prod', 'build:docs:img:prod'));
  
 
  /***************************************************************
   ***************************************************************
   *  ==>>>   | Execute Image processing tasks (from 'docs/' to 'docs/')
   ***************************************************************
   ***************************************************************
   **/
  
  /// --- ------ --- ///
  /// --- Design --- ///
  /// * purpose 1 [gulp "build:img:effects:dev"] : add effects on images using ImageMagick :
  ///   * There is no gulp-imagemagick plugin,
  ///   * There are plugins using ImageMagick features to resize images for example,
  ///   * but A./ I want to use ImageMagick special effects commands, not resizing commands
  ///   * and B./ I want a plugin which allows me to run any ImageMagick commands, not only resizing  commands
  ///   * so i will use child_process and shelljs to run imagemagick commands
  /// * purpose 2 [gulp "build:img:resize:dev"] : For each image file, generate 3 to 5 resized images, using sharp / `gulp-sharp`
  /// * purpose 3 [gulp "build:img:compress:dev"] : compress all images files, will be done using imagemin / `gulp-imagemin`
  /// --- ------ --- ///
  
  
  
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- Add effects on images  -- --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  
  ///    http://www.fmwconcepts.com/imagemagick/index.php
  
  /**
   * The ImageMagick command-line tools exit with
   * a status of 0 if the command line arguments have
   * a proper syntax and no problems are encountered.
   * ---
   * Expect a descriptive message and an exit status of
   * 1 if any exception occurs such as improper syntax, a
   * problem reading or writing an image, or any other
   * problem that prevents the command from
   * completing successfully.
   * ---
   **/
  
  
   gulp.task("build:img:effects:dev", (done) => {
     // --- // --- //
     // Run ImageMagick CLI synchronously
     /*
     shell.echo(`===========================================================`)
     shell.echo(`Wil execute hugo build command : [hugo -b ${hugoBaseURL}]`)
     let hugoBuildCmd = shell.exec(`hugo -b ${hugoBaseURL}`);
     shell.echo (hugoBuildCmd.stdout)
     if (hugoBuildCmd.code !== 0) {
       shell.echo (hugoBuildCmd.stderr)
       shell.echo('Error: hugo Build failed');
       shell.exit(1);
     } else {
       done()
     }
     */
    let imagemagickProcess = child_process.spawn(`hugo`, [`-b`, `${hugoBaseURL}`])
                .on("close", () => {
                    done(); // let gulp know the task has completed
                });
    let hugoLogger = function (buffer) {
        buffer.toString()
        .split(/\n/)
        .forEach(function (message) {
            if (message) {
  
  
                gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> build:env() >> {hugoBaseURL|HUGO_BASE_URL}=[${hugoBaseURL}]`);
                gutil.log("GoHugo.io: " + message);
                gutil.log("GoHugo.io: " + message);
            }
        });
    };
  
    imagemagickProcess.stdout.on("data", hugoLogger);
    imagemagickProcess.stderr.on("data", hugoLogger)
  
  
   });
  
  
  
  
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- Generate resized images   --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- Compress all images files --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  /// --- ------ --- /// --- ------ --- /// --- ------ --- ///
  
  
  // --- If I use gulp-imagemin [^8.0.0], I get an error with importing imagemin dependencies
  //  import imagemin from 'gulp-imagemin';
  //  import pngquant from 'imagemin-pngquant';
  //     This error is caused by the fact that gulp-imagemin [^8.0.0] and above are now ESM only. You can downgrade gulp-imagemin to 7.1.0 which is commonjs and it should work fine.
  //     see : https://github.com/imagemin/imagemin/issues/392#issuecomment-916160758
  
  let /** @type {import("gulp-imagemin")} */ imagemin;
  let /** @type {import("imagemin-jpegtran")} */ imageminJpegtran;
  let /** @type {import("imagemin-pngquant").default} */ imageminPngquant;
  
  
   /// export default () => (
   /// 	gulp.src('src/images/*')
   /// 		.pipe(imagemin())
   /// 		.pipe(gulp.dest('docs/images'))
   /// );
  
  
  
  
  gulp.task('build:img:dev', () => {
    //return gulp.src('src/images/*')
    return gulp
        .src([
          'img/**/*.svg',
          'img/**/*.ico',
          'img/**/*.png',
          'img/**/*.jpg',
          'images/**/*.svg',
          'images/**/*.ico',
          'images/**/*.jpg',
          'images/**/*.png'
        ],{
        "base" : "./docs"
        })
          .pipe(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [imageminPngquant]
          }))
          .pipe(gulp.dest('docs/'));
  });
  
  gulp.task('build:img:prod', () => {
    return gulp
        .src([
          'img/**/*.png',
          'img/**/*.jpg',
          'images/**/*.jpg',
          'images/**/*.png'
        ],{
        "base" : "./docs"
        })
          .pipe(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [imageminPngquant]
          }))
          .pipe(gulp.dest('docs/'));
  });
  
  /***************************************************************
   ***************************************************************
   *  ==>>>   | Excute SEO tasks (in the website in public)
   ***************************************************************
   ***************************************************************
   **/
  
  import find from 'gulp-find';
  import replace from 'gulp-replace';
  import path from 'path';
  
  import useref from 'gulp-useref';
  import gulpif from 'gulp-if';
  import minifyCss from 'gulp-clean-css';
  
  import gulpSeo from 'gulp-seo';
  
  gulp.task('seo', function() {
    const seoConfiguration = {
          list: ['og', 'se', 'schema', 'twitter', 'facebook'],
          meta: {
              title: 'Croutenard.com',
              description: 'La boutique des croutenards amateurs d\'urine',
              author: 'Croutenard.com',
              keywords: ['urine', 'pisse', 'wc', 'toilettes', 'urinoir', 'consommation', 'société', 'boutique en ligne', 'commerce'],
              robots: {
                  index: true, // true
                  follow: true // true
              },
              revisitAfter: '5 month', // 3 month
              image: 'https://croutenard.com/images/croutenard/favicon.next/favicon.48x48.ico',
              site_name: 'Croutenard.com',
              type: 'website'
  
          }
      }
  
      return gulp.src('public/**/*.html')
                .pipe(gulpSeo(seoConfiguration))
                .pipe(gulp.dest('./public'))
                .pipe(browserSync.stream());
  });

  /***************************************************************
   ***************************************************************
   *  ==>>>   | minify the HTML/JS/CSS produced by gulp in docs/ folder
   ***************************************************************
   ***************************************************************
   **/
  import minify from 'gulp-minify';
  gulp.task('build:minify:js', () => {
      return   gulp.src(['docs/**/*.js'])
          .pipe(minify())
          .pipe(gulp.dest('docs'));
  })
  
  
  import cleanCSS from 'gulp-clean-css';
  
  gulp.task('build:minify:css',() => {
    return gulp.src('./docs/css/*.css')
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('docs/css'));
  });
  
  
  gulp.task('build:minify', gulp.series('build:minify:js', 'build:minify:css'));
  
  
  /***************************************************************
   ***************************************************************
   *  ==>>>   | uglify the HTML/JS/CSS produced by gulp in docs/ folder
   ***************************************************************
   ***************************************************************
   **/
  import uglify from 'gulp-uglify';
  import pipelineModule from 'readable-stream';
  const pipeline = pipelineModule.pipeline;
  
  gulp.task('build:uglify:js', function () {
    return pipeline(
          gulp.src([
            'docs/*.js',
            'docs/**/*.js',
            'docs/**/**/*.js',
            'docs/**/**/**/*.js'
          ]),
          uglify(),
          gulp.dest('docs')
    );
  });
  
  gulp.task('build:uglify', gulp.series('build:uglify:js'));
  
  
  
  
  /***************************************************************
   ***************************************************************
   *  ==>>>   | purge CSS produced by gulp in docs/ folder
   ***************************************************************
   ***************************************************************
   **/
  gulp.task('build:docs:purgecss', () => {
      return gulp.src('src/**/*.css')
          .pipe(purgecss({
              content: [
                'src/*.html',
                'src/**/*.html'
              ]
          }))
          .pipe(gulp.dest('build/css'))
  })
  
  
  
  
  
  // ---------------
  // all prod env related tasks are done in the docs folder itself
  // all dev env rerleated ops are done inside the public folder
  // the docs/ folder is only used by github pages deployment
  //

  gulp.task('build:debug:dev', gulp.series('clean:dev', 'build:hugo:dev', 'build:docs:dev', 'build:img:dev'));

  
  gulp.task('watch:prod', gulp.series('build:hugo:prod', function() {
      browserSync.init({
          server: "./docs",
          host: `${hugoHost}`,
          port: `${hugoPort}`
      });
  
      // watch all hugo project files for change, rebuild all if changes
      gulp.watch('./config.toml', gulp.series('build:hugo:dev', 'build:docs:dev'));
      gulp.watch('./config.yaml', gulp.series('build:hugo:dev', 'build:docs:dev'));
      gulp.watch('./config.json', gulp.series('build:hugo:dev', 'build:docs:dev'));
      gulp.watch('./static/**/*.*', gulp.series('build:hugo:dev', 'purgecss', 'build:docs:dev'));
      gulp.watch('./assets/**/*.*', gulp.series('build:hugo:dev', 'purgecss', 'build:docs:dev'));
      gulp.watch('./themes/**/*.*', gulp.series('build:hugo:dev', 'purgecss', 'build:docs:dev'));
      gulp.watch('./archetypes/**/*.*', gulp.series('build:hugo:dev', 'purgecss', 'build:docs:dev'));
      gulp.watch('./content/**/*.*', gulp.series('build:hugo:dev', 'purgecss', 'build:docs:dev'));
      gulp.watch('./data/**/*.*', gulp.series('build:hugo:dev', 'purgecss', 'build:docs:dev'));
      gulp.watch('./layouts/**/*.*', gulp.series('build:hugo:dev', 'purgecss', 'build:docs:dev'));
      gulp.watch("src/*.html").on('change', browserSync.reload);
  }));
  
  
  
  
  gulp.task('watch:debug:dev', gulp.series('build:debug:dev', function() {
      gutil.log(`POKUS : hugoHost=[${hugoHost}]`)
      gutil.log(`POKUS : hugoPort=[${hugoPort}]`)
  
      browserSync.init({ // https://browsersync.io/docs/api
          server: "./docs",
          host: `${hugoHost}`,
          port: `${hugoPort}`
      });
  
      // watch all hugo project files for change, rebuild all if changes
      gulp.watch('./config.toml', gulp.series('build:debug:dev'));
      gulp.watch('./config.yaml', gulp.series('build:debug:dev'));
      gulp.watch('./config.json', gulp.series('build:debug:dev'));
      gulp.watch('./static/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch('./assets/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch('./themes/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch('./archetypes/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch('./content/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch('./data/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch('./layouts/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch('./layouts/**/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch('./layouts/**/**/**/*.*', gulp.series('build:debug:dev'));
      gulp.watch("layouts/**/*.html", gulp.series('build:debug:dev')).on('change', browserSync.reload);
  }));
  gulp.task('watch:debug:prod', function() {
      gutil.log(`POKUS : hugoHost=[${hugoHost}]`)
      gutil.log(`POKUS : hugoPort=[${hugoPort}]`)
  
      browserSync.init({ // https://browsersync.io/docs/api
          server: "./docs",
          host: `${hugoHost}`,
          port: `${hugoPort}`
      });
  
      // watch all hugo project files for change, rebuild all if changes
      gulp.watch('./config.toml', gulp.series('build:debug:prod'));
      gulp.watch('./config.yaml', gulp.series('build:debug:prod'));
      gulp.watch('./config.json', gulp.series('build:debug:prod'));
      gulp.watch('./static/**/*.*', gulp.series('build:debug:prod'));
      gulp.watch('./assets/**/*.*', gulp.series('build:debug:prod'));
      gulp.watch('./themes/**/*.*', gulp.series('build:debug:prod'));
      gulp.watch('./archetypes/**/*.*', gulp.series('build:debug:prod'));
      gulp.watch('./content/**/*.*', gulp.series('build:debug:prod'));
      gulp.watch('./data/**/*.*', gulp.series('build:debug:prod'));
      gulp.watch('./layouts/**/*.*', gulp.series('build:debug:prod'));
      gulp.watch("layouts/**/*.html", gulp.series('build:debug:prod')).on('change', browserSync.reload);
  });