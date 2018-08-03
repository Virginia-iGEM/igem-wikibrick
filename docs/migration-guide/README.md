# igem-wikibrick migration guide

This is a short set of suggestions and instructions for migrating existing iGEM Wikis or webcontent to use of the igem-wikibrick tool.

### 2.2 First Steps for Existing Projects

If you already have content on your wiki, see the example project for how you would organize your HTML, Javascript and CSS. This will differ for every team, as iGEM wikis can be set up very differently from one another. To help you migrate (once you have Node.js installed), you can install the igemwiki-api commandline tool, which will allow you to quickly download your existing wiki pages. This can be done with:  
`npm install -g igemwiki-api`  
Restart your terminal by closing the window or typing `exit` in the terminal, then run:  
`igemwiki backup -n [yourteamname] -y [yourteamyear]`

This will place all your existing wiki pages under a folder named `backup` in your current working directory. From here, you can pick and choose which files you would like to keep by moving them to the `app` folder. This should make migrating your existing project with the use of `igem-wikibrick` slightly more streamlined.

If you already have webcontent that runs on your local machine or on a standard webserver, this webcontent should _just work_ when used with the tool, as the files should be named correctly. Again, see the example project for file naming conventions and use of different kinds of files.

Regardless, the same steps for a new project can be used for an existing project. Omit `npm init` if you already have a `package.json` file in your project's root directory. Omit `git init` if you are already using git.