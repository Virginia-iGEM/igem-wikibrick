# igem-wikibrick migration guide

Regardless of whether you are migrating files from the igem wiki or local files on your computer that you have yet to turn into a wiki, we reccommend installing and running our [iGEM wiki generator](https://github.com/igemuoftATG/igemwiki-api), as suggested on the homepage for this tool. This will give you a skeleton wiki layout to work with.

Once you have this skeleton, you can pick and choose which files you would like to keep by moving them to the `app` folder and editing them as appropriate. For files you do not have yet, the skeleton should provide a good jumping off point. This should make migrating your existing project to the use of `igem-wikibrick` slightly more streamlined.

If you already have content on your wiki, things may be a bit more complicated for you. This will differ for every team, as iGEM wikis can be set up very differently from one another. To help you migrate (once you have Node.js installed), we first reccommend you install the [igemwiki-api](https://github.com/igemuoftATG/igemwiki-api) commandline tool, which will allow you to quickly download your existing wiki pages. This can be done with:  

`npm install -g igemwiki-api`  
Restart your terminal by closing the window or typing `exit` in the terminal, then run:  
`igemwiki backup -n [yourteamname] -y [yourteamyear]`

This will place all your existing wiki pages under a folder named `backup` in your current working directory.

## Wait... What if I'm using the iGEM template?

You can still use our tool for image uploading and HTML uploads, but I'm afraid we don't have a template that mirrors the iGEM template. It is likely entirely possible to create one, and we welcome you to add one to `generator-igemwiki` if you are up to the task, but as our team entirely ignored the template, we saw no reason to include it as part of the tool, especially considering that it changes every year.

If you have written HTML for use with the iGEM template, you'll likely be able to reuse that. However you will have to either find new stylesheets to use or create some yourself.