# igem-wikibrick

## 1 Table of Contents

1. **Table of Contents**
2. **Tutorial**
3. **Description**
4. **Todo**
5. **Attributions, Dependencies and Works Cited**

## 2 Tutorial

See [igem-wikibrick tutorials, examples and templates](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/tutorial). The tutorial contained therein is aimed at individuals who may have never worked with webdevelopment before.

## 3 Programmer's Guide

See [programmer's guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide). This is a more technical document containing information on the architecture of igem-wikibrick, and is valuable both for new users trying to get a deeper understanding of how the tool works and how to modify it, as well as for well-versed developers who have no need of an introduction, and are looking to modify the tool for their own use as quickly as possible.

## 4 Description

**Warning: igem-wikibrick is currently under active development and is not yet working as intended. The package should be functional by early July; contact dtc9bb@virginia.edu for further information, questions, and concerns. Use at your own risk.**

`igem-wikibrick` is an open-source Node.js package, build system and/or template for iGEM teams that automates the creation of iGEM wiki pages. It is a significant improvement over the Mediawiki in-browser page editors and enables teams to rapidly iterate on their wiki design and style and incorporate automated build tasks into their workflow, allowing the entire team to contribute to the wiki, using the full benefits of version control and automated builds. Using the tool requires a cursory understanding of web development; however, the tool is designed to easily incorporate workflows from other parts of the team, enabling team members of a non-CS background to easily contribute.

The tool was built because our team wanted to design an award-winning _website,_ not just a collection of Mediawiki pages, as we wanted access to the same tools any modern web developer would use. This would allow us to iterate faster and use styling packages and tools like [SASS](https://sass-lang.com/), [Bouboun](https://www.bourbon.io/) and [Neat](https://neat.bourbon.io/), and Javascript libraries like [ImpactJS](http://impactjs.com/). We wanted to write our code on our own computers with our own text editors, and we didn't want to waste time hand-uploading every single image and copy-pasting every page that would end up on our wiki. Every member of our wiki team wears at least 3 hats, so we needed to work on the wiki efficiently so we would have time for other parts of the project.

Our goal in building this tool was to enable us to create an iGEM website that would tell our team's story, and we'd like to share this tool with other teams who have the same goal.

Some features:

- **Command line-based, no-hassle build tool.** Write and test all of your HTML, CSS and JS on your own machine. Once installed, the command `gulp serve` runs a local webserver that will update when any changes are made to your project. Change your stylesheets or page layout, save your changes, and see the changes instantly. No messing around with a _save page_ button or working in a text editor without syntax highlighting or autocompletion.
- **URL Substitution, automated uploads.** What happens when you want to see your changes on your iGEM Wiki page? Once correctly configured, the command `gulp publish` will intelligently modify any relative URLs in your HTML files to be absolute, pointing to the correct locations on the iGEM wiki, before sending all your files to those locations using an API developed by Toronto's iGEM team, `igemwiki-api`. In under a minute, all of your content, images, stylesheets and scripts will be available, live, on your iGEM Wiki.
- **Flexible Build and Package support.** Becuase we're using `gulp`, a Node.js based task automation tool, you can add thousands of gulp plugins and Node.js modules to your wiki to do all the things you ever wished you could. Want to use more advanced templating to reuse as much code as you can? `npm install -D gulp-handlebars`. Want an interactive experience that teaches your users how your project works? `npm install -D impactjs`. Want fluid, scriptable animations that react to the user? `npm install -D createjs-tweenjs`. You have access to literally the largest repository of open source packages in existence, `npm`, with over 350,000 packages.
- **Markdown, Google Docs and Word Document Conversion [UNDER CONSTRUCTION].** Are you the only programmer on your team? Worse yet, are you _not a programmer at all,_ but you bit the bullet and volunteered to spearhead your team's wiki? Either way, `igem-wikibrick`'s got your back. (Future) integration of Markdown and word processor document compiling will make incorporating your teammates' work into the wiki seamless and easy.

## 5 Todo

### Known Issues

- `gulp publish` sometimes doesn't perform the URL replace. Reason is unknown; workaround is to enter `gulp live build` then `gulp live push:content` following a `gulp pulish` that fails to rewrite relative URLs.
- Upload timeouts will _sometimes_ throw large, verbose errors that aren't caught by our error handling code.
  - Same for login timeouts
  - Fork igemwiki-api and modify line ~90 of upload.js to correctly catch timeout errors instead of erroring out before... Continuing execution on user input.

### 5.1 High Priority

- Update tutorials to reflect Build-Tool's current state
- Automatically prepend watermark/license to the beginning of every file produced with the tool. Something along the lines of "THIS FILE WAS PRODUCED WITH [BUILD-TOOL-NAME], DEVELOPED BY THE VIRGINIA 2018 IGEM TEAM MEMBERS [WIKI TEAM MEMBERS]"
- Check for imagemap.json's existence before reading it, or try/catch the error that is produced when it doesn't exist. Tell user to `push:images` or `publish` before `live build`ing in error message instead of just vomiting exceptions.

### 5.2 Medium Priority

- Added error-checker that asks the user if they want to upload `dev` build files to the iGEM wiki, instead of just blindly uploading them. Should probably use a `lock` file of some kind under the `build` directory that indicates what the last build environment was.
- Modify `gulpfile.js` so that separate directories, `build-dev` and `build-live` are created for each respective build.
  - Modify `gulpfile.js` so that the `default` task runs both `dev` and `live` builds independently, pushing them into to `bulid-dev` and `build-live` respectively.
- Fix MathJax with [#10 - Misc from this article](https://2016.igem.org/Team:Peshawar/Wiki)
- Modify dev/html.js so that it also accepts markdown files.
  - The code's there, just commented out; need to keep markdown processor from mangling `<!DOCTYPE>` tag.
  - Should probably compile markdown files exclusively and load them in using templates.
  - Also add Google Drive support?

### 5.3 Low Priority

- Wrap the whole tool in a custom commandline tool
- Create shell scripts (`.sh`, `.bat` files) that automatically install Node.js and all required npm and bower dependencies for team members and future teams.
  - Add git hook that causes an npm install and bower install on package.json or bower.json change.
  - Must be added on a repository-by-repository basis
- Pick a JavaScript styleguide, fix the awful inconsistencies in style to adhere to it.
  - Standardize variable and function naming schemes.
  - Should probably 'use strict'.
- Replace bower with npm or yarn for managing live dependencies.

### 5.4 Questionable Value

- Eliminate synchronous file read in gulp task live/push.js
  - JSON.parse is synchronous anyways, so will need a different JSON library?
- Update build-tool so that it scans for existing files and whether or not their srcs have changed under `./build` before building. Would need some kind of hash of each file, or a look at the date-last-changed.
  - Probably not that necessary, just more work for little gain considering how fast builds are

## 6 Dependencies

### 6.1 Build Dependencies

See [packages.json](https://github.com/Virginia-iGEM/2018-wiki/blob/master/package.json)

### 6.2 Live Dependencies

See [bower.json](https://github.com/Virginia-iGEM/2018-wiki/blob/master/bower.json)

## 7 Attributions and Works Cited

This list is not up-to-date, and will be updated once the tool enters a stable state.

- University of Toronto: igemwiki-api, used to automate uploads to iGEM wiki
- iGEM Peshawar 2016: General information regarding wiki development
