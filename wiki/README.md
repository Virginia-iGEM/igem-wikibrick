# Wiki

Contains all webcontent that will be found on http://2018.igem.org/Team:Virginia.

## Build

Our build system (will soon!) support two types of builds: A Development build and a Live build.

In order to build both, you will need to first install [Node.js](https://nodejs.org/), then install all Node packages listed under [Build Dependencies](https://github.com/Mantissa-23/VGEM-2018/tree/master/wiki#build-dependencies). This can be done by entering the following command in any console with npm on its path:  
`npm install -D bower gulp gulp-handlebars gulp-csso gulp-concat gulp-sourcemaps gulp-handlebars gulp-wrap gulp-declare gulp-igemwiki globby lodash bluebird handlebars igemwiki-api`

Development files can be built with the console command `gulp dev`. This will place a bunch of baked files, HTML, JS and CSS under `wiki/build`. These files can be directly opened by any modern web browser, yielding a 100% offline version of the wiki where all internal links should be traversible. This allows our team to work on the wiki without uploading to iGEM every time, reducing our iteration times and making things more efficient, as well as allowing us to work without a stable internet connection.

A live build can be published with `gulp live`. This will generate files almost identical to the development build, except for the fact that all image templates will be replaced with their URLs hosted on `2018.igem.org` instead of their local paths in the build direcotry. In addition to building these files, `gulp live` will also automatically initiate an upload of all compiled HTML, CSS and JS to `2018.igem.org/Team:Virginia`. You will need to enter your username and password for this to work, so don't just livebuild and leave.

## Todo

- Add bower, enabling bootstrap and future packages as managed dependencies
- Use Handlebars to establish local and web builds which correctly manage links to local/web images, CSS and JS

## Roadmap

1. Write an upload script using igemwiki-api to push all pages, images and other content to the iGEM wiki.
2. Create basic template using Codekit + Handlebars or some other build tool that can compile to working HTML for both the iGEM wiki and local machine testing.
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

## Interactive

This is an interactive presentation that gives the reader an intuition for what our device is doing. It goes fairly simply:

1. Start with an empty "petri dish" that looks like it's just part of the webpage. A little "click me" prompt gets the user to interact with it.
2. When the user clicks, they will add a single E. Coli, a CFU, to the dish
3. The user can then incubate the cell and it will divide to form a few cells
4. When the cells hit quorum, many will begin to flash a bright blue color to indicate their genes have been activated; but only about 50% will flash initially.
5. The user can then sterilize/clean the dish with a button, and switch to the Virginia iGEM quorum sensing genes
    - Maybe have a short animatic where the user transforms some bacteria
6. Upon redoing the experiment, they'll find that nearly all the bacteria flash
7. User is left to play around with the sandbox all they want. A little flashing blue arrow at the bottom of the game prompts them to scroll down to read about the project.

## Attributions and Works Cited

- University of Toronto: igemwiki-api, used to automate uploads to iGEM wiki
- iGEM Peshawar 2016: General information regarding wiki development

## Build Dependencies

- Node.js
- bower
- gulp
  - gulp-handlebars
  - gulp-csso
  - gulp-concat
  - gulp-sourcemaps
  - gulp-handlebars
  - gulp-wrap
  - gulp-declare
  - gulp-igemwiki
    - globby
    - lodash
    - bluebird
- handlebars
- igemwiki-api

## Live Dependencies

- JQuery
- Bootstrap 3.3.7
- Handlebars Minified Runtime
