# `igem-wikibrick` Tutorial

This tutorial is for first-time users who are setting up the igem-wikibrick tutorial and those who wish to learn the capabilities of the tool.

## 1 Table of Contents

- [**1 Table of Contents**](#1-table-of-contents)
- [**2 Setup**](#2-set-up)
  - [**2.1 For New Projects**](#2-1-For-New-Projects)
  - [**2.2 For Existing Projects**](#2-1-For-Existing-Projects)
- [**3 The Basics**](#3-the-basics)

## 2 Setup

This package requires [Node.js](https://nodejs.org/en/) to be installed. If you are a Windows or Mac user, you can download an installer from [here](https://nodejs.org/en/download/). If you are a Linux user, install the most recent version with your distro's package manager.

We also **strongly** reccommend having Git installed, and knowing how to use it to manage your project. Git can be downloaded installed from [here](https://git-scm.com/). Git-SCM has an excellent general introduction to git [here](https://git-scm.com/docs/gittutorial). We will later publish a tutorial on git workflow for iGEM teams.

### 2.1 For New Projects

In the future, `install.sh` and `install.bat` scripts will exist for Mac/Linux and Windows installation respectively.

In addition, we will have an example project that can be cloned from our Github page.

For now, follow the following instructions:

1. Create a new directory (a new folder) in a location where you would like to keep your project. Your Desktop, Documents, or a Project folder in your home folder are all appropriate locations.
2. Launch a terminal and navigate to this folder; for Windows users, use Powershell. This can be launched by typing `powershell` in the search bar. Linux users should use any modern terminal. Mac users, I reccommend [iTerm2](https://iterm2.com/)
3. Enter the following series of commands:

It's highly reccommended that you set up a git repository first with  
`git init`  

We also reccommend creating a GitHub page to share the repository among your team members. You can create an Organization Account for your iGEM team [here](https://github.com/organizations/new); instructions for creating a repository can be found [here](https://help.github.com/articles/create-a-repo/). **NOTE: DO NOT tick the 'Initialize this repository with a README' box so that you can push your local repository to GitHub.**

If creating a new project: `npm init`  
`npm install -g gulp@next bower`  
`npm install -D igem-wikibrick gulp@next bower string-format`  
`npm update` - May or may not be necessary due to [a bug with npm's package management](https://github.com/npm/npm/issues/1341).  
`cp node_modules/igem-wikibrick/config.js ./`  
`cp node_modules/igem-wikibrick/examples/gulpfile.js ./`

Now we're going to copy the example project from igem-wikibrick:  
`mkdir app`  
`cp -r node_modules/igem-wikbrick/app ./app`  

It is important to note that you will have to retype in `npm install` and `bower install` in the `igem-wikibrick` folder every time **packages change in the repository or you choose to clone the repository**. Otherwise, things will not work the way you want them to...which is bad.

### 2.2 For Existing Projects

If you already have content on your wiki, see the example project for how you would organize your HTML, Javascript and CSS. This will differ for every team as iGEM wikis can be set up very differently from one another.

If you already have webcontent that runs on your local machine or on a standard webserver, this webcontent should _just work_ when used with the tool, as the files are named correctly. Again, see the example project for file naming conventions and use of different kinds of files.

### 2.3 Set Up Autoupdate on Git Rewrite

**Optional, but _highly recommended_ (for your sanity):**

In the event that _either_ your or another team member installs new packages with `npm install` or `bower install`, you will have to run `npm update` or `bower update`. If you know that you're going to forget to type `npm update` and `bower update` every time this occurs (like me), you can add a _hook_ to your git repository that will automatically run these commands one a pull.

To do this, enter the folder `igem-wikibrick\.git\hooks`. It should look like this:

![set-up-1](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/docs/tutorial/set-up-1.PNG)

Note: the `.git` folder may not show up, as it may be a hidden folder. [This website](https://www.howtogeek.com/howto/windows-vista/show-hidden-files-and-folders-in-windows-vista/) shows you how to find it.

Once you're here, create a new file named `post-rewrite` with your favorite text editor and copy [this code](https://gist.github.com/digitaljhelms/7901283#file-post-rewrite) into that file.

Note, if a new version of `igem-wikbrick` is released, the tool can be updated with `npm update`.

## 3 The Basics

### Components

`gulpfile.js` is the main file that executes all the tasks that will build the wiki. There are two types of builds that the gulpfile can create, `live` and `dev`.

- `-l` will publish the build to the iGEM wiki website using `igemwiki-api`, made by Toronto iGEM.
- `-d` is used for developmental and debugging purposes and is a local copy of the wiki on your laptop that can be used to quickly make edits.

For more details, refer to the [Programmer's Guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide#3-high-level-architecture) for specific commands that can be used for each build.  

### Making edits   

So now that you have all these tools at your disposal, how do you get started on making that butt-kicking wiki design?

There are two folders in specific that you want to keep in mind when editing your webpage: `app` and `build`.

- `app` folder is where you will directly edit your respective .css, .html, etc. files.
- `build` folder is where all these changes will be reflected after you build your website. 

After you `gulp serve`, all your changes in the `app` folder will be reflected on the website immediately.
