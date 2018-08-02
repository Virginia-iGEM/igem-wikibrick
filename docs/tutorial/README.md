# `igem-wikibrick` Tutorial

This tutorial is for first-time users who are setting up the igem-wikibrick tool and those who wish to learn the capabilities of the tool.

Note that `igem-wikibrick` is a Command Line Interface (CLI), and so requires use of a console, or terminal. For many, consoles are intimidating tools; like any new tool, be patient, willing to learn and remember that Google is your best friend.

## 1 Table of Contents

- [**1 Table of Contents**](#1-table-of-contents)
- [**2 Setup**](#2-set-up)
  - [**2.1 For New Projects**](#2-1-For-New-Projects)
  - [**2.2 For Existing Projects**](#2-1-For-Existing-Projects)
- [**3 The Basics**](#3-the-basics)

## 2 Setup

This package requires [Node.js](https://nodejs.org/en/) to be installed. If you are a Windows or Mac user, you can download an installer from [here](https://nodejs.org/en/download/). If you are a Linux user, install the most recent version with your distro's package manager.

We also **strongly** reccommend having Git installed, and knowing how to use it to manage your project. Git can be downloaded installed from [here](https://git-scm.com/). Git-SCM has an excellent general introduction to git [here](https://git-scm.com/docs/gittutorial). We will later publish a tutorial on git workflow for iGEM teams.

### 2.1 First Steps for New Projects

> In the future, `install.sh` and `install.bat` scripts will exist for Mac/Linux and Windows installation respectively.  
> In addition, we will have an example project that can be cloned from our Github page.

For now, we have step-by-step instructions.

Create a new directory (a new folder) in a location where you would like to keep your project. Your Desktop, Documents, or a Project folder in your home folder are all appropriate locations. Make sure to name your directory something easy to remember. 

Launch a terminal and navigate to this folder; for Windows users, use Powershell. This can be launched by typing `powershell` in the search bar. Linux users should use any modern terminal emulator. For Mac users, I recommend [iTerm2](https://iterm2.com/). 

![2-1a](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/docs/tutorial/2-1a.PNG)
*What Powershell looks like in Windows. It may look different for Linux and Mac users.*

If you have never used a terminal before, the following commands can get you pretty far:  
- `dir` for Windows or `ls` for Unix: List all files and folders in your current directory. A regular terminal will launch in your Home directory, `C:\Users\<your-username>\` in Windows or `/home/<your-username>` in Unix.  
- `cd [dirname]`: Stands for change directory. Type in `cd Documents`, for example, to enter your Documents folder. `cd ..` will take you back to the parent directory.  
- `mkdir [dirname]`: Creates a new folder with dirname. In order to create a folder with spaces in the name, it should be encapsulated in double quotes, I.E. `mkdir "My iGEM Folder"`.  
- `exit` to safely close your terminal without interrupting any processes.  

These commands should get you pretty far; further details can be found by entering `[commandname] --help` or `man [commandname]` on Unix. Google is your best friend if you want to know more.

![2-1b](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/docs/tutorial/2-1b.PNG)    
*An example of some commands that can be run in the terminal.*

In addition to use of this tool, we recommend creating a GitHub page to share the repository among your team members. You can create an Organization Account for your iGEM team [here](https://github.com/organizations/new); instructions for creating a repository can be found [here](https://help.github.com/articles/create-a-repo/). **NOTE: DO NOT tick the 'Initialize this repository with a README' box so that you can push your local repository to GitHub.**

Enter the following series of commands to download the `igem-wikibrick`: 

If creating a new project:  
`npm init`  
`npm install -g gulp@next bower`  
`npm install -D igem-wikibrick gulp@next bower string-format`  
`bower install jquery`
`npm update` - May or may not be necessary due to [a bug with npm's package management](https://github.com/npm/npm/issues/1341).  
`cp node_modules/igem-wikibrick/config.js ./`  
`cp node_modules/igem-wikibrick/gulpfile.js ./`

Now we're going to create a folder called `app` and copy the example project from igem-wikibrick:  
`mkdir app`  
`cp -r node_modules/igem-wikbrick/app ./app`  

It is important to note that you will have to retype in `npm install` and `bower install` in the `igem-wikibrick` folder every time **packages change in the repository or you choose to clone the repository**. Otherwise, things will not work the way you want them to...which is bad.

### 2.2 First Steps for Existing Projects

If you already have content on your wiki, see the example project for how you would organize your HTML, Javascript and CSS. This will differ for every team, as iGEM wikis can be set up very differently from one another. To help you migrate (once you have Node.js installed), you can install the igemwiki-api commandline tool, which will allow you to quickly download your existing wiki pages. This can be done with:  
`npm install -g igemwiki-api`  
Restart your terminal by closing the window or typing `exit` in the terminal, then run:  
`igemwiki backup -n [yourteamname] -y [yourteamyear]`

This will place all your existing wiki pages under a folder named `backup` in your current working directory. From here, you can pick and choose which files you would like to keep by moving them to the `app` folder. This should make migrating your existing project with the use of `igem-wikibrick` slightly more streamlined.

If you already have webcontent that runs on your local machine or on a standard webserver, this webcontent should _just work_ when used with the tool, as the files should be named correctly. Again, see the example project for file naming conventions and use of different kinds of files.

Regardless, the same steps for a new project can be used for an existing project. Omit `npm init` if you already have a `package.json` file in your project's root directory. Omit `git init` if you are already using git.

### 2.3 Set Up Autoupdate on Git Rewrite

**Optional, but _highly recommended_ (for your sanity):**

In the event that _either_ your or another team member installs new packages with `npm install` or `bower install`, you will have to run `npm update` or `bower update`. If you know that you're going to forget to type `npm update` and `bower update` every time this occurs (like me), you can add a _hook_ to your git repository that will automatically run these commands one a pull.

To do this, enter the folder `igem-wikibrick\.git\hooks`. It should look like this:

![set-up-1](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/docs/tutorial/set-up-1.PNG)

Note: the `.git` folder may not show up, as it may be a hidden folder. [This website](https://www.howtogeek.com/howto/windows-vista/show-hidden-files-and-folders-in-windows-vista/) shows you how to find it.

Once you're here, create a new file named `post-rewrite` with your favorite text editor and copy [this code](https://gist.github.com/digitaljhelms/7901283#file-post-rewrite) into that file.

Note, if a new version of `igem-wikbrick` is released, the tool can be updated with `npm update`.

### 2.4 Configuration

Once you've set up, we need to make a few changes before the tool is ready to go.

Open `config.js` and modify the following lines:

```
20     const teaminfo = {
21         year: 2018,
22         teamName: 'Virginia'
```

Enter your team name and year. The team name _must_ match your team name as registered on the iGEM wiki _exactly,_ including case. Note that this file contains most configurable settings for the tool; as you use it more, you will come to understand what each of these entries means and how they modify the way the tool works. For now, this is all you need to modify.

## 3 Workflow

### 3.1 Building

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

### 3.2 Publishing

Once you are satisfied with the way your wiki pages looking, the pages, including HTML, JavaScript, CSS, images, and any packages installed with Bower can be built and uploaded with `gulp publish -l`.

This command is a shortcut for the following series of commands:

- `gulp push:images -l`: This command will upload all images under `build/images` to igem.org, under your team's name. This upload must come first because it saves the URLs of all uploaded images, which are not predictable before the upload actually occurs. These URLs will be saved under `build/imagemap.json`, which will be read during the next step to perform URL substitution.
- `gulp build -l`
- `gulp push:content -l`

## 4 Project Organization

To better understand how to use the tool, let's look at the folder structure of Virginia 2018's wiki. Note that if you have copied the example project, only the `app` folder and certain files will show up in your directory; this is fine. The existence of most directories are explained below; if you would like to explore them further in a working project, you can visit our wiki's GitHub page at https://github.com/Virginia-iGEM/2018-wiki.

### 5.1 Overall Structure

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

### 5.2 igem-2018-wiki/app

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

### 5.3 igem-2018-wiki/build

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
