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
 * - [gulp build:hugo] : run hugo build
 * - [gulp build:hugo:watch] : run hugo build in watch mode
 * - build sequences as gulp series : 
 *    => [gulp dev] : 
 *        - [gulp build:hugo:clean:dev] : delete and recreate empty hugo build folder : [public/]
 *        - [gulp build:hugo:watch] : run hugo build in watch mode
 * ***
 * [Prod] Process list :
 * - [gulp build:hugo:clean:gh_pages] : delete and recreate empty folders : [public/] [docs/]
 * - [gulp build:hugo] : run hugo build
 * - [gulp build:rubbish:clean:prod] : If necessary, clean all the rubbish unwanted assets that were generated in the [./public/] folder (by the hugo build, or any task)
 * - [gulp build:docs:prod] : copy everything from the [./public/] folder, to the [./docs/] folder 
 * - build sequences as gulp series : 
 *    => [gulp build:prod] : 
 *        - [gulp build:hugo:clean:gh_pages]
 *        - [gulp build:hugo]
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
  
  /// export PATH=$PATH:/usr/local/go/bin
 
  let hugoHttpSchema = `${process.env.HUGO_HTTP_SCHEMA || 'http'}`; /// export HUGO_HTTP_SCHEMA=https
  let hugoHost = `${process.env.HUGO_HOST || 'localhost'}`; /// export HUGO_HOST=127.0.0.1
  let hugoPort = `${process.env.HUGO_PORT || '1313'}`; /// export HUGO_PORT=4545
  
  // let hugoDeploymentBaseURL = `${process.env.HUGO_DEPLOYMENT_BASE_URL || 'https://croutenard.com'}`; /// export HUGO_DEPLOYMENT_BASE_URL=https://croutenard-io.surge.sh
  let hugoDeploymentBaseURL = `http://local.domain:1718`; 

  if (hugoHttpSchema === 'https' ) {
    if (hugoPort === '443') {
      hugoDeploymentBaseURL = `${hugoHttpSchema}://${hugoHost}`;
    } else {
      hugoDeploymentBaseURL = `${hugoHttpSchema}://${hugoHost}:${hugoPort}`;
    }
  } else {
    hugoDeploymentBaseURL = `${hugoHttpSchema}://${hugoHost}:${hugoPort}`;
  }

  let isThisWindows = `${process.env.IS_THIS_WINDOWS || 'false'}`; /// export IS_THIS_WINDOWS=true
  if (isThisWindows === 'true') {
    isThisWindows = true;
  } else {
    isThisWindows = false;
  }

  gulp.task('build:env', (done) => {
    gutil.log(`// >>>>>>>>>>>> >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> + //`)
    gutil.log(` >>>>>>>>>>>> build:env() >> {isThisWindows|IS_THIS_WINDOWS}=[${isThisWindows}]`)
    if (isThisWindows) {
      gutil.log(` >>>>>>>>>>>> build:env() >> {isThisWindows|IS_THIS_WINDOWS} is a boolean, and is [true]`)
    } else {
      gutil.log(` >>>>>>>>>>>> build:env() >> {isThisWindows|IS_THIS_WINDOWS} is a boolean, and is [false]`)
    }
    gutil.log(` >>>>>>>>>>>> build:env() >> {hugoHttpSchema|HUGO_HTTP_SCHEMA}=[${hugoHttpSchema}]`)
    gutil.log(` >>>>>>>>>>>> build:env() >> {hugoHost|HUGO_HOST}=[${hugoHost}]`)
    gutil.log(` >>>>>>>>>>>> build:env() >> {hugoPort|HUGO_PORT}=[${hugoPort}]`)
    gutil.log(` >>>>>>>>>>>> build:env() >> {hugoDeploymentBaseURL|HUGO_DEPLOYMENT_BASE_URL}=[${hugoDeploymentBaseURL}]`)
    gutil.log(`// >>>>>>>>>>>> >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> + //`)
    gutil.log(`// >>>>>>>>>>>> >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> +  >>>>>>>>>> + //`)
    // return gulp.pipe(browserSync.stream());
    done();
  })
  

  /***************************************************************
   ***************************************************************
   *  ==>>>   | CLEAN TASKS
   *   [build:hugo:clean:dev] : cleans the public/ folder
   *   [build:hugo:clean:gh_pages] : cleans both the public/ and the docs/ folders
   ***************************************************************
   ***************************************************************
   **/
   /// https://www.npmjs.com/package/gulp-clean
   import cclean from 'gulp-clean';

   let hugoPrjFolder = './';
   let hugoPublicFolder = 'public';
   let hugoDocsFolder= 'docs';
   
   gulp.task('clean:folder:public', function () {
    return gulp.src(hugoPublicFolder, {read: false, allowEmpty: true})
          .pipe(cclean())
          .pipe(gulp.dest('./'))
          .pipe(browserSync.stream());
   });
   gulp.task('clean:folder:docs', function (done) {
    // gulp.src(hugoDocsFolder, {read: false, allowEmpty: true})
    // .pipe(cclean())
    // .pipe(gulp.dest('./'));
    // done();
    return gulp.src(hugoDocsFolder, {read: false, allowEmpty: true})
          .pipe(cclean())
          .pipe(gulp.dest('./'))
          .pipe(browserSync.stream());
   });

  // ---------------
  gulp.task('build:hugo:clean:dev', gulp.series('clean:folder:public'));
  gulp.task('build:hugo:clean:gh_pages', gulp.series('clean:folder:public', 'clean:folder:docs'));
  






  /***************************************************************
   ***************************************************************
   *  ==>>>   | HUGO TASKS
   *      [build:hugo] : execute the hugo build.
   ***************************************************************
   ***************************************************************
   **/

  import child_process from 'child_process';
  // Run Hugo to copy finished files over to public folder
  
  gulp.task("build:hugo", (done) => {
    let hugo = child_process.spawn(`hugo`, [`-b`, `${hugoDeploymentBaseURL}`]) // https://nodejs.org/api/child_process.html
    gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> >> {hugoHttpSchema|HUGO_HTTP_SCHEMA}=[${hugoHttpSchema}]`);
    gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> >> {hugoHost|HUGO_HOST}=[${hugoHost}]`);
    gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> >> {hugoPort|HUGO_PORT}=[${hugoPort}]`);
    gutil.log("GoHugo.io: " + ` >>>>>>>>>>>> dev build for [${hugoDeploymentBaseURL}]`);
    let hugoLogger = function (buffer) {
        buffer.toString()
        .split(/\n/)
        .forEach(function (message) {
            if (message) {
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
 
  /***************************************************************
   ***************************************************************
   *  ==>>>   | GITHUB PAGES TASKS
   *      [build:hugo:gh_pages:cname] : updates the CNAME file for
   *                                    github pages deployment.
   *      [build:hugo:gh_pages:docs] : copy public/ folder to docs/ folder
   ***************************************************************
   ***************************************************************
   **/

  let vinylSourceStream = require('vinyl-source-stream');
  gulp.task('build:hugo:gh_pages:cname:root', function() {
    gutil.log("Pokus.io / Github Pages Build [./CNAME] : " + ` >>>>>>>>>>>> [build:hugo:gh_pages:cname:docs] >> {hugoHost|HUGO_DEPLOYMENT_DOMAIN}=[${hugoHost}]`);
    var stream = vinylSourceStream('CNAME');
    stream.end(`${hugoHost}`);
    return stream.pipe(gulp.dest('./'));
  });
  gulp.task('build:hugo:gh_pages:cname:docs', function() {
    gutil.log("Pokus.io / Github Pages Build [./docs/CNAME] : " + ` >>>>>>>>>>>> [build:hugo:gh_pages:cname:docs] >> {hugoHost|HUGO_DEPLOYMENT_DOMAIN}=[${hugoHost}]`);
    var stream = vinylSourceStream('CNAME');
    stream.end(`${hugoHost}`);
    return stream.pipe(gulp.dest('./docs'));
  });

  gulp.task('build:hugo:gh_pages:cname', gulp.series('build:hugo:gh_pages:cname:root', 'build:hugo:gh_pages:cname:docs'));
  


  /***************************************************************
   ***************************************************************
   *  ==>>>   | PUBLIC TO DOCS : all copy tasks from public to docs folder
   ***************************************************************
   ***************************************************************
   **/
  
  // ------- //
  // Moves the HTML files from ./public into our ./docs folder
  //
  gulp.task('build:docs:html', function () {
    return gulp.src('public/**/*.html')
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });

  gulp.task('build:docs:img', function () {
    return gulp
        .src([
          './**/*.png',
          './**/*.jpg',
          './**/*.svg',
          './**/*.gif'
        ],{
        "base" : "./public"
        })
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
  gulp.task('build:docs:fonts', function () {
    return gulp
        .src([
          './**/*.eot',
          './**/*.ttf',
          './**/*.otf',
          './**/*.woff'
        ],{
        "base" : "public/"
        })
        .pipe(gulp.dest("docs/"))
        .pipe(browserSync.stream());
  });
  gulp.task('build:docs:js', function () {
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
  gulp.task('build:docs:css', function () {
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

  gulp.task('build:docs:vendor', function () {
    return gulp
        .src(['public/vendor/*'])
        .pipe(gulp.dest("docs/vendor")).pipe(browserSync.stream());
  });
  

  /**
   * [gulp build:docs] : Just copies all files from the [public/] Folder to
   *                the [docs/] Folder
   * */
  gulp.task('build:docs', gulp.series('build:docs:css', 'build:docs:js', 'build:docs:html', 'build:docs:vendor', 'build:docs:img', 'build:docs:fonts'));
  
  gulp.task('build:hugo:gh_pages', gulp.series('build:hugo:clean:gh_pages', 'build:hugo', 'build:docs', 'build:hugo:gh_pages:cname'));
  
  /***************************************************************
   ***************************************************************
   *  ==>>>   | IMAGE PROCESSING TASKS
   *      ['build:img:resize'] : resize images
   *      ['build:img:compress'] : compress resized images
   ***************************************************************
   ***************************************************************
   **/

    
   // const imagemin = require("gulp-imagemin");
   /// import imagemin from 'gulp-imagemin';
   let /** @type {import("gulp-imagemin")} */ imagemin;
   // const imagemin = import('gulp-imagemin');
   let /** @type {import("imagemin-jpegtran")} */ imageminJpegtran;
   /// const imageminJpegtran = require("imagemin-jpegtran");
   let /** @type {import("imagemin-pngquant").default} */ imageminPngquant;
   /// const imageminPngquant = require("imagemin-pngquant").default;
   
   /// let /** @type {import("gulp-imagemin")} */ imagemin;
   /// let /** @type {import("imagemin-jpegtran")} */ imageminJpegtran;
   /// let /** @type {import("imagemin-pngquant").default} */ imageminPngquant;
   
   
    /// export default () => (
    /// 	gulp.src('src/images/*')
    /// 		.pipe(imagemin())
    /// 		.pipe(gulp.dest('docs/images'))
    /// );
   
   
   
   
   gulp.task('build:img:test', () => {
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
   
  gulp.task('build:img:resize', function (done) {
    gutil.log("Pokus.io: " + ` >>>>>>>>>>>> [build:img:resize] resize all images in docs/`);
    done();
  });
  gulp.task('build:img:compress', function (done) {
    gutil.log("Pokus.io: " + ` >>>>>>>>>>>> [build:img:compress] compress all images in docs/`);
    done();
  });


  /// gulp.task('build:hugo:prod', gulp.series('build:hugo:gh_pages', 'build:img:resize', 'build:img:compress'));
  gulp.task('build:hugo:prod:test', gulp.series('build:hugo:gh_pages', 'build:img:test'));
  


















































































































  /***************************************************************
   *  ==>>>   | Excute hugo build (will generate the website in public)
   **/
  
  // import child_process from 'child_process';
  // Run Hugo to copy finished files over to public folder
  
  


 
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


  gulp.task('watch:prod', gulp.series('build:hugo', function() {
      browserSync.init({
          server: "./docs",
          host: `${hugoHost}`,
          port: `${hugoPort}`
      });
  
      // watch all hugo project files for change, rebuild all if changes
      gulp.watch('./config.toml', gulp.series('build:hugo', 'build:docs'));
      gulp.watch('./config.yaml', gulp.series('build:hugo', 'build:docs'));
      gulp.watch('./config.json', gulp.series('build:hugo', 'build:docs'));
      gulp.watch('./static/**/*.*', gulp.series('build:hugo', 'purgecss', 'build:docs'));
      gulp.watch('./assets/**/*.*', gulp.series('build:hugo', 'purgecss', 'build:docs'));
      gulp.watch('./themes/**/*.*', gulp.series('build:hugo', 'purgecss', 'build:docs'));
      gulp.watch('./archetypes/**/*.*', gulp.series('build:hugo', 'purgecss', 'build:docs'));
      gulp.watch('./content/**/*.*', gulp.series('build:hugo', 'purgecss', 'build:docs'));
      gulp.watch('./data/**/*.*', gulp.series('build:hugo', 'purgecss', 'build:docs'));
      gulp.watch('./layouts/**/*.*', gulp.series('build:hugo', 'purgecss', 'build:docs'));
      gulp.watch("src/*.html").on('change', browserSync.reload);
  }));