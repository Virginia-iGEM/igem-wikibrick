# Wiki

## 1 Description

Contains all webcontent that will be found on http://2018.igem.org/Team:Virginia.

## 2 Table of Contents

1. **Description**
2. **Table of Contents**
3. **Build-Tool**: Section for `wiki-competent`, used to automate preprocessing of files and pushing them to the iGEM wiki.
4. **Todo**: Fine-grained todo list. _Look here if you need something to do._
5. **Roadmap:** Long-term task lisk. Broadly outlines what is needed to bring the wiki to completion.
6. **Interactive**: Section describing the interactive component that will be the centerpiece of our home page.
7. **Build Dependencies**: Node Package Manager (NPM) packages required to run the build tool.
8. **Live Dependencies**: Bower packages that must be uploaded to the iGEM wiki for our content to function properly.
9. **Attributions and Works Cited**

## 3 Build Tool: `wiki-competent`

Note: Name is tentative and should probably get a vote. You should probably also make this paragraph less passive-aggressive.

`wiki-competent` is a Node.js-based tool built by Virginia's 2018 iGEM team to fully automate the process of standard web development on the iGEM wiki. We've built this tool because we believe Mediawiki is not up to the standards that a website regarding complex synthetic biology tools should be at. We wanted our website to be easy to use, fluid, fast and convey our ideas and findings as quickly as possible to any reader, from layman to post-doc. We also wanted to build something that would allow us to put time wasted clicking the `upload` button on the iGEM wiki towards something more useful.

Our tool does a few important things to standardize editing the wiki through a standard web-development process:

- **Single-command build tool.** Once installed and set up, you can automatically inject your own pure HTML+CSS+JS website onto your wiki page, you type `gulp live publish`, enter your iGEM credentials, grab some tea and watch `wiki-competent` do the hard work for you. No need to upload images to the wiki by hand, no need to copy-and-paste HTML into a wiki's _Edit Page_ tool. Use your favorite text editor, your favorite CSS templates, and Node.JS packages of your choice without worrying.
- **URL Substitution.** "But wait," you say, "I want to iterate on my machine. Uploading takes time, and I make a lot of mistakes." Fear not, young web developer, `wiki-competent` has your back. Any scripts, stylesheets, links or images you add to your HTML can simply use a relative path to a local file on your machine. Type `gulp dev build`, and you have a fully functional, completely offline wiki you can work on in the comfort of your own operating system. Then, when you `gulp live publish`, all these relative paths are automatically converted to URLs compatible with your team's wiki page.
- **Flexible Build and Package support.** Becuase we're using `gulp`, you can add thousands of gulp plugins and Node.js modules to your wiki to do all the things you ever wished you could. Want to add a 3d shoot-em-up arcade game where you blast bacteriophages to your homepage? `bower install impactjs`. Want to use more advanced templating to reuse as much code as you can? `npm install -D gulp-handlebars`. Want to use SASS instead of CSS? `npm install -D gulp-sass`. Your favorite plugins and packages are a few lines of configuration away.
- **Markdown Support.** "Hold up, hold up, I'm the only programmer on my team. I don't want to write the small novel that is an iGEM Team Wiki page." Luckily for you, `wiki-competent` is non-programmer friendly. Your teammates can write their lab notes, lab reports and modeling writeups in the easy-to-understand Markdown styling language. The tool can convert these files into valid, crisp HTML, complete with your navigation menu, footer, interactive JavaScript elements and any other templated HTML you'd like to add.
- **Logging (pending).** You wake up one morning, coffee in hand, and like any good iGEMmer, you open your wiki. Some incompetent team member has defaced your home page! The spans are all the wrong size, none of the scripts are working, the background is *chartreuse*. Who did this? Well, you know exactly who, because a `log.js` file was pushed to your wiki page containing the perpetrator's account name, the Git commit hash they pushed from, and when they pushed. The disadvantage is of course your team captain will always know when you messed up.

### Use

Our build system supports two types of builds: A Development build and a Live build.

In order to build both, you will need to first install [Node.js](https://nodejs.org/), then install all Node packages listed under [Build Dependencies](https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki#build-dependencies). This can be done by first entering the `wiki` directory, e.g. with `cd wiki` and entering the following commands in any console with npm on its path:

`npm install`

`bower install`

Type `gulp build --env dev` or `gulp dev build` to build a local copy that will be located under `wiki/build`. The files produced by this build can be opened in a normal file explorer by any modern web browser.

Type `gulp publish --env live` or `gulp live publish` to build a copy with absolute URLs that will then be pushed to the iGEM wiki. In order to do this, you will need to enter your wiki username and password, so have them ready. Note:w
that this copy will *not* run offline correctly, use `gulp dev build` files instead.

One can type `gulp live build` to check HTML for correct parsing. This will not work if new images have been added but not pushed to the wiki; this will be fixed in the future, adding errors that are correctly thrown instead of simply failing.

Note 1: One can call `gulp dev publish`, nothing is preventing it. However, it will just upload HTML files with relative paths to the wiki, which will be very ugly and likely nonfunctional.

Note 2: Reversing the order of tasks, i.e. `gulp publish dev` or `gulp publish live` will result in incorrect behaviour. Order matters here.

### Justification

Under the hood, this build tool is fairly complicated; it may not be immediately obvious why we have this complex build system with so many different external dependencies, especially when the Mediawiki framework the iGEM wiki is built on is designed to be easily edited by anyone.

Well, first of all, the guts are complicated, but one doesn't need intimate knowledge of the guts to get it to work. Install Node.js, install build and live dependencies, run `gulp dev build` to test and `gulp live publish` and enter your credentials to publish. Simple, easy, no frills. The system took a few man hours to set up, and will save many more in the future.

Second of all, even if one were to work in the confines of a Mediawiki template, uploading images and making changes to many pages is still a hassle. One has to upload each image one-by-one. If some keyword changes, or some image starts going by a different name, one must go through every single page by hand and make that change to the raw HTML. With this tool, and powerful modern text editors, such tasks are either completely automated or one search-and-replace away.

Third of all, this system supports the non-CS members of the team. Like it or not, one has to deal with HTML and Javascript when it comes to a Mediawiki site, at some point. Because of gulp, one can abstract away the HTML and use Markdown; instead of writing this:

```html
<p>
    <h1>Title</h1>
    Lorem <b>ipsum</b> <i>dolor</i> sit amet...
    <h2>Topic 1</h2>
    ...
</p>
```

A member of the team contributing content (but not code) to the wiki can instead write this:

```markdown
# Title

Lorem **ipsum** _dolor_ sit amet...

## Topic 1

...
```

Fourth of all, the build pipeline is flexible. Adding a templating engine like [Handlebars](https://www.npmjs.com/package/handlebars) to make code-reuse easy, using [{less} CSS](http://lesscss.org/) to improve the readability and flexibility of CSS, or including [Impact JS](http://impactjs.com/), which makes creating interactive games embedded in the site easy and lightweight, are all almost completely automated. Adding them involves just a few console commands or a few lines of code changed, instead of fiddling with Mediawiki and copy-pasting code into various `<script>` tags scattered across the website.

Lastly, successful iGEM teams don't just get by with the template given to them by iGEM HQ. The simple fact is that most winning wikis have more in common with a modern website than they do with a Mediawiki site. They have fixed headers, animations, modern navigation bars, material or other modern design aesthetics, and sometimes interactive minigames that demonstrate the concept at hand. A Mediawiki template can scrape by, but to really *wow*, one needs a full-blown website. This tool enables that to happen efficiently.

Much of this reasoning was developed from articles published by previous iGEM teams:

- [Peshawar 2016, general reccommendations for advanced wiki development](https://2016.igem.org/Team:Peshawar/Wiki)
- [Toronto 2017, igemwiki-api Node.js API and CLI for automated uploads](https://github.com/igemuoftATG/igemwiki-api)
  - [Recipe page describing how Mediawiki API is used to automate uploads](https://github.com/igemuoftATG/igemwiki-api/blob/master/recipes/README.md)

### Details

This is a high-level overview of what the build system is doing. To get an idea of what the code is actually doing, see the files mentioned at the top of each section. Each of these files are heavily commented to making understanding what they do easier.

Understanding the build system minimally requires a basic, conceptual understanding of the following:

- [Hypertext Markup Langauge (HTML)](https://www.w3schools.com/Html/)
- [Cascading Style Sheets (CSS)](https://www.w3schools.com/Css/)
- [JavaScript (JS)](https://www.w3schools.com/Js/)
  - Familiarity with the [asynchronous](https://www.pluralsight.com/guides/introduction-to-asynchronous-javascript) nature of Node.js and JS in general
  - Familiarity with [callbacks](http://recurial.com/programming/understanding-callback-functions-in-javascript/) and [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).
- What [an API](https://en.wikipedia.org/wiki/Application_programming_interface) is
  - [The igemwiki-api](https://github.com/igemuoftATG/igemwiki-api)
- What a webserver is, particularly [Mediawiki](https://en.wikipedia.org/wiki/MediaWiki)
  - [Some additional reading by Toronto 2017](https://github.com/igemuoftATG/igemwiki-api/blob/master/recipes/README.md)
- [What Node.js is](https://nodejs.org/en/)
- Familiarity with [build automation and build tools](https://en.wikipedia.org/wiki/Build_automation)
  - [gulp](https://gulpjs.com/)
- Understanding what package management is and what a dependency is
  - [npm](https://www.npmjs.com/)
  - [bower](https://bower.io/)

Linked above are reccommended readings for understanding these things. You do not need to follow all of these tutorials ot the end or read every article in detail; they are simply to give a general understanding of what each of these core components are and what they do.

#### Development Build

[/wiki/gulpfile.js](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/gulpfile.js)

As defined by the [gulp API](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md), a gulpfile.js defines a bunch of build tasks which can be run by calling the `gulp` command from a terminal in the directory containing the gulpfile.

This gulpfile is analagous to a Makefile; the tasks contained within it can be run individually, and tasks can be made which are dependent on other tasks.

The following tasks are defined in the file:

- index: Preps and stages the HTML for the special file, index.html, which is our homepage
- pages: Preps and stages HTML for subpages of our website, e.g. [Project Description](http://2018.igem.org/Team:Virginia/Description) or [Team](http://2018.igem.org/Team:Virginia/Team).
- templates: Preps and stages HTML for templates such as the header and footer seen on every page
- css: Minifies (reduces the size of) our home-made stylesheets and stages them.
- js: Minifies all JS files and stages them.
- bower:js: Minifies JS for dependencies like bootstrap and jquery and stages them.
- bower:css: Minifies CSS and stages, same as above.
- images: Minifies images and stages them.
- pushimages and pushcontent: Special tasks, covered under Live Build.
- default: The task that's run when one simply types `gulp` into the console with no arguments. Shorthand for dev build. Runs every single task except for pushes.
- dev: Same as above.
- live: Covered under Live Build.

Every task begins with some kind of `gulp.src()` function and ends with some kind of `.pipe(gulp.dest(<some destination>))` function. These sources and destinations can be seen at the top of the file, and map working files to build files. Whenever `gulp` is run with a certain task, it takes in these source files, transforms them in some way using pipes and various gulp plugins (these are usually prefixed with `gulp-` under dependencies), and then spits them out under our build directory (what I call staging). The only exceptions are `pushimages` and `pushcontent`, which are special and does not transform files.

Once these files are staged in the build directory, you can enter the build directory and open the website with your favorite browser, hosted entirely locally on your machine. This enables work to be done on the website even offline, and allows one to iterate on the site without pushing to the iGEM wiki every single time. This makes iterations faster, and (not that this matters to us) saves iGEM HQ some bandwidth.

#### Live Build & Publish

[/wiki/gulpfile.js](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/gulpfile.js)

[/wiki/upload.js](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/upload.js)

The live build essentially performs the dev build with the exception that all HTML files are transformed by changing their relative URLs to absolute URLs. With a normal webserver, this would not be necessary, however because iGEM uses mediawiki to enable teams of all technological backgrounds to create their own sites. The issue with this is that it works differently than all other web servers and so we have to tip-toe around it.

The exact sequence of events are as follows:

1. pushimages: In order to correctly substitute image URLs, `gulp live publish` first pushes images to the iGEM Wiki and then retrieves the generated image URLs from the wiki. These URLs are saved temporarily to `imagemap.json` under `/wiki/build`.
2. build: A `build` is then performed, identical to `gulp dev build` save for the fact that all URLs in relevant HTML tags are replaced with their absolute equivalents.
3. pushcontent: Pushes remaining (non-image) content to the wiki.

## 4 Todo

### High Priority

- Ensure FontAwesome has doesn't need any overrides in bower
- Modify `gulpfile.js` so that separate directories, `build-dev` and `build-live` are created for each respective build.
  - Modify `gulpfile.js` so that the `default` task runs both `dev` and `live` builds independently, pushing them into to `bulid-dev` and `build-live` respectively.
- [Grace] Update templating system to accept Markdown files:
  - Scan directory for .md files for Index and Pages [done]
  - Compile markdown to HTML using [marked](https://www.npmjs.com/package/marked) [done]
  - Insert compiled HTML into a template that includes necessary CSS and JS in the head, sandwiched between header and footer template
  - Output compiled HTML + Template as HTML files for dev build/live build
- Make it so upload.js can upload specific items instead of having to upload everything. Probably gonna do this with gulp.
- Consolidate team name and year into .json file. Have relative2absolute.js pull from this file and generate URLs. Also have upload.js pull from this file for team name and year.
  - A potential alternative is to have relative2absolute.js pull from igemwiki-api if it exposes the URLs it uses.
  - This is important because it is not immediately obvious to future teams that they need to change these variables in both upload.js and realtive2absolute.js
- Also consolidate sources and destinations for both build and upload into a .json file:
  - Structure: Build Src -> Build Destination == Upload Source -> Upload Destination
  - Build srcs, build destinations, upload srcs and upload destinations are currently all separately defined in-script, should be defined in .json files.
  - Build destinations and upload sources should be made identical, they are currently the same.
  - Should probably be labeled as projectdir -> staging/builddir -> pushtarget, or something similar
- Eliminate code duplication in upload.js between pushimages and pushcontent
- Eliminate synchronous file read in relative2absolute.js
- Decide whether or not to switch to [Bourbon Neat](https://goamplifi.com/5-reasons-we-chose-bourbonneat-over-foundation-or-bootstrap/) instead of Bootstrap.

### Medium Priority

- Move source-destination mappings located in upload.js into their own separate json file to compartmentalize out data
  - Same for gulpfile source-destination mappings.
- Switch to compiled SASS/LESS from CSS to make stylesheets cleaner
- Modify gulpfile.js so that running `gulp live build` correctly throws errors when images have not been first pushed to the wiki.
- Simplify `dev` and `live` gulpfile tasks so they're less interconnected.
- Refactor relative2absolute.js so that it recognizes absolute URLs and does not mangle them.
- Fix MathJax with [#10 - Misc from this article](https://2016.igem.org/Team:Peshawar/Wiki)
- Standardize variable and function naming schemes.
- Update build-tool so that it scans for existing files and whether or not their srcs have changed under `./build` before building. Would need some kind of hash of each file, or a look at the date-last-changed. 

### Low Priority

- Create shell scripts (`.sh`, `.bat` files) that automatically install Node.js and all required npm and bower dependencies.
- Pick a JavaScript styleguide, fix the awful inconsistencies in style to adhere to it.
- [Warning, read fully] Eliminate `run-sequence` dependency by using gulp's in-built sequencing syntax, as detailed in the [Gulp Documentation on Async Tasks](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md#async-task-support)
  - This is no longer relevant because this format for running sequential tasks was deprecated in Gulp 4. Gulp 4 has its own native support for task sequencing, but we are not upgrading to Gulp 4 yet as I do not want to break the build tool.
  - As a result, `run-sequence` stays for now. See [this guide](https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/) if you would like to begin upgrading our tool to Gulp 4.
  - Also [this piece of documentation](https://fettblog.eu/gulp-4-parallel-and-series/)

## 5 Roadmap

1. [Completed] Write an upload script using igemwiki-api to push all pages, images and other content to the iGEM wiki.
2. Create a build tool that can compile to working HTML for both the iGEM wiki and local machine testing.
    - Template should have a header and a footer that contain a snazzy navbar and team information respectively.
    - Template should also contain styling that allows for quick development of webpages
    - Ideally, template can be written in markdown and compiled to enable other team members to edit things fairly easily.
3. Decide on a goddamn colorscheme
4. Core concurrent tasks:
    - Finish all major pages, at least with filler content
    - Code interactive for home page
    - Create a tool for the team to easily push their information to the wiki?
5. Final tasks
    - Run through the whole wiki, hosted on the iGEM website, check for inconsistencies

## 6 Interactive

This is an interactive presentation that gives the reader an intuition for what our device is doing. It goes fairly simply:

1. Start with an empty "petri dish" that looks like it's just part of the webpage. A little "click me" prompt gets the user to interact with it.
2. When the user clicks, they will add a single E. Coli, a CFU, to the dish
3. The user can then incubate the cell and it will divide to form a few cells
4. When the cells hit quorum, many will begin to flash a bright blue color to indicate their genes have been activated; but only about 50% will flash initially.
5. The user can then sterilize/clean the dish with a button, and switch to the Virginia iGEM quorum sensing genes
    - Maybe have a short animatic where the user transforms some bacteria
6. Upon redoing the experiment, they'll find that nearly all the bacteria flash
7. User is left to play around with the sandbox all they want. A little flashing blue arrow at the bottom of the game prompts them to scroll down to read about the project.

## 7 Build Dependencies

Unless explicitly noted, these are Node.js dependencies and can be installed with `npm`, Node.js's package manager.

Note: Build system is currently under active development and so build dependencies are being added and removed on a daily basis. Watch this list for changes.

- bluebird: Promise library.
  - Enables one to make synchronous functions, esp. IO asynchronous and non-blocking.
- bower: Package manager for Live Dependencies
  - Used to manage JQuery, Bootstrap 3.3.7, and future modules
- fancy-log: Adds timestamps to error logs
- globby: JavaScript implementation of Glob pattern recognition
  - Used for picking out which files to upload
- gulp: Task automation and parallelization module
- gulp-cheerio: Wrapper for [cheerio](https://github.com/cheeriojs/cheerio), an HTML parsing library
- gulp-concat: Concatenates files, used to pack all JS into one file
- gulp-csso: CSS Minifier
  - Small CSS loads faster
- gulp-declare: [Pending removal]
- gulp-environments: Used to handle different build environments, namely `dev` and `live`
- gulp-if: Used for modifying conditions in tasks, supports `dev` and `live` builds
- gulp-imagemin: Image minfier; uses lossless compression to allow images to load faster
- gulp-markdown: Used to compile `.md` files to `.html`. Used for all standard pages.
  - Small images load faster
- gulp-sourcemaps: Adds sourcemaps to minified Javascript, enabling debugging
- gulp-uglify: JavaScript Minifier
  - Small JavaScript loads faster
- gulp-wrap: [Pending removal]
- igemwiki-api: Automates uploads of all files to iGEM Wiki
  - The legwork for uploading files from our build to the wiki
- lodash: Various JS utilities
- main-bower-files: Allows access to files stored by bower
  - Used to package Bootstrap and JQuery for upload
- run-sequence: gulp normally parallelizes all tasks. This module supports sequencing.
  - Used to ensure build completes before upload for live builds.

## 8 Live Dependencies

Notice that we have few live dependencies. It doesn't matter how many build deps we have because we don't really care if a build takes 5 seconds or 2 seconds. On the other hand, the more, larger live dependencies we have, the more code has to be sent to our users. As a result, each live dependency increases load times, which can make a website look sluggish if they're longer than a second on a fast network. So we keep live depenencies as small as possible.

- JQuery: Makes interacting with HTML easy.
- Bootstrap 3.3.7: Layout package, makes responsive, attractive design easy.
- FontAwesome 5.0.13: _Easy_ fonts and icons.

## 9 Attributions and Works Cited

- University of Toronto: igemwiki-api, used to automate uploads to iGEM wiki
- iGEM Peshawar 2016: General information regarding wiki development
