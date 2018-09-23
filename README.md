# igem-wikibrick

A user-friendly tool that makes developing wikis and webpages for the iGEM wiki behave as much like normal web development as possible. Automates building, image, HTML, CSS, Javascript and Package uploads.

If you encounter an error, problem or issue, please report it via our [issue tracker](https://github.com/Virginia-iGEM/igem-wikibrick/issues). If you would like to contribute, feel free to fork and submit a pull request. See [contributing](#8-contributing) for more information.

_Note: As of version 0.6.0 igem-wikibrick has largely stabilized. Some small changes to the CLI will be made in the future, but the tool should not radically change henceforth save for patches, bugfixes and optional off-by-default features. **Please see the [FAQ](#5-faq) before using, as there are some persistent issues that you must be aware of while using the tool.**_


## 1 Table of Contents

1. [**Table of Contents**](#1-table-of-contents)
2. [**Installation**](#2-installation)
3. [**Tutorial**](#3-tutorial)
4. [**Description**](#4-description)
5. [**FAQ**](#5-faq)
6. [**Todo**](#6-todo)
7. [**Dependencies**](#7-dependencies)
8. [**Attributions, Dependencies and Works Cited**](#8-attributions-and-works-cited)
9. [**Contribution**](#9-contribution)

## 2 Installation

For new projects, see our Yeoman generator, [generator-igemwiki](https://github.com/Virginia-iGEM/generator-igemwiki). **This option is strongly recommended for users new to web development.** This will give you an entire template for your wiki in addition to installing the tool for you.

If you have an existing project, either an existing wiki you've been writing on igem.org, or content you have saved locally that you'd like to get on the iGEM server, and would like help moving to our tool, see the [migration guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/migration-guide).

If you already have a project and already know what you're doing: `npm install -D igem-wikibrick`. Gulp commands and project structures can be found in the Programmer's Guide.

## 3 Tutorial

See the [tutorial](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/tutorial) page. You *must* have already installed the tool, either with `generator-igemwiki`, or standalone by following the migration guide.

## 4 Programmer's Guide

See [programmer's guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide). This is a more technical document containing information on the architecture of igem-wikibrick, and is valuable both for new users trying to get a deeper understanding of how the tool works and how to modify it, as well as for well-versed developers who have no need of an introduction, and are looking to modify the tool for their own use as quickly as possible.

## 5 Description

`igem-wikibrick` is a commandline build tool that automates uploading of content (HTML, CSS, JS, images and fonts) to the iGEM Wiki, provides preprocessing, postprocessing, templating and other build conveniences, and can run a local webserver hosting a copy of the in-development wiki, enabling faster iteration times than are possible with the builtin Edit functionality of the igem wiki, and making it easier for team members to use their favorite development tools, I.E. Sublime, Vim, BASH, and making it easier to version control wikis for more robust development and for use by future teams.

Our goal in building this tool was to enable us to create an iGEM website that would tell our team's story, and we'd like to share this tool with other teams who have the same goal.

### 5.1 Feature List

- **Command line-based, no-hassle build tool.** Write and test all of your HTML, CSS and JS on your own machine. Once installed, the command `gulp serve` runs a local webserver that will update when any changes are made to your project. Change your stylesheets or page layout, save your changes, and see the changes instantly. No messing around with a _save page_ button or working in a text editor without syntax highlighting or autocompletion.
- **URL Substitution, automated uploads.** What happens when you want to see your changes on your iGEM Wiki page? Once correctly configured, the command `gulp publish` will intelligently modify any relative URLs in your HTML files to be absolute, pointing to the correct locations on the iGEM wiki, before sending all your files to those locations using an API developed by Toronto's iGEM team, `igemwiki-api`. In under a minute, all of your content, images, stylesheets and scripts will be available, live, on your iGEM Wiki. The tool will keep track of which files have changed between uploads, and will only upload files that have changed to increase upload speeds.
- **Flexible Build and Package support.** Becuase we're using `gulp`, a Node.js based task automation tool, you can add thousands of gulp plugins and Node.js modules to your wiki to do all the things you ever wished you could. Want to use more advanced templating to reuse as much code as you can? `npm install -D gulp-handlebars`. Want an interactive experience that teaches your users how your project works? `npm install -D impactjs`. Want fluid, scriptable animations that react to the user? `npm install -D createjs-tweenjs`. You have access to literally the largest repository of open source packages in existence, `npm`, with over 350,000 packages.
- **Markdown, Google Docs and Word Document Conversion [UNDER CONSTRUCTION].** Are you the only programmer on your team? Worse yet, are you _not a programmer at all,_ but you bit the bullet and volunteered to spearhead your team's wiki? Either way, `igem-wikibrick`'s got your back. (Future) integration of Markdown and word processor document compiling will make incorporating your teammates' work into the wiki seamless and easy.

## 5 FAQ

### Why does my wiki look different on igem.org than it does locally?

As much as we've tried to streamline this, we've encountered this same issue. Every team runs into it in one way or another. This issue occurs for a number of reasons, including igem.org's `load.php` styles taking precedence over any stylesheets we load in, as well as preloaded stylesheets associated with the wiki template that is automatically loaded into every team's page.

You can avoid this by doing the following:

- **Liberally use and abuse the !important flag.** As much as it bad practice, this is the easiest way to override stylesheets enforced by `igem.org`. Does something appear different on the `igem.org` website than on your local server? Find the style that makes it appear different, and add `!important` to the end of it, just before the semicolon. This will fix 95% of these issues.
- **Do not leave your publish for last minute.** Publish semi-regularly to ensure that your styling, content and JS works on both the wiki and on your local webserver.
- Do not style `<body>` tags. At all. To do global styling for your whole page, instead wrap all the content in your body in a div tag and style that tag. Example: `<div id="teamname_content"></div>` and style the `#teamname_content` id.
- Inspect an iGEM wiki page and take note of the names of HTML tags they use. For example, they have a `<div>` with the id `#content`, so you will not be able to use a `<div>` with the `content` id without clashing with iGEM Wiki styling

### Why does my JQuery code behave strangely?

~~This is a known issue and likely relates to the fact that we package JQuery 3.3 using Bower by default, while iGEM provides JQuery 1.1 forcibly to all wikis. We are currently attempting to resolve the issue ourselves.~~

~~A current known workaround is to write inline JavaScript in `<script>` tags instead of writing them under the js folder. If you need to use your JavaScript in multiple documents, you can place your script tag in the `app/partials/_head.hbs` partial. This will cause JQuery code to behave as it should.~~

Fixed! Both templates served by `generator-igemwiki` now use Browserify to package the newest version of JQuery, 3.3.1, with your JavaScript. This allows you to use the newest version of JavaScript while `igem.org`'s AJAX loads will still function perfectly with JQuery 1.11.1.

If you aren't using the generator, update to the latest version of `igem-wikibrick` with `npm install -D igem-wikibrick@latest`, install Node.js JQuery with `npm install jquery` and then add `jq = require('jquery')` to the top of all your JavaScript files. Use `jq` in place of `$` if you wish to use JavaScript 3.3.1. If for whatever reason you want to use JavaScript 1.11.1, use the `$` instead. _Do not mix and match._

### I keep making modifications but whenever I build, they're overwritten!

**Make sure you are editing files in `app` and not in `build`. Any edits to any files in `build` will be overwritten when the next build is run. Never edit any files in `build` as the edits will always be trampled.**

### `gulp serve` task cannot be found. Or any other tasks.

Try running `npm install -D igem-wikibrick@latest` in your project folder. This is another known issue, and a rare one at that; we've only encountered it twice and it hasn't showed up since. If it persists, push any changes you've made, delete your project folder and reclone your project from GitHub.

If you have any insights as to why this issue may be occurring, we'd love to get it fixed. See [Contributing](#9-contributing) for contact information.

This issue seems to sometimes occur when you clone down a new copy of your project and then run `npm install`. Try running `npm update` instead of `npm install`; this seems to correctly duplicate `igem-wikibrick`'s necessary dependencies.'

This appears to be an issue with `npm install`'s dependency resolution code, and so fixing this problem is largley out of our power. `yarn` may prove superior; if you are interested in helping us migrate `igem-wikibrick` to `yarn` instead of `npm`, we'd love to talk to you.

### Some of my URLs aren't substituted?

99% of the time this is because you've misspelled the image's filename. It's case-sensitive and you have to get the path exactly right, otherwise the substituter will not find it. If you are using `gulp build -l`, ensure that you have _recently_ performed a `gulp push:files`.

### NONE of my URLs are substituted!

Remember that `gulp publish -l`, not `gulp publish` is the correct way to publish. This is due to a limitation with the way our build system is set up, and will be corrected in the future so that `gulp publish` correctly performs a live build.

If your URLs _still_ aren't substituted, please contact us for further assistance. This is another known, rare issue that we have encountered in the past but no longer do despite it never being officially fixed.

### I can't push:files

Run `gulp prebuild` first. `push:files` works out of the build directory, which is populated by prebuild. You should notice a lot of large red errors if this is happening.

## 6 Todo

### 6.1 Known Issues

- `npm install` will consistently incorrectly install this package on an `npm install` due to problems with npm's dependency resolution. Workaround is to either `npm install -D igem-wikibrick` or run `npm update` directly following an `npm install`. The install script will automatically do this.
- [UNCOMMON] `gulp publish -l` sometimes doesn't perform the URL replace. Reason is unknown; workaround is to enter `gulp build -l` then `gulp push:content -l` following a `gulp publish -l` that fails to rewrite relative URLs.
- Upload timeouts will _sometimes_ throw large, verbose errors that aren't caught by our error handling code.
  - Same for login timeouts
  - May have been resolved by modifying `igemwiki-api`
  - Modified `igemwiki-api`'s CLI needs to be tested to make sure our changes aren't breaking, as they change the way the library handles errors. May be necessary to ensure that `igemwiki-api` does not catch errors when used as a library and catches them when used as a CLI.
- Attempting to `gulp build -l` without first `gulp push:images -l` will result in a big series of repeated file read errors and broken URL substitutions. Instead error out and tell user to `push:images` or `publish` before `live build`ing in error message instead of just vomiting exceptions.
- `gulp publish` can be performed without the `-l` flag, which makes no sense. An error should be thrown which tells the user that the `-l` flag is necessary for publishing, or the `-l` flag is automatically and always set on publish for the user. See item #1 in High Priority.

### 6.2 High Priority

- [API CHANGE] Make it so that `gulp publish` automatically sets the environment to `live`, while `gulp serve`, at least in its current state, automatically sets the environment to development.
- Add a `--force` flag that makes it so that uploads do not pay attention to hashes deltas and everything is just uploaded.
- [FEATURE] Add a Handlebars helper function that accepts Google Drive links and can pull down Google Docs and use them as HTML content.
  - Decently complicated change as it requires prompting the user to log in to Google Drive and dealing with Google Drive APIs.
- Add error-checker that asks the user if they want to upload `dev` build files to the iGEM wiki, instead of just blindly uploading them. Should probably use a `lock` file of some kind under the `build` directory that indicates what the last build environment was.
- Modify handlebars substitution so that a malformed handlebars template will cause an error to be thrown, and the handlebars file to not be processed, as opposed to the entire build to crash out.
- Same goes for browserify

### 6.3 Medium Priority

- [API CHANGE] Replace bower with npm development dependencies. Bower is being phased out, not just in our project but across the web.
  - Perhaps there's also room for webpack/browserify to take Bower's place?
  - Yarn may also be an appropriate replacement
  - npm can also manage frontend dependencies, though this would require browserify and may result in confusion between vulnerabilities in live and dev.

### 6.4 Low Priority

- Pick a JavaScript styleguide, fix the awful inconsistencies in style to adhere to it.
  - Standardize variable and function naming schemes.
  - Should probably 'use strict'.
  - 'use strict' seems to have gone out of style though?

### 6.5 Questionable Value (discuss before implementing)

- Create shell scripts (`.sh`, `.bat` files) that automatically install Node.js and all required npm and bower dependencies for team members and future teams.
  - Add git hook that causes an npm install and bower install on package.json or bower.json change.
  - Must be added on a repository-by-repository basis
  - The Yeoman generator already kinda does all of this.
- Wrap the whole tool in a custom commandline tool?
  - Honestly a gulp --help command would be enough.
- Modify `gulpfile.js` so that separate directories, `build-dev` and `build-live` are created for each respective build.
  - I feel like this would just further clutter the project folder
- Eliminate synchronous file read in gulp task live/push.js
  - JSON.parse is synchronous anyways, so will need a different JSON library?
  - Also it happens really quickly so async is probably not needed
- Update build-tool so that it scans for existing files and whether or not their srcs have changed under `./build` before building. Would need some kind of hash of each file, or a look at the date-last-changed.
  - Probably not that necessary, just more work for little gain considering how fast builds are

## 7 Dependencies

See [packages.json](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/package.json)

## 8 Attributions and Works Cited

This list is not up-to-date, and will be updated once the tool enters a stable state.

- University of Toronto: igemwiki-api, used to automate uploads to iGEM wiki
  - Particularly, Julian Mazitelli for both creating the igemwiki-api and the original generator-igemwiki that ours is based on.
- iGEM Peshawar 2016: General information regarding wiki development

## 9 Contributing

If you're interested in JavaScript, Handlebars, Markdown, Webpack, templating libraries like Handlebars, view libraries like React.js or Angular, and the future of frameworks support the iGEM wiki, and would like to contribute to the tools used to make the `igemwiki` stack run, we welcome pull requests, issue submissiosn and emails at [virginia.igem@gmail.com](mailto:virginia.igem@gmail.com).

If you are on an iGEM team, helping us by submitting issues, or forking and pull requesting can count towards a collaboration for your team.

Links to repositories that make this tool work:

- The original [igemwiki-api](https://github.com/igemuoftATG/igemwiki-api), written by Toronto 2016's Julian Mazzitelli
  - Our fork of [igemwiki-api](https://github.com/Virginia-iGEM/igemwiki-api), which fixes a few bugs with Julian's code and may be pulled in the future. `igem-wikibrick` runs off of this library.
- [generator-igemwiki](https://github.com/Virginia-iGEM/generator-igemwiki), a Yeoman generator which depends on this tool.
