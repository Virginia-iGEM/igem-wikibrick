# `igem-wikibrick` Programmer's Guide

This guide is directed at technical readers who want a more detailed understanding of the build tool. The _Programmer's Guide_ is organized hierarchically, starting with a high-level overview before diving into the details of the different components that make it work.

## 1 Table of Contents

1. [**Table of Contents**](#1-table-of-contents)
2. [**Recommended Readings**](#2-recommended-readings)
3. [**High Level Architecture**](#3-high-level-architecture)
4. [**Project Structure**](#4-project-structure)

## 2 Recommended Readings for the Uninitiated

If you are new to web development or programming, all of the following are _strongly_ recommended to get a basic understanding of how the tool works. If you are just looking to get the wiki up and running, this is probably unnecessary, but if you are interested in what's under the hood, you'll need this prerequisite knowledge.

Understanding the build system's different components requires a basic, conceptual understanding of the following:

- The rudiments of web development:
  - [Hypertext Markup Langauge (HTML)](https://www.w3schools.com/Html/): Used to define the content of a page. This language acts as the skeleton of any website.
  - [Cascading Style Sheets (CSS)](https://www.w3schools.com/Css/): Defines the way a page is displayed, or its _style._ This is the flesh, clothes and jewelry of a website.
  - [JavaScript (JS)](https://www.w3schools.com/Js/): The programming language of the Internet. Using both serverside and clientside, JavaScript enables logic and allows a website to react to the user.
    - Familiarity with the [asynchronous](https://www.pluralsight.com/guides/introduction-to-asynchronous-javascript) nature of Node.js and JS in general.
    - Familiarity with [callbacks](http://recurial.com/programming/understanding-callback-functions-in-javascript/) and [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).
- What [an API](https://en.wikipedia.org/wiki/Application_programming_interface) is:
  - [The igemwiki-api](https://github.com/igemuoftATG/igemwiki-api)
- What a webserver is.
- What [Mediawiki](https://en.wikipedia.org/wiki/MediaWiki) is, particularly in [the context of iGEM](https://github.com/igemuoftATG/igemwiki-api/tree/master/recipes).
- [What Node.js is](https://nodejs.org/en/).
- Familiarity with [build automation and build tools](https://en.wikipedia.org/wiki/Build_automation).
  - [Understanding what gulp is](https://gulpjs.com/).
- Understanding what package management is and what a dependency is.
  - [npm](https://www.npmjs.com/)
  - [bower](https://bower.io/)

You do not need to follow all of these tutorials to the end or read every article in detail; they are simply here to give a general understanding of what each of these core components are and what they do. Skim them and look up any words you don't understand.

## 3 High Level Architecture

`igem-wikibrick` is composed of two key components:

1. The core build system is composed of a [main gulpfile](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/gulpfile.js) and a bunch of different [smaller sub-gulpfiles](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/gulp). These files collectively define a bunch of different _gulp tasks,_ which are (mostly) separate executable units of logic that take in a collection of different files under the `app` directory (equivalent to a `src` directory in other software development contexts), **transforming** them in some way depending on their content, and then placing the transformed output under the `build` directory. These _built_ files can be interpreted by anyone's web browser to display a webpage. They can also be uploaded and displayed on the iGEM Wiki through the iGEM's webserver with the right transformations.
  - These transformations vary a lot in what they do. Some are _preprocessors_ while others are _postprocessors._ All gulpfiles are heavily commented; in order to get a better idea of what a transformation consists of, I would recommend starting with the main gulpfile and reading the sub-gulpfiles as necessary.
  - This gulpfile is wrapped up in a Node.js module, which is then `require`'d by _your_ package; this module was made available to your package when you installed it.
2. [igemwiki-api](https://github.com/igemuoftATG/igemwiki-api/tree/master/recipes): This `npm` package enables us to upload files to the iGEM Wiki. It was built by iGEM Toronto's 2016 team, and has been extended and expanded into a full-blown automated build tool, `igem-wikibrick`. It provides an interface that takes advantage of Mediawiki's API. The way `igem-wikibrick` makes use of this tool is documented under [`gulp/tasks/live/push.js`](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/gulp/tasks/unit/push.js)

### 3.1 Usage and Task Definitions

`igem-wikibrick` is used primarily via the `gulp` command, which is followed by a list of tasks to execute. As mentioned, all of these tasks are defined in gulpfiles that will be listed below.

Major composite tasks can be found in the [main gulpfile](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/gulpfile.js):

- `gulp build` or `gulp build -d`: Builds a set of development files on your local computer. This development version can be run on your local machine by double-clicking on the HTML files found under the `build` folder, or alternatively through `gulp serve`.
  - `gulp prebuild` and `gulp partialbuild`: You may have noticed these if you've been digging around the gulpfile. `prebuild` only builds images and fonts, in preparation for the `push:files` step, and is necessary to acquire the URLs for these resources from the iGEM wiki. `partialbuild` performs the rest of the build. When you call `gulp build`, both of these tasks are run in the correct order, and so you should never need to call them by hand.
- The `-l/-d` switch: Any gulp command can be flagged with `-l` or `-d`. These are short for `--env=live` and `--env=dev`, respectively. Both are different build environments that affect the way `gulp` transforms our files in `app` into files in `build`.
  - The `dev` environment prepares files to run on your local machine. It is also the default, implied environment; if you use `-d` or `--env=dev` in a command, you can simply omit it to achieve the same effect. This setting is most commonly used with `gulp serve`, though can also be used with `gulp build` to produce files that can be run through any web browser.
  - The `live` environment prepares files for uploading to the iGEM wiki, and should only be used when you want to modify your actual, _live_ wiki page on igem.org.
  - Note that these environments are not hard-coded but defined in `config.js`. 
- `gulp serve`: Builds a set of development files via `gulp dev build` before launching a local webserver, which hosts out of the `build` folder and watches the `app` folder for any changes to relevant content files. In the event of a change, these files will be automatically built before being streamed to the webserver for immediate display in your browser. This enables rapid development and should be used when editing stylesheets, HTML or JavaScript for use on the wiki.
- `gulp publish -l`: First builds and pushes images to the wiki, which is necessary in order to generate their URLs.Images uploaded to the iGEM Wiki do not have predictable URLs, and so before a live build with URL substitution can be performed, images must first be uploaded. Once this is done, a live build executes, using a saved map of image locations under `build/imagemap.json` and a predictable URL map, defined by `.config/igem-wikibrick` to substitute relative URLs for absolute URLs. Then the remaining files, HTML, JS, CSS and vendor files are pushed to the iGEM server.

### 3.2 Breakdown of subtasks

#### Building (build:, clean)

- `asset.js`:  
  - `build:js` and 'build:css' minifies and stages the respective files. Minification allows for a faster build time, as it strips away the whitespace, new character lines, and anything that does not change the code's functionality.
  - `build:sass` includes Bourboun and Neat as well as Sass files and minification.
  - `build:images` stages all .png and .jpg images.  
- `bower.js`:  
  - `build:bower:js` and `build:bower:css` stages JavaScript (JQuery, Bourboun and Neat, and any other future live dependencies) and CSS libraries, respectively.  
- `clean.js`:  
  - `clean`: As you may have guessed, cleans your build directory out of all files. A clean is automatically peformed before every prebuild.
- `html.js`:  
  - `build:index`, `build:pages`, `build:templates` builds the respective pages for developmental view. 

#### Uploading (push:)

- Most of the subtasks associated with the live version are relatively self-explanatory, such as `push:index`, `push:pages`, `push:templates`,`push:css`, etc. These subtasks will push the changes that have been made in each of the respective files onto the webpage.
- `push:images` uses a saved map of image locations under `build/imagemap.json` and a predictable URL map, defined by `.config/igem-wikibrick`, which substitutes relative URLs for absolute URLs for the images we upload to the iGEM wiki.

### 3.3 Build Process Visualization

The build proceeds as follows, using the built-in gulp tasks:

![wikibrick-flowchart](../images/wikibrick-flowchart.PNG)

## 4 Project Structure

In order to better understand what each directory means, let's take a look at the project layout.

```
igem-2018-wiki
├── app
│   ├── content
│   ├── fonts
│   ├── images
│   ├── partials
│   ├── scripts
│   ├── styles
│   │── templates
│   ├── Applied_Design.hbs
│   ├── Attributions.hbs
│   ├── Basic_Part.hbs
│   ├── etc...hbs
│   └── Team.hbs
├── bower.json
├── config.js
├── gulp
│   └── unit
│       └── dummy.js
├── gulpfile.js
├── package.json
├── package-lock.json
└── README.md

```

### 4.1 igem-2018-wiki/app

The `app` folder contains all of our _source files._ These are the files that we will edit and commit to our Git repository; as explained above, they are processed by the `igem-wikibrick` build tool in order to create our wiki.

```
app
├── content
│   ├── Applied_Design.md
│   ├── etc...md
│   └── Team.md
├── fonts
│   └── OpenSans
├── images
│   ├── iGEM.png
│   ├── etc...png/jpg
│   └── Wireframe_Logo_Light.png
├── partials
│   ├── footer.hbs
│   ├── header.hbs
│   ├── head.hbs
│   ├── igem_placeholder.hbs
│   ├── main.hbs
│   └── navline.hbs
├── scripts
│   ├── footer-header-template.js
│   ├── image-gallery.js
│   ├── navline.js
│   ├── scrollsensitive.js
│   └── smoothscrollbar.js
├── styles
│   ├── pages
│   │   ├── _index.scss
│   │   └── _team.scss
│   ├── _common.scss
│   ├── _fonts.scss
│   ├── _footer.scss
│   ├── _header.scss
│   ├── _igemwiki-override.scss
│   ├── _navline.scss
│   ├── _scrollbar.scss
│   ├── styles.scss
│   └── _tooltips.scss
└── templates
    ├── footer.html
    └── header.html

```

- The `content` folder contains any content that will be loaded in via AJAX loads. Items in here may be written in Markdown, Microsoft Word .docx or HTML, and will be compiled correctly depending on their file endings. Note that for a content file to be automatically loaded, it must *exactly* match the name of the page it is being loaded into. See `config.js`'s `contentsub` Handlebars helper function for relevant code.
- The `fonts` folder of course contains fonts, which will be uploaded to the wiki on publish.
- The `images` folder is of course where images are placed that must be uploaded. Any images you use in your wiki should be placed in this folder.
- The `partials` folder contains Handlebars partials that can be loaded in with a `{{> partial_name}}` template. These partials can be used in either `content` files or directly in root level `.hbs` (Handlebars) files.
- The `js` folder contains any JavaScript, either written by the team, or small snippets found in places like https://jsfiddle.net or https://codepen.io. There can be multiple `.js` files in this folder; you do _not_ need to reference these files one-by-one in your HTML. Rather, all Javascript will be minified and concatenated into one file, `wiki.js`, to be uploaded to the wiki. This monolithic script container should be referenced with a `<script src="/js/wiki.js"></script>` tag in the `<head>`.
- The `scss` folder contains `.scss` files. This is a compiled language that is a superset of `CSS`, or Cascading Style Sheets; `scss` stands for Sassy CSS, usually just known as SASS. SASS is a language that makes writing CSS files far more concise and readable, while still being backwards-compatible with standard CSS. A list of SASS features can be found at https://sass-lang.com/guide. Otherwise, these files should be written like standard CSS.
  - The `pages` subdirectory contains styling specific to each page.
  - `_common.scss` is exactly what it sounds like; an scss partial containing variables and mixins all our stylesheets might need.
  - `_fonts.scss` contains our custom font definitions for using fonts found in `app/fonts`.
  - `_footer.scss` and `_header.scss` contain styling for our footer and header, respectively.
  - `_igemwiki-override.scss` attempts to remove as much of the iGEM styling as possible. It isn't 100% perfected yet.
  - `_navline.scss` contains styling for the table of contents that can be seen on the left of every page. It is currently incomplete in the example project.
  - `_scrollbar.scss` contains styling for the "scroll to top" button.
  - `styles.scss` is currently our only stylesheet, and is used by every page. We made the decision to have a monolithic stylesheet to reduce the number of `<link>` tags we'd be using in our `<head>`.
  - `_tooltips.scss` makes tooltips work on bolded words. Tooltips are a fantastic example of an implemented feature because they make use of Handlebars, styling and markup. More code regarding tooltips can be found in `config.js` and in `app/content/index.md`.
- The templates folder contains HTML that will be uploaded under the `http://2018.igem.org/Template:Teamname/` root. It should generally be used for HTML or other content that will be _included_ on other pages but not directly seen.

### 4.2 igem-2018-wiki/build

This directory will be created and populated once you start using the tool, and is explained in the next section. If you have just duplicated the example project, it should not yet exist and will be created automatically for you when you run gulp.

### 4.3 igem-2018-wiki/gulp

This folder contains any user-written gulpfiles. These files are explained in detail in the [Programmer's Guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide); if you are interested in modifying the build pipeline using custom `gulp` plugins or other Node.js packages, look here. Otherwise this directory is unnecessary.

### 4.4 igem-2018-wiki/bower_components and igem-2018-wiki/bower.json

`bower_components` contains all live dependencies, and will be populated when running `bower install`. Any packages installed with `bower` will be wrapped up and uploaded to igem.org.

### 4.5 igem-2018-wiki/node_modules, igem-2018-wiki/package.json and igem-2018-wiki/package-lock.json

`node_modules` and the two json files belong to `Node.js` and `npm`. `node_modules` is similar to `bower_components`; it contains all packages and their dependencies that are installed via `npm install`. `package.json` contains a list of these dependencies so they can be quickly installed by other team members cloning the repository via the command `npm install`. It also contains metadata regarding your project, such as version, author, license, name and description. `package-lock.json` contains a record of all installed packages and prevents dependency conflicts; you won't have to worry about this last file.

### 4.6 igem-2018-wiki/gulpfile.js

This file contains all of your `gulp tasks`. These will also be explored in the next section; it is a short file that contains references to tasks defined by `igem-wikibrick`, and where you can define additional build tasks, or overwrite ones defined by `igem-wikibrick`.

### 4.7 LICENSE

This is just a plaintext file containing your open source license. This license defines what other people can legally do with your code.

### 4.8 README.md

This file will be displayed on your GitHub page, and should be used to direct teammembers and other visitors to where they need to go. There's a good likelihood that this page, the one you're reading right now, is a README.md file host on GitHub.

## 5 Breakdown of config.js

TODO

## 5 Adding or Modifing Gulp Tasks

TODO
