# `igem-wikibrick` Tutorial

This tutorial is intended for those that have followed the [generator-igemwiki installation guide](https://github.com/Virginia-iGEM/generator-igemwiki) or the [migration guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/migration-guide).

## Workflow

Our workflow consists of two cycles: Local Development (what we call Building and Serving) and Publishing.

![wiki-workflow](wiki-workflow.PNG)

Building consists of making iterative changes on your computer and viewing the results of those changes in your webbrowser. Publishing consists of packaging up all your modifications and uploading them to igem.org for others to see.

### Building

Once this is done, we're going to first run `gulp serve`. This is the first important command you will learn. After you hit enter, a few status indicators will print before a local webserver is launched. All of the files designated by the `buildsrc` variable on line 27 of `config.js` will be transformed by various functions and tasks defined by `igem-wikibrick`. Once these are built, if you have a default browser set on your computer, a link to your `index.html` page will open. This webserver runs out of the `./build` folder (designated in `config.js` as the variable `build` on line 17).

If no page opens, copy-and-paste http://localhost:9999/ into your browser's URL bar.

This local webserver runs on your computer and allows you to see changes you make to the project files in real time. If you modify any files in the `app` directory, they will be automatically built and streamed to the webserver. Try modifying one of the HTML or CSS files now to see this in action.

In addition to `gulp serve`, `gulp build` will also be useful for local editing. This command will process all files as defined above, but will not run a local webserver. This is useful for proofreading small changes and looking at compiled HTML, CSS and JS.

Once the server is running, you can make any and all changes you want to HTML, styles and JS, building your website on your local machine. This is the first part of the workflow; the build cycle. You construct your wiki offline, in collaboration with your other teammates.

Some important notes for editing your website locally:

- Use relative URLs to refer to other pages and content within your project. Note that in `index.html`, all links to webpages defined in `pages`, links to scripts and links to stylesheets are all relative URLs. These will automatically be replaced with absolute URLs that reference your iGEM wiki when the files are uploaded to the iGEM Wiki.
  - All relative URLs are relative to the root directory of the webserver, which is in this case `build`.
  - Note the use of AJAX Loads for the header and footer of pages. These also use relative URLs and reference partial HTML defined in the `template` folder.

Some notes for working with our particular setup:

- When searching for tutorials to underestand how our stack of tools works, understand that you can build a website as you "normally would," writing normal HTML, CSS (in .scss files) and JavaScript. We simply provide some additional libraries and pre/postprocessing to make things easier.
- Note that, for the most part, HTML containers only have one or two `class` or `id` attributes, which are usually referenced exactly once in our JavaScript or SCSS. This is a practice known as `idiomatic` HTML, where the HTML contains only contains its content, and its purpose on the page. _Any_ styling is handled in SCSS. Similarly to splitting up source code into multiple files, the point of this is to maintain orthogonality and reduce code duplication.
- Note that for scripts, a single `/js/wiki.js` file is referenced. This contains all of the JavaScript files from the `app/js` folder concatenated together. A similar monolithic CSS file can also be obtained by simply using `@import` directives for partial SCSS files (those that are prefixed with underscores will not be directly compiled, such as _common.scss and _footer.scss)
- Note that we do not have any browser-specific styling tags with prefixes in our SCSS, such as `-webkit-user-select` or `-webkit-transition`. These tags will automatically be added by a tool called `autoprefixer`, which can be configured in `config.js` on line 132.

### Publishing

Once you are satisfied with the way your wiki pages looking, the pages, including HTML, JavaScript, CSS, images, and any packages installed with Bower can be built and uploaded with `gulp publish -l`.

This command is a shortcut for the following series of commands:

- `gulp push:images -l`: This command will upload all images under `build/images` to igem.org, under your team's name. This upload must come first because it saves the URLs of all uploaded images, which are not predictable before the upload actually occurs. These URLs will be saved under `build/imagemap.json`, which will be read during the next step to perform URL substitution.
- `gulp build -l`
- `gulp push:content -l`