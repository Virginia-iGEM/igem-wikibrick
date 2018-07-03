# `igem-wikibrick` Tutorial

This tutorial is for first-time users who are setting up the igem-wikibrick tutorial and those who wish to learn the capabilities of the tool. 

## 1 Table of Contents
1. [**Table of Contents**](#1-table-of-contents)
2. [**Set Up**](#2-set-up)
3. [**The Basics**](#3-the-basics)

## 2 Set Up

**Update**: As of now, we're still working on a bash script for easy installation of all the necessary packages for the tool, so once that's finished, feel free to use that. 

For now, install [Node.js](https://nodejs.org/en/) and all the Node packages listed under the [Build Dependencies](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/package.json) if you have not already. You can either download Node.js from the website or hop to the terminal, `cd` into where your `igem-wikibrick` folder is located, and type in the following commands:

`npm install`   

`bower install`

It is important to note that you will have to retype in `npm install` and `bower install` in the `igem-wikibrick` folder every time **packages change in the repository or you choose to clone the repository**. Otherwise, things will not work the way you want them to...which is bad.

### Optional, but *highly recommended* (for your sanity):

_Altenatively_, if you know that you're going to forget to type `npm install` and `bower install` every time this occurs (like me), go into the folder `igem-wikibrick\.git\hooks`. It should look like this: 

![set-up-1](https://github.com/Virginia-iGEM/igem-wikibrick/blob/master/docs/tutorial/set-up-1.PNG)

Note: the `.git` folder may not show up, as it may be a hidden folder. [This website](https://www.howtogeek.com/howto/windows-vista/show-hidden-files-and-folders-in-windows-vista/) shows you how to find it. 

Once you're here, create a new file named `post-rewrite` and copy [this code](https://gist.github.com/digitaljhelms/7901283#file-post-rewrite) into that file. 

## 3 The Basics

### Components

`gulpfile.js` is the main file that executes all the tasks that will build the wiki. There are two types of builds that the gulpfile can create, `live` and `dev`. 
- `live` will publish the build to the iGEM wiki website using `igemwiki-api`, made by Toronto iGEM.   
- `dev` is used for developmental and debugging purposes and is a local copy of the wiki on your laptop that can be used to quickly make edits.   

For more details, refer to the [Programmer's Guide](https://github.com/Virginia-iGEM/igem-wikibrick/tree/master/docs/programmers-guide#3-high-level-architecture) for specific commands that can be used for each build.  

### Making edits   

So now that you have all these tools at your disposal, how do you get started on making that butt-kicking wiki design?   

There are two folders in specific that you want to keep in mind when editing your webpage: `app` and `build`. 
- `app` folder is where you will directly edit your respective .css, .html, etc. files.
- `build` folder is where all these changes will be reflected after you build your website. 

After you `gulp serve`, all your changes in the `app` folder will be reflected on the website immediately.





