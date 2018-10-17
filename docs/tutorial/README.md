# `igem-wikibrick` Tutorial

This tutorial is intended for those that have followed the [generator-igemwiki installation guide](https://github.com/Virginia-iGEM/generator-igemwiki) or the [migration guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/migration-guide).

## Workflow

Our workflow consists of two cycles: **Local Development** (what we call Building and Serving) and **Publishing**.

![wiki-workflow](../images/wiki-workflow.PNG)

**Building** consists of making iterative changes on your computer and viewing the results of those changes in your web browser.

**Publishing** consists of packaging up all your modifications and uploading them to igem.org for others to see.

### Building

99% of the time, you'll be building with `gulp serve`. This is the first (and probably most) important command you will learn. After you type the command `gulp serve` and hit enter, a few status indicators will print before a local webserver is launched. All of the files designated by the `buildsrc` variable on line 27 of `config.js` will be transformed by various functions and tasks defined by `igem-wikibrick`. Once these are built, if you have a default browser set on your computer, a link to your `index.html` page will open in that browser. This webserver runs out of the `./build` folder (designated in `config.js` as the variable `build` on line 17).

If no page opens, copy-and-paste http://localhost:9999/ into your browser's URL bar.

This local webserver runs on your computer and allows you to see changes you make to the project files in real time. If you modify any files in the `app` directory, they will be automatically built and streamed to the webserver. Try modifying and saving one of the HTML or CSS files now to see this in action!

To modify the appearance of the page, you could for example edit a stylesheet under `app/styles/`. These SCSS ("Sassy CSS") files use a language that is a superset of standard CSS, and so any rules you've learned about CSS should apply to SCSS. For example, you could change the colors of the entire website by modifying variables in `_common.scss` or you could change the size of the navigation header in `_header.scss`.

You could also edit the content of a file under `content` which contains the main content for the site and is dynamically loaded in on pageload. You could also directly edit one of the `.hbs` files in `app`, though we try our best to maximize use of templating in order to reduce code duplication.

More advanced web development is beyond the scope of this tutorial, and we recommend looking at [w3schools.com](https://www.w3schools.com/) for basic web development instruction, [codepen.io](https://codepen.io/) for examples of working snippets that you can play with and integrate into your wiki, and judicious use of your search engine of choice to find tutorials, resources and answers to your questions.

If you would like to understand better what each directory and file does and how it plays into the build, see the [project structure section of the Programmer's Guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide#4-project-structure).

---

In addition to `gulp serve`, `gulp build` will also be useful for local editing. This command will process all files as defined above, but will not run a local webserver. This is useful for proofreading small changes and looking at compiled HTML, CSS and JS.

Once the server is running, you can make any and all changes you want to HTML, styles and JS, building your website on your local machine. The webserver will automatically read your changes and update the page as soon as they are done being built. This is the first part of the workflow; the build cycle. You construct your wiki offline, in collaboration with your other teammates.

Some important notes for editing your website locally:

- Use relative URLs to refer to other pages and content (internal resources) within your project. Note that in `index.html`, all links to webpages defined in `pages`, links to scripts and links to stylesheets are all relative URLs. These will automatically be replaced with absolute URLs that reference your iGEM wiki when the files are uploaded to the iGEM Wiki.
  - Use root-relative URLs, I.E. `/images/foo.png` as opposed to `../../images/foo.png`. Not only is this cleaner, but also relative URLs are not currently fully supported by the URL Substituter.
  - All relative URLs are relative to the root directory of the webserver, which is in this case is `build`.
  - Note the use of AJAX Loads for the header and footer of pages which significantly speeds up loading the webpages. These also use relative URLs and reference partial HTML defined in the `template` folder.

Some notes for working with our particular setup:

- When searching for tutorials to understand how our stack of tools works, understand that you can build a website as you "normally would" in standard web development, writing normal HTML, CSS (in .scss files) and JavaScript. We simply provide some additional libraries and pre/postprocessing to make things easier.
- Note that, for the most part, HTML containers only have one or two `class` or `id` attributes, which are usually referenced exactly once in our JavaScript or SCSS. This is a practice known as `idiomatic` HTML, where the HTML contains only its content and its purpose on the page. _Any_ styling is handled in SCSS. Similarly to splitting up source code into multiple files, the point of this is to maintain orthogonality and reduce code duplication.
  - Idiomatic HTML is not possible with libraries such as Bootstrap, which is why we decided to avoided them. However, many very popular websites use Bootstrap and so you should consider using it, even though we have decided not to.
- Note that for scripts, a single `/js/wiki.js` file is referenced. This contains all of the JavaScript files from the `app/js` folder concatenated together. A similar monolithic CSS file can also be obtained by simply using `@import` directives for partial SCSS files (those that are prefixed with underscores will not be directly compiled, such as _common.scss and _footer.scss)
- Note that we do not have any browser-specific styling tags with prefixes in our SCSS, such as `-webkit-user-select` or `-webkit-transition`. These tags will automatically be added by a tool called `autoprefixer`, which can be configured in `config.js` on line 132.

To better understand how exactly build works, and what each folder does, please see [the process section of the Programmer's Guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide#33-build-process-visualization) for an explanation of each transformation the build performs.

### Publishing

Once you are satisfied with the way your wiki pages are looking, the pages (including HTML, JavaScript, CSS, images, fonts, and any packages installed with Bower) can be built and uploaded with `gulp publish -l`.

This command is a shortcut for the following series of commands:

- `gulp push:files -l`: This command will upload all images and fonts under `build/images` and `build/fonts` respectively to igem.org, under your team's name. This upload must come first because it saves the URLs of all uploaded images, which are not predictable before the upload actually occurs. These URLs will be saved under `build/imagemap.json`, which will be read during the next step to perform URL substitution.
- `gulp build -l`: Perform a live build. A live build does a little bit more than a development build, primarily minification and URL substitution.
- `gulp push:all -l`: This is the "main" upload step, and pushes HTML, CSS and JS to the wiki. After this completes, your publish will be complete and you should be able to see your wiki on the `<year>.igem.org/Team:<teamname>` domain.

When you run this command, the terminal will prompt you for your username and password. This is the same username and password you use to login to the iGEM wiki. These credentials will not be stored, and you currently must enter them on every publish. Do not accidentally commit a file containing these credentials to your repository. If you do, remove said file with the [git bfg repo cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

## Troubleshooting

See the [FAQ](https://github.com/Virginia-iGEM/igem-wikibrick#5-faq) section on the main page. If things are still broken, email as at virginia.igem@gmail.com.

## But wait, I don't know how to do the actual web development part...

Teaching web development is beyond the scope of our tutorials. We strongly reccommend w3schools.com for learning the basics; this is how we taught ourselves HTML and CSS. JavaScript can be learned as you go if you've used a similar programming language before (JavaScript has almost identical syntax to C-based languages such as C++, Java and of course C itself, though many conventions are different).

We believe the best way to learn advanced HTML, CSS and JavaScript is to set goals for yourself, and read about whatever it is you need to reach that goal. Want everything to look pretty and well-styled? Look up how to do general CSS styling and apply that. Want a fancy interactive navbar? Look it up and apply what you learn. Take things bite by bite and slowly work on the wiki once piece at a time.

That being said, we do have a set of [general reccommendations available on our tutorials page](https://github.com/Virginia-iGEM/2018-tutorials/blob/master/wiki/README.md), which will take you to other resources. Additionally, see the FAQ [FAQ](https://github.com/Virginia-iGEM/igem-wikibrick#5-faq), which has additionally reccommendations.

## Closing Remarks

That's all! All said and done, you should've either set up a new project with `generator-igemwiki` or migrated an existing repository for use with `igem-wikibrick`, tracked it with Git, uploaded it to GitHub, run your first local server and finally published to the iGEM wiki.

Continue to develop your wiki using the workflow outlined above, and please share your results with us at [virginia.igem@gmail.com](mailto:virginia.igem@gmail.com), our [Twitter](https://twitter.com/virginia_igem?lang=en), or [Facebook](https://www.facebook.com/virginiaigem/).
