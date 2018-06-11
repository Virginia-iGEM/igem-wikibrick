# Wiki

## 1 Description
Contains all webcontent that will be found on http://2018.igem.org/Team:Virginia.


## 2 Table of Contents

1. **Description**
2. **Table of Contents**
3. **Building**: Section for our as-of-yet-unnamed build tool, used to automate preprocessing of files and pushing them to the iGEM wiki.
4. **Todo**: Fine-grained todo list. _Look here if you need something to do._
5. **Roadmap:** Long-term task lisk. Broadly outlines what is needed to bring the wiki to completion.
6. **Interactive**: Section describing the interactive component that will be the centerpiece of our home page.
7. **Build Dependencies**: Node Package Manager (NPM) packages required to run the build tool.
8. **Live Dependencies**: Bower packages that must be uploaded to the iGEM wiki for our content to function properly.
9. **Attributions and Works Cited**

## 3 Building

### Use

Our build system (will soon!) support two types of builds: A Development build and a Live build.

In order to build both, you will need to first install [Node.js](https://nodejs.org/), then install all Node packages listed under [Build Dependencies](https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki#build-dependencies). This can be done by entering the following command in any console with npm on its path:

`npm install -D bower gulp gulp-csso gulp-concat gulp-sourcemaps fancy-log gulp-uglify main-bower-files gulp-imagemin run-sequence igemwiki-api globby lodash bluebird`

`bower install components-bootstrap#3.3.7`

Type `gulp dev` to build a local copy that will be located under `wiki/build`. The files produced by this build can be opened in a normal file explorer by any modern web browser.

Type `gulp live` to build a copy with absolute URLs that will then be pushed to the iGEM wiki. In order to do this, you will need to enter your wiki username and password, so have them ready. Note that this copy will *not* run offline correctly, use `gulp dev` files instead.

**Note:** `gulp live` currently is not fully functional. All expected functions work, however, URLs in HTML files are not changed from relative to absolute, and so all images, JS and CSS, including Bootstrap and JQuery will not function.

### Justification

Under the hood, this build tool is fairly complicated; it may not be immediately obvious why we have this complex build system with so many different external dependencies, especially when the Mediawiki framework the iGEM wiki is built on is designed to be easily edited by anyone.

Well, first of all, the guts are complicated, but one doesn't need intimate knowledge of the guts to get it to work. Install Node.js, install build and live dependencies, run `gulp dev` to test and `gulp live` and enter your credentials to publish. Simple, easy, no frills. The system took a few man hours to set up, and will save many more in the future.

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

Note that understanding the build system minimally requires a basic, conceptual understanding of the following:

- [Hypertext Markup Langauge (HTML)](https://www.w3schools.com/Html/)
- [Cascading Style Sheets (CSS)](https://www.w3schools.com/Css/)
- [JavaScript (JS)](https://www.w3schools.com/Css/)
- What [an API](https://en.wikipedia.org/wiki/Application_programming_interface) is
  - [The igemwiki-api](https://github.com/igemuoftATG/igemwiki-api)
- What a webserver is, particularly [Mediawiki](https://en.wikipedia.org/wiki/MediaWiki)
   -[Some additional reading by Toronto 2017](https://github.com/igemuoftATG/igemwiki-api/blob/master/recipes/README.md)
- [What Node.js is](https://nodejs.org/en/)
- Familiarity with [build automation and build tools](https://en.wikipedia.org/wiki/Build_automation)
  - [gulp](https://gulpjs.com/)
- Understanding what package management is and what a dependency is
  - [npm](https://www.npmjs.com/)
  - [bower](https://bower.io/)

Linked above are reccommended readings for understanding these things. Note that you do not need to follow all of these tutorials ot the end or read every article in detail; they are simply to give a general understanding of what each of these core components are and what they do.

#### Development Build

[/wiki/gulpfile.js](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/gulpfile.js)

As defined by the [gulp API](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md), a gulpfile.js defines a bunch of build tasks which can be run by calling the `gulp` command from a terminal in the directory containing the gulpfile.

This gulpfile is analagous to a Makefile; the tasks contained within it can be run individually, and tasks can be made which are dependent on other tasks.

The following tasks are defined in the file:

- index: Preps and stages the HTML for the special file, index.html, which is our homepage
- pages: Preps and stages HTML for subpages of our website, I.E. [Project Description](http://2018.igem.org/Team:Virginia/Description) or [Team](http://2018.igem.org/Team:Virginia/Team).
- templates: Preps and stages HTML for templates such as the header and footer seen on every page
- css: Minifies (reduces the size of) our home-made stylesheets.
- js: Minifies JS and stages it.
- bower:js: Minifies JS for dependencies like bootstrap and jquery and stages it.
- bower:css: Minifies CSS, same as above.
- images: Minifies images and stages them.
- push: Special task, covered under Live Build.
- default: The task that's run when one simply types `gulp` into the console with no arguments. Shorthand for dev build.
- dev: Same as above.
- live: Covered under Live Build.

Note that every task begins with some kind of `gulp.src()` function and ends with some kind of `.pipe(gulp.dest(<some destination>))` function. These sources and destinations can be seen at the top of the file, and map working files to build files. Whenever `gulp` is run with a certain task, it takes in these source files, transforms them in some way using pipes and various gulp plugins (these are usually prefixed with `gulp-` under dependencies), and then spits them out under our build directory (what I call staging).

Once these files are staged in the build directory, you can enter the build directory and open the website with your favorite browser, hosted entirely locally on your machine. This enables work to be done on the website even offline, and allows one to iterate on the site without pushing to the iGEM wiki every single time. This makes iterations faster, and (not that this matters to us) saves iGEM HQ some bandwidth.

#### Live Build

[/wiki/gulpfile.js](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/gulpfile.js)

[/wiki/upload.js](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/upload.js)

**Note:** As mentioned above, Live Build is not fully functional. This description is for a fully functional live build. The transform mentioned below that changes relative to absolute URLs is not yet implemented.

The live build essentially performs the dev build with the exception that all HTML files are transformed by changing their relative URLs to absolute URLs. With a normal webserver, this would not be necessary, however because iGEM uses mediawiki to enable teams of all technological backgrounds to create their own sites.

See todo list for up-to-date description of future changes to be made to live build.

## 4 Todo

### High Priority

- Create a gulp task that parses HTML files and replaces relative (development) links with absolute (live) links on the wiki.
  - [Cheerio](https://github.com/cheeriojs/cheerio) is a really good candidate for an HTML parser, it's popular and mature.
- Implement simple [JQuery HTML Templates](https://medium.com/@AmyScript/how-to-reduce-reuse-and-recycle-your-code-389e6742e4ac) for Footers and Headers.
- Modify `gulpfile.js` so that separate directories, `build-dev` and `build-live` are created for each respective build.
  - Modify `gulpfile.js` so that the `default` task runs both `dev` and `live` builds independently, pushing them into to `bulid-dev` and `build-live` respectively.
- Update templating system to accept Markdown files:
  - Scan directory for .md files for Index and Pages
  - Compile markdown to HTML using [marked](https://www.npmjs.com/package/marked)
  - Insert compiled HTML into a template that includes necessary CSS and JS in the head, sandwiched between header and footer template
  - Output compiled HTML + Template as HTML files for dev build/live build

### Medium Priority

- Move source-destination mappings located in upload.js into their own separate json file to compartmentalize out data
  - Same for gulpfile source-destination mappings.

### Low Priority

- Eliminate `run-sequence` dependency by using gulp's in-built sequencing syntax, as detailed in the [Gulp Documentation on Async Tasks](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md#async-task-support)
- Create shell scripts (`.sh`, `.bat` files) that automatically install Node.js and all required npm and bower dependencies.

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

Note: Build system is currently under active development and so build dependencies are being added and removed on a daily basis. Watch this list for changes.

- Node.js: Javascript interpreter
  - Our entire build runs on this. Also comes with npm, which is used to install all these packages.
- bower: Package manager for Live Dependencies
  - Used to manage JQuery, Bootstrap 3.3.7, and future modules
- gulp: Task automation and parallelization module
- gulp-csso: CSS Minifier
  - Small CSS loads faster
- gulp-concat: Concatenates files, used to pack all JS into one file
- gulp-sourcemaps: Adds sourcemaps to minified Javascript, enabling debugging
- fancy-log: Adds timestamps to error logs
- gulp-uglify: JavaScript Minifier
  - Small JavaScript loads faster
- main-bower-files: Allows access to files stored by bower
  - Used to package Bootstrap and JQuery for upload
- gulp-imagemin: Image minfier; uses lossless compression to allow images to load faster
  - Small images load faster
- run-sequence: gulp normally parallelizes all tasks. This module supports sequencing.
  - Used to ensure build completes before upload for live builds.
- igemwiki-api: Automates uploads of all files to iGEM Wiki
  - The legwork for uploading files from our build to the wiki
- globby: JavaScript implementation of Glob pattern recognition
  - Used for picking out which files to upload
- lodash: Various JS utilities
- bluebird: Promise library.
  - Enables one to make functions, esp. IO asynchronous and non-blocking.

## 8 Live Dependencies

Note that we have few live dependencies. It doesn't matter how many build deps we have because we don't really care if a build takes 5 seconds or 2 seconds. On the other hand, the more, larger live dependencies we have, the more code has to be sent to our users. As a result, each live dependency increases load times, which can make a website look sluggish if they're longer than a second on a fast network. So we keep live depenencies as small as possible.

- JQuery: Makes interacting with HTML easy.
- Bootstrap 3.3.7: Layout package, makes responsive, attractive design easy.

## 9 Attributions and Works Cited

- University of Toronto: igemwiki-api, used to automate uploads to iGEM wiki
- iGEM Peshawar 2016: General information regarding wiki development