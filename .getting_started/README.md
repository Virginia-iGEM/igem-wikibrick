# 1 Gitting Started!

This is a quick primer, primarily aimed at individuals who have little to no experience with programming on how to use Git and Github. It’s also for programmers who have never used it before, have tried and failed to use it before, or haven’t used it in ages and need a refresher.

For those who have used version control before, or are using it now, or are very confident in their understanding of programming concepts, please look at the official [Getting Started guide](https://git-scm.com/book/en/v1/Getting-Started) published by the developers of Git. Additionally, if you have questions or are interested in the more advanced features of Git, feel free to reference this document as it’s quite comprehensive.

If you have any questions, feel free to shoot me a private message in GroupMe or email Dylan Culfogienis at dtc9bb@virginia.edu. Or just, y’know, talk to me, I don’t bite.

# 2 Table of Contents

1. [Gitting Started](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#1-gitting-started)
2. [Table of Contents](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#2-table-of-contents)
3. [What is Github](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#3-what-is-github)
4. [Git GUI Tutorial](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#4-git-gui-tutorial)
5. [Git Terminal Tutorial](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#6-quick-tutorial-if-you-want-to-use-the-command-prompt-instead-of-the-git-gui)
6. [Why don't we just use Google Drive](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#5-why-dont-we-just-use-google-drive)

# 3 What is Github

[Github](https://github.com) is a source code repository hosting and sharing website that makes use of the Git Version Control System (Git VCS). In layman's terms, it’s kinda like Google Drive, but specifically meant for open-source, code-centric software projects that many people will be working on at once. Some projects that are hosted on Github include Linux, the Python programming language, and a majority of the code that makes websites like Facebook, Twitter, Google and Youtube run.

If you don’t care about how Git/Github works and just want to get work done, just read [Section 4, Git GUI](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#4-git-gui-tutorial). If you're comfortable with using a terminal, or are willing to learn (it's really not that hard), check out [Section 5, Git Termianl](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#5-git-terminal-tutorial). The terminal makes more sense generally and allows you to move a bit faster. If you’re miffed that you have to learn how to use another damn program and/or are curious about how Git works and why we’re using it, you should probably read [Section 5 first, Why don’t we just use Google Drive](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#6-why-dont-we-just-use-google-drive).

# 4 Git GUI Tutorial

If you have any trouble with any of these steps, please do not slam your face against your desk and try to fix things for hours. Talk to me. Setup should only take 5 minutes. Committing and pushing changes should take about 20 seconds. If it’s taking longer than this, I’ll sit down with you and work you through it, or answer any questions you have.

## 4.1 Getting set up
Step 1, for most people, download Git from the official website: https://git-scm.com/downloads.

Note, this guide assumes you are on Windows and using the graphical Git program. Mac and Linux users should be able to follow the guide, as the program is cross-platform; let me know if you have issues. If you want to use Git integrated with your IDE, or through the commandline, I'll sit down with you and try and help, but you're mostly on your own. Google is your best friend.

Step 2, launch Git GUI through your start menu. Alternatively, you can right click on empty space on your desktop and click Git GUI Here. This should open a window that looks like this:

![setup-2](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Setup-2.png)

Step 3, in the case of our project, you’ll want to click Clone Existing Repository.

![setup-3](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Setup-3.png)


Then enter https://github.com/Mantissa-23/VGEM-2018.git into the Source Location field and a new folder of your choosing under Target Directory. You can of course use the Browse button to do this.

![setup-3-1](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Setup-3-1.png)

If you get the following error:

![setup-3-2](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Setup-3-2.png)

Or some such, it’s because the Target Directory must include the name of a nonexistant folder. This is the folder the project will be cloned into, and the program will automatically create it. So instead of entering, say, `C:\Users\DylanC`, try `C:\Users\DylanC\iGEM_Project` or `C:\Users\DylanC\VGEM-2018` or something like that.

Congrats, you’re almost there! You should see the following window if you were successful:

![setup-3-4](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Setup-3-4.png)

Step 4: So, that’s not it; there’s some administrative stuff you need to take care of. First, go to [github.com](https://github.com/join?source=header-home) and sign up for an account. This is free, do not pay them any money, all of the plans are for companies and large teams. Once you’ve done that, email me/text me **your full username you signed up with on Github**. It is important that this is correct, as it is the name/address I will use to add use to the project as a collaborator.

Step 5: While I’m adding you to the project (this may take some time), you’re gonna want to set up your local Git program. Mouse up to the top menu and click on Edit > Settings. This will open the following mess of a window:

![setup-5](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Setup-5.png)

There is a lot of stuff here that you don’t have to worry about. If you know what all these words mean, good for you. If you want to change them, and you know what you are doing, feel free to change them. If you don’t know what you’re doing, there’s only two fields you want to touch:

![setup-5-1](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Setup-5-1.png)

Change these to the user name you created for Github and the email address you signed up with, then click **Save**. That’s all the setup you have to do, after you’ve done that, **and once I’ve added you to the project and sent you a message confirming this**, you’re ready to commit changes to the repo.

[setup-2]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Setup-2.png "setup-2"
[setup-3]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Setup-3.png "setup-3"
[setup-3-1]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Setup-3-1.png "setup-3-1"
[setup-3-2]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Setup-3-2.png "setup-3-2"
[setup-3-4]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Setup-3-4.png "setup-3-4"
[setup-5]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Setup-5.png "setup-5"
[setup-5-1]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Setup-5-1.png "setup-5-1"

## 4.2 How do I do work

Alright, you’ve got everything set up, let’s get some actual work done. Editing code is something you do on your own, Git is not an IDE, Git is not a text editor. Pop open Visual Studio or Pycharm or Eclipse or Notepad++ or Vim or EMACS or whatever you use to edit text files. Please do not use Word to edit text files. That is not okay. Enter the project and make whatever changes you want to make. In this example, I’m going to add a simple Python program, hello_world_dtc.py, to the directory /test/ in the project:

![work-1](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-1.png)
![work-2](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-2.png)

The content of the program is as follows:

![work-3](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-3.png)

Aaaaand confirming the program works:

![work-4](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-4.png)

Cool. While in the same directory, right click on empty space and hit Git GUI Here. 

![work-5](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-5.png)

If you still have the window open from setup, you can just use that, it’s the same window. **If you have the window open from last time, hit Rescan. You will want to press this button every time you make any changes and want to commit them. If you do not press it, changed files will not show up in the interface.**

![work-6](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-6.png)

Notice your changed file listed under test/hello_world-dtc.py. This indicates that Git sees your changes. If you want, you can click on this file. It will show you what changes were made.

![work-7](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-7.png)

This part is optional. Once you have your files you want to commit, go ahead and click on the **Stage Changed** button.

![work-8](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-8.png)

This will move your file to the Staged Changes list. This means that the file will be part of the next commit. A commit is simply a collection of changes to various files that Git keeps track of. You can change as many or as few files as you want, create or delete files. Git will keep track of the changes.

Once you have staged your change, type in a commit message in the text box. This message should be under 72 characters in length, so pretty short. If you need to include more information, hit enter twice and include it as a short bulleted list, or a paragraph.

Commit messages should succinctly summarize what changes were made during the commit. If you find yourself writing commit messages longer than 72 characters, you should make your commits smaller. One commit should correspond to one unitary “change.” It doesn’t really matter how many lines of code you wrote - be it 1 or 1000 (probably skewed towards 1 though). A general rule of thumb is that someone reading your commit message, who is familiar with the project, should be able to immediately tell what you changed and why.

Note that you do not need to include a list of files you modified, your name, the date, or anything like that when writing this message. Git does this for you. You only need an executive summary.

![work-9](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-9.png)

Alright, you’re ready to commit. As you might guess, press the **Commit** button. Note the little message at the bottom saying that a commit was created, including the name of the hash and the commit message.

![work-10](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-10.png)

Create as many commits as you would like for all of the changes you’ve made. Once you’re “done working,” I.E. you’re not going to work on this any more for the day, you’re going to bed, you’re going to grab lunch and come back, etc. etc., it’s a good idea to **Push**.

![work-11](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-11.png)

This will open this window. Select the branch you’ve been working on; generally this will be **master**. Do not tick any of the boxes under Transfer Options unless you know what you’re doing. This is actually a good time to bring something up - if you ever see a tickbox or a button that has the word **Force** in it, you should think long and hard before you press it. Ask me, look up the consequences, do both. The word **Force** in Git generally corresponds to permanent deletion of repository history that may not be recoverable. This means you can accidentally delete the whole project. This is not disastrous, because Git is very robust, and the project can be restored from local copies - however, it will make me and other people working on it angry, waste time, and may result in lost data. Do not **Force** things unless you know what you’re doing.

Note, you may have to log in to the repository at this point. As you may guess, enter your username and password. You should not have to login at all after this - Github will remember that you accessed it from your current machine. This also means that you have to keep your machine safe - otherwise people can come in and do nasty things to the repo.

Once you hit **Push**, a small window will pop up showing some logs:

![work-12](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-12.png)

And now your changes are out there, on our Github page. You can view the current state of the repository at https://github.com/Mantissa-23/VGEM-2018, where you can browse through the project and find your files, if you so choose.

![work-13](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-13.png)
![work-14](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Work-14.png)

If you look at the repository now, you should be able to see the changes I’ve made already there. If you’ve followed this tutorial, you should also be able to see your own changes.

And that’s the basics of how you work with Git. You may notice there are about 5 billion other settings and buttons and option menus and commands that you have access to. You may also not notice these things, because some functionality of Git is only available through the command line. These are all advanced functions often related to project management, and so it’s all junk I have to deal with. Regardless, if you’re curious about a certain function or command, feel free to ask. I normally used commandline Git, so if I missed anything in this tutorial that you’re seeing and I’m not, please let me know.

[work-1]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-1.png "work-1"
[work-2]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-2.png "work-2"
[work-3]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-3.png "work-3"
[work-4]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-4.png "work-4"
[work-5]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-5.png "work-5"
[work-6]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-6.png "work-6"
[work-7]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-7.png "work-7"
[work-8]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-8.png "work-8"
[work-9]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-9.png "work-9"
[work-10]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-10.png "work-10"
[work-11]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-11.png "work-11"
[work-12]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-12.png "work-12"
[work-13]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-13.png "work-13"
[work-14]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Work-14.png "work-14"

## 4.3 Pulling Changes
You probably won't have to do this any time soon, so you may want to refer back to this section later once everyone starts working on the codebase.

In the event that someone else makes changes while you are making changes, and that person commits those changes to their repository and pushes those changes to Github (this is more common than you think), you will have to **Fetch** their changes from the remote repository, **Merge** them together in a new commit (called a Merge commit), and then push your changes combined with theirs to the repository. This combined **Fetch** + **Merge** operation is called a **Pull.** Confusing terminology, I know. Trust me, that's like, child's play, there are also commands called **Cherrypick** and **Rebase,** I still have no idea what they do.

Anyways, to do this, you're going to want to mouse over to `Remote > Fetch From > origin`. A small log window should appear and read successful.

> If this option does not exist, hit `Remote > Add...`, name it `origin` and set the location to https://github.com/Mantissa-23/VGEM-2018.git. 

Now you need to **Merge.** To do this mouse over to `Merge > Local Merge`, and select the name of the branch you're merging from. This is probably going to be **master**. 

The merge should be successful. If it is, you can skip the next part.

If it is not, a big red error message will appear, and you will see merge conflicts in your unstaged changes:

![merge-1](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/Merge-1.png)

In order to resolve these conflicts, open your text editor/IDE of choice, get in there and manually decide which changes should be kept and which changes should be discarded. If you are merging someone else's changes, you probably want to sit down and talk with them about how this should be done.

[merge-1]: https://raw.githubusercontent.com/Mantissa-23/VGEM-2018/master/.getting_started/images/Merge-1.png "merge-1"

In order to "keep" a change, simply delete the lines you don't want. You can also make edits, you don't have to keep either line.

Note the following symbols:
```
<<<<<<< HEAD
+some line of code
=======
+ some other line of code
>>>>>>> --a long string of numbers and letters--
```

Rember to delete these lines when resolving merge conflicts. They are simply there to inform you which line of code came from which repository; the one on top is from yours, the one on the bottom is from the remote changes you're trying to merge in.

> Some IDEs and text editors will have built-in merge conflict resolution tools. These are often dubbed difftools. If your editor has one, congratulations, using it will make this process will be slightly easier but also significantly more confusing. My text editor, Vim, has a built-in difftool and it took me 3 years before I actually got around to learning how to use it. If you've never used a difftool, I reccommend just getting in there and deleting/editing all of the necessary lines yourself, it's not that hard.

Once you have resoled your conflicts, mouse over to and click `Commit > Stage To Commit`. Now you can continue as normal.

In both cases (merge is auto resolved and merge conflict), you can now **Push** your changes. This is done the same way as described in Section 4.2.

This concludes the guide on **Fetching** and **Merging**. I understand that was a lot; if you have any questions, again, don't be afraid to ask.

# 5 Git Terminal Tutorial
I personally find that using the command prompt (cmd) is easier and faster to use than the Git GUI, so here's a brief tutorial on how to use the cmd line to do the same thing. 

You will first need to open the command prompt on your computer. Type "cmd" in the search bar on your laptop and it will be the first thing that pops up. Alternatively, you can use Git Bash by typing Bash in your start menu or right clicking in an open directory and clicking on Git Bash. Git Bash runs in a more complete terminal emulator than Cmd, and allows for things like custom themes, globbing, bash scripts, etc. etc. that will make your life easier if you know what you're doing. For this tutorial we'll use cmd.exe, but the process is nearly identical for both terminals. On Windows, cmd.exe will look like this:

![cmd-1](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/cmd-1.PNG)

You will need to find where you saved the cloned repository (that you downloaded way back when) on your computer. If you have not done downloaded the repository yet, refer back to Section 4 or 5 first, then read this section.

To get to the folder where the cloned repository is saved, you need several Windows commands:
1. **cd**: _cd name_of_subfolder_ allows you to access a subfolder. Ex. _cd "VA iGEM"_ will allow you to access the subfolder in the current folder that you are in. 
2. **cd ..** allows you to jump backwards a folder, in case you cd into the wrong folder. 
3. **dir**: typing _dir_ into the cmd shows all the subfolders in the current folder you are in. This is useful when you are trying to cd into a folder but you don't remember what the name of the folder is. 

Using this commands, you can easily get into the folder where your cloned repository is located.

![cmd-2](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/cmd-2.PNG)

Note that the first part of each new line in the cmd denotes what the file path is (which folder you are in). 

Once you are in the folder where you saved the cloned repository, you are ready to do a **pull**. 

## 5.1 Pull
Type _git pull origin master_. That's it. It's that easy.This allows you to pull from the master branch. Make sure to pull every time before you start editing stuff on GitHub. 

![cmd-3](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/cmd-3.PNG)

Note here that my GitHub repo is already up to date, but it's good practice to pull every time before you make changes. 

## 5.2 Push
This is a little more complicated. You want to **commit** and **push** your changes to the GitHub repo by following this steps.

1. Type _git add ._
2. Type _git commit -m **insert comments about your changes here**_. Adding comments is important, as it tells everyone else what changes you made (and is good coding practice)!
3. Type _git remote -v_.This is a verification step to check that you are committing to the right repository. 
4. Finally, type _git push origin master_. You're good to go! 

![cmd-4](https://github.com/Mantissa-23/VGEM-2018/blob/master/.getting_started/images/cmd-4.PNG)

Throughout this, you may run into issues if your edits are in direct conflict with someone elses. In this case, you'll have to go back and manually search through your code to see what the differences are. Refer back to [Pulling Changes](https://github.com/Mantissa-23/VGEM-2018/tree/master/.getting_started#43-pulling-changes) to see what you should do in that situation. 

That's it! If you have any questions, feel free to talk to me in lab or just shoot me a message...and Google will be your best friend as well. 

# 6 Why don't we just use Google Drive

**Note, you can skip this section if you believe me and trust that Git is awesome and have accepted the fact that we’re using Github. This section is for everyone that’s thinking “Why do I have to learn another piece of software for this synthetic biology project.”**

There are a lot of answers to this question, but the most important ones are _merging, revision control, branches, blame and consistency_. Some of these are buzzwords used by the open source/version control community, so let me define them.

_Merging_ is best explained by an example. Let’s say we have two members working on the same project at the same time. One team members changes a hundred or so lines of code towards the top of the file in some class definitions, another changes the main method at the bottom of the file. Concurrently, two other team members are working on some HTML that makes use of these files.

Before all team members started, the project was the same; now it is different. If we were using Google Drive or something else like it, all 4 team members would upload their changes, and whoever was the last to upload their changes would be the one who “wins.” Some work would be overwritten; it would not be lost, as Google Drive retains a history of all files uploaded, however, it wouldn’t be obvious that not everyone’s changes were applied, and someone would have to go in their and manually cut and paste in the changes made.

Git does this all automatically. Team members commit their changes to their local repository, and then upload (push) those changes to our Github repository. Git tells you if there were any problems, and walks you through how to resolve them. 90% of the time however, its algorithms successfully merge all changes concurrently made by authors and saves everybody a lot of time and hassle.

_Revision_ control is the idea that any past changes to the project can be seen. This means that if you want to experiment with some code, completely break something, utterly ruin the functionality of the project, you don’t have to go through the trouble of making a backup and duplicating everything somewhere else on your machine. Because Git tracks the history of the entire project, if you mess something up, you can just press a button and it will restore the previous state of the project. This additionally means that, if you mess something up and don’t realize it until 10 days later, but you’ve made a bunch of changes you want to keep, you can rewind only the part that you messed up, and keep all of the changes that you’ve already made.

In comparison, Google Drive has rough, automatic revision control that isn’t explicit. I’m pretty sure it also deletes revisions past a certain date.

_Branches_ are related to this. Branching is the idea that multiple team members can work on different versions of the project at the same time, upload their changes independently of one another, and then merge them down the line into one, consistent, holistic project. This is a bit of an advanced concept, and it may be hard to see the difference between it and merging. Shoot me a message if you want further clarification, otherwise trust me in saying that it’s extremely valuable.

_Blame_ is the concept of being aware of who made what change and who contributed what work. When it comes to code, Google Drive only tracks whoever uploaded the last change. Because of the way that Git works, it tracks every contribution everyone has ever made to every single line of code in the entire project.

This both allows you to see who has contributed the most (vital for paying people reasonable amounts of money for their work), and who is causing problems in the code. You can see exactly when and where someone broke something. Or when and where someone fixed something.

Lastly, *consistency*. Because Google Drive allows anyone with access to the drive to make a change, someone may do something that you don’t like without you realizing, breaking something that was important to you. Or you may do something stupid and break something without realizing it.

Reversing these changes is hard. Figuring out why problems are occurring is harder. Git is consistent in that you always have access to a working code base, even if people have made changes, because you can just rewind time, or switch to a branch that you know is working. In Google Drive, everyone is working with the work-in-progress, fresh-out-of-the-oven, gooey, sticky code that everyone's gotten their hands on. There is no isolation, and so things are more likely to break.

