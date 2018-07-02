# `igem-wikibrick` Programmer's Guide

This guide is directed at technical readers who want a more detailed understanding of the build tool. The _Programmer's Guide_ is organized hierarchically, starting with a high-level overview before diving into the details of the different components that make it work.

## 1 Table of Contents

1. [**Table of Contents**](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide##1-Table-of-Contents)
2. [**Recommended Readings**](#2-Recommended-Readings)
3. [**High Level Architecture**](#3-High-Level-Architecture)

## 2 Recommended Readings

Understanding the build system's different componenets minimally requires a basic, conceptual understanding of the following:

- The rudiments of web development:
  - [Hypertext Markup Langauge (HTML)](https://www.w3schools.com/Html/): Used to define the content of a page. This language acts as the skeleton of any website.
  - [Cascading Style Sheets (CSS)](https://www.w3schools.com/Css/): Defines the way a page is displayed, or its _style._ This is the meat, clothes and jewelry of a website.
  - [JavaScript (JS)](https://www.w3schools.com/Js/): The programming language of the internet. Used both serverside and clientside, JavaScript enables logic and allows a website to react to the user.
    - Familiarity with the [asynchronous](https://www.pluralsight.com/guides/introduction-to-asynchronous-javascript) nature of Node.js and JS in general
    - Familiarity with [callbacks](http://recurial.com/programming/understanding-callback-functions-in-javascript/) and [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).
- What [an API](https://en.wikipedia.org/wiki/Application_programming_interface) is
  - [The igemwiki-api](https://github.com/igemuoftATG/igemwiki-api)
- What a webserver is
- What [Mediawiki](https://en.wikipedia.org/wiki/MediaWiki) is, particularly in [the context of iGEM](https://github.com/igemuoftATG/igemwiki-api/tree/master/recipes).
- [What Node.js is](https://nodejs.org/en/)
- Familiarity with [build automation and build tools](https://en.wikipedia.org/wiki/Build_automation)
  - [Understanding what gulp is](https://gulpjs.com/)
- Understanding what package management is and what a dependency is
  - [npm](https://www.npmjs.com/)
  - [bower](https://bower.io/)

Linked above are reccommended readings for understanding these things. You do not need to follow all of these tutorials ot the end or read every article in detail; they are simply to give a general understanding of what each of these core components are and what they do. Skim them, look up any words you don't understand.

## 3 High-Level Architecture

`igem-wikibrick` is composed of two key components:

1. The core build system, compoesd of a [main gulpfile](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/gulpfile.js), and a bunch of different [smaller substituent gulpfiles](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/gulp/tasks). These files collectively define a bunch of different _gulp tasks,_ which are (mostly) separate executable units of logic that take in a collection of different files under the `app` directory (equivalent to a `src` directory in other software development contexts), **transforming** them in some way depending on their content, and then placing the transformed output under the `build` directory. These _built_ files can be interpreted by our web browser, or someone else's web browser, to display a webpage. They can also be uploaded to the iGEM Wiki for display on iGEM's webserver, with the right transformation.
  - These transformations vary a lot in what they do. Some are _preprocessors,_ others are _postprocessors._ All gulpfiles are heavily commented; in order to get a better idea of what a transformation consists of, I would reccommend starting with the main gulpfile and reading the substituent files as necessary.
2. [igemwiki-api](https://github.com/igemuoftATG/igemwiki-api/tree/master/recipes): This `npm` package enables us to upload files to the iGEM Wiki. It was built by iGEM Toronto's 2016 team, and has been extended and expanded into a full-blown automated build tool, `igem-wikibrick`. It provides an interface that takes advantage of Mediawiki's API. The way `igem-wikibrick` makes use of this tool is documented under [`gulp/tasks/live/push.js`](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/gulp/tasks/live/push.js).

## Usage and Task Definitions

`igem-wikibrick` is used primarily via the `gulp` command, which is followed by a list of tasks to execute. As mentioned, all of these tasks are defined in gulpfiles that will be listed below.

Major composite tasks; all can be found in the [main gulpfile](https://github.com/Mantissa-23/VGEM-2018/blob/igemwiki-api/wiki/gulpfile.js):

- `gulp dev build`: Builds a set of development files. This development version can be run on your local machine by double-clicking on the HTML files found under the `build` folder, or alternatively through `gulp serve`.
  - The `live/dev` switch: Any gulp command can be prefixed with `live` or `dev`. This is currently only useful for `build`, as `gulp serve` automatically sets the switch to `dev` while `publish` automatically sets the switch to `live`.
- `gulp serve`: Builds a set of development files via `gulp dev build` before launching a local webserver which hosts out of the `build` folder and watches the `app` folder for any changes to relevant content files. In the event of a change, these files will be automatically built before being streamed to the webserver for immediate display in your browser. Enables rapid development, should be used when editing stylesheets, HTML or JavaScript for use on the wiki.
- `gulp publish`: First builds and pushes images to the wiki, which is necessary in order to generate their URLs. Images uploaded to the iGEM Wiki do not have predictable URLs, and so before a live build with URL substitution can be performed, images must first be uploaded. Once this is done, a live build executes, using a saved map of image locations under `build/imagemap.json` and a predictable URL map, defined by `.config/igem-wikibrick` to substitute relative URLs for absolute URLs. Then the remaining files, HTML, JS, CSS and vendor files are pushed to the iGEM server.

Breakdown of subtasks:

TODO
