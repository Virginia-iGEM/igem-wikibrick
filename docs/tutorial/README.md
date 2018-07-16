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

Create a new directory (a new folder) in a location where you would like to keep your project. Your Desktop, Documents, or a Project folder in your home folder are all appropriate locations.

Launch a terminal and navigate to this folder; for Windows users, use Powershell. This can be launched by typing `powershell` in the search bar. Linux users should use any modern terminal emulator. For Mac users, I reccommend [iTerm2](https://iterm2.com/). If you have never used a terminal before, the following commands an get you pretty far:  
`dir` for Windows or `ls` for Unix: List all files and folders in your current directory. A regular terminal will launch in your Home directory, `C:\Users\<your-username>\` in Windows or `/home/<your-username>` in Unix.  
`cd [dirname]`: Stands for change directory. Type in `cd Documents`, for example, to enter your Documents folder. `cd ..` will take you back to the parent directory.  
`mkdir [dirname]`: Creates a new folder with dirname. In order to create a folder with spaces in the name, it should be encapsulated in double quotes, I.E. `mkdir "My iGEM Folder"`.  
`exit` to safely close your terminal without interrupting any processes.  
These commands should get you pretty far; further details can be found by entering `[commandname] --help` or `man [commandname]` on Unix. Google is your best friend if you want to know more.

In addition to use of this tool, we reccommend creating a GitHub page to share the repository among your team members. You can create an Organization Account for your iGEM team [here](https://github.com/organizations/new); instructions for creating a repository can be found [here](https://help.github.com/articles/create-a-repo/). **NOTE: DO NOT tick the 'Initialize this repository with a README' box so that you can push your local repository to GitHub.**

Enter the following series of commands, omitting any commands starting with `git` if you are not using Git, or are using another version control system.

If creating a new project: `npm init`  
`npm install -g gulp@next bower`  
`npm install -D igem-wikibrick gulp@next bower string-format`  
`bower install jquery`
`npm update` - May or may not be necessary due to [a bug with npm's package management](https://github.com/npm/npm/issues/1341).  
`cp node_modules/igem-wikibrick/config.js ./`  
`cp node_modules/igem-wikibrick/gulpfile.js ./`

Now we're going to copy the example project from igem-wikibrick:  
`mkdir app`  
`cp -r node_modules/igem-wikbrick/app ./app`  

It is important to note that you will have to retype in `npm install` and `bower install` in the `igem-wikibrick` folder every time **packages change in the repository or you choose to clone the repository**. Otherwise, things will not work the way you want them to...which is bad.

### 2.2 First steps for Existing Projects

If you already have content on your wiki, see the example project for how you would organize your HTML, Javascript and CSS. This will differ for every team as iGEM wikis can be set up very differently from one another. To help you migrate, once you have Node.js installed, you can install the igemwiki-api commandline tool, which will allow you to quickly download your existing wiki pages. This can be done with:  
`npm install -g igemwiki-api`  
restart your terminal, then run  
`igemwiki backup -n [yourtamname] -y [yourteamyear]`

This will place all your existing wiki pages under a folder named `backup` in your current working directory. This should make migrating to use of `igem-wikibrick` slightly more streamlined.

If you already have webcontent that runs on your local machine or on a standard webserver, this webcontent should _just work_ when used with the tool, as the files are named correctly. Again, see the example project for file naming conventions and use of different kinds of files.

Regardless, the same steps for a new project can be used for an existing project. Omit `npm init` if you already have a `package.json` file in your project's root directory. Omit `git init` if you are already using git.

### 2.3 Set Up Autoupdate on Git Rewrite

**Optional, but _highly recommended_ (for your sanity):**

In the event that _either_ your or another team member installs new packages with `npm install` or `bower install`, you will have to run `npm update` or `bower update`. If you know that you're going to forget to type `npm update` and `bower update` every time this occurs (like me), you can add a _hook_ to your git repository that will automatically run these commands one a pull.

To do this, enter the folder `igem-wikibrick\.git\hooks`. It should look like this:

![set-up-1](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/docs/tutorial/set-up-1.PNG)

Note: the `.git` folder may not show up, as it may be a hidden folder. [This website](https://www.howtogeek.com/howto/windows-vista/show-hidden-files-and-folders-in-windows-vista/) shows you how to find it.

Once you're here, create a new file named `post-rewrite` with your favorite text editor and copy [this code](https://gist.github.com/digitaljhelms/7901283#file-post-rewrite) into that file.

Note, if a new version of `igem-wikbrick` is released, the tool can be updated with `npm update`.

## 3 Project Organization

To better understand how to use the tool, let's look at the folder structure of Virginia 2018's wiki. Note that if you have copied the example project, only the `app` folder and certain files will show up in your directory; this is fine. The existence of most directories are explained below; if you would like to explore them further in a working project, you can visit our wiki's GitHub page at https://github.com/Virginia-iGEM/2018-wiki.

### 3.1 Overall Structure

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

### 3.2 igem-2018-wiki/app

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

### 3.3 igem-2018-wiki/build

This directory will be created and populated once you start using the tool, and is explained in the next section. If you have just duplicated the example project, it should not yet exist and will be created automatically for you as you continue.

### 3.3 igem-2018-wiki/docs

This is a folder for placing developer documentation. We use it for storing tutorials for internal team use as well as developer notes.

### 3.4 igem-2018-wiki/gulp

This folder contains any user-written gulpfiles. These files are explained in detail in the [Programmer's Guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide); if you are interested in modifying the build pipeline using custom `gulp` plugins or other Node.js packages, look here. Otherwise this directory is unnecessary.

### 3.5 igem-2018-wiki/bower_components and igem-2018-wiki/bower.json

`bower_components` contains all live dependencies, and will be populated when running `bower install`. Any packages installed with `bower` will be wrapped up and uploaded to igem.org.

### 3.6 igem-2018-wiki/node_modules, igem-2018-wiki/package.json and igem-2018-wiki/package-lock.json

`node_modules` and the two json files belong to `Node.js` and `npm`. `node_modules` is similar to `bower_components`; it contains all packages and their dependencies that are installed via `npm install`. `package.json` contains a list of these dependencies so they can be quickly installed by other team members cloning the repository via the command `npm install`. It also contains metadata regarding your project, such as version, author, license, name and description. `package-lock.json` contains a record of all installed packages and prevents dependency conflicts; you won't have to worry about this last file.

### 3.7 igem-2018-wiki/gulpfile.js

This file contains all of your `gulp tasks`. These will also be explored in the next section; it is a short file that contains references to tasks defined by `igem-wikibrick`, and where you can define additional build tasks, or overwrite ones defined by `igem-wikibrick`.

### 3.8 LICENSE

This is just a plaintext file containing your open source license. This license defines what other people can legally do with your code.

### 3.9 README.md

This file will be displayed on your GitHub page, and should be used to direct teammembers and other visitors to where they need to go. There's a good likelihood that this page, the one you're reading right now, is a README.md file host on GitHub.

### 4 Workflow

TODO