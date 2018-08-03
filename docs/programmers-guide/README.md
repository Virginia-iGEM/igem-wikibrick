# `igem-wikibrick` Programmer's Guide

This guide is directed at technical readers who want a more detailed understanding of the build tool. The _Programmer's Guide_ is organized hierarchically, starting with a high-level overview before diving into the details of the different components that make it work.

## 1 Table of Contents

1. [**Table of Contents**](#1-table-of-contents)
2. [**Recommended Readings**](#2-recommended-readings)
3. [**High Level Architecture**](#3-high-level-architecture)
  - 3a [_Usage and Task Definitions_](#3a-usage-and-task-definitions)

## 2 Recommended Readings for the Uninitiated

If you are new to webdevelopment or programming, all of the following are _strongly_ reccommended to get a basic understanding of how the tool works. If you are just looking to get the wiki up and running, this is probably unnecessary, but if you are interested in what's under the hood, you'll need this prerequisite knowledge.

Understanding the build system's different components requires a basic, conceptual understanding of the following:

- The rudiments of web development:
  - [Hypertext Markup Langauge (HTML)](https://www.w3schools.com/Html/): Used to define the content of a page. This language acts as the skeleton of any website.
  - [Cascading Style Sheets (CSS)](https://www.w3schools.com/Css/): Defines the way a page is displayed, or its _style._ This is the flesh, clothes and jewelry of a website.
  - [JavaScript (JS)](https://www.w3schools.com/Js/): The programming language of the internet. Using both serverside and clientside, JavaScript enables logic and allows a website to react to the user.
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

1. The core build system is composed of a [main gulpfile](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/gulpfile.js) and a bunch of different [smaller sub-gulpfiles](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/gulp/tasks). These files collectively define a bunch of different _gulp tasks,_ which are (mostly) separate executable units of logic that take in a collection of different files under the `app` directory (equivalent to a `src` directory in other software development contexts), **transforming** them in some way depending on their content, and then placing the transformed output under the `build` directory. These _built_ files can be interpreted by anyone's web browser to display a webpage. They can also be uploaded and displayed on the iGEM Wiki through the iGEM's webserver with the right transformations.
  - These transformations vary a lot in what they do. Some are _preprocessors_ while others are _postprocessors._ All gulpfiles are heavily commented; in order to get a better idea of what a transformation consists of, I would recommend starting with the main gulpfile and reading the sub-gulpfiles as necessary.
  - This gulpfile is wrapped up in a Node.js module, which is then `require`'d by _your_ package; this module was made available to your package when you installed it.
2. [igemwiki-api](https://github.com/igemuoftATG/igemwiki-api/tree/master/recipes): This `npm` package enables us to upload files to the iGEM Wiki. It was built by iGEM Toronto's 2016 team, and has been extended and expanded into a full-blown automated build tool, `igem-wikibrick`. It provides an interface that takes advantage of Mediawiki's API. The way `igem-wikibrick` makes use of this tool is documented under [`gulp/tasks/live/push.js`](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/gulp/tasks/live/push.js

### 3a Usage and Task Definitions

`igem-wikibrick` is used primarily via the `gulp` command, which is followed by a list of tasks to execute. As mentioned, all of these tasks are defined in gulpfiles that will be listed below.

Major composite tasks can be found in the [main gulpfile](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/gulpfile.js):

- `gulp build` or `gulp build -d`: Builds a set of development files on your local computer. This development version can be run on your local machine by double-clicking on the HTML files found under the `build` folder, or alternatively through `gulp serve`.
- The `-l/-d` switch: Any gulp command can be flagged with `-l` or `-d`. These are short for `--env=live` and `--env=dev`, respectively. Both are different build environments that affect the way `gulp` transforms our files in `app` into files in `build`.
  - The `dev` environment prepares files to run on your local machine. It is also the default, implied environment; if you use `-d` or `--env=dev` in a command, you can simply omit it to achieve the same effect. This setting is most commonly used with `gulp serve`, though can also be used with `gulp build` to produce files that can be run through any web browser.
  - The `live` environment prepares files for uploading to the iGEM wiki, and should only be used when you want to modify your actual, _live_ wiki page on igem.org.
  - Note that these environments are not hard-coded but defined in 
- `gulp serve`: Builds a set of development files via `gulp dev build` before launching a local webserver which hosts out of the `build` folder and watches the `app` folder for any changes to relevant content files. In the event of a change, these files will be automatically built before being streamed to the webserver for immediate display in your browser. This enables rapid development and should be used when editing stylesheets, HTML or JavaScript for use on the wiki.
- `gulp publish -l`: First builds and pushes images to the wiki, which is necessary in order to generate their URLs.Image s uploaded to the iGEM Wiki do not have predictable URLs, and so before a live build with URL substitution can be performed, images must first be uploaded. Once this is done, a live build executes, using a saved map of image locations under `build/imagemap.json` and a predictable URL map, defined by `.config/igem-wikibrick` to substitute relative URLs for absolute URLs. Then the remaining files, HTML, JS, CSS and vendor files are pushed to the iGEM server.

#### Breakdown of subtasks:

Since there are two versions, live and build, there are different subtasks associated with both:

##### Live version (`push.js`)  

- Most of the subtasks associated with the live version are relatively self-explanatory, such as `push:index`, `push:pages`, `push:templates`,`push:css`, etc. These subtasks will push the changes that have been made in each of the respective files onto the webpage.
- `push:images` uses a saved map of image locations under `build/imagemap.json` and a predictable URL map, defined by `.config/igem-wikibrick`, which substitutes relative URLs for absolute URLs for the images we upload to the iGEM wiki.

##### Build version

- `asset.js`:  
  - `build.js` and 'build:css' minifies and stages the respective files. Minification allows for a faster build time, as it strips away the whitespace, new character lines, and anything that does not change the code's functionality.
  - `build:sass` includes Bourboun and Neat as well as Sass files and minification.
  - `build:images` stages all .png and .jpg images.  

- `bower.js`:  
  - `build:bower:js` and `build:bower:css` stages JavaScript (JQuery, Bourboun and Neat, and any other future live dependencies) and CSS libraries, respectively.  

- `clean.js`:  
  - `clean`...as you may have guessed, cleans your gulpfile and essentially "resets" everything back to the default settings. 

- `DEP_markdown.js`:  
  - `build:markdown` uses markdown to convert text blocks from Markdown to HTML easily, so that non-CS people on your team can also help out too! 

- `html.js`:  
  - `build:index`, `build:pages`, `build:templates` builds the respective pages for developmental view. 

## 4 Project Structure

This is here for quick reference, we'll look at each subdirectory one-by-one:

```
igem-2018-wiki
├── app
│   ├── art
│   ├── images
│   ├── js
│   ├── pages
│   ├── scss
│   │── templates
│   └── index.html
├── build
├── docs
├── gulp
├── bower_components
│   ├── builddependency1
│   ├── builddependency2
│   └── ...
├── node_modules
│   ├── livedependency1
│   ├── livedependency2
│   └── ...
├── bower.json
├── config.js
├── package.json
├── package-lock.json
├── gulpfile.js
├── LICENSE
└── README.md
```

### 5.1 igem-2018-wiki/app

The `app` folder contains all of our _source files._ These are the files that we will edit and commit to our Git repository; they are processed by the `igem-wikibrick` build tool in order to create our wiki.

```
igem-2018-wiki
├── app
│   ├── art
│   │   ├── 2018_Wiki_Link.png
│   │   └── ...
│   ├── images
│   │   ├── group-photo.jpg
│   │   └── ...
│   ├── js
│   │   ├── footer-header-template.js
│   │   └── ...
│   ├── pages
│   │   ├── Page1.html
│   │   ├── Page2.html
│   │   └── ...
│   ├── scss
│   │   ├── _common.scss
│   │   ├── _footer.scss
│   │   ├── _header.scss
│   │   ├── _igemwiki-override.scss
│   │   ├── index.scss
│   │   ├── Page1.scss
│   │   ├── Page2.scss
│   │   ├── styles.scss
│   │   └── ...
│   │── templates
│   │   ├── footer.html
│   │   └── header.html
│   └── index.html
```

- The `art` folder exists just for tracking images that will _not be uploaded to igem.org_. It's useful for storing `.psd` files or other project files that need to be tracked but do not need to be uploaded.
- The `images` folder is of course where images are placed that must be uploaded. Any images you use in your wiki should be placed in this folder.
- The `js` folder contains any JavaScript, either written by the team, or small snippets found in places like https://jsfiddle.net or https://codepen.io. There can be multiple `.js` files in this folder; you do _not_ need to reference these files one-by-one in your HTML. Rather, all Javascript will be minified and concatenated into one file, `wiki.js`, to be uploaded to the wiki. This monolithic script container should be referenced with a `<script src="/js/wiki.js"></script>` tag in the `<head>`.
- The `pages` folder contains any non-index html pages. Standard pages like http://2018.igem.org/Team:Virginia/Team and http://2018.igem.org/Team:Virginia/Description should be placed here.
- The `scss` folder contains `.scss` files. This is a compiled language that is a superset of `CSS`, or Cascading Style Sheets; `scss` stands for Sassy CSS, usually just known as SASS. SASS is a language that makes writing CSS files far more concise and readable, while still being backwards-compatible with standard CSS. A list of SASS features can be found at https://sass-lang.com/guide. Otherwise, these files should be written like standard CSS.
- The templates folder contains HTML that will be uploaded under the `http://2018.igem.org/Template:Teamname/` root. It should generally be used for HTML or other content that will be _included_ on other pages but not directly seen.

### 5.2 igem-2018-wiki/build

This directory will be created and populated once you start using the tool, and is explained in the next section. If you have just duplicated the example project, it should not yet exist and will be created automatically for you as you continue.

### 5.3 igem-2018-wiki/docs

This is a folder for placing developer documentation. We use it for storing tutorials for internal team use as well as developer notes.

### 5.4 igem-2018-wiki/gulp

This folder contains any user-written gulpfiles. These files are explained in detail in the [Programmer's Guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide); if you are interested in modifying the build pipeline using custom `gulp` plugins or other Node.js packages, look here. Otherwise this directory is unnecessary.

### 5.5 igem-2018-wiki/bower_components and igem-2018-wiki/bower.json

`bower_components` contains all live dependencies, and will be populated when running `bower install`. Any packages installed with `bower` will be wrapped up and uploaded to igem.org.

### 5.6 igem-2018-wiki/node_modules, igem-2018-wiki/package.json and igem-2018-wiki/package-lock.json

`node_modules` and the two json files belong to `Node.js` and `npm`. `node_modules` is similar to `bower_components`; it contains all packages and their dependencies that are installed via `npm install`. `package.json` contains a list of these dependencies so they can be quickly installed by other team members cloning the repository via the command `npm install`. It also contains metadata regarding your project, such as version, author, license, name and description. `package-lock.json` contains a record of all installed packages and prevents dependency conflicts; you won't have to worry about this last file.

### 5.7 igem-2018-wiki/gulpfile.js

This file contains all of your `gulp tasks`. These will also be explored in the next section; it is a short file that contains references to tasks defined by `igem-wikibrick`, and where you can define additional build tasks, or overwrite ones defined by `igem-wikibrick`.

### 5.8 LICENSE

This is just a plaintext file containing your open source license. This license defines what other people can legally do with your code.

### 5.9 README.md

This file will be displayed on your GitHub page, and should be used to direct teammembers and other visitors to where they need to go. There's a good likelihood that this page, the one you're reading right now, is a README.md file host on GitHub.

## Closing Remarks

TODO